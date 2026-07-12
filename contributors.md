---
layout: skyground_readme
title: Contributors
permalink: /contributors/
---

<h1 data-i18n-key="contrib.title">Contributors</h1>

<p data-i18n-key="contrib.intro">Thank you to everyone who supports The Astral Forge. Your support keeps the modlists updated, tested, and documented.</p>

<div class="contributors-actions">
  <a class="contributors-btn contributors-btn--patreon" href="https://patreon.com/Alaxouche" target="_blank" rel="noopener noreferrer" data-i18n-key="contrib.btn_patreon">Join on Patreon</a>
  <a class="contributors-btn contributors-btn--kofi" href="https://ko-fi.com/alaxouche" target="_blank" rel="noopener noreferrer" data-i18n-key="contrib.btn_kofi">Support on Ko-fi</a>
</div>

<h2 data-i18n-key="contrib.why_title">Why contribute?</h2>

<ul class="contributors-list">
  {% for benefit in site.data.contributors.benefits %}
    <li>{{ benefit }}</li>
  {% endfor %}
</ul>

<h2 data-i18n-key="contrib.how_title">How your support helps development</h2>

<p data-i18n-key="contrib.how_body">Your contributions fund:</p>

<ul class="contributors-list">
  {% for impact in site.data.contributors.impact %}
    <li>{{ impact }}</li>
  {% endfor %}
</ul>

<h2 data-i18n-key="contrib.tiers_title">Patreon tiers</h2>

<div class="contributors-grid">
  {% for tier in site.data.contributors.tiers %}
    <div class="contributors-card">
      <img class="contributors-tier-image" src="{{ '/assets/Images/generic_background.webp' | relative_url }}" alt="Tier art placeholder">
      <h3>{{ tier.name }}</h3>
      <p class="contributors-amount">{{ tier.amount }}</p>
      <ul>
        {% for perk in tier.perks %}
          <li>{{ perk }}</li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>

<h2 data-i18n-key="contrib.recent_title">Recent supporters</h2>

<div class="contributors-table">
  <div class="contributors-row contributors-row--header">
    <span data-i18n-key="contrib.col_name">Name</span>
    <span data-i18n-key="contrib.col_platform">Platform</span>
    <span data-i18n-key="contrib.col_amount">Amount</span>
    <span data-i18n-key="contrib.col_date">Date</span>
  </div>
  {% for supporter in site.data.contributors.recent %}
    <div class="contributors-row">
      <span>{{ supporter.name }}</span>
      <span>{{ supporter.platform }}</span>
      <span>{{ supporter.amount }}</span>
      <span>{{ supporter.date }}</span>
    </div>
  {% endfor %}
</div>

<h2 data-i18n-key="contrib.top_title">Top 10 supporters (all time)</h2>

<ol class="contributors-top">
  {% for supporter in site.data.contributors.top %}
    <li>{{ supporter.name }} — {{ supporter.platform }} — {{ supporter.total }}</li>
  {% endfor %}
</ol>

<p class="contributors-note" data-i18n-key="contrib.note">Contributor data is currently managed in <code>_data/contributors.yml</code>. Update that file whenever you want to refresh the lists.</p>
