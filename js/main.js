/* TABEWISE site script: language switch (Japanese default), mobile menu, contact link. */
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
     replaced by a "coming soon" message. When a verified TABEWISE APK
     exists, upload it and set its relative path here, for example
     'Android/TABEWISE.apk'. Do not point this at a file that is not there.
     ------------------------------------------------------------------ */
  var APK_URL = '';

  var KEY = 'tabewise-lang';
  var doc = document, root = doc.documentElement;

  var META = {
    ja: {
      title: 'TABEWISE（タベワイズ）｜かしこく食べる。もっと知る。',
      desc: 'TABEWISE（タベワイズ）は、商品情報をわかりやすくすることで、毎日の選択をもっと賢くする、日本発の暮らしの情報サービス。まずは食品のスキャンから。',
      og: '商品情報をわかりやすくして、毎日の選択をもっと賢く。日本発の暮らしの情報サービス。',
      alt: 'TABEWISE（タベワイズ）：かしこく食べる。もっと知る。',
      locale: 'ja_JP'
    },
    en: {
      title: 'TABEWISE (タベワイズ) | Eat Smart. Know Better.',
      desc: 'TABEWISE (タベワイズ) is a Japan-first lifestyle discovery platform that makes product information easier to understand, so everyday choices get smarter. It starts with food scanning.',
      og: 'Product information made easier to understand, for smarter everyday choices. A Japan-first lifestyle discovery platform.',
      alt: 'TABEWISE (タベワイズ): Eat Smart. Know Better.',
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
  }

  var saved = 'ja';
  try { saved = localStorage.getItem(KEY) || 'ja'; } catch (e) { /* ignore */ }
  setLang(saved === 'en' ? 'en' : 'ja');

  doc.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

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
    link.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('TABEWISE enquiry');
    link.hidden = false;
    pending.hidden = true;
  }
})();
