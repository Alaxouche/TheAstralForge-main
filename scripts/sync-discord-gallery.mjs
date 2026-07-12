#!/usr/bin/env node
/**
 * sync-discord-gallery.mjs — pulls image posts from a Discord channel into
 * _data/community_gallery.yml + assets/Images/community/.
 *
 * Setup (one time):
 *   1. Create a bot at https://discord.com/developers/applications
 *      (no privileged intents needed), invite it to the server with the
 *      "Read Message History" permission on the gallery channels.
 *   2. Set the DISCORD_BOT_TOKEN environment variable (or GitHub Actions
 *      secret). The channels themselves are mapped in CHANNELS below.
 *
 * Usage:  node scripts/sync-discord-gallery.mjs
 *
 * Behaviour:
 *   - reads the latest 100 messages of each mapped channel;
 *   - keeps messages that contain image attachments;
 *   - tags each entry with the modlist of the channel it came from;
 *   - picks the MAX_ITEMS newest entries FIRST, then downloads only those,
 *     as web-sized webp (~200 KB) via the Discord media proxy — never the
 *     multi-MB originals;
 *   - deletes images in assets/Images/community/ that the gallery no longer
 *     references, so the repo never accumulates dead weight;
 *   - rewrites _data/community_gallery.yml, newest first (manual entries —
 *     those without a discord.com source — are always kept).
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const MAX_ITEMS = 24;

/* Gallery channel → modlist. Add a line here to sync another channel. */
const CHANNELS = {
  '1404560105726410853': 'wunduniik',
  '1371441554128109688': 'ghost-of-the-grid',
  '1356624589874004058': 'krentoraan',
};

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const DATA_FILE = join(ROOT, '_data', 'community_gallery.yml');
const IMG_DIR = join(ROOT, 'assets', 'Images', 'community');

if (!TOKEN) {
  console.error('Missing DISCORD_BOT_TOKEN.');
  process.exit(1);
}

async function discord(path) {
  const res = await fetch(`https://discord.com/api/v10${path}`, {
    headers: { Authorization: `Bot ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`Discord API ${res.status} on ${path}`);
  return res.json();
}

/* Minimal parser for the flat list format this script itself writes. */
function readExistingEntries() {
  if (!existsSync(DATA_FILE)) return [];
  const text = readFileSync(DATA_FILE, 'utf8');
  const entries = [];
  let cur = null;
  for (const line of text.split(/\r?\n/)) {
    const startMatch = line.match(/^  - title:\s*"(.*)"\s*$/);
    if (startMatch) {
      cur = { title: startMatch[1] };
      entries.push(cur);
      continue;
    }
    const kv = line.match(/^    (\w+):\s*"?([^"]*)"?\s*$/);
    if (cur && kv) cur[kv[1]] = kv[2];
  }
  return entries;
}

function yamlEscape(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function writeEntries(entries) {
  const header = readFileSync(DATA_FILE, 'utf8').split('\nitems:')[0];
  const body = entries.map(e => `  - title: "${yamlEscape(e.title)}"
    author: "${yamlEscape(e.author)}"
    modlist: ${e.modlist}
    image: ${e.image}
    date: ${e.date}
    source: "${e.source || ''}"`).join('\n\n');
  writeFileSync(DATA_FILE, `${header}\nitems:\n${body}\n`);
}

function makeTitle(content, fallback) {
  const firstLine = (content || '').split('\n')[0].replace(/https?:\/\/\S+/g, '').trim();
  if (firstLine) return firstLine.slice(0, 60);
  return fallback;
}

const existing = readExistingEntries();
const known = new Set(existing.map(e => e.source).filter(Boolean));
mkdirSync(IMG_DIR, { recursive: true });

/* Pass 1 — list candidates without downloading anything. */
const candidates = [];
for (const [channelId, modlist] of Object.entries(CHANNELS)) {
  let channel, messages;
  try {
    channel = await discord(`/channels/${channelId}`);
    messages = await discord(`/channels/${channelId}/messages?limit=100`);
  } catch (err) {
    console.warn(`skip channel ${channelId} (${modlist}): ${err.message}`);
    continue;
  }

  for (const msg of messages) {
    const images = (msg.attachments || []).filter(a =>
      (a.content_type || '').startsWith('image/'));
    if (!images.length) continue;

    const source = `https://discord.com/channels/${channel.guild_id}/${channelId}/${msg.id}`;
    if (known.has(source)) continue;

    for (const [i, att] of images.entries()) {
      candidates.push({
        title: makeTitle(msg.content, `Screenshot by ${msg.author.global_name || msg.author.username}`),
        author: msg.author.global_name || msg.author.username,
        modlist,
        image: `/assets/Images/community/${msg.id}${images.length > 1 ? `-${i}` : ''}.webp`,
        date: msg.timestamp.slice(0, 10),
        source,
        _att: att,
      });
    }
  }
}

/* Pass 2 — decide what the gallery keeps, THEN download only that.
   Manual entries (no discord source) are permanent; synced ones are capped. */
const manual = existing.filter(e => !(e.source || '').includes('discord.com'));
const previousSynced = existing.filter(e => (e.source || '').includes('discord.com'));
const allSynced = [...candidates, ...previousSynced]
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  .slice(0, MAX_ITEMS);

const kept = [];
let downloaded = 0;
for (const entry of allSynced) {
  const att = entry._att;
  delete entry._att;

  if (!att) { kept.push(entry); continue; } // pre-existing synced entry

  const filePath = join(ROOT, ...entry.image.split('/').filter(Boolean));
  if (!existsSync(filePath)) {
    // Web-sized webp via the Discord media proxy instead of the full-res
    // original — keeps the repo small (~200 KB instead of several MB each).
    const width = Math.min(att.width || 1280, 1280);
    const height = att.width
      ? Math.round((att.height || width) * (width / att.width))
      : 720;
    const resized = `${att.proxy_url}${att.proxy_url.includes('?') ? '&' : '?'}format=webp&width=${width}&height=${height}`;

    let res = await fetch(resized);
    if (!res.ok) res = await fetch(att.url); // fall back to the original
    if (!res.ok) { console.warn(`skip ${entry.source}: HTTP ${res.status}`); continue; }

    writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
    downloaded += 1;
  }
  kept.push(entry);
}

const finalEntries = [...kept, ...manual];
writeEntries(finalEntries);

/* Pass 3 — remove synced images the gallery no longer references. */
const referenced = new Set(
  finalEntries.map(e => e.image.split('/').pop()).filter(Boolean)
);
let removed = 0;
for (const file of readdirSync(IMG_DIR)) {
  if (!referenced.has(file)) {
    rmSync(join(IMG_DIR, file));
    removed += 1;
  }
}

console.log(`Downloaded ${downloaded} image(s), removed ${removed} orphan(s). Gallery now has ${finalEntries.length} entries.`);
