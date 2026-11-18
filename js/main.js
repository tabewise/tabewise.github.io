/* TabeWise site script: language switch (Japanese default), mobile menu, contact link. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Investor / partner enquiries.
     No form backend exists, so no submission form is shown. To publish a
     contact route, put a monitored role address here (for example a
     dedicated partners mailbox on your own domain), or leave it empty and
     the page shows "being set up". Do not use a personal address.
     ------------------------------------------------------------------ */
  var CONTACT_EMAIL = '';

  /* ------------------------------------------------------------------
     Android download. While APK_URL is empty, every download button is
     replaced by a "coming soon" message. When a verified TabeWise APK
     exists, upload it and set its relative path here, for example
     'Android/TABEWISE.apk'. Do not point this at a file that is not there.
     ------------------------------------------------------------------ */
  var APK_URL = '';

  var KEY = 'tabewise-lang';
  var doc = document, root = doc.documentElement;

  var META = {
    ja: {
      title: 'TabeWise（タベワイズ）｜かしこく食べる。もっと知る。',
      desc: 'TabeWise（タベワイズ）は、商品情報をわかりやすくすることで、毎日の選択をもっと賢くする、日本発の暮らしの情報サービス。まずは食品のスキャンから。',
      og: '商品情報をわかりやすくして、毎日の選択をもっと賢く。日本発の暮らしの情報サービス。',
      alt: 'TabeWise（タベワイズ）：かしこく食べる。もっと知る。',
      locale: 'ja_JP'
    },
    en: {
      title: 'TabeWise (タベワイズ) | Eat Smart. Know Better.',
      desc: 'TabeWise (タベワイズ) is a Japan-first lifestyle discovery platform that makes product information easier to understand, so everyday choices get smarter. It starts with food scanning.',
      og: 'Product information made easier to understand, for smarter everyday choices. A Japan-first lifestyle discovery platform.',
      alt: 'TabeWise (タベワイズ): Eat Smart. Know Better.',
      locale: 'en_US'
    }
  };

  function meta(sel, attr, val) {
    var el = doc.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  }

  function setLang(l) {
    var m = META[l];
    root.lang = l;

    doc.querySelectorAll('[data-ja]').forEach(function (e) {
      if (e.dataset.en === undefined) e.dataset.en = e.innerHTML;
      e.innerHTML = l === 'ja' ? e.dataset.ja : e.dataset.en;
    });
    doc.querySelectorAll('[data-alt-ja]').forEach(function (e) {
      if (e.dataset.altEn === undefined) e.dataset.altEn = e.getAttribute('alt');
      e.setAttribute('alt', l === 'ja' ? e.dataset.altJa : e.dataset.altEn);
    });
    doc.querySelectorAll('[data-aria-ja]').forEach(function (e) {
      if (e.dataset.ariaEn === undefined) e.dataset.ariaEn = e.getAttribute('aria-label');
      e.setAttribute('aria-label', l === 'ja' ? e.dataset.ariaJa : e.dataset.ariaEn);
    });

    doc.title = m.title;
    meta('meta[name="description"]', 'content', m.desc);
    meta('meta[property="og:title"]', 'content', m.title);
    meta('meta[property="og:description"]', 'content', m.og);
    meta('meta[property="og:image:alt"]', 'content', m.alt);
    meta('meta[property="og:locale"]', 'content', m.locale);
    meta('meta[name="twitter:title"]', 'content', m.title);
    meta('meta[name="twitter:description"]', 'content', m.og);

    doc.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === l));
    });
    try { localStorage.setItem(KEY, l); } catch (e) { /* storage unavailable */ }
    if (typeof refreshShots === 'function') refreshShots();
  }

  var saved = 'ja';
  try { saved = localStorage.getItem(KEY) || 'ja'; } catch (e) { /* ignore */ }
  setLang(saved === 'en' ? 'en' : 'ja');

  doc.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });


  /* Theme switcher: re-colours the site and swaps the app screenshots.
     Screens are looked up at images/screens/<theme>-<home|result|settings>.png
     (portrait, about 9:19). Until a file exists the placeholder stays. */
  var THEMES = {
    sakura: { color: '#ffe1ea', en: 'Sakura', ja: '桜' },
    sky:    { color: '#ddf0f6', en: 'Sky',    ja: '空' },
    matcha: { color: '#eaf4dc', en: 'Matcha', ja: '抹茶' },
    dark:   { color: '#0e1626', en: 'Dark',   ja: 'ダーク' }
  };
  var SHOTS = {
    home:     { en: 'Home screen',     ja: 'ホーム画面' },
    result:   { en: 'Result screen',   ja: '結果画面' },
    settings: { en: 'Settings screen', ja: '設定画面' }
  };
  var THEME_KEY = 'tabewise-theme';
  var theme = 'sakura';
  try { var st = localStorage.getItem(THEME_KEY); if (THEMES[st]) theme = st; } catch (e) { /* ignore */ }

  function refreshShots() {
    if (!SHOTS || !THEMES) return; /* not initialised yet on first setLang */
    var ja = root.lang === 'ja';
    doc.querySelectorAll('figure[data-shot]').forEach(function (fig) {
      var key = fig.dataset.shot, img = fig.querySelector('.shot-img'), slot = fig.querySelector('.shot-slot');
      if (!img || !slot || !SHOTS[key]) return;
      var t = THEMES[theme];
      var alt = ja ? SHOTS[key].ja + '（' + t.ja + 'テーマ）' : SHOTS[key].en + ', ' + t.en + ' theme';
      img.alt = alt;
      var src = 'images/screens/' + theme + '-' + key + '.png';
      if (img.getAttribute('data-src') === src) return;
      img.setAttribute('data-src', src);
      var probe = new Image();
      probe.onload = function () {
        if (img.getAttribute('data-src') !== src) return;
        img.src = src; img.hidden = false; slot.hidden = true;
      };
      probe.onerror = function () {
        if (img.getAttribute('data-src') !== src) return;
        img.hidden = true; slot.hidden = false;
      };
      probe.src = src;
    });
  }

  function applyTheme(name, save) {
    if (!THEMES[name]) name = 'sakura';
    theme = name;
    if (name === 'sakura') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', name);
    meta('meta[name="theme-color"]', 'content', THEMES[name].color);
    doc.querySelectorAll('[data-theme-btn]').forEach(function (b) {
      b.setAttribute('aria-checked', String(b.dataset.themeBtn === name));
    });
    if (save) { try { localStorage.setItem(THEME_KEY, name); } catch (e) { /* ignore */ } }
    refreshShots();
  }
  doc.querySelectorAll('[data-theme-btn]').forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(b.dataset.themeBtn, true); });
  });
  applyTheme(theme, false);

  /* Mobile menu */
  var btn = doc.querySelector('.menu-btn');
  var nav = doc.getElementById('site-nav');
  function closeMenu() {
    if (!btn) return;
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* Active navigation link: highlights the nav link of the section being read.
     Works from clicks and from manual scrolling (IntersectionObserver), in both languages. */
  var navLinks = doc.querySelectorAll('#site-nav a[href^="#"]');
  var allSections = doc.querySelectorAll('main > section[id]');
  function setActiveNav(id) {
    navLinks.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  if (navLinks.length && allSections.length) {
    var navIds = {};
    navLinks.forEach(function (a) { navIds[a.getAttribute('href').slice(1)] = true; });
    var order = Array.prototype.slice.call(allSections);
    var inBand = {};
    function updateNav() {
      var cur = -1;
      order.forEach(function (s, i) { if (inBand[s.id]) cur = i; });
      if (window.innerHeight + window.scrollY >= doc.documentElement.scrollHeight - 2) cur = order.length - 1;
      var id = '';
      for (var i = cur; i >= 0; i--) { if (navIds[order[i].id]) { id = order[i].id; break; } }
      setActiveNav(id);
    }
    nav && nav.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (a) setActiveNav(a.getAttribute('href').slice(1));
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { inBand[en.target.id] = en.isIntersecting; });
        updateNav();
      }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });
      order.forEach(function (s) { io.observe(s); });
      window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY >= doc.documentElement.scrollHeight - 2) updateNav();
      }, { passive: true });
    }
  }

  /* Android download buttons */
  if (APK_URL && /^[\w./-]+\.apk$/i.test(APK_URL)) {
    doc.querySelectorAll('.apk-soon').forEach(function (e) { e.hidden = true; });
    doc.querySelectorAll('.apk-live').forEach(function (e) {
      e.hidden = false;
      if (e.tagName === 'A') e.setAttribute('href', APK_URL);
    });
  }

  /* Contact route for investors / partners */
  var link = doc.getElementById('contact-link');
  var pending = doc.getElementById('contact-pending');
  if (link && pending && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(CONTACT_EMAIL)) {
    doc.querySelectorAll('.contact-soon').forEach(function (e) { e.hidden = true; });
    doc.querySelectorAll('.contact-live').forEach(function (e) { e.hidden = false; });
    link.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('TabeWise enquiry');
    link.hidden = false;
    pending.hidden = true;
  }
})();
