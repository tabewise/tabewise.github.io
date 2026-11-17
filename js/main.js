(function(){
  var KEY='hl-lang',doc=document,root=doc.documentElement;
  var meta={ja:{t:'Halal Lens Japan｜日本のハラール好きのための食品ラベル確認アプリ',d:'日本のハラール好きのためのAndroidアプリ。原材料ラベルやバーコードを読み取り、確認が必要かもしれない原材料を知らせます。'},
            en:{t:'Halal Lens Japan',d:'An Android app for halal lovers living in Japan. Scan a Japanese ingredient label or barcode and see which ingredients may need checking.'}};
  function set(l){
    root.lang=l;
    doc.querySelectorAll('[data-ja]').forEach(function(e){
      if(e.dataset.en===undefined)e.dataset.en=e.innerHTML;
      e.innerHTML=l==='ja'?e.dataset.ja:e.dataset.en;
    });
    doc.querySelectorAll('[data-alt-ja]').forEach(function(e){
      if(e.dataset.altEn===undefined)e.dataset.altEn=e.alt;
      e.alt=l==='ja'?e.dataset.altJa:e.dataset.altEn;
    });
    doc.title=meta[l].t;
    var m=doc.querySelector('meta[name=description]');if(m)m.content=meta[l].d;
    doc.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===l));});
    try{localStorage.setItem(KEY,l);}catch(e){}
  }
  var saved='ja';try{saved=localStorage.getItem(KEY)||'ja';}catch(e){}
  set(saved==='en'?'en':'ja');
  doc.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){set(b.dataset.lang);});});
})();
