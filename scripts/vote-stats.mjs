#!/usr/bin/env node
/**
 * vote-stats.mjs — reads the "Was this helpful?" counters from Abacus.
 *
 * Usage:  node scripts/vote-stats.mjs
 *
 * Votes are recorded client-side by assets/skyground/vote-system.js.
 * The key-building logic here MUST match remoteKey() in that file.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const NAMESPACE = 'theastralforge';
const API = `https://abacus.jasoncameron.dev/get/${NAMESPACE}`;
const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const COLLECTIONS = [
  'wunduniik',
  'krentoraan',
  'ghost-of-the-grid',
  'no-mans-sky-explorer',
  'extrasolar-containment-protocol',
];

/* Same slug rules as vote-system.js remoteKey() */
function remoteKey(kind, id, yes) {
  const slug = String(kind + '-' + id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 58);
  return slug + (yes ? '-yes' : '-no');
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

/* Vote sections only render on /installation-guide/ pages (skyground_readme layout) */
function guidePageUrls() {
  const urls = [];
  for (const c of COLLECTIONS) {
    const dir = join(ROOT, '_' + c);
    let files;
    try { files = walk(dir); } catch { continue; }
    for (const f of files) {
      const rel = f.slice(dir.length + 1).replace(/\\/g, '/').replace(/\.md$/, '');
      const url = `/${c}/${rel}/`;
      if (url.includes('/installation-guide/')) urls.push(url);
    }
  }
  return urls;
}

function faqIds() {
  const ids = new Set();
  const dataDir = join(ROOT, '_data');
  for (const name of readdirSync(dataDir)) {
    if (!/faq.*\.yml$/i.test(name)) continue;
    const text = readFileSync(join(dataDir, name), 'utf8');
    for (const m of text.matchAll(/^\s*-?\s*id:\s*["']?([\w-]+)["']?\s*$/gm)) {
      ids.add(m[1]);
    }
  }
  return [...ids];
}

async function count(key) {
  try {
    const res = await fetch(`${API}/${key}`);
    if (!res.ok) return 0; // 404 = never voted
    const json = await res.json();
    return json.value ?? 0;
  } catch {
    return null; // network error
  }
}

async function report(label, kind, ids) {
  console.log(`\n=== ${label} ===`);
  const rows = [];
  for (const id of ids) {
    const [yes, no] = await Promise.all([
      count(remoteKey(kind, id, true)),
      count(remoteKey(kind, id, false)),
    ]);
    if (yes || no) rows.push({ id, yes: yes ?? '?', no: no ?? '?' });
  }
  if (!rows.length) {
    console.log('(no votes recorded yet)');
    return;
  }
  rows.sort((a, b) => (b.yes + b.no) - (a.yes + a.no));
  const w = Math.max(...rows.map(r => r.id.length), 4);
  console.log(`${'page/faq'.padEnd(w)}  yes   no`);
  for (const r of rows) {
    console.log(`${r.id.padEnd(w)}  ${String(r.yes).padStart(3)}  ${String(r.no).padStart(3)}`);
  }
}

await report('Installation guide pages', 'page', guidePageUrls());
await report('FAQ items', 'faq', faqIds());
