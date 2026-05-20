(function(){
  var css = `
    :root{--soft:#f4f7fb;--card:#ffffff;--ink2:#111827;--muted2:#5f6f83}
    body{background:linear-gradient(180deg,#f3f8f7 0,#f7f9fc 240px,#f7f9fc 100%)!important}
    .wrap{width:min(1180px,calc(100% - 32px))!important;padding:22px 0 56px!important}
    .hero{align-items:stretch!important;margin-bottom:14px!important;padding:20px 0 10px!important;border-bottom:1px solid rgba(148,163,184,.24)}
    .title{padding:8px 0 18px!important}
    .tag{border:1px solid rgba(148,163,184,.34)!important;background:rgba(255,255,255,.86)!important;box-shadow:0 10px 30px rgba(15,23,42,.06)!important;color:var(--accent)!important}
    h1{font-size:clamp(32px,4.7vw,58px)!important;letter-spacing:0!important}
    .sub{max-width:720px!important;line-height:1.7!important;color:#506176!important}
    .mini{align-self:center!important}
    .mini div{border-radius:8px!important;padding:17px!important;border:1px solid rgba(148,163,184,.28)!important;box-shadow:0 14px 36px rgba(15,23,42,.07)!important}
    .toolbar{position:relative!important;top:auto!important;border-radius:8px!important;border:1px solid rgba(148,163,184,.30)!important;box-shadow:0 16px 42px rgba(15,23,42,.07)!important;background:rgba(255,255,255,.92)!important}
    .field input,.field select,.pill{border-radius:8px!important;border-color:rgba(148,163,184,.38)!important}
    button{border-radius:8px!important;transition:transform .12s ease,box-shadow .12s ease,background .12s ease!important}
    button:not(:disabled):hover{transform:translateY(-1px);box-shadow:0 10px 22px rgba(15,23,42,.10)}
    button.primary{box-shadow:0 12px 26px color-mix(in srgb,var(--accent) 24%,transparent)!important}
    .card{border-radius:8px!important;border:1px solid rgba(148,163,184,.30)!important;box-shadow:0 18px 48px rgba(15,23,42,.08)!important}
    .quiz{position:relative!important;overflow:hidden!important}
    .quiz:before{content:"";position:absolute;left:0;top:0;right:0;height:5px;background:var(--accent)}
    .choice{border-radius:8px!important;box-shadow:0 8px 22px rgba(15,23,42,.04)!important}
    .choice span{background:rgba(148,163,184,.16)!important;color:#334155!important}
    .choice:not(:disabled):hover{border-color:var(--accent)!important;background:#fbfefd!important}
    .feedback{border:1px solid rgba(148,163,184,.22)!important}
    .studio-brand{box-shadow:0 12px 30px rgba(15,23,42,.12)!important}
    body.prestart .right button:not(#start),body.prestart #nextBtn2,body.prestart #focusBtn,body.prestart #choiceArea,body.prestart #answerArea,body.prestart #unknownBtn{display:none!important}
    body.prestart .grid{grid-template-columns:minmax(0,1fr) 300px!important}
    body.prestart .quiz{min-height:370px!important;padding:34px!important;background:linear-gradient(180deg,#fff 0,#fbfdff 100%)!important}
    body.prestart .quiz .counter{display:inline-flex!important;width:max-content!important;padding:8px 12px!important;border-radius:999px!important;background:color-mix(in srgb,var(--accent) 10%,white)!important;color:var(--accent)!important;border:1px solid color-mix(in srgb,var(--accent) 20%,white)!important}
    body.prestart .prompt,body.prestart .sentence{font-size:clamp(31px,4.8vw,56px)!important;line-height:1.12!important;margin:28px 0 14px!important;max-width:820px!important;color:#121826!important}
    body.prestart .hint,body.prestart .contextHint{display:block!important;width:min(760px,100%)!important;background:#f3f6fa!important;color:#42546a!important;border:1px solid rgba(148,163,184,.24)!important;line-height:1.7!important;font-size:18px!important;font-weight:750!important}
    body.prestart .feedback{width:min(760px,100%)!important;background:#fff!important;color:#55657a!important;border:1px solid rgba(148,163,184,.28)!important;line-height:1.7!important}
    body.prestart #start{padding:13px 20px!important;min-width:138px!important}
    body.prestart .track .bar{width:0%!important}
    @media(max-width:840px){
      .wrap{width:min(100% - 22px,1180px)!important;padding-top:14px!important}
      .hero,.grid,body.prestart .grid{grid-template-columns:1fr!important}
      .toolbar{padding:10px!important}
      .left,.right{width:100%!important}
      .right #start{width:100%!important}
      body.prestart .quiz{padding:24px!important;min-height:330px!important}
    }
  `;

  function addStyle(){
    if(document.getElementById('alex-polish-style')) return;
    var style=document.createElement('style');
    style.id='alex-polish-style';
    style.textContent=css;
    document.head.appendChild(style);
  }
  function txt(id,value){ var e=document.getElementById(id); if(e) e.textContent=value; }
  function hide(id){ var e=document.getElementById(id); if(e){ e.style.display='none'; e.disabled=true; } }
  function markStart(){
    document.body.classList.add('prestart');
    txt('count','准备开始');
    txt('state','准备开始');
    txt('progress','0 / 0');
    var q=location.search.toLowerCase();
    var isContext=!!document.getElementById('sentence') || q.indexOf('context')>-1 || q.indexOf('cloze')>-1;
    var isDict=q.indexOf('dictation')>-1 || q.indexOf('han2en')>-1 || q.indexOf('cn2en')>-1;
    var main=isContext?document.getElementById('sentence'):document.getElementById('prompt');
    var hint=isContext?document.getElementById('contextHint'):document.getElementById('hint');
    if(main) main.textContent='准备开始测试';
    if(hint) hint.textContent=isContext?'开始后会出现完整英文句子和一个空格，请根据语境选择最合适的英文单词。':(isDict?'开始后会显示中文释义和首字母，请输入完整英文单词。':'开始后会显示英文单词，请从四个中文选项中选择正确意思。');
    txt('feedback','先在上方填写姓名、选择题量和顺序，然后点击“开始测试”。计时会在第一题出现时自动开始。');
    ['prevBtn','nextBtn','skipBtn','finishBtn','nextBtn2','focusBtn','answerArea','choiceArea','unknownBtn'].forEach(hide);
    var start=document.getElementById('start');
    if(start) start.textContent='开始测试';
  }
  function bind(){
    var start=document.getElementById('start');
    if(start && !start.dataset.polished){
      start.dataset.polished='1';
      start.addEventListener('click',function(){ releaseQuizUI(); },true);
    }
    var again=document.getElementById('againBtn');
    if(again && !again.dataset.polished){
      again.dataset.polished='1';
      again.addEventListener('click',function(){ releaseQuizUI(); },true);
    }
  }
  function tick(){
    addStyle();
    bind();
    var start=document.getElementById('start');
    if(start && !document.body.classList.contains('quiz-live')){
      if(!window.__alexQuizStarted) markStart();
    }
  }
  document.addEventListener('click',function(e){
    if(e.target && e.target.id === 'start'){
      window.__alexQuizStarted=true;
      releaseQuizUI();
    }
  },true);
  function show(id, display){
    var e=document.getElementById(id);
    if(e){ e.style.display=display || ''; e.disabled=false; }
  }
  function releaseQuizUI(){
    document.body.classList.remove('prestart');
    document.body.classList.add('quiz-live');
    setTimeout(function(){
      var q=location.search.toLowerCase();
      var isContext=!!document.getElementById('sentence') || q.indexOf('context')>-1 || q.indexOf('cloze')>-1;
      var isDict=q.indexOf('dictation')>-1 || q.indexOf('han2en')>-1 || q.indexOf('cn2en')>-1;
      ['prevBtn','nextBtn','skipBtn','finishBtn','nextBtn2'].forEach(function(id){ show(id); });
      if(isContext){
        show('choiceArea','grid'); show('unknownBtn');
      } else if(isDict){
        show('answerArea','grid'); show('focusBtn');
      } else {
        show('choiceArea','grid'); show('unknownBtn');
      }
    },80);
  }
  var tries=0;
  var timer=setInterval(function(){
    tick();
    if(++tries>120 || window.__alexQuizStarted) clearInterval(timer);
  },100);
})();