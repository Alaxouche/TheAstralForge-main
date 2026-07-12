---
layout: skyground_base
title: Frequently Asked Questions
---

<div class="content-wrapper" style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
  <section class="faq-header" style="text-align: center; margin-bottom: 3rem;">
    <h1 class="faq-page-title" data-i18n-key="faq.title">Frequently Asked Questions</h1>
    <p class="faq-page-subtitle" data-i18n-key="faq.subtitle">Find answers to common questions about our modlists, installation, and troubleshooting.</p>
  </section>

  <div style="max-width: 800px; margin: 0 auto;">
    <input
      type="text"
      id="faq-search"
      data-i18n-placeholder="faq.search_placeholder"
      placeholder="Search FAQs..."
      aria-label="Search FAQ"
      style="width: 100%; padding: 1rem; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; margin-bottom: 2rem; font-size: 1rem;"
    />

    <div class="faq-container">
      {% for faq in site.data.faq %}
      <div class="faq-item" data-faq-id="{{ faq.id }}" data-lang="en">
        <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
          <h3>{{ faq.question }}</h3>
          <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="faq-answer">
          <p>{{ faq.answer }}</p>
          {% if faq.tags %}
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            {% for tag in faq.tags %}
            <span style="padding: 0.25rem 0.75rem; background: rgba(34, 197, 94, 0.15); border-radius: 12px; color: var(--primary-text); font-size: 0.75rem;">{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
        </div>
      </div>
      {% endfor %}

      {% for faq in site.data.faq_fr %}
      <div class="faq-item faq-item--fr" data-faq-id="{{ faq.id }}" data-lang="fr" style="display:none">
        <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
          <h3>{{ faq.question }}</h3>
          <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="faq-answer">
          <p>{{ faq.answer }}</p>
          {% if faq.tags %}
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            {% for tag in faq.tags %}
            <span style="padding: 0.25rem 0.75rem; background: rgba(34, 197, 94, 0.15); border-radius: 12px; color: var(--primary-text); font-size: 0.75rem;">{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>

  <section class="faq-cta-section" style="text-align: center; margin-top: 4rem; padding: 2rem; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
    <h2 data-i18n-key="faq.cta_title">Still Have Questions?</h2>
    <p data-i18n-key="faq.cta_body">Join our Discord community for direct support from our team and community members.</p>
    <a href="https://discord.gg/vKuB7nazBk" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-block; padding: 0.75rem 2rem; text-decoration: none;" data-i18n-key="faq.cta_btn">
      Join Discord Server
    </a>
  </section>
</div>

<style>
.faq-page-title {
  color: var(--primary-text);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.faq-page-subtitle {
  color: rgba(255,255,255,0.7);
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
}
html[data-theme="light"] .faq-page-subtitle {
  color: rgba(0,0,0,0.65);
}
.faq-container { max-width: 800px; }
.faq-item {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.faq-item:hover { border-color: rgba(34,197,94,0.3); }
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  user-select: none;
}
.faq-question:focus-visible {
  outline: 3px solid var(--primary-text);
  outline-offset: -3px;
  border-radius: 8px;
}
.faq-question h3 { margin: 0; font-size: 1rem; font-weight: 500; color: #fff; }
.faq-icon { color: var(--primary-text); transition: transform 0.3s ease; flex-shrink: 0; }
.faq-item.active .faq-icon { transform: rotate(180deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0;
}
.faq-item.active .faq-answer { max-height: 500px; padding: 0 1.25rem 1.25rem; }
.faq-answer p { margin: 0; color: rgba(255,255,255,0.75); line-height: 1.6; }
.faq-cta-section h2 { color: var(--primary-text); margin-bottom: 1rem; }
.faq-cta-section p { color: rgba(255,255,255,0.7); margin-bottom: 1.5rem; }
.content-wrapper { min-height: 70vh; }

html[data-theme="light"] .faq-question h3 { color: #1b1b1b; }
html[data-theme="light"] .faq-answer p { color: rgba(0,0,0,0.72); }
html[data-theme="light"] #faq-search {
  background: rgba(0,0,0,0.03) !important;
  border-color: rgba(0,0,0,0.1) !important;
  color: #1b1b1b !important;
}
html[data-theme="light"] .faq-item {
  background: rgba(0,0,0,0.03);
  border-color: rgba(0,0,0,0.1);
}
html[data-theme="light"] .faq-cta-section {
  background: rgba(0,0,0,0.03) !important;
  border-color: rgba(0,0,0,0.1) !important;
}
html[data-theme="light"] .faq-cta-section p { color: rgba(0,0,0,0.7); }
</style>
