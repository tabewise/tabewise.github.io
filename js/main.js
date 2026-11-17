(function(){
  var KEY='tw-lang',doc=document,root=doc.documentElement;
  var meta={ja:{t:'TABEWISE｜タベワイズ — Eat Smart. Know Better.',d:'日本の食品ラベルをわかりやすく確認できるライフスタイルアプリ。Eat Smart. Know Better.'},
            en:{t:'TABEWISE | タベワイズ — Eat Smart. Know Better.',d:'TABEWISE is a Japan-first lifestyle companion. Start with food label scanning and make more informed everyday choices.'}};
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
