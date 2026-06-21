(() => {
  const wordPos = Object.create(null);
  const groups = {
    noun: 'accused|administrator|advice|approval|arrival|auto|backing|being|cemetery|comparison|constituency|creator|departure|disposal|entry|folk|fun|growth|handling|learning|listener|memorial|offering|pitch|planning|plea|problem|processing|processor|producer|professor|reading|recipient|reminder|scope|speaker|subject|supporter|table|texture|turnout|venue|vice|writing',
    'noun+verb': 'address|answer|appeal|archive|associate|camp|caution|contact|contrast|delegate|delight|discharge|drive|fly|gaze|guarantee|impact|influence|interest|land|limit|object|plan|pledge|project|question|rally|reference|reply|reserve|resolve|resort|resume|reward|sanction|scream|shift|shock|silence|slide|slip|split|strand|supply|surprise|suspect|transfer|treat|warrant|weed|will|worry|worship|wound',
    'noun+verb+adj': 'present',
    'noun+adj': 'general',
    'noun+adv': 'today|tomorrow|tonight|yesterday',
    'noun+conj': 'while',
    'noun+pron': 'mine',
    verb: 'acknowledge|admire|advertise|allege|annoy|arise|arrange|aspire|assemble|assert|behave|belong|betray|bleed|bless|borrow|breathe|bring|bury|calculate|carve|cater|celebrate|characterize|circulate|coincide|collaborate|commence|commit|communicate|compel|compensate|compete|compile|complain|compute|conceal|conceive|conclude|condemn|confer|confine|confirm|confront|confuse|congratulate|conquer|consider|consist|consolidate|constitute|consume|contain|contemplate|contend|continue|contribute|cooperate|correspond|create|criticize|cultivate|decorate|deem|defend|define|defy|deliver|demonstrate|denounce|deny|depend|depict|deploy|deprive|descend|deserve|designate|destroy|detain|detect|deteriorate|determine|devastate|develop|diagnose|differentiate|disagree|disappear|disclose|discover|dismiss|displace|dispose|disrupt|distort|distribute|divert|divide|dominate|donate|download|drown|earn|eat|edit|educate|elevate|embark|embed|embody|emphasize|empower|enable|enact|encompass|encourage|endorse|endure|enforce|engage|enhance|enjoy|enquire|enrich|enrol|ensue|ensure|entitle|escalate|establish|evacuate|evoke|exaggerate|examine|execute|exert|expect|expire|explode|explore|facilitate|fail|fasten|flee|follow|forgive|formulate|foster|frighten|give|govern|grow|handle|happen|heighten|hesitate|identify|ignore|illustrate|imagine|imply|impose|imprison|incur|indicate|induce|indulge|infect|inflict|inform|inhibit|inject|injure|insist|inspect|inspire|install|instruct|intend|intensify|interfere|interpret|intervene|introduce|invent|invest|investigate|invoke|involve|justify|kidnap|lend|linger|locate|lose|maintain|make|manage|manipulate|marry|maximize|merge|minimize|mobilize|nominate|notify|obey|oblige|obsess|occur|offend|operate|oppose|organize|originate|oversee|overwhelm|owe|perform|persist|plead|portray|possess|postpone|pour|practise|pray|preach|predict|prefer|prepare|prescribe|preside|presume|prevail|prevent|proclaim|promote|pronounce|propose|prosecute|prove|provoke|publish|pursue|qualify|quit|react|realize|reassure|receive|recommend|recover|recycle|refer|reflect|regain|relax|release|rely|remain|remember|renew|replace|represent|reproduce|require|resemble|reside|resist|respond|retain|retire|retrieve|reveal|revive|rid|rotate|rub|satisfy|seize|send|settle|shatter|simulate|sing|sit|solve|speak|spend|spread|stabilize|stand|stare|strive|stun|submit|succeed|sue|suffer|suggest|summarize|supervise|suppress|survive|sustain|swear|teach|tell|tempt|tend|terminate|testify|thank|threaten|thrive|tighten|tolerate|transform|translate|undermine|unify|unveil|uphold|vanish|vary|verify|weigh|widen',
    'verb+adj': 'articulate|calm|close|correct|corrupt|direct|dry|erect|shut|upset',
    'verb+prep': 'like',
    'verb+exclamation': 'please',
    adj: 'broadband|certain|elderly|engaged|inclined|located|ready|situated|used|virtual|whatsoever',
    'adj+adv': 'best|better|downstairs|enough|fast|further|next|online|only|straight|upstairs|well',
    'adj+adv+number': 'first',
    'adj+prep': 'opposite|unlike',
    adv: "abroad|actually|again|ago|ahead|almost|already|also|always|anywhere|apart|apparently|away|backwards|badly|basically|certainly|commonly|currently|definitely|downwards|elsewhere|especially|eventually|ever|everywhere|exactly|exclusively|extremely|finally|firstly|forever|forth|generally|here|highly|immediately|increasingly|incredibly|indeed|initially|instead|just|later|maybe|meanwhile|merely|mostly|namely|never|nevertheless|nonetheless|normally|not|now|o'clock|occasionally|often|originally|out|perhaps|personally|presently|presumably|probably|quite|rarely|rather|really|recently|reportedly|secondly|seemingly|seldom|simply|slightly|solely|sometimes|somewhat|soon|substantially|suddenly|supposedly|surely|thankfully|then|there|thereafter|thereby|too|twice|typically|ultimately|up|upwards|usually|very|yet",
    'adv+prep': 'about|above|across|after|along|around|before|behind|below|beneath|between|beyond|by|down|in|inside|near|off|on|outside|over|past|through|throughout|under|within',
    'adv+conj': 'however|once|so|though|wherever',
    'adv+det+pron': 'each|either|less|more|most|much|neither',
    'adv+det+exclamation': 'no',
    prep: 'according to|against|amid|among|at|despite|during|for|from|into|next to|of|onto|to|towards|with|without',
    'prep+conj': 'as|except|until',
    conj: 'albeit|although|and|because|but|if|or|whereas|whilst',
    det: 'a|an|any|every|the',
    'det+pron': 'all|another|both|few|many|several|some|whatever',
    pron: 'anybody|anyone|anything',
    exclamation: 'wow|yeah|yes'
  };

  Object.keys(groups).forEach(pos => {
    groups[pos].split('|').forEach(word => {
      if (word) wordPos[word] = pos;
    });
  });

  Object.assign(wordPos, {
    catch: 'verb',
    challenge: 'noun+verb',
    check: 'noun+verb',
    claim: 'noun+verb',
    contest: 'noun+verb',
    convert: 'verb',
    coordinate: 'noun+verb',
    correlate: 'verb',
    cost: 'noun+verb',
    decline: 'noun+verb',
    demand: 'noun+verb',
    desire: 'noun+verb',
    dip: 'noun+verb',
    face: 'verb+noun',
    grab: 'verb',
    hint: 'noun+verb',
    keep: 'verb',
    match: 'noun+verb',
    mount: 'verb',
    neglect: 'noun+verb',
    overlook: 'verb',
    practice: 'noun+verb',
    promise: 'noun+verb',
    refuse: 'verb',
    reject: 'verb',
    seek: 'verb',
    switch: 'verb+noun',
    worth: 'adj+noun'
  });

  const sensePos = {
    'camp|营地；露营': 'noun+verb',
    'forward|向前': 'adv',
    'forward|向前；前进': 'adv+verb',
    'land|陆地；降落': 'noun+verb',
    'live|居住；生活': 'verb',
    'live|现场直播的；居住': 'adj+verb',
    'object|物体；目标': 'noun',
    'project|项目；投射': 'noun+verb',
    'project|项目；课题': 'noun',
    'resort|度假胜地；诉诸': 'noun+verb',
    'subject|主题；科目': 'noun',
    'subject|科目；主题': 'noun'
  };

  function normalizePos(pos) {
    const labels = { noun: 1, verb: 1, adj: 1, adv: 1, prep: 1, conj: 1, det: 1, pron: 1, number: 1, exclamation: 1 };
    const seen = new Set();
    return String(pos || '').split(/[+\/,|]/).map(x => x.trim()).filter(x => labels[x] && !seen.has(x) && seen.add(x)).join('+');
  }

  function patchedText(text) {
    return String(text).split(/\n/).map(row => {
      const raw = row.replace(/\r/g, '');
      const trimmed = raw.trim();
      if (!trimmed || trimmed.startsWith('#')) return row;
      const parts = trimmed.split('|').map(x => x.trim());
      if (parts.length < 2 || !parts[0] || !parts[1] || parts.slice(2).join('').trim()) return row;
      const key = parts[0].toLowerCase() + '|' + parts[1];
      const pos = normalizePos(sensePos[key] || wordPos[parts[0].toLowerCase()] || '');
      return pos ? raw + '|' + pos : row;
    }).join('\n');
  }

  const originalFetch = window.fetch && window.fetch.bind(window);
  if (!originalFetch) return;
  window.fetch = async (input, init) => {
    const response = await originalFetch(input, init);
    const url = input && input.url ? input.url : String(input || '');
    if (!/\.txt(?:[?#].*)?$/.test(url) || !response.ok) return response;
    const text = await response.clone().text();
    return new Response(patchedText(text), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
  };
})();
