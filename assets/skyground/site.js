---
# Global JS bundle — concatenated by Jekyll at build time so every page
# loads one script instead of eleven. Conditional scripts (stats, loadorder,
# gallery, discord widget…) stay separate. Keep the order identical to the
# old <script> order in _layouts/skyground_base.html.
# layout: null is required — the site-wide default layout would otherwise
# wrap this file in HTML.
layout: null
---
{% include_relative lightbox.js %}
;
{% include_relative carousel.js %}
;
{% include_relative header.js %}
;
{% include_relative theme-toggle.js %}
;
{% include_relative i18n.js %}
;
{% include_relative performance.js %}
;
{% include_relative features.js %}
;
{% include_relative enhancements.js %}
;
{% include_relative vote-system.js %}
;
{% include_relative search-system.js %}
;
{% include_relative faq-accordion.js %}
