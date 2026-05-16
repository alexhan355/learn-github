(() => {
  const cfg = Object.assign({ level: 'Vocabulary', series: '', accent: '#0f766e' }, window.DICTATION_CONFIG || {});
  const search = location.search.toLowerCase();
  const mode = search.includes('dictation') || search.includes('han2en') || search.includes('cn2en') ? 'dictation' : 'choice';
  const root = document.getElementById('dictation-root') || document.body;
  const nl = () => String.fromCharCode(10);
  const tab = () => String.fromCharCode(9);
  const modeName = mode === 'dictation' ? '汉译英听写测试' : '英译汉选择测试';
  document.documentElement.lang = 'zh-CN';
  document.title = cfg.level + ' ' + modeName;

  const style = document.createElement('style');
  style.textContent = `
    :root{--bg:#f7f8fb;--panel:#fff;--ink:#17202c;--muted:#657386;--line:#d9e2ec;--accent:${cfg.accent};--good:#0f766e;--good2:#e2f5ef;--bad:#c24135;--bad2:#fee2de;--warn:#a16207;--warn2:#fff3cc;--shadow:0 18px 50px rgba(23,32,44,.10)}
    *{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#eef7f4 0,#f7f8fb 260px,#f7f8fb 100%);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"PingFang SC","Microsoft YaHei",sans-serif}button,input,select{font:inherit}button{border:0;border-radius:8px;background:#edf2f7;color:var(--ink);padding:11px 15px;cursor:pointer;font-weight:850}button.primary{background:var(--accent);color:#fff}button.warn{background:var(--warn2);color:#76510c}button.danger{background:var(--bad2);color:#9b2c25}button:disabled{opacity:.45;cursor:not-allowed}.wrap{width:min(1120px,calc(100% - 28px));margin:0 auto;padding:26px 0 54px}.hero{display:grid;grid-template-columns:1.2fr .8fr;gap:16px;align-items:end;margin-bottom:16px}.title{padding:22px 0}.tag{display:inline-flex;border:1px solid var(--line);background:#fff;border-radius:999px;padding:7px 12px;color:var(--accent);font-weight:950;font-size:13px}h1{margin:14px 0 8px;font-size:clamp(30px,5vw,56px);line-height:1.02;letter-spacing:0}.sub{margin:0;color:var(--muted);font-size:18px}.mini{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.mini div,.card{background:rgba(255,255,255,.95);border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow)}.mini div{padding:16px}.mini b{display:block;font-size:22px}.mini span{color:var(--muted);font-size:13px}.toolbar{position:sticky;top:0;z-index:5;background:rgba(247,248,251,.93);backdrop-filter:blur(12px);border:1px solid var(--line);border-radius:8px;padding:12px;margin-bottom:16px}.tools{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center}.left,.right{display:flex;gap:9px;flex-wrap:wrap;align-items:center}.field{display:flex;align-items:center;gap:7px;color:var(--muted);font-weight:850}.field input,.field select{border:1px solid var(--line);border-radius:8px;padding:10px 11px;background:#fff;color:var(--ink);min-width:120px}.pill{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 12px;font-weight:950}.track{height:9px;background:#e5ebf1;border-radius:999px;overflow:hidden;margin-top:11px}.bar{height:100%;width:0;background:linear-gradient(90deg,var(--accent),#2f9e44);transition:.22s}.grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:16px}.card{padding:18px}.quiz{min-height:430px}.counter{color:var(--muted);font-weight:950}.prompt{font-size:clamp(34px,6vw,76px);line-height:1.08;font-weight:950;margin:26px 0 14px;word-break:break-word}.hint{display:inline-flex;background:#e8f2ff;color:#174a7c;border-radius:8px;padding:10px 13px;font-size:18px;font-weight:950;margin-bottom:16px}.answerRow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;margin-top:12px}.answerRow input{width:100%;border:2px solid #b7c7d6;border-radius:8px;padding:16px 15px;font-size:24px;font-weight:850;background:#fff}.answerRow input:focus{outline:3px solid rgba(15,118,110,.20);border-color:var(--accent)}.choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:16px}.choice{min-height:64px;text-align:left;background:#fff;border:1px solid var(--line);display:flex;gap:10px;align-items:center}.choice span{width:30px;height:30px;display:grid;place-items:center;border-radius:999px;background:#edf2f7;font-weight:950;flex:0 0 30px}.choice.good{background:var(--good2);border-color:#91d2bd;color:#075e56}.choice.bad{background:var(--bad2);border-color:#efaaa2;color:#9b2c25}.unknownBtn{width:100%;margin-top:12px;border:1px solid #fed7aa;background:#fff7ed;color:#9a3412}.feedback{margin-top:14px;padding:13px;border-radius:8px;background:#f0f4f8;color:var(--muted);font-weight:850}.feedback.good{background:var(--good2);color:#075e56}.feedback.bad{background:var(--bad2);color:#9b2c25}.nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.side h2,.result h2{margin:0 0 12px;font-size:18px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.stat{background:#f6f8fb;border:1px solid var(--line);border-radius:8px;padding:12px;text-align:center}.stat b{display:block;font-size:28px}.stat span{color:var(--muted);font-weight:850}.dots{display:flex;gap:6px;flex-wrap:wrap;max-height:250px;overflow:auto}.dot{width:18px;height:18px;border-radius:5px;background:#dfe7ef;padding:0}.dot.on{outline:3px solid rgba(15,118,110,.25)}.dot.ok{background:#28a76f}.dot.bad{background:#df5b51}.dot.skip{background:#d7a12c}.result{display:none;margin-top:16px}.result.show{display:block}.score{font-size:58px;font-weight:950;color:var(--accent);line-height:1}.wrongBox{margin-top:14px;min-height:88px;border:1px dashed #b7c7d6;background:#fbfcfe;border-radius:8px;padding:12px;cursor:pointer}.chip{display:inline-flex;margin:5px 5px 0 0;border-radius:999px;background:#eef3f8;border:1px solid var(--line);padding:7px 10px;font-weight:850}.download{margin-top:12px}.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(16px);background:#18202a;color:white;padding:11px 16px;border-radius:999px;opacity:0;transition:.22s;pointer-events:none;font-weight:900}.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}@media(max-width:840px){.hero,.grid,.choices{grid-template-columns:1fr}.mini{grid-template-columns:repeat(2,1fr)}.answerRow{grid-template-columns:1fr}.prompt{font-size:42px}.tools{align-items:stretch}.left,.right{width:100%}.field{width:100%}.field input,.field select{flex:1;min-width:0}button{flex:1}}
  `;
  document.head.appendChild(style);

  root.innerHTML = `
    <div class="wrap">
      <section class="hero"><div class="title"><span class="tag">Alex Han Studio · ${cfg.series || 'Vocabulary'} · ${mode === 'dictation' ? 'Chinese to English' : 'English to Chinese'}</span><h1>${cfg.level} ${modeName}</h1><p class="sub">${mode === 'dictation' ? '中文释义 + 首字母，输入完整英文单词。' : '英文单词 + 四个中文选项，快速检测词义识别。'}</p></div><div class="mini"><div><b id="total">加载中</b><span>词库</span></div><div><b>TXT</b><span>错词下载</span></div><div><b id="timer">00:00</b><span>用时</span></div><div><b id="progress">0 / 0</b><span>进度</span></div></div></section>
      <section class="toolbar"><div class="tools"><div class="left"><label class="field">姓名 <input id="student" placeholder="Student name"></label><label class="field">题量 <select id="size"><option value="50">50题</option><option value="100" selected>100题</option><option value="200">200题</option><option value="all">全部</option></select></label><label class="field">顺序 <select id="order"><option value="random" selected>随机</option><option value="original">词表顺序</option></select></label><span class="pill" id="state">读取词库中</span></div><div class="right"><button class="primary" id="start" disabled>开始</button><button id="prevBtn">上一题</button><button id="nextBtn">下一题</button><button class="warn" id="skipBtn">跳过</button><button class="danger" id="finishBtn">交卷</button></div></div><div class="track"><div class="bar" id="bar"></div></div></section>
      <main class="grid"><section class="card quiz"><div class="counter" id="count">词库加载中</div><div class="prompt" id="prompt">loading</div><div class="hint" id="hint">准备中</div><div id="choiceArea" class="choices"></div><button id="unknownBtn" class="unknownBtn">不认识</button><div id="answerArea" class="answerRow"><input id="answer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="输入英文拼写"><button class="primary" id="submitBtn">确认</button></div><div class="feedback" id="feedback">正在准备题目</div><div class="nav"><button id="focusBtn">回到输入框</button><button id="nextBtn2">下一题</button></div></section><aside><section class="card"><h2>统计</h2><div class="stats"><div class="stat"><span>正确</span><b id="right">0</b></div><div class="stat"><span>错误</span><b id="wrong">0</b></div><div class="stat"><span>未答</span><b id="left">0</b></div></div></section><section class="card" style="margin-top:16px"><h2>题目地图</h2><div class="dots" id="dots"></div></section></aside></main>
      <section class="card result" id="result"><h2>测试结果</h2><div class="score" id="score">0%</div><p id="summary"></p><div class="wrongBox" id="wrongBox"></div><div class="download"><button class="primary" id="downloadBtn">下载错词 TXT</button><button id="againBtn">再测一次</button></div></section>
    </div><div class="toast" id="toast">OK</div>`;

  const $ = id => document.getElementById(id);
  const letters = ['A', 'B', 'C', 'D'];
  let bank = [], quiz = [], rec = [], idx = 0, started = 0, ended = 0, timer = 0, toastTimer = 0, submitted = false;

  function parseData(text){ return text.trim().split(nl()).map(row => { row = row.split(String.fromCharCode(13)).join('').trim(); const p = row.indexOf('|'); if (p < 1) return null; return { word: row.slice(0,p).trim(), meaning: row.slice(p+1).trim() }; }).filter(Boolean); }
  function shuffle(a){ const arr = a.slice(); for(let i=arr.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  function format(ms){ const s = Math.max(0, Math.floor(ms/1000)); return String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0'); }
  function tick(){ if(started && !ended) $('timer').textContent = format(Date.now()-started); }
  function normalize(s){ let v = String(s).toLowerCase().trim().split('’').join("'"); [' ','　','-','_','.'].forEach(ch => v = v.split(ch).join('')); return v; }
  function pop(text){ const t=$('toast'); t.textContent=text; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),1300); }
  const exactPos = {
    a:'det', an:'det', the:'det', all:'det', another:'det', any:'det',
    anyone:'pron', anybody:'pron', anything:'pron',
    about:'prep', above:'prep', across:'prep', after:'prep', against:'prep', along:'prep', alongside:'prep', among:'prep', around:'prep', at:'prep', before:'prep', behind:'prep', below:'prep', beside:'prep', between:'prep', beyond:'prep', amid:'prep', 'according to':'prep',
    and:'conj', although:'conj', because:'conj', albeit:'conj',
    abroad:'adv', actually:'adv', again:'adv', ago:'adv', ahead:'adv', almost:'adv', already:'adv', also:'adv', altogether:'adv', always:'adv', anymore:'adv', apart:'adv', aside:'adv', away:'adv', backwards:'adv', barely:'adv', basically:'adv', besides:'adv',
    be:'verb', become:'verb', begin:'verb', believe:'verb', agree:'verb', arrive:'verb', ask:'verb', add:'verb', accept:'verb', achieve:'verb', act:'verb', advertise:'verb', affect:'verb', allow:'verb', appear:'verb', apply:'verb', argue:'verb', arrange:'verb', attack:'verb', attend:'verb', avoid:'verb',
    able:'adj', afraid:'adj', amazing:'adj', ancient:'adj', angry:'adj', asleep:'adj', attractive:'adj', available:'adj', awful:'adj', bad:'adj', beautiful:'adj', big:'adj', better:'adj', best:'adj'
  };
  const advMeanings = new Set(['再次','又','也','而且','总是','一直','以前','已经','几乎','差不多','实际上','事实上','大约','无论如何','向前','在前面','分开','向后','后来','基本上','此外','总共','完全','每年','自动地','几乎不','简短地','广泛地','大体上','相应地','因此','据称','可以说']);
  function splitSenses(meaning){ return String(meaning).split(/[；;，,、/]/).map(x=>x.trim()).filter(Boolean); }
  function firstSense(meaning){ return splitSenses(meaning)[0] || ''; }
  function isVerbMeaning(m){ return /^(使|做|把|将|为|向|与|对)?(放弃|废除|取消|加速|促进|接受|同意|实现|达到|完成|陪伴|伴随|容纳|提供|适应|改编|添加|增加|调整|管理|执行|承认|准许|采用|收养|建议|影响|负担|分析|宣布|道歉|申请|应用|欣赏|感激|评估|联系|联想|假设|尝试|烘烤|禁止|打扰|咬|阻挡|轰炸|预订|提高|广播|燃烧|烧伤|吸收|理解|激活|启动|分配|指派|保证|预料|期望|拍卖|打败|敲打|乞求|打赌|责备|吹|投标|修改|修正|遵守|粘附|积累|获得|习得|提倡|倡导|鼓掌|称赞|任命|安排|存档|出现|似乎|避免|授予|表现|忍受|相信|认为|变成|成为|问|请求|到达|开始|存在|帮助|吸引|附上|连接|允许|参加|出席|攻击|争论|主张|出现|显示|购买|支付|选择|决定|计划|希望|记得|忘记|包括|涉及|支持|发展|创造|生产|减少|增长|改变|改善|保护|讨论|解释|描述|比较|学习|教授|使用|需要|喜欢|观看|听|说|写|阅读|离开|停留|等待|赢|输)/.test(m); }
  function inferPos(item){
    const w = item.word.toLowerCase();
    const m = firstSense(item.meaning);
    if(exactPos[w]) return exactPos[w];
    if(/ly$/.test(w) && !/(family|silly|friendly|lonely|likely|lovely|ugly|early|daily)$/.test(w)) return 'adv';
    if(/地$/.test(m) || advMeanings.has(m)) return 'adv';
    if(/^(在|向|往|朝|从|沿着|关于|根据|按照|除|超出|穿过|经过|围绕|作为|像)/.test(m) && m.length <= 10) return 'prep';
    if(/的$/.test(m) || /^可.+的$/.test(m) || /^有.+的$/.test(m) || /^令人/.test(m) || /性的$/.test(m)) return 'adj';
    if(isVerbMeaning(m)) return 'verb';
    if(/(tion|sion|ment|ness|ity|ty|ance|ence|ship|hood|ism|ist|er|or|age|ery|ure|acy|dom|th)$/.test(w)) return 'noun';
    if(/(able|ible|al|ial|ic|ical|ive|ous|ful|less|ary|ory|ent|ant|ate)$/.test(w)) return 'adj';
    return 'noun';
  }
  function sensePos(s){
    if(/^(和|并且|而且|因为|虽然|尽管|如果|当|或者)$/.test(s)) return 'conj';
    if(/地$/.test(s) || advMeanings.has(s) || /^(之后|以前|以后|后来|再次|已经|仍然|通常|经常|偶尔|立刻|马上|到国外|在国外)$/.test(s)) return 'adv';
    if(/^(在|向|往|朝|从|沿着|关于|根据|按照|除|超出|穿过|经过|围绕|作为|像|与|跟|对)/.test(s) && s.length <= 10) return 'prep';
    if(/的$/.test(s) || /^可.+的$/.test(s) || /^有.+的$/.test(s) || /^令人/.test(s) || /性的$/.test(s)) return 'adj';
    if(isVerbMeaning(s)) return 'verb';
    return 'noun';
  }
  function inferProfile(item){
    const primary = item.pos || inferPos(item);
    if(['det','pron'].includes(primary)) return primary;
    const tags = Array.from(new Set(splitSenses(item.meaning).map(sensePos)));
    if(!tags.length) return primary;
    if(['prep','conj'].includes(primary) && !tags.includes(primary)) tags.push(primary);
    return tags.sort().join('+');
  }
  function posFamily(pos){ return ['det','pron','prep','conj'].includes(pos) ? 'function' : pos; }
  function cleanChinese(s){ return Array.from(String(s).replace(/[^ - ]/g,'')).filter(ch => !'的一是了和与及或在为对把将个种类中上下注释义'.includes(ch)); }
  function commonChars(a,b){ const aa=new Set(cleanChinese(a)), bb=new Set(cleanChinese(b)); let n=0; aa.forEach(ch=>{ if(bb.has(ch)) n++; }); return n; }
  function tooCloseMeaning(a,b){
    const af=firstSense(a), bf=firstSense(b);
    if(af && bf && af === bf) return true;
    const as=splitSenses(a), bs=splitSenses(b);
    if(as.some(x => x.length >= 2 && bs.includes(x))) return true;
    const ac=cleanChinese(a).join(''), bc=cleanChinese(b).join('');
    return ac.length >= 2 && bc.length >= 2 && (ac.includes(bc) || bc.includes(ac));
  }
  function distractorScore(target,cand){
    const tm=target.meaning, cm=cand.meaning, tf=firstSense(tm), cf=firstSense(cm);
    const lenScore = 10 - Math.min(10, Math.abs(tf.length - cf.length));
    const fullLenScore = 8 - Math.min(8, Math.abs(tm.length - cm.length));
    const structureScore = splitSenses(tm).length === splitSenses(cm).length ? 5 : 0;
    const overlapScore = Math.min(8, commonChars(tm,cm) * 2);
    const wordLenScore = 5 - Math.min(5, Math.abs(target.word.length - cand.word.length));
    return lenScore + fullLenScore + structureScore + overlapScore + wordLenScore + Math.random();
  }
  function pick(){ let list = $('order').value === 'random' ? shuffle(bank) : bank.slice(); const n = $('size').value; if(n !== 'all') list = list.slice(0, Number(n)); return list; }
  function makeOptions(item){
    const seen = new Set([item.meaning]), options = [item.meaning];
    const targetPos = item.pos || inferPos(item);
    const targetFamily = posFamily(targetPos);
    const targetProfile = item.profile || inferProfile(item);
    const addFrom = pool => {
      const ranked = pool.filter(x => x.word !== item.word && !seen.has(x.meaning) && !tooCloseMeaning(item.meaning, x.meaning))
        .map(x => ({ x, score: distractorScore(item, x) }))
        .sort((a,b) => b.score - a.score);
      for (const row of ranked) {
        seen.add(row.x.meaning);
        options.push(row.x.meaning);
        if (options.length === 4) return true;
      }
      return false;
    };
    addFrom(bank.filter(x => (x.profile || inferProfile(x)) === targetProfile));
    if(options.length < 4) addFrom(bank.filter(x => (x.pos || inferPos(x)) === targetPos));
    if(options.length < 4) addFrom(bank.filter(x => posFamily(x.pos || inferPos(x)) === targetFamily));
    if(options.length < 4) {
      for (const x of shuffle(bank)) {
        if (x.word === item.word || seen.has(x.meaning)) continue;
        seen.add(x.meaning);
        options.push(x.meaning);
        if (options.length === 4) break;
      }
    }
    return shuffle(options);
  }
  function currentRecord(){ return rec[idx]; }
  function currentQuestion(){ return quiz[idx]; }
  function focusAnswer(){ if(mode === 'dictation'){ $('answer').focus(); $('answer').select(); } }
  function saveTyping(){ if(mode === 'dictation' && rec[idx]) rec[idx].typed = $('answer').value.trim(); }
  function stats(){ return rec.reduce((a,r)=>{ if(!r.done) a.left++; else if(r.correct) a.right++; else a.wrong++; return a; }, {right:0, wrong:0, left:0}); }
  function renderStats(){ const s=stats(); $('right').textContent=s.right; $('wrong').textContent=s.wrong; $('left').textContent=s.left; }
  function updateProgress(){ const done=rec.filter(r=>r.done).length, total=quiz.length||0; $('progress').textContent=done+' / '+total; $('bar').style.width=total ? Math.round(done/total*100)+'%' : '0%'; $('state').textContent=quiz.length ? '正确 '+stats().right : '未开始'; }
  function renderDots(){ const box=$('dots'); box.innerHTML=''; rec.forEach((r,i)=>{ const b=document.createElement('button'); b.className='dot '+(i===idx?'on ':'')+(r.done?(r.correct?'ok':(r.skip?'skip':'bad')):''); b.title=(i+1)+'. '+r.word; b.addEventListener('click',()=>{ saveTyping(); idx=i; showCard(); focusAnswer(); }); box.appendChild(b); }); }
  function renderChoices(q, r){ $('choiceArea').innerHTML = q.options.map((opt,i)=>{ let cls='choice'; if(r.done){ if(opt===q.meaning) cls+=' good'; else if(opt===r.selectedMeaning) cls+=' bad'; } return `<button class="${cls}" data-choice="${i}"><span>${letters[i]}</span><b>${opt}</b></button>`; }).join(''); Array.from($('choiceArea').querySelectorAll('button')).forEach(btn => btn.addEventListener('click', () => chooseMeaning(Number(btn.dataset.choice)))); }
  function showCard(){ if(!quiz.length) return; const q=currentQuestion(), r=currentRecord(); $('count').textContent='第 '+(idx+1)+' / '+quiz.length+' 题'; if(mode === 'dictation'){ $('choiceArea').style.display='none'; $('unknownBtn').style.display='none'; $('answerArea').style.display='grid'; $('focusBtn').style.display=''; $('prompt').textContent=q.meaning; $('hint').textContent='首字母：'+q.word.slice(0,1).toLowerCase(); $('answer').value=r.typed||''; $('feedback').className='feedback'+(r.done?(r.correct?' good':' bad'):''); $('feedback').textContent=r.done?(r.correct?'正确':'正确答案：'+q.word):'请输入完整英文单词'; } else { $('choiceArea').style.display='grid'; $('unknownBtn').style.display=''; $('unknownBtn').disabled=!!r.done; $('answerArea').style.display='none'; $('focusBtn').style.display='none'; $('prompt').textContent=q.word; $('hint').textContent='请选择正确的中文意思'; $('feedback').className='feedback'+(r.done?(r.correct?' good':' bad'):''); $('feedback').textContent=r.done?(r.correct?'正确':(r.selectedMeaning==='不认识'?'已记录：不认识。正确答案：'+q.meaning:'正确答案：'+q.meaning)):'选择一个中文释义；如果完全不认识，可以点“不认识”。'; renderChoices(q,r); } updateProgress(); renderStats(); renderDots(); }
  function startQuiz(){ if(!bank.length) return pop('词库还没加载好'); quiz=pick().map(x => mode === 'choice' ? Object.assign({}, x, { options: makeOptions(x) }) : x); rec=quiz.map(q=>({word:q.word,meaning:q.meaning,typed:'',selectedMeaning:'',done:false,correct:false,skip:false})); idx=0; started=Date.now(); ended=0; submitted=false; clearInterval(timer); timer=setInterval(tick,250); $('result').classList.remove('show'); showCard(); tick(); pop('开始，共 '+quiz.length+' 题'); setTimeout(focusAnswer,80); }
  function submitAnswer(){ if(!quiz.length) return startQuiz(); const typed=$('answer').value.trim(); if(!typed) return pop('先输入答案'); const r=currentRecord(), q=currentQuestion(); r.typed=typed; r.done=true; r.skip=false; r.correct=normalize(typed)===normalize(q.word); showCard(); pop(r.correct?'正确':'错误'); autoNext(); }
  function chooseMeaning(i){ if(!quiz.length) return startQuiz(); const q=currentQuestion(), r=currentRecord(); if(r.done) return; r.selectedMeaning=q.options[i]; r.done=true; r.skip=false; r.correct=r.selectedMeaning===q.meaning; showCard(); pop(r.correct?'正确':'错误'); autoNext(); }
  function markUnknown(){ if(!quiz.length) return startQuiz(); const r=currentRecord(); if(r.done) return; r.selectedMeaning='不认识'; r.done=true; r.skip=false; r.correct=false; showCard(); pop('已记录：不认识'); autoNext(); }
  function autoNext(){ if(idx<quiz.length-1) setTimeout(()=>{ idx++; showCard(); focusAnswer(); }, mode === 'choice' ? 520 : 650); else if(rec.every(x=>x.done)) setTimeout(finishQuiz,650); }
  function move(step){ if(!quiz.length) return startQuiz(); saveTyping(); idx=Math.max(0,Math.min(quiz.length-1,idx+step)); showCard(); focusAnswer(); }
  function skipWord(){ if(!quiz.length) return startQuiz(); const r=currentRecord(); r.typed=''; r.selectedMeaning=''; r.done=true; r.skip=true; r.correct=false; showCard(); if(idx<quiz.length-1) setTimeout(()=>{ idx++; showCard(); focusAnswer(); },320); }
  function wrongItems(){ return rec.filter(r=>!r.correct); }
  function finishQuiz(){ if(!quiz.length) return startQuiz(); saveTyping(); rec.forEach(r=>{ if(!r.done){ r.done=true; r.skip=true; r.correct=false; } }); submitted=true; if(!ended){ ended=Date.now(); clearInterval(timer); $('timer').textContent=format(ended-started); } showCard(); const s=stats(), score=Math.round(s.right/quiz.length*100), wrong=wrongItems(); $('score').textContent=score+'%'; $('summary').textContent='正确 '+s.right+' 题，错误/未答 '+wrong.length+' 题，用时 '+format(ended-started)+'。点击下方错词区可下载 TXT。'; const box=$('wrongBox'); box.innerHTML=''; if(wrong.length){ wrong.slice(0,180).forEach(r=>{ const chip=document.createElement('span'); chip.className='chip'; chip.textContent=r.word+' = '+r.meaning; box.appendChild(chip); }); if(wrong.length>180){ const chip=document.createElement('span'); chip.className='chip'; chip.textContent='+ '+(wrong.length-180)+' more'; box.appendChild(chip); } } else { const chip=document.createElement('span'); chip.className='chip'; chip.textContent='全部正确，没有错词'; box.appendChild(chip); } $('result').classList.add('show'); $('result').scrollIntoView({behavior:'smooth',block:'start'}); pop('结果已生成'); }
  function wrongText(){ const name=$('student').value.trim()||'No name', wrong=wrongItems(), lines=[cfg.level+' '+modeName+'错词','姓名：'+name,'用时：'+format((ended||Date.now())-started),'题量：'+quiz.length,'错词数：'+wrong.length,'']; if(wrong.length){ wrong.forEach((r,i)=>lines.push((i+1)+'. '+r.word+tab()+'中文：'+r.meaning+tab()+'学生答案：'+(mode === 'dictation' ? (r.typed||'未作答') : (r.selectedMeaning||'未作答')))); } else lines.push('全部正确'); lines.push('',new Date().toLocaleString('zh-CN')); return lines.join(nl()); }
  function downloadWrong(){ if(!quiz.length) return pop('还没有开始'); if(!submitted) finishQuiz(); const blob=new Blob([wrongText()],{type:'text/plain;charset=utf-8'}), a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=cfg.level.replaceAll(' ','_')+'_'+(mode === 'dictation' ? 'han_to_en' : 'en_to_han')+'_wrong_words.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href); pop('错词 TXT 已下载'); }
  async function loadData(){ try{ const urls = Array.isArray(cfg.dataUrls) ? cfg.dataUrls : [cfg.dataUrl]; const texts = await Promise.all(urls.map(async url => { const r=await fetch(url,{cache:'no-store'}); if(!r.ok) throw new Error(r.status); return r.text(); })); bank=parseData(texts.join(nl())).map(item => Object.assign(item, { pos: inferPos(item) })); bank.forEach(item => item.profile = inferProfile(item)); $('total').textContent=bank.length+'词'; $('state').textContent='未开始'; $('start').disabled=false; $('size').querySelector('option[value="all"]').textContent='全部 '+bank.length+'题'; $('count').textContent='点击开始'; $('prompt').textContent='ready'; $('hint').textContent='选择题量后开始测试'; if(mode === 'choice'){ $('answerArea').style.display='none'; $('unknownBtn').style.display='none'; } else { $('choiceArea').style.display='none'; $('unknownBtn').style.display='none'; } pop('词库已加载'); } catch(e){ $('state').textContent='词库加载失败'; $('prompt').textContent='reload'; $('hint').textContent='请刷新页面重试'; } }
  $('start').addEventListener('click',startQuiz); $('againBtn').addEventListener('click',startQuiz); $('submitBtn').addEventListener('click',submitAnswer); $('answer').addEventListener('keydown',e=>{if(e.key==='Enter')submitAnswer();}); $('prevBtn').addEventListener('click',()=>move(-1)); $('nextBtn').addEventListener('click',()=>move(1)); $('nextBtn2').addEventListener('click',()=>move(1)); $('skipBtn').addEventListener('click',skipWord); $('unknownBtn').addEventListener('click',markUnknown); $('finishBtn').addEventListener('click',finishQuiz); $('focusBtn').addEventListener('click',focusAnswer); $('downloadBtn').addEventListener('click',downloadWrong); $('wrongBox').addEventListener('click',downloadWrong); loadData();
})();
