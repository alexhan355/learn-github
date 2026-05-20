(() => {
  const partNames = ['1','2','3','4a','4b','5a','5b','6'];
  const current = document.currentScript;
  const base = new URL('.', current ? current.src : location.href);
  const root = document.getElementById('dictation-root') || document.body;
  const showError = (msg) => {
    root.innerHTML = '<div style="max-width:760px;margin:40px auto;padding:24px;border:1px solid #d9e0e8;border-radius:10px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;color:#17202c;background:#fff"><h2 style="margin:0 0 10px">词汇测试加载失败</h2><p style="margin:0;color:#657386">请刷新页面重试，或换用最新版 Chrome、Edge、Safari 打开。</p><p style="margin:12px 0 0;color:#9b2c25;font-size:13px">' + msg + '</p></div>';
  };
  Promise.all(partNames.map((name) => fetch(new URL('context-cloze-app.gz.b64.' + name + '.txt', base), { cache: 'no-store' }).then((res) => {
    if (!res.ok) throw new Error('chunk ' + name + ' ' + res.status);
    return res.text();
  }))).then(async (parts) => {
    if (!('DecompressionStream' in window)) throw new Error('browser does not support gzip stream');
    const bin = atob(parts.join('').replace(/\s+/g, ''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const source = await new Response(stream).text();
    (0, eval)(source);
  }).catch((err) => {
    console.error(err);
    showError(err && err.message ? err.message : String(err));
  });
})();
