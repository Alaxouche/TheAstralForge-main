/**
 * i18n.js — FR/EN language switcher for The Astral Forge
 * Handles data-i18n-key (textContent), data-i18n-html (innerHTML),
 * data-i18n-placeholder (placeholder attr), and FAQ bilingual switching.
 * Preference stored in localStorage under 'sg-lang'.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* TRANSLATIONS                                                         */
  /* ------------------------------------------------------------------ */

  const translations = {
    en: {
      /* ── Navigation ── */
      'nav.skip':               'Skip to content',
      'nav.home':               'Home',
      'nav.hub':                'Hub',
      'nav.modlists':           'Modlists',
      'nav.overview':           'Overview',
      'nav.install':            'Installation Guide',
      'nav.changelog':          'Changelog',
      'nav.known_issues':       'Known Issues',
      'nav.load_order':         'Load Order',
      'nav.contributors':       'Contributors',
      'nav.faq':                'FAQ',
      'nav.discord':            'Discord',
      'nav.search_placeholder': 'Search…',
      'nav.theme_label':        'Dark',
      'nav.theme_label_light':  'Light',

      /* ── Footer ── */
      'footer.made_by': 'Website By',

      /* ── README / Install pages ── */
      'readme.reading_mode': 'Reading mode',
      'readme.prev':         'Previous',
      'readme.next':         'Next',
      'readme.step':         'Step',
      'readme.of':           'of',
      'readme.vote_question':'Was this page helpful?',
      'readme.vote_yes':     'Yes',
      'readme.vote_no':      'No',

      /* ── FAQ page ── */
      'faq.title':            'Frequently Asked Questions',
      'faq.subtitle':         'Find answers to common questions about our modlists, installation, and troubleshooting.',
      'faq.search_placeholder':'Search FAQs…',
      'faq.cta_title':        'Still Have Questions?',
      'faq.cta_body':         'Join our Discord community for direct support from our team and community members.',
      'faq.cta_btn':          'Join Discord Server',

      /* ── Contributors page ── */
      'contrib.title':        'Contributors',
      'contrib.intro':        'Thank you to everyone who supports The Astral Forge. Your support keeps the modlists updated, tested, and documented.',
      'contrib.btn_patreon':  'Join on Patreon',
      'contrib.btn_kofi':     'Support on Ko-fi',
      'contrib.why_title':    'Why contribute?',
      'contrib.how_title':    'How your support helps development',
      'contrib.how_body':     'Your contributions fund:',
      'contrib.tiers_title':  'Patreon tiers',
      'contrib.recent_title': 'Recent supporters',
      'contrib.col_name':     'Name',
      'contrib.col_platform': 'Platform',
      'contrib.col_amount':   'Amount',
      'contrib.col_date':     'Date',
      'contrib.top_title':    'Top 10 supporters (all time)',
      'contrib.note':         'Contributor data is currently managed in _data/contributors.yml. Update that file whenever you want to refresh the lists.',

      /* ── Homepage — hero ── */
      'home.hero_kicker':      'WELCOME TO',
      'home.hero_title':       'THE ASTRAL FORGE',
      'home.hero_description': 'The Astral Forge is a collective repository of curated modlists and their authors, primarily for <strong>The Elder Scrolls V: Skyrim Special Edition</strong> and <strong>Cyberpunk 2077</strong>.',
      'home.hero_cta_discord': 'Join the Discord',

      /* ── Homepage — about ── */
      'home.about_title': 'About Us',
      'home.about_p1':    'The Astral Forge was established by Alaxouche in September 2020 as the official repository for the Wunduniik modlist. Since then, it has expanded and rebranded, first to Alaxouche\'s Modding Hub and now to The Astral Forge, hosting four main modlists: <strong>Wunduniik</strong>, <strong>Krentoraan</strong>, <strong>Ghost of the Grid</strong>, and <strong>No Man\'s Sky Explorer</strong>. We welcome submissions for additional modlists to increase visibility for authors and strengthen our collective credibility.',
      'home.about_p2':    'This site replaces the old WunduniikWiki.com. Each list keeps its installation guide, changelog, load order and known issues in one place, in English and French.',

      /* ── Homepage — creator ── */
      'home.creator_title':   'About the creator',
      'home.creator_tagline': '"There are never enough mods."',
      'home.creator_bio_1':   'Alaxouche has been modding Skyrim and Cyberpunk 2077 since 2020, and maintains the modlists hosted here along with the Discord community around them.',
      'home.creator_bio_2':   'It all started with Wunduniik in 2020. The Astral Forge grew out of that first list and now hosts several others, each with its own documentation.',

      /* ── Homepage — features ── */
      'home.feature_discord_title':    'The Discord server',
      'home.feature_discord_body':     'The Discord is where everything happens: installation help, bug reports, announcements, and plenty of screenshots. Each modlist has its own channels — <strong>Wunduniik</strong> gets dedicated support and announcement channels — and big changes are usually put to a poll before they land in a list.',
      'home.feature_docs_title':       'Getting Started',
      'home.feature_docs_body':        'Every list has a step-by-step installation guide, plus its changelog, load order and known issues. That covers all five: <strong>Wunduniik</strong>, <strong>Krentoraan</strong>, <strong>Ghost of the Grid</strong>, <strong>No Man\'s Sky Explorer</strong> and <strong>Extrasolar Containment Protocol</strong>. If a guide doesn\'t answer your question, ask on Discord.',
      'home.feature_guidelines_title': 'House rules',
      'home.feature_guidelines_body':  'Short version: be decent to each other, keep feedback constructive, and respect the mod authors whose work these lists are built on. The full rules are on the Discord server.',
      'home.feature_guidelines_link':  'Join our Discord to read the server rules',

      /* ── Homepage — supporters ── */
      'home.pulse_supporters_link': 'See all supporters',
      'home.pulse_recent':          'Recent Supporters',

      /* ── Homepage — gallery ── */
      'home.gallery_highlights_title':  'Gallery',
      'home.community_gallery_title':   'Community Gallery',
      'home.community_gallery_subtitle':'Screenshots shared by the community on Discord',
      'home.gallery_filter_all':        'All',
      'home.gallery_view_all':          'View the full gallery',

      /* ── Modlist gallery / checklist / banners ── */
      'gallery.title':        'Gallery',
      'gallery.subtitle':     'Screenshots from this modlist.',
      'checklist.title':      'Your progress',
      'checklist.mark_done':  'Mark this step as complete',
      'checklist.done':       'Completed',
      'banner.live':          'Live data',
    },

    fr: {
      /* ── Navigation ── */
      'nav.skip':               'Aller au contenu',
      'nav.home':               'Accueil',
      'nav.hub':                'Hub',
      'nav.modlists':           'Modlistes',
      'nav.overview':           'Présentation',
      'nav.install':            'Guide d\'installation',
      'nav.changelog':          'Journal des mises à jour',
      'nav.known_issues':       'Problèmes connus',
      'nav.load_order':         'Ordre de chargement',
      'nav.contributors':       'Contributeurs',
      'nav.faq':                'FAQ',
      'nav.discord':            'Discord',
      'nav.search_placeholder': 'Rechercher…',
      'nav.theme_label':        'Sombre',
      'nav.theme_label_light':  'Clair',

      /* ── Footer ── */
      'footer.made_by': 'Site par',

      /* ── README / Install pages ── */
      'readme.reading_mode': 'Mode lecture',
      'readme.prev':         'Précédent',
      'readme.next':         'Suivant',
      'readme.step':         'Étape',
      'readme.of':           'sur',
      'readme.vote_question':'Cette page vous a-t-elle été utile ?',
      'readme.vote_yes':     'Oui',
      'readme.vote_no':      'Non',

      /* ── FAQ page ── */
      'faq.title':            'Foire Aux Questions',
      'faq.subtitle':         'Trouvez des réponses aux questions fréquentes sur nos modlistes, l\'installation et le dépannage.',
      'faq.search_placeholder':'Rechercher dans la FAQ…',
      'faq.cta_title':        'Encore des questions ?',
      'faq.cta_body':         'Rejoignez notre communauté Discord pour un support direct de notre équipe et des membres de la communauté.',
      'faq.cta_btn':          'Rejoindre le serveur Discord',

      /* ── Contributors page ── */
      'contrib.title':        'Contributeurs',
      'contrib.intro':        'Merci à tous ceux qui soutiennent The Astral Forge. Votre soutien permet de maintenir les modlistes à jour, testées et documentées.',
      'contrib.btn_patreon':  'Rejoindre sur Patreon',
      'contrib.btn_kofi':     'Soutenir sur Ko-fi',
      'contrib.why_title':    'Pourquoi contribuer ?',
      'contrib.how_title':    'Comment votre soutien aide le développement',
      'contrib.how_body':     'Vos contributions financent :',
      'contrib.tiers_title':  'Niveaux Patreon',
      'contrib.recent_title': 'Soutiens récents',
      'contrib.col_name':     'Nom',
      'contrib.col_platform': 'Plateforme',
      'contrib.col_amount':   'Montant',
      'contrib.col_date':     'Date',
      'contrib.top_title':    'Top 10 soutiens (depuis toujours)',
      'contrib.note':         'Les données des contributeurs sont gérées dans _data/contributors.yml. Mettez à jour ce fichier pour actualiser les listes.',

      /* ── Homepage — hero ── */
      'home.hero_kicker':      'BIENVENUE SUR',
      'home.hero_title':       'THE ASTRAL FORGE',
      'home.hero_description': 'The Astral Forge est un dépôt collectif de modlistes et de leurs auteurs, principalement pour <strong>The Elder Scrolls V: Skyrim Special Edition</strong> et <strong>Cyberpunk 2077</strong>.',
      'home.hero_cta_discord': 'Rejoindre le Discord',

      /* ── Homepage — about ── */
      'home.about_title': 'À Propos',
      'home.about_p1':    'The Astral Forge a été fondée par Alaxouche en septembre 2020 en tant que dépôt officiel de la modliste Wunduniik. Depuis, elle s\'est agrandie et a changé de nom — d\'abord en Alaxouche\'s Modding Hub, puis en The Astral Forge — et héberge désormais quatre modlistes principales : <strong>Wunduniik</strong>, <strong>Krentoraan</strong>, <strong>Ghost of the Grid</strong> et <strong>No Man\'s Sky Explorer</strong>. Nous acceptons les soumissions de nouvelles modlistes pour accroître la visibilité des auteurs et renforcer notre crédibilité collective.',
      'home.about_p2':    'Ce site remplace l\'ancien WunduniikWiki.com. Chaque liste y regroupe son guide d\'installation, son changelog, son ordre de chargement et ses problèmes connus, en anglais comme en français.',

      /* ── Homepage — creator ── */
      'home.creator_title':   'À propos du créateur',
      'home.creator_tagline': '« Il n\'y aura jamais assez de mods. »',
      'home.creator_bio_1':   'Alaxouche modde Skyrim et Cyberpunk 2077 depuis 2020. Il maintient les modlistes hébergées ici, ainsi que la communauté Discord qui s\'est construite autour.',
      'home.creator_bio_2':   'Tout a commencé avec Wunduniik en 2020. The Astral Forge est né de cette première liste et en héberge aujourd\'hui plusieurs autres, chacune avec sa propre documentation.',

      /* ── Homepage — features ── */
      'home.feature_discord_title':    'Le serveur Discord',
      'home.feature_discord_body':     'C\'est sur le Discord que tout se passe : aide à l\'installation, signalement de bugs, annonces, et beaucoup de captures d\'écran. Chaque modliste a ses propres canaux — <strong>Wunduniik</strong> a ses canaux de support et d\'annonces dédiés — et les gros changements passent généralement par un sondage avant d\'arriver dans une liste.',
      'home.feature_docs_title':       'Bien débuter',
      'home.feature_docs_body':        'Chaque liste a son guide d\'installation pas à pas, son changelog, son ordre de chargement et ses problèmes connus. C\'est le cas des cinq listes : <strong>Wunduniik</strong>, <strong>Krentoraan</strong>, <strong>Ghost of the Grid</strong>, <strong>No Man\'s Sky Explorer</strong> et <strong>Extrasolar Containment Protocol</strong>. Si un guide ne répond pas à votre question, demandez sur le Discord.',
      'home.feature_guidelines_title': 'Règles de la maison',
      'home.feature_guidelines_body':  'En résumé : restez corrects entre vous, gardez des retours constructifs et respectez les auteurs de mods sans qui ces listes n\'existeraient pas. Les règles complètes sont sur le serveur Discord.',
      'home.feature_guidelines_link':  'Rejoignez notre Discord pour lire les règles du serveur',

      /* ── Homepage — supporters ── */
      'home.pulse_supporters_link': 'Voir tous les soutiens',
      'home.pulse_recent':          'Soutiens récents',

      /* ── Homepage — gallery ── */
      'home.gallery_highlights_title':  'Galerie',
      'home.community_gallery_title':   'Galerie communautaire',
      'home.community_gallery_subtitle':'Captures d\'écran partagées par la communauté sur Discord',
      'home.gallery_filter_all':        'Tout',
      'home.gallery_view_all':          'Voir toute la galerie',

      /* ── Galerie / checklist / bannières ── */
      'gallery.title':        'Galerie',
      'gallery.subtitle':     'Captures d\'écran de cette modliste.',
      'checklist.title':      'Votre progression',
      'checklist.mark_done':  'Marquer cette étape comme terminée',
      'checklist.done':       'Terminé',
      'banner.live':          'Données en direct',
    },

    /* DE/ES/RU translate the site chrome; long marketing copy and page
       content fall back to English (see applyLang fallback below). */
    de: {
      'nav.home':               'Startseite',
      'nav.hub':                'Hub',
      'nav.modlists':           'Modlisten',
      'nav.overview':           'Übersicht',
      'nav.install':            'Installationsanleitung',
      'nav.changelog':          'Änderungsprotokoll',
      'nav.known_issues':       'Bekannte Probleme',
      'nav.load_order':         'Ladereihenfolge',
      'nav.contributors':       'Mitwirkende',
      'nav.faq':                'FAQ',
      'nav.discord':            'Discord',
      'nav.search_placeholder': 'Suchen…',
      'nav.theme_label':        'Dunkel',
      'nav.theme_label_light':  'Hell',
      'footer.made_by':         'Website von',
      'readme.reading_mode':    'Lesemodus',
      'readme.prev':            'Zurück',
      'readme.next':            'Weiter',
      'readme.step':            'Schritt',
      'readme.of':              'von',
      'readme.vote_question':   'War diese Seite hilfreich?',
      'readme.vote_yes':        'Ja',
      'readme.vote_no':         'Nein',
      'faq.title':              'Häufig gestellte Fragen',
      'faq.search_placeholder': 'FAQ durchsuchen…',
      'contrib.title':          'Mitwirkende',
      'gallery.title':          'Galerie',
      'gallery.subtitle':       'Screenshots dieser Modliste.',
      'checklist.title':        'Dein Fortschritt',
      'checklist.mark_done':    'Diesen Schritt als erledigt markieren',
      'checklist.done':         'Erledigt',
      'banner.live':            'Live-Daten',
    },

    es: {
      'nav.home':               'Inicio',
      'nav.hub':                'Hub',
      'nav.modlists':           'Modlists',
      'nav.overview':           'Resumen',
      'nav.install':            'Guía de instalación',
      'nav.changelog':          'Registro de cambios',
      'nav.known_issues':       'Problemas conocidos',
      'nav.load_order':         'Orden de carga',
      'nav.contributors':       'Colaboradores',
      'nav.faq':                'Preguntas frecuentes',
      'nav.discord':            'Discord',
      'nav.search_placeholder': 'Buscar…',
      'nav.theme_label':        'Oscuro',
      'nav.theme_label_light':  'Claro',
      'footer.made_by':         'Sitio por',
      'readme.reading_mode':    'Modo lectura',
      'readme.prev':            'Anterior',
      'readme.next':            'Siguiente',
      'readme.step':            'Paso',
      'readme.of':              'de',
      'readme.vote_question':   '¿Te resultó útil esta página?',
      'readme.vote_yes':        'Sí',
      'readme.vote_no':         'No',
      'faq.title':              'Preguntas frecuentes',
      'faq.search_placeholder': 'Buscar en las FAQ…',
      'contrib.title':          'Colaboradores',
      'gallery.title':          'Galería',
      'gallery.subtitle':       'Capturas de esta modlist.',
      'checklist.title':        'Tu progreso',
      'checklist.mark_done':    'Marcar este paso como completado',
      'checklist.done':         'Completado',
      'banner.live':            'Datos en vivo',
    },

    ru: {
      'nav.home':               'Главная',
      'nav.hub':                'Хаб',
      'nav.modlists':           'Сборки',
      'nav.overview':           'Обзор',
      'nav.install':            'Руководство по установке',
      'nav.changelog':          'Список изменений',
      'nav.known_issues':       'Известные проблемы',
      'nav.load_order':         'Порядок загрузки',
      'nav.contributors':       'Участники',
      'nav.faq':                'ЧаВо',
      'nav.discord':            'Discord',
      'nav.search_placeholder': 'Поиск…',
      'nav.theme_label':        'Тёмная',
      'nav.theme_label_light':  'Светлая',
      'footer.made_by':         'Сайт от',
      'readme.reading_mode':    'Режим чтения',
      'readme.prev':            'Назад',
      'readme.next':            'Далее',
      'readme.step':            'Шаг',
      'readme.of':              'из',
      'readme.vote_question':   'Эта страница была полезна?',
      'readme.vote_yes':        'Да',
      'readme.vote_no':         'Нет',
      'faq.title':              'Часто задаваемые вопросы',
      'faq.search_placeholder': 'Поиск по ЧаВо…',
      'contrib.title':          'Участники',
      'gallery.title':          'Галерея',
      'gallery.subtitle':       'Скриншоты этой сборки.',
      'checklist.title':        'Ваш прогресс',
      'checklist.mark_done':    'Отметить шаг как выполненный',
      'checklist.done':         'Выполнено',
      'banner.live':            'Данные в реальном времени',
    }
  };

  /* Language metadata for the switcher dropdown. */
  const LANG_LABELS = {
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    ru: 'Русский',
  };

  /* ------------------------------------------------------------------ */
  /* STATE                                                                */
  /* ------------------------------------------------------------------ */

  const STORAGE_KEY = 'sg-lang';
  const SUPPORTED   = ['en', 'fr', 'de', 'es', 'ru'];

  /* ------------------------------------------------------------------ */
  /* SIDEBAR NAV TRANSLATIONS                                            */
  /* Maps English page titles (from Jekyll frontmatter) → French        */
  /* ------------------------------------------------------------------ */

  const SIDEBAR_TRANSLATIONS = {
    'Home':                       'Accueil',
    'Contributors':               'Contributeurs',
    'Frequently Asked Questions': 'Foire Aux Questions',
    'Report a Bug':               'Signaler un Bug',
    'Changelog':                  'Journal des mises à jour',
    'Known Issues':               'Problèmes connus',
    'Load Order':                 'Ordre de chargement',
    'Installation Guide':         "Guide d'installation",
    'System Requirements':        'Prérequis système',
    'System Requirement':         'Prérequis système',
    'Installation':               'Installation',
    'Wabbajack Installation':     'Installation Wabbajack',
    'Post Installation':          'Post-Installation',
    'Pre-Installation':           'Pré-Installation',
    'Using The List':             'Utiliser la liste',
    'Linux Installation Guide':   'Guide Linux',
    'FAQ':                        'FAQ',
  };

  function getStoredLang() {
    try {
      const l = localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.includes(l) ? l : 'en';
    } catch (_) { return 'en'; }
  }

  function setStoredLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  /* ------------------------------------------------------------------ */
  /* FAQ SWITCHING                                                        */
  /* Switch between .faq-item[data-lang="en"] and [data-lang="fr"]       */
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /* SIDEBAR NAV SWITCHING                                               */
  /* Translates .readme-nav page links by their stored English text.    */
  /* ------------------------------------------------------------------ */

  function applyNavLang(lang) {
    document.querySelectorAll('.readme-nav a').forEach(function (link) {
      if (link.getAttribute('href') === '#') return;
      if (link.classList.contains('nav-category-link')) return;
      if (!link.dataset.en) link.dataset.en = link.textContent.trim();
      var en = link.dataset.en;
      link.textContent = (lang === 'fr' && SIDEBAR_TRANSLATIONS[en]) ? SIDEBAR_TRANSLATIONS[en] : en;
    });
  }

  function applyFaqLang(lang) {
    document.querySelectorAll('.faq-item[data-lang]').forEach(function (el) {
      const itemLang = el.getAttribute('data-lang');
      // show matching lang, hide other; close any open accordion
      if (itemLang === lang) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
        el.classList.remove('active');
        const answer = el.querySelector('.faq-answer');
        if (answer) { answer.style.maxHeight = null; answer.style.padding = null; }
        const question = el.querySelector('.faq-question');
        if (question) question.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* APPLY TRANSLATIONS                                                   */
  /* ------------------------------------------------------------------ */

  function applyLang(lang) {
    const base = translations['en'];
    const dict = translations[lang] || base;
    // Fall back to English for any key a language hasn't translated yet,
    // so switching languages never leaves stale text from a previous one.
    const t = function (key) {
      return dict[key] !== undefined ? dict[key] : base[key];
    };

    /* textContent elements */
    document.querySelectorAll('[data-i18n-key]').forEach(function (el) {
      const val = t(el.getAttribute('data-i18n-key'));
      if (val !== undefined) el.textContent = val;
    });

    /* innerHTML elements */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const val = t(el.getAttribute('data-i18n-html'));
      if (val !== undefined) el.innerHTML = val;
    });

    /* placeholder attributes */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const val = t(el.getAttribute('data-i18n-placeholder'));
      if (val !== undefined) el.setAttribute('placeholder', val);
    });

    /* Theme toggle label — depends on current theme */
    const themeLabel = document.querySelector('.theme-toggle-label');
    if (themeLabel) {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const labelKey = isDark ? 'nav.theme_label' : 'nav.theme_label_light';
      if (t(labelKey)) themeLabel.textContent = t(labelKey);
    }

    /* Sidebar nav */
    applyNavLang(lang);

    /* FAQ bilingual items */
    applyFaqLang(lang);

    /* <html lang=""> for screen readers */
    document.documentElement.setAttribute('lang', lang);

    /* Update switcher button to show the CURRENT language code */
    const btnLabel = document.getElementById('lang-toggle-label');
    if (btnLabel) btnLabel.textContent = lang.toUpperCase();

    /* Mark the active option in the dropdown */
    document.querySelectorAll('#lang-menu [data-lang]').forEach(function (opt) {
      opt.setAttribute('aria-selected', opt.dataset.lang === lang ? 'true' : 'false');
    });
  }

  /* ------------------------------------------------------------------ */
  /* SELECT                                                               */
  /* ------------------------------------------------------------------ */

  function selectLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    setStoredLang(lang);
    applyLang(lang);
  }

  /* ------------------------------------------------------------------ */
  /* INIT                                                                 */
  /* ------------------------------------------------------------------ */

  function init() {
    applyLang(getStoredLang());

    /* Language dropdown */
    const btn  = document.getElementById('lang-toggle-btn');
    const menu = document.getElementById('lang-menu');

    function closeMenu() {
      if (!menu) return;
      menu.hidden = true;
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
    function openMenu() {
      if (!menu) return;
      menu.hidden = false;
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }

    if (btn && menu) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.hidden ? openMenu() : closeMenu();
      });
      menu.querySelectorAll('[data-lang]').forEach(function (opt) {
        opt.addEventListener('click', function () {
          selectLang(opt.dataset.lang);
          closeMenu();
        });
      });
      document.addEventListener('click', function (e) {
        if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) closeMenu();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
    } else if (btn) {
      // Fallback: no menu in DOM — cycle through supported languages.
      btn.addEventListener('click', function () {
        const i = SUPPORTED.indexOf(getStoredLang());
        selectLang(SUPPORTED[(i + 1) % SUPPORTED.length]);
      });
    }

    /* Re-translate theme label whenever the theme attribute changes */
    new MutationObserver(function () {
      const dict = translations[getStoredLang()] || translations['en'];
      const themeLabel = document.querySelector('.theme-toggle-label');
      if (!themeLabel) return;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const key = isDark ? 'nav.theme_label' : 'nav.theme_label_light';
      if (dict[key]) themeLabel.textContent = dict[key];
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
