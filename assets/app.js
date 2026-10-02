/* Zozo — app shell: router, screens, local state. Data comes from window.ZOZO (data/*.js). */
(function () {
  'use strict';
  const D = window.ZOZO || {};
  const C = window.ZozoCharts;
  const main = document.getElementById('main');

  /* ================= helpers ================= */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : null);
  const link = (u, text) => { const s = safeUrl(u); return s ? `<a href="${esc(s)}" target="_blank" rel="noopener">${esc(text)}</a>` : esc(text); };
  const isNum = (v) => typeof v === 'number' && isFinite(v);
  const num = (v, d = 2) => (isNum(v) ? `<span class="n">${v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}</span>` : '<span class="faint">—</span>');
  const usd = (v, d = 2) => (isNum(v) ? `<span class="n">$${v.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}</span>` : '<span class="faint">—</span>');
  const pct = (v, d = 1) => {
    if (!isNum(v)) return '<span class="faint">—</span>';
    const cls = v > 0 ? 'up' : v < 0 ? 'down' : 'flat';
    const arr = v > 0 ? '▲' : v < 0 ? '▼' : '•';
    return `<span class="n ${cls}">${arr} ${Math.abs(v).toFixed(d)}%</span>`;
  };
  const dirOf = (s) => (s === 'up' ? 'up' : s === 'down' ? 'down' : 'flat');
  const arrowOf = (d) => (d === 'up' ? '▲ ' : d === 'down' ? '▼ ' : '');
  const TZ = 'Asia/Jerusalem';
  const heDate = (iso, opts) => { try { return new Intl.DateTimeFormat('he-IL', Object.assign({ timeZone: TZ }, opts)).format(new Date(iso)); } catch (e) { return iso; } };
  const shortDate = (ymd) => { if (!ymd) return '—'; const [y, m, d] = String(ymd).split('-'); return d && m ? `${+d}.${+m}` : ymd; };
  const rtf = new Intl.RelativeTimeFormat('he', { numeric: 'auto' });
  const rel = (iso) => {
    const t = Date.parse(iso); if (!t) return '';
    const s = Math.min(0, (t - Date.now()) / 1000), a = Math.abs(s);
    if (a < 90) return 'ממש עכשיו';
    if (a < 3600) return rtf.format(Math.round(s / 60), 'minute');
    if (a < 86400) return rtf.format(Math.round(s / 3600), 'hour');
    return rtf.format(Math.round(s / 86400), 'day');
  };
  const stamp = (iso) => {
    if (!iso) return '<span class="stamp">טרם עודכן</span>';
    const stale = Date.now() - Date.parse(iso) > 72 * 3600 * 1000;
    return `<span class="stamp${stale ? ' stale' : ''}" title="${esc(heDate(iso, { dateStyle: 'full', timeStyle: 'short' }))}"><span class="dot"${stale ? ' style="background:var(--amber)"' : ''}></span>עודכן ${esc(rel(iso))}</span>`;
  };
  const store = {
    get(k, def) { try { const v = localStorage.getItem('zozo.' + k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem('zozo.' + k, JSON.stringify(v)); } catch (e) {} },
  };
  // technical snapshot of US stocks (data/universe.js): rows are arrays, UNI.ix maps field name → column
  const buildUni = () => {
    const u = D.universe; if (!u || !u.rows) return null;
    const ix = {}; u.fields.forEach((f, i) => { ix[f] = i; });
    return { u, ix, byT: new Map(u.rows.map((r) => [r[0], r])) };
  };
  let UNI = buildUni();
  // market board: live quotes from data/movers.js (refreshed every 15 min in trading hours), topped up with the
  // morning brief's items that have no live quote (policy rates, 2-year yield…)
  const boardItems = () => {
    const live = D.movers && D.movers.indices && D.movers.indices.length ? D.movers.indices : null;
    const brief = (D.brief && D.brief.snapshot) || [];
    if (!live) return brief;
    // from the written brief keep only the policy rates (they change every few weeks, not intraday) —
    // anything market-priced there (futures, other indices) would be stale next to the live board
    return live.concat(brief.filter((s) => /^ריבית/.test(s.k)));
  };
  // market data stamp: "live" while US trading is open (refreshed every 15 min on the server), otherwise the close it shows
  const marketStamp = (m) => {
    if (!m) return stamp(null);
    if (m.live) return `<span class="stamp live" title="${esc(heDate(m.updatedAt, { dateStyle: 'full', timeStyle: 'short' }))}"><span class="dot live" style="background:var(--up)"></span>מסחר חי · עודכן ${esc(heDate(m.marketTime || m.updatedAt, { hour: '2-digit', minute: '2-digit', hour12: false }))}</span>`;
    return `<span class="stamp"><span class="dot"></span>מחירי סגירה ${esc(shortDate(m.asOf))} · עודכן ${esc(rel(m.updatedAt))}</span>`;
  };
  const tvUrl = (t) => 'https://www.tradingview.com/chart/?symbol=' + encodeURIComponent(t);
  const empty = (title, body, icon = I.clock) => `<div class="empty">${icon}<h3>${esc(title)}</h3><p>${body}</p></div>`;
  const head = (kicker, title, sub, updated, stampHtml) => `
    <div class="page-head">
      <div><div class="kicker">${esc(kicker)}</div><h1>${esc(title)}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}</div>
      ${stampHtml || (updated !== undefined ? stamp(updated) : '')}
    </div>`;
  const sec = (n, title) => `<h2 class="sec"><span class="num">${n}</span>${esc(title)}</h2>`;

  /* ================= icons ================= */
  const ic = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    brief: ic('<path d="M4 5h13v14H6a2 2 0 0 1-2-2V5Z"/><path d="M17 9h3v8a2 2 0 0 1-2 2"/><path d="M8 9h5M8 13h5M8 16h3"/>'),
    signals: ic('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
    extreme: ic('<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8Z"/>'),
    sectors: ic('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.5"/>'),
    performance: ic('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    watchlist: ic('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>'),
    calendar: ic('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    portfolio: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>'),
    learn: ic('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>'),
    alerts: ic('<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4l2-2Z"/><path d="M10 21h4"/>'),
    movers: ic('<path d="M3 12h4l3-8 4 16 3-8h4"/>'),
    screener: ic('<path d="M4 5h16M7 12h10M10 19h4"/>'),
    trash: ic('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    more: ic('<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>'),
    search: ic('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    star: ic('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>'),
    plus: ic('<path d="M12 5v14M5 12h14"/>'),
    ext: ic('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>'),
    chev: ic('<path d="M6 9l6 6 6-6"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    users: ic('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>'),
  };

  /* ================= routes & nav ================= */
  const ROUTES = [
    { id: 'brief', label: 'תדריך', icon: I.brief, mobile: true, render: renderBrief },
    { id: 'signals', label: 'איתותי קנייה', short: 'איתותים', icon: I.signals, mobile: true, render: renderSignals },
    { id: 'movers', label: 'תנועות חזקות', short: 'תנועות', icon: I.movers, render: renderMovers },
    { id: 'screener', label: 'סורק מניות', short: 'סורק', icon: I.screener, mobile: true, render: renderScreener },
    { id: 'sectors', label: 'סקטורים', icon: I.sectors, mobile: true, render: renderSectors },
    { id: 'extreme', label: 'מצב חריג', short: 'חריג', icon: I.extreme, render: renderExtreme },
    { id: 'performance', label: 'ביצועים', icon: I.performance, render: renderPerformance },
    { id: 'watchlist', label: 'רשימת מעקב', icon: I.watchlist, render: renderWatchlist },
    { id: 'calendar', label: 'לוח אירועים', icon: I.calendar, render: renderCalendar },
    { id: 'portfolio', label: 'תיק וירטואלי', icon: I.portfolio, render: renderPortfolio },
    { id: 'learn', label: 'למד', icon: I.learn, render: renderLearn },
    { id: 'alerts', label: 'התראות', icon: I.alerts, render: renderAlerts },
  ];
  const badge = (id) => {
    if (id === 'signals' && D.signals && D.signals.items && D.signals.items.length) return '<span class="dot"></span>';
    if (id === 'extreme' && D.extreme && D.extreme.active) return '<span class="dot live"></span>';
    return '';
  };
  function buildNav() {
    document.getElementById('tabs').innerHTML = ROUTES.map((r) => `<a href="#${r.id}" data-r="${r.id}">${esc(r.label)}${badge(r.id)}</a>`).join('');
    document.getElementById('bottomNav').innerHTML =
      ROUTES.filter((r) => r.mobile).map((r) => `<a href="#${r.id}" data-r="${r.id}">${r.icon}${esc(r.short || r.label)}${badge(r.id)}</a>`).join('') +
      `<button type="button" id="moreBtn" data-r="more">${I.more}עוד</button>`;
    document.getElementById('moreLinks').innerHTML = ROUTES.filter((r) => !r.mobile).map((r) => `<a href="#${r.id}">${r.icon}${esc(r.label)}</a>`).join('');
    const sheet = document.getElementById('moreSheet');
    document.getElementById('moreBtn').addEventListener('click', () => { sheet.hidden = false; });
    sheet.addEventListener('click', (e) => { if (e.target.closest('[data-close]') || e.target.closest('a')) sheet.hidden = true; });
  }
  function markNav(id) {
    const secondary = !ROUTES.find((r) => r.id === id && r.mobile);
    document.querySelectorAll('[data-r]').forEach((a) => {
      const on = a.dataset.r === id || (a.dataset.r === 'more' && secondary);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  function route(keepScroll) {
    const y = window.scrollY;
    const parts = (location.hash.replace(/^#\/?/, '') || 'brief').split(/[\/.]/);
    const r = ROUTES.find((x) => x.id === parts[0]) || ROUTES[0];
    C.destroyAll();
    hideTip();
    main.classList.remove('enter'); void main.offsetWidth; main.classList.add('enter');
    main.innerHTML = r.render(parts.slice(1).map(decodeURIComponent)) || '';
    markNav(r.id);
    document.title = r.id === 'brief' ? 'Zozo' : `${r.label} · Zozo`;
    (r.after || (() => {}))();
    if (afterRender) { const f = afterRender; afterRender = null; f(); }
    glossify(main.querySelectorAll('[data-g]'));
    window.scrollTo(0, keepScroll === true ? y : 0);
  }
  let afterRender = null;
  const after = (fn) => { afterRender = fn; };

  /* ================= tape & header ================= */
  function buildTape() {
    const snap = boardItems();
    const el = document.getElementById('tape');
    if (!snap || !snap.length) { el.innerHTML = ''; return; }
    const items = snap.map((s) => `<span><b>${esc(s.k)}</b><span class="tv">${esc(s.v)}</span> <span class="${s.dir === 'up' ? 'u' : s.dir === 'down' ? 'd' : ''}">${arrowOf(s.dir)}${esc(s.c || '')}</span></span>`).join('');
    el.innerHTML = `<div class="tape-track">${items}${items}</div>`;
  }
  document.getElementById('today').textContent = heDate(Date.now(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('themeBtn').addEventListener('click', () => {
    const next = C.isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('zozo.theme', next); } catch (e) {}
    route();
  });

  /* ================= glossary ================= */
  const G = [];
  (D.glossary || []).forEach((g) => [g.term].concat(g.aliases || []).forEach((w) => G.push({ w, g })));
  G.sort((a, b) => b.w.length - a.w.length);
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const gRe = G.length ? new RegExp(`(?<![\\p{L}\\p{N}])(?:[הבלומשכ]{0,2})(${G.map((x) => reEsc(x.w)).join('|')})(?![\\p{L}\\p{N}])`, 'giu') : null;
  function glossify(nodes) {
    if (!gRe) return;
    const used = new Set();
    nodes.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => (n.parentElement.closest('a,abbr,.n,.tkr,button,script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
      });
      const texts = []; while (walker.nextNode()) texts.push(walker.currentNode);
      texts.forEach((t) => {
        gRe.lastIndex = 0;
        let m, hit = null;
        while ((m = gRe.exec(t.data))) {
          const e = G.find((x) => x.w.toLowerCase() === m[1].toLowerCase());
          if (e && !used.has(e.g.term)) { hit = { m, e }; break; }
        }
        if (!hit) return;
        used.add(hit.e.g.term);
        const start = hit.m.index + hit.m[0].length - hit.m[1].length;
        const mid = t.splitText(start); mid.splitText(hit.m[1].length);
        const ab = document.createElement('abbr');
        ab.className = 'g'; ab.tabIndex = 0; ab.dataset.term = hit.e.g.term; ab.dataset.def = hit.e.g.def;
        mid.parentNode.replaceChild(ab, mid); ab.appendChild(mid);
      });
    });
  }
  const tip = document.getElementById('tip');
  function showTip(el) {
    tip.innerHTML = `<b>${esc(el.dataset.term)}</b>${esc(el.dataset.def)}`;
    tip.hidden = false;
    const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let x = r.left + r.width / 2 - tw / 2; x = Math.max(8, Math.min(innerWidth - tw - 8, x));
    let y = r.top - th - 8; if (y < 8) y = r.bottom + 8;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hideTip() { tip.hidden = true; }
  document.addEventListener('mouseover', (e) => { const a = e.target.closest('abbr.g'); if (a) showTip(a); });
  document.addEventListener('mouseout', (e) => { if (e.target.closest('abbr.g')) hideTip(); });
  document.addEventListener('focusin', (e) => { const a = e.target.closest('abbr.g'); if (a) showTip(a); else hideTip(); });
  document.addEventListener('click', (e) => { const a = e.target.closest('abbr.g'); if (a) showTip(a); else hideTip(); });
  addEventListener('scroll', hideTip, { passive: true });

  /* ================= shared: watchlist + portfolio ================= */
  const WL = {
    all: () => store.get('watchlist', []),
    has: (t) => WL.all().includes(t),
    toggle(t) { const l = WL.all(); const i = l.indexOf(t); if (i >= 0) l.splice(i, 1); else l.unshift(t); store.set('watchlist', l); return i < 0; },
  };
  const PF = {
    all: () => store.get('portfolio', []),
    add(p) { const l = PF.all(); l.unshift(p); store.set('portfolio', l); },
    remove(id) { store.set('portfolio', PF.all().filter((p) => p.id !== id)); },
  };
  const latestPrice = (t) => {
    const it = D.signals && (D.signals.items || []).find((x) => x.ticker === t);
    if (it && isNum(it.price)) return it.price;
    const h = D.history && (D.history.signals || []).find((x) => x.ticker === t && isNum(x.price));
    return h ? h.price : null;
  };
  const starBtn = (t) => `<button class="btn" type="button" data-star="${esc(t)}" aria-pressed="${WL.has(t)}">${I.star}<span>${WL.has(t) ? 'במעקב' : 'למעקב'}</span></button>`;
  const buyBtn = (t, entry, date, name) => `<button class="btn" type="button" data-buy="${esc(t)}" data-entry="${esc(entry)}" data-date="${esc(date)}" data-name="${esc(name || '')}">${I.plus}לתיק הווירטואלי</button>`;

  main.addEventListener('click', (e) => {
    const s = e.target.closest('[data-star]');
    if (s) {
      const on = WL.toggle(s.dataset.star);
      s.setAttribute('aria-pressed', on); s.querySelector('span').textContent = on ? 'במעקב' : 'למעקב';
      return;
    }
    const b = e.target.closest('[data-buy]');
    if (b) {
      const host = b.closest('.actions, td') || b.parentElement;
      const open = host.querySelector('.buyform');
      if (open) { open.remove(); return; }
      host.insertAdjacentHTML('beforeend', `
        <form class="buyform" data-t="${esc(b.dataset.buy)}" data-entry="${esc(b.dataset.entry)}" data-date="${esc(b.dataset.date)}" data-name="${esc(b.dataset.name)}">
          <label for="amt_${esc(b.dataset.buy)}" class="lab">סכום וירטואלי ($)</label>
          <input id="amt_${esc(b.dataset.buy)}" class="field" type="number" min="1" step="1" value="1000" inputmode="numeric">
          <button class="btn primary" type="submit">הוסף</button>
          <span class="muted" style="font-size:12.5px">במחיר האיתות ${usd(+b.dataset.entry)}</span>
        </form>`);
      host.querySelector('.buyform input').focus();
    }
  });
  main.addEventListener('submit', (e) => {
    const f = e.target.closest('.buyform'); if (!f) return;
    e.preventDefault();
    const amount = +f.querySelector('input').value;
    if (!(amount > 0)) return;
    PF.add({ id: Date.now().toString(36), ticker: f.dataset.t, name: f.dataset.name, date: f.dataset.date, entry: +f.dataset.entry, amount });
    f.outerHTML = `<span class="chip up">נוסף לתיק · <a href="#portfolio">לתיק</a></span>`;
  });

  /* ================= 1. BRIEF ================= */
  function statusStrip() {
    const e = D.extreme, s = D.signals;
    const fg = (D.live && D.live.fearGreed) || (e && e.fearGreed);
    const fgV = fg && isNum(fg.score) ? `<span class="n">${Math.round(fg.score)}</span> · ${esc(C.fgLabel(fg.score))}` : '—';
    let sigV = '—', sigD = 'ממתין לסריקה ראשונה';
    if (s && s.gate) {
      if (s.gate.met) { sigV = `${(s.items || []).length} מניות`; sigD = `השער פתוח · נסרקו ${s.scanned || '—'} מניות ב-S&P 500`; }
      else { sigV = `השער סגור`; sigD = `רצף אדום ב-SPY: ${s.gate.streak}/3`; }
    }
    const exV = e ? (e.active ? '<span class="up">איתות פעיל</span>' : 'לא פעיל') : '—';
    const exD = e && e.spy ? `SPY ${e.spy.streak} ימים אדומים · פחד ${isNum(fg && fg.score) ? Math.round(fg.score) : '—'}` : 'ממתין לבדיקה ראשונה';
    return `<div class="strip">
      <a href="#extreme"><span class="lab">מדד פחד ותאוות בצע</span><span class="v">${fgV}</span><span class="d">${fg && isNum(fg.previousClose) ? `אתמול <span class="n">${Math.round(fg.previousClose)}</span> · לפני שבוע <span class="n">${isNum(fg.oneWeekAgo) ? Math.round(fg.oneWeekAgo) : '—'}</span>` : 'CNN Fear &amp; Greed'}</span></a>
      <a href="#signals"><span class="lab">איתותי MA150 היום</span><span class="v">${sigV}</span><span class="d">${sigD}</span></a>
      <a href="#extreme"><span class="lab">מצב חריג (SPY + פחד קיצוני)</span><span class="v">${exV}</span><span class="d">${exD}</span></a>
    </div>`;
  }
  // One page, three layers: the market right now (every 15 min, generated from live data), the daily brief
  // (written every morning at 08:00) and the weekly summary (written on Sundays).
  const writtenAt = (x) => `<span class="stamp" title="${esc(heDate(x.updatedAt, { dateStyle: 'full', timeStyle: 'short' }))}"><span class="dot" style="background:var(--faint)"></span>נכתב ${esc(heDate(x.updatedAt, { weekday: 'long', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }))}</span>`;
  const findIdx = (k) => ((D.movers && D.movers.indices) || []).find((x) => x.k === k);
  const fmtIdx = (x) => (x ? `${esc(x.k)} <span class="n ${dirOf(x.dir)}">${arrowOf(x.dir)}${esc(x.c)}</span>` : '');
  // "the market now": plain-Hebrew bullets built from the latest numbers — no AI, so it can refresh every 15 minutes
  function marketNowBullets() {
    const M = D.movers, L = D.live || {}, S = D.signals, out = [];
    if (!M) return out;
    const sp = findIdx('S&P 500');
    if (sp) out.push(`${M.live ? 'עכשיו במסחר' : `בסגירה של ${esc(shortDate(M.asOf))}`}: ${['S&P 500', 'נאסד״ק', 'דאו ג׳ונס', 'ראסל 2000'].map((k) => fmtIdx(findIdx(k))).filter(Boolean).join(' · ')}, ה-S&P ב-<span class="n">${esc(sp.v)}</span>.`);
    if (M.breadth && M.breadth.total) out.push(`רוחב השוק: <span class="n up">${M.breadth.up.toLocaleString('en-US')}</span> מניות עולות מול <span class="n down">${M.breadth.down.toLocaleString('en-US')}</span> יורדות; <span class="n">${M.breadth.big}</span> זזו 5% ומעלה.`);
    if (M.sectors && M.sectors.length > 1) { const a = M.sectors[0], z = M.sectors[M.sectors.length - 1]; out.push(`הסקטור החזק: ${esc(a.sector)} ${pct(a.chg, 2)} · החלש: ${esc(z.sector)} ${pct(z.chg, 2)}.`); }
    const big = (M.large || []).slice(0, 3);
    if (big.length) out.push(`בולטות בין החברות הגדולות: ${big.map((m) => `<a class="tkr" href="${tvUrl(m.t)}" target="_blank" rel="noopener">${esc(m.t)}</a> ${pct(m.chg, 1)}`).join(' · ')}. המזנקת של היום: <a class="tkr" href="${tvUrl((M.gainers[0] || {}).t || '')}" target="_blank" rel="noopener">${esc((M.gainers[0] || {}).t || '—')}</a> ${pct((M.gainers[0] || {}).chg, 1)}.`);
    const ten = findIdx('תשואה 10 שנים'), vix = findIdx('VIX'), dxy = findIdx('מדד הדולר');
    if (ten || vix) out.push(`ריבית ותנודתיות: ${[ten && `תשואת 10 שנים <span class="n">${esc(ten.v)}</span> (${esc(ten.c)})`, vix && `VIX <span class="n">${esc(vix.v)}</span> ${pct(vix.chg, 1)}`, dxy && `מדד הדולר ${pct(dxy.chg, 2)}`].filter(Boolean).join(' · ')}.`);
    const oil = findIdx('נפט ברנט'), gold = findIdx('זהב'), btc = findIdx('ביטקוין'), ils = findIdx('דולר/שקל');
    out.push(`סחורות ומטבעות: ${[oil && `ברנט <span class="n">${esc(oil.v)}</span> ${pct(oil.chg, 1)}`, gold && `זהב <span class="n">${esc(gold.v)}</span> ${pct(gold.chg, 1)}`, btc && `ביטקוין <span class="n">${esc(btc.v)}</span> ${pct(btc.chg, 1)}`, ils && `דולר/שקל <span class="n">${esc(ils.v)}</span>`].filter(Boolean).join(' · ')}.`);
    const fg = L.fearGreed || (D.extreme && D.extreme.fearGreed), fed = L.fed;
    if (fg || fed) out.push(`סנטימנט: ${fg ? `Fear &amp; Greed <span class="n">${Math.round(fg.score)}</span> (${esc(C.fgLabel(fg.score))})` : ''}${fg && fed ? ' · ' : ''}${fed ? `בפולימרקט: <span class="n">${fed.hold}%</span> לריבית ללא שינוי ו-<span class="n">${fed.hike}%</span> להעלאה בישיבת ${esc(fed.meeting)}` : ''}.`);
    if (S && S.gate) out.push(`SPY: <span class="n">${S.gate.streak}</span> ${S.gate.streak === 1 ? 'יום אדום' : 'ימים אדומים'} ברצף (נכון ל-${esc(shortDate(S.asOf))}) — ${S.gate.met ? `השער פתוח, <a href="#signals">${(S.items || []).length} איתותי MA150</a>` : `השער לאיתותי MA150 סגור (צריך 3)`}.`);
    return out;
  }
  const TOPICS = [['markets', 'שווקים'], ['macro', 'מאקרו ופד'], ['tech', 'AI וטכנולוגיה'], ['israel', 'ישראל'], ['crypto', 'קריפטו'], ['geo', 'גיאופוליטיקה']];
  function headlinesHtml() {
    const H = D.live && D.live.headlines; if (!H) return '';
    const topic = store.get('newsTopic', 'markets');
    return `<div class="card flat news"><div class="seg" role="tablist" aria-label="נושא">${TOPICS.filter(([k]) => (H[k] || []).length).map(([k, l]) => `<button type="button" role="tab" data-topic="${k}" aria-pressed="${k === topic}" aria-selected="${k === topic}">${l}</button>`).join('')}</div>
      <ul class="news-list" id="newsList">${newsItems(topic)}</ul><p class="src" style="margin-top:6px">כותרות כפי שפורסמו, עם קישור למקור · CNBC, Yahoo Finance, הפדרל ריזרב, TechCrunch, גלובס, TheMarker, CoinDesk, The Block, Axios</p></div>`;
  }
  const newsItems = (topic) => ((D.live.headlines[topic] || []).slice(0, 8).map((x) => `<li><a href="${esc(safeUrl(x.url) || '#')}" target="_blank" rel="noopener" dir="auto">${esc(x.t)}</a><span class="src">${esc(x.src)}${x.at ? ' · ' + esc(rel(x.at)) : ''}</span></li>`).join('')) || '<li class="muted">אין כותרות חדשות בנושא.</li>';
  function renderBrief() {
    const b = D.brief, w = D.weekly, M = D.movers;
    const stamps = `<div class="stamps">${M ? marketStamp(M) : ''}${b ? writtenAt(b) : ''}</div>`;
    let h = head('Zozo · תדריך', 'השוק היום', null, undefined, stamps) + statusStrip();
    h += `<nav class="jump" aria-label="קפיצה לחלק"><a href="#" data-jump="now">השוק עכשיו</a><a href="#" data-jump="daily">התדריך היומי</a>${w ? '<a href="#" data-jump="weekly">הסיכום השבועי</a>' : ''}</nav>`;
    // --- 1. the market right now ---
    const bullets = marketNowBullets(), board = boardItems();
    h += `<section class="block layer" id="now" style="margin-top:22px"><div class="layer-head"><div><div class="kicker">מתעדכן כל 15 דקות</div><h2 class="layer-title">השוק עכשיו</h2></div>${M ? marketStamp(M) : ''}</div>
      ${bullets.length ? `<ul class="now-list" data-g>${bullets.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}
      ${board.length ? `<div class="board" style="margin-top:18px">${board.map((s) => `<div class="cell"><span class="k">${esc(s.k)}</span><span class="v">${esc(s.v)}</span><span class="c ${dirOf(s.dir)}">${arrowOf(s.dir)}${esc(s.c || '')}</span></div>`).join('')}</div>` : ''}
      ${moversWidget().replace('margin-top:0;margin-bottom:34px', 'margin-top:30px')}
      ${D.live && D.live.headlines ? `<div style="margin-top:30px">${sec('', 'כותרות אחרונות')}${headlinesHtml()}</div>` : ''}
    </section>`;
    // --- 2. daily brief, 3. weekly summary ---
    h += `<section class="block layer" id="daily"><div class="layer-head"><div><div class="kicker">נכתב כל בוקר ב-08:00</div><h2 class="layer-title">התדריך היומי</h2></div>${b ? writtenAt(b) : ''}</div>
      ${b ? editionHtml(b) : empty('התדריך היומי עוד לא נכתב', 'הוא נכתב אוטומטית כל בוקר ב-08:00 שעון ישראל.', I.brief)}</section>`;
    if (w) h += `<section class="block layer" id="weekly"><div class="layer-head"><div><div class="kicker">נכתב בכל יום ראשון</div><h2 class="layer-title">הסיכום השבועי</h2></div>${writtenAt(w)}</div>${editionHtml(w)}</section>`;
    after(() => {
      main.querySelectorAll('[data-jump]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const t = document.getElementById(a.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
      main.querySelectorAll('[data-topic]').forEach((btn) => btn.addEventListener('click', () => {
        store.set('newsTopic', btn.dataset.topic);
        main.querySelectorAll('[data-topic]').forEach((x) => { x.setAttribute('aria-pressed', x === btn); x.setAttribute('aria-selected', x === btn); });
        document.getElementById('newsList').innerHTML = newsItems(btn.dataset.topic);
      }));
    });
    return h;
  }
  // a written edition (daily or weekly): headline, bottom line, Fed odds, what changed, AI, macro, voices, Israel, sources
  function editionHtml(b) {
    let h = '';
    const fw = b.macro && b.macro.fedwatch, pm = b.macro && b.macro.polymarket;
    const odds = (o) => o ? `<div class="odds">${isNum(o.cut) && o.cut > 0 ? `<div class="cut" style="width:${o.cut}%">${o.cut >= 12 ? o.cut + '%' : ''}</div>` : ''}${isNum(o.hold) && o.hold > 0 ? `<div class="hold" style="width:${o.hold}%">${o.hold >= 12 ? o.hold + '%' : ''}</div>` : ''}${isNum(o.hike) && o.hike > 0 ? `<div class="hike" style="width:${o.hike}%">${o.hike >= 12 ? o.hike + '%' : ''}</div>` : ''}</div>` : '';
    const headline = esc(b.headline).replace(/&lt;em&gt;/g, '<em>').replace(/&lt;\/em&gt;/g, '</em>');
    h += `<section class="hero">
      <div data-g>
        <h2>${headline}</h2>
        ${b.thesis ? `<p class="thesis">${esc(b.thesis)}</p>` : ''}
        <div class="lab" style="margin-bottom:10px">השורה התחתונה</div>
        <ol class="bl">${(b.bottomLine || []).map((x) => `<li><span>${esc(x)}</span></li>`).join('')}</ol>
      </div>
      <aside class="grid">
        ${fw ? `<div class="card"><div class="lab">הפד · ${esc(fw.meeting || 'הישיבה הבאה')}</div>
          <div style="margin-top:10px;font-size:13px" class="muted">FedWatch (חוזים עתידיים)</div>${odds(fw)}
          ${pm ? `<div style="margin-top:12px;font-size:13px" class="muted">${link(pm.url, 'Polymarket')} (שוק תחזיות)</div>${odds(pm)}` : ''}
          <div class="odds-legend"><span><span class="up">■</span> הורדה</span><span>■ ללא שינוי</span><span><span class="down">■</span> העלאה</span></div></div>` : ''}
        ${b.weekAhead && b.weekAhead.length ? `<div class="card flat"><div class="lab" style="margin-bottom:8px">מה בשבוע הקרוב</div><ul class="bul">${b.weekAhead.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      </aside>
    </section>`;
    let n = 0; const nn = () => String(++n).padStart(2, '0');
    if (b.recap && b.recap.length) h += `<section class="block" data-g>${sec(nn(), 'מה היה השבוע')}<div class="grid g2">${b.recap.map((r) => `<div class="card flat"><h3 style="margin-bottom:8px">${esc(r.title)}</h3><ul class="bul">${(r.points || []).map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}</div></section>`;
    if (b.changes && b.changes.length) h += `<section class="block" data-g>${sec(nn(), 'מה השתנה')}${b.changes.map((c) => `<div class="chg-row"><span class="t">${esc(c.topic)}</span><span class="from">${esc(c.from)}</span><span class="arr">←</span><span>${esc(c.to)}</span></div>`).join('')}</section>`;
    const stories = (arr) => arr.map((s) => `<article class="story"><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p><div class="meta">${(s.tickers || []).map((t) => `<span class="chip tkr">${esc(t)}</span>`).join('')}${s.source ? `<span class="src">${link(s.source.url, s.source.name)}${s.source.date ? ' · ' + esc(s.source.date) : ''}</span>` : ''}</div></article>`).join('');
    if (b.ai && b.ai.length) h += `<section class="block" data-g>${sec(nn(), 'בינה מלאכותית וטכנולוגיה')}<div class="card flat">${stories(b.ai)}</div></section>`;
    if (b.macro && b.macro.items && b.macro.items.length) h += `<section class="block" data-g>${sec(nn(), 'מאקרו וריבית')}<div class="card flat">${stories(b.macro.items)}</div></section>`;
    if (b.voices && b.voices.length) {
      const stanceCls = { 'שורי': 'up', 'דובי': 'down', 'ניצי': 'down', 'זהיר': 'amber' };
      h += `<section class="block" data-g>${sec(nn(), 'קולות מהשוק')}<div class="grid g2">${b.voices.map((v) => `
        <figure class="card voice" style="margin:0">
          <div class="who"><div><b>${esc(v.name)}</b><div class="role">${esc(v.role || '')}</div></div><span class="chip ${stanceCls[v.stance] || ''}">${esc(v.stance || '')}</span></div>
          <blockquote>${v.he ? '״' + esc(v.he) + '״' : ''}</blockquote>
          ${v.en ? `<div class="en">"${esc(v.en)}"</div>` : ''}
          ${v.note ? `<div class="meanwhile"><b>שימו לב:</b> ${esc(v.note)}</div>` : ''}
          <figcaption class="src">${link(v.url, 'מקור')}${v.date ? ' · ' + esc(v.date) : ''}</figcaption>
        </figure>`).join('')}</div></section>`;
    }
    if (b.israel && b.israel.length) h += `<section class="block" data-g>${sec(nn(), 'ישראל')}<div class="card flat">${stories(b.israel)}</div></section>`;
    if (b.sources && b.sources.length) h += `<section class="block">${sec(nn(), 'מקורות')}<p class="src" style="line-height:2">${b.sources.map((s) => link(s.url, s.name)).join(' · ')}</p></section>`;
    return h;
  }

  /* ================= 2. SIGNALS ================= */
  const candleStrip = (candles, streak) => {
    if (!candles || !candles.length) return '';
    const max = Math.max(...candles.map((c) => Math.abs(c.close - c.open) / c.open)) || 1;
    return `<div class="candles" aria-label="נרות SPY אחרונים">${candles.map((c, i) => {
      const red = c.close < c.open, h = 8 + (Math.abs(c.close - c.open) / c.open / max) * 34;
      const inRun = red && i >= candles.length - streak;
      return `<div class="candle ${red ? 'r' : 'g'}${inRun ? ' inrun' : ''}" title="${esc(c.date)}: פתיחה ${c.open} · סגירה ${c.close}"><i style="height:${h.toFixed(0)}px"></i>${esc(shortDate(c.date))}</div>`;
    }).join('')}</div>`;
  };
  function renderSignals() {
    const s = D.signals;
    let h = head('סריקת MA150 · S&P 500', 'איתותי קנייה', 'מניות שעומדות בשלושת תנאי הכניסה: שווי שוק מעל 500 מיליון דולר, מעל 3 שנים במסחר, וסגירה מעל ממוצע ה-150. הסריקה רצה בכל יום שבו SPY סגר 3 ימים אדומים ברצף או יותר.', s ? s.updatedAt : null);
    if (!s || !s.gate) return h + empty('עוד לא בוצעה סריקה', 'הסריקה הראשונה תופיע כאן אחרי הריצה היומית הבאה של Zozo.', I.signals) + methodBox();
    const g = s.gate;
    h += `<div class="card gate">
      <div><div class="lab">רצף אדום ב-SPY</div><div class="big"><span class="n">${g.streak}</span><span class="faint" style="font-size:24px">/3</span></div></div>
      <div>${g.met
        ? `<h3 style="font-family:var(--display);font-size:22px">השער פתוח</h3><p class="muted">SPY סגר באדום <span class="n">${g.streak}</span> ימים ברצף, ולכן נסרקו <span class="n">${s.scanned || '—'}</span> מניות${s.failed ? ` (<span class="n">${s.failed}</span> לא נבדקו בגלל נתונים חסרים)` : ''}. נכון לנר של ${esc(shortDate(s.asOf))}.</p>`
        : `<h3 style="font-family:var(--display);font-size:22px">השער סגור היום</h3><p class="muted">${g.streak === 0 ? 'היום האחרון של SPY נסגר בירוק.' : `SPY סגר באדום <span class="n">${g.streak}</span> ${g.streak === 1 ? 'יום' : 'ימים'} ברצף.`} חסרים עוד <span class="n">${Math.max(0, 3 - g.streak)}</span> ימים אדומים כדי שהסריקה תרוץ.</p>`}</div>
      ${candleStrip(g.candles, g.streak)}
    </div>`;
    const items = s.items || [];
    if (g.met && !items.length) h += empty('אף מניה לא עמדה בכל התנאים', 'תנאי השוק התקיימו, אבל אף מניה ב-S&P 500 לא עמדה בשלושת התנאים בנר האחרון.', I.signals);
    if (!g.met) {
      const last = D.history && (D.history.signals || []).filter((x) => x.kind === 'ma150').slice(0, 3);
      if (last && last.length) h += `<div class="block">${sec('', 'האיתותים האחרונים')}<div class="tbl-wrap"><table><thead><tr><th>מניה</th><th>תאריך</th><th class="num">מחיר איתות</th><th class="num">היום</th><th class="num">שינוי</th></tr></thead><tbody>${last.map((x) => `<tr><td><span class="tkr">${esc(x.ticker)}</span></td><td>${esc(shortDate(x.date))}</td><td class="num">${usd(x.entry)}</td><td class="num">${usd(x.price)}</td><td class="num">${pct(isNum(x.price) && x.entry ? (x.price / x.entry - 1) * 100 : null)}</td></tr>`).join('')}</tbody></table></div><p style="margin-top:10px"><a href="#performance">לכל ההיסטוריה והביצועים ←</a></p></div>`;
    }
    if (items.length) {
      h += `<div class="grid" style="gap:18px">${items.map((it, i) => {
        const typeTxt = it.type === 'touch' ? 'נגיעה בממוצע וסגירה מעליו' : it.type === 'cross' ? 'חצייה מעל הממוצע' : 'סגירה מעל הממוצע';
        const cx = it.context || {};
        const fu = it.fundamentals || {};
        const peVsSector = isNum(fu.pe) && fu.sectorAvg && isNum(fu.sectorAvg.pe)
          ? `${num(fu.pe, 1)} <span class="muted" style="font-size:12px">(ממוצע סקטור ${fu.sectorAvg.pe.toFixed(1)}×${fu.pe < fu.sectorAvg.pe ? ' — מתחת לממוצע' : ' — מעל הממוצע'})</span>` : null;
        return `<article class="card sig">
          <div class="sig-chart" id="sc_${i}" dir="ltr"><div class="legend"><span style="color:var(--sma150)">SMA150</span><span style="color:var(--sma20)">SMA20</span></div></div>
          <div class="sig-body">
            <div class="sig-top">
              <div><div class="tkr">${esc(it.ticker)}</div><div class="name">${esc(it.name || '')}${it.sector ? ' · ' + esc(it.sector) : ''}</div></div>
              <div class="px">${usd(it.price)}<div style="font-size:12.5px" class="muted">מה-SMA150: ${pct(it.distancePct, 2)}</div></div>
            </div>
            <ul class="checks">
              <li><span class="ok">✓</span><span>שווי שוק מעל 500M$</span><span class="n muted">${esc(it.marketCap || '')}</span></li>
              <li><span class="ok">✓</span><span>מעל 3 שנים במסחר</span><span class="muted">מאז <span class="n">${esc(it.listedSince || '—')}</span></span></li>
              <li><span class="ok">✓</span><span>${typeTxt}</span><span class="muted">SMA150 ${usd(it.sma150)}</span></li>
            </ul>
            ${it.explanation ? `<p class="explain" data-g>${esc(it.explanation)}</p>` : ''}
            <div class="ctx">
              <div><span>שיפוע SMA150</span><span>${esc(cx.slope || '—')}</span></div>
              <div><span>כיוון</span><span>${esc(cx.approach || '—')}</span></div>
              <div><span>מול SMA20</span><span>${esc(cx.sma20 || '—')}</span></div>
              <div><span>מול SMA200</span><span>${esc(cx.sma200 || '—')}</span></div>
              <div><span>נפח מול ממוצע</span><span>${isNum(cx.volRatio) ? `<span class="n">×${cx.volRatio.toFixed(1)}</span>` : '—'}</span></div>
              <div><span>מהשיא</span><span>${pct(cx.fromHighPct)}</span></div>
              ${peVsSector ? `<div><span>P/E מול הסקטור</span><span>${peVsSector}</span></div>` : ''}
            </div>
            <div class="actions">${starBtn(it.ticker)}${buyBtn(it.ticker, it.price, s.asOf, it.name)}<a class="btn ghost" href="${tvUrl(it.ticker)}" target="_blank" rel="noopener">גרף חי ${I.ext}</a></div>
          </div>
        </article>`;
      }).join('')}</div>`;
      // batching the chart creation keeps any single stretch of work short, but on a big red-streak day
      // (100-200+ signals) even a few hundred ms per chart adds up to many seconds of it happening somewhere
      // in the background. Cap how many build automatically and let the viewer pull in the rest on demand —
      // same "הצג עוד" pattern the stock screener already uses below its results table.
      const AUTO = 24;
      if (items.length > AUTO) h += `<p style="margin:18px 0 0;text-align:center"><button class="btn" type="button" id="moreCharts">טען את שאר הגרפים (${items.length - AUTO})</button></p>`;
      after(() => {
        const all = items.map((it, i) => ({ el: document.getElementById('sc_' + i), item: it }));
        C.lazySignalCharts(all.slice(0, AUTO));
        const btn = document.getElementById('moreCharts');
        if (btn) btn.addEventListener('click', () => { btn.remove(); C.lazySignalCharts(all.slice(AUTO)); });
      });
    }
    return h + methodBox();
  }
  const methodBox = () => `<details class="card flat block"><summary style="cursor:pointer;font-weight:600">איך עובדת השיטה?</summary><div data-g style="margin-top:12px;display:flex;flex-direction:column;gap:8px;color:var(--ink-2)">
    <p><b>שלב 1 — שער השוק:</b> כל יום בודקים אם SPY (תעודת הסל על S&P 500) סגר נר אדום (סגירה מתחת לפתיחה) 3 ימים ברצף או יותר. רק אז ממשיכים — כך האיתותים מגיעים בזמן תיקון בשוק.</p>
    <p><b>שלב 2 — סריקת המניות:</b> כל ~500 המניות במדד נבדקות מול 3 תנאים: שווי שוק מעל 500 מיליון דולר, מעל 3 שנים במסחר, וסגירה מעל ממוצע ה-150 בנר האחרון. הבדיקה חוזרת בכל יום שבו השער פתוח (רצף אדום של 3+ ימים נמשך), כך שמניה יכולה להצטרף גם ביום השלישי האדום וגם בימים שאחריו. צבע הנר של המניה עצמה לא משנה.</p>
    <p><b>מה זה לא:</b> האיתות אומר שהמניה עומדת בכללים, לא שהיא תעלה. זו נקודת התחלה לבדיקה, לא המלצה.</p></div></details>`;

  /* ================= 3. EXTREME ================= */
  function renderExtreme() {
    const e = D.extreme;
    let h = head('SPY × Fear & Greed', 'מצב חריג', 'איתות קנייה נדיר שמופעל רק כשהשוק בפאניקה: SPY סגר 3 ימים אדומים ברצף <b>וגם</b> מדד הפחד של CNN נמצא בפחד קיצוני (מתחת ל-25).', e ? e.updatedAt : null);
    if (!e) return h + empty('עוד לא בוצעה בדיקה', 'הבדיקה היומית הראשונה תופיע כאן אחרי הריצה הבאה של Zozo.', I.extreme);
    const fg = e.fearGreed || {}, spy = e.spy || {};
    const c1 = spy.streak >= 3, c2 = isNum(fg.score) && fg.score < 25;
    h += `<div class="state ${e.active ? 'on' : 'off'}">
      <div class="cond" style="border:0;padding:0"><span class="ic ${e.active ? 'ok' : 'no'}" style="width:40px;height:40px;font-size:18px">${e.active ? '✓' : '–'}</span></div>
      <div><h3>${e.active ? 'האיתות פעיל' : 'אין איתות כרגע'}</h3><p class="muted">${e.active ? 'שני התנאים מתקיימים בנר האחרון. האיתות ממשיך כל עוד הרצף האדום והפחד הקיצוני נמשכים.' : `${c1 || c2 ? 'רק אחד משני התנאים מתקיים.' : 'שני התנאים לא מתקיימים.'} האיתות מופעל רק כששניהם מתקיימים יחד.`}</p></div>
    </div>
    <div class="grid g2 block" style="margin-top:18px">
      <div class="card"><div class="lab">CNN Fear &amp; Greed</div>
        <div class="fg-wrap">${C.gauge(fg.score)}<div class="fg-score n" style="margin-top:-20px">${isNum(fg.score) ? Math.round(fg.score) : '—'}</div><div style="font-weight:600">${esc(C.fgLabel(fg.score))}</div></div>
        <div class="ctx" style="margin-top:14px"><div><span>סגירה קודמת</span>${num(fg.previousClose, 0)}</div><div><span>לפני שבוע</span>${num(fg.oneWeekAgo, 0)}</div><div><span>לפני חודש</span>${num(fg.oneMonthAgo, 0)}</div><div><span>עדכון</span><span>${fg.timestamp ? esc(heDate(fg.timestamp, { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })) : '—'}</span></div></div>
      </div>
      <div class="card"><div class="lab">התנאים</div>
        <div class="cond"><span class="ic ${c1 ? 'ok' : 'no'}">${c1 ? '✓' : '✗'}</span><div><b>3 ימים אדומים ברצף (או יותר) ב-SPY</b><p class="muted">כרגע <span class="n">${isNum(spy.streak) ? spy.streak : '—'}</span> ${spy.streak === 1 ? 'יום' : 'ימים'}. יום אדום = סגירה מתחת לפתיחה.</p></div></div>
        <div class="cond"><span class="ic ${c2 ? 'ok' : 'no'}">${c2 ? '✓' : '✗'}</span><div><b>פחד קיצוני — המדד מתחת ל-25</b><p class="muted">כרגע <span class="n">${isNum(fg.score) ? Math.round(fg.score) : '—'}</span> (${esc(C.fgLabel(fg.score))}).</p></div></div>
        <div style="margin-top:14px">${candleStrip(spy.candles, spy.streak || 0)}</div>
        ${isNum(spy.lastClose) ? `<p class="muted" style="margin-top:10px;font-size:13.5px">סגירה אחרונה של SPY: ${usd(spy.lastClose)}</p>` : ''}
      </div>
    </div>`;
    if (spy.candles && spy.candles.length) h += `<section class="block">${sec('', 'נרות SPY אחרונים')}<div class="tbl-wrap"><table><thead><tr><th>תאריך</th><th class="num">פתיחה</th><th class="num">סגירה</th><th class="num">גוף הנר</th><th>צבע</th></tr></thead><tbody>${spy.candles.slice().reverse().map((c) => `<tr><td>${esc(shortDate(c.date))}</td><td class="num">${num(c.open)}</td><td class="num">${num(c.close)}</td><td class="num">${pct((c.close / c.open - 1) * 100, 2)}</td><td>${c.close < c.open ? '<span class="chip down">אדום</span>' : '<span class="chip up">ירוק</span>'}</td></tr>`).join('')}</tbody></table></div><p class="src" style="margin-top:8px">${esc(spy.source || '')}</p></section>`;
    const hist = e.history || [];
    h += `<section class="block">${sec('', 'היסטוריית האיתות')}${hist.length ? `<div class="tbl-wrap"><table><thead><tr><th>תאריך</th><th class="num">פחד</th><th class="num">רצף</th><th class="num">SPY אז</th><th class="num">SPY היום</th><th class="num">שינוי</th></tr></thead><tbody>${hist.map((x) => `<tr><td>${esc(shortDate(x.date))}</td><td class="num">${num(x.score, 0)}</td><td class="num">${num(x.streak, 0)}</td><td class="num">${usd(x.spyClose)}</td><td class="num">${usd(x.spyNow)}</td><td class="num">${pct(isNum(x.spyNow) && x.spyClose ? (x.spyNow / x.spyClose - 1) * 100 : null)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">האיתות עוד לא הופעל מאז ש-Zozo התחיל לעקוב. כשזה יקרה, כל הופעה תירשם כאן יחד עם מה ש-SPY עשה אחריה.</p>'}</section>`;
    return h;
  }

  /* ================= 4. SECTORS ================= */
  const norm = (s) => String(s || '').toLowerCase().replace(/["'״׳`]/g, '').replace(/[\s\-_&]+/g, '');
  function sectorMatches(q) {
    const items = (D.sectors && D.sectors.items) || [];
    const nq = norm(q);
    if (!nq) return items;
    return items.map((s) => {
      const fields = [s.he, s.en, s.id].concat(s.aliases || []);
      let score = 0;
      fields.forEach((f) => { const nf = norm(f); if (nf === nq) score = Math.max(score, 100); else if (nf.startsWith(nq)) score = Math.max(score, 60); else if (nq.length > 2 && nf.includes(nq)) score = Math.max(score, 40); else if (nq.length > 2 && nq.includes(nf) && nf.length > 2) score = Math.max(score, 30); });
      if ((s.etfs || []).some((e) => norm(e.t) === nq) || (s.leaders || []).some((t) => norm(t) === nq)) score = Math.max(score, 50);
      if (!score && norm(s.desc).includes(nq) && nq.length > 2) score = 10;
      return { s, score };
    }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).map((x) => x.s);
  }
  const KIND = { sector: 'סקטור', theme: 'תחום', sub: 'תת-תחום' };
  const sectorById = (id) => ((D.sectors && D.sectors.items) || []).find((x) => x.id === id);
  const sectorCards = (list) => list.length
    ? list.map((s) => { const p = s.parent && sectorById(s.parent); return `<a href="#sectors.${esc(s.id)}"><span style="display:flex;justify-content:space-between;gap:8px"><b>${esc(s.he)}</b><span class="chip${s.kind === 'sub' ? ' acc' : ''}">${KIND[s.kind] || 'תחום'}</span></span><span class="en">${esc(s.en)}</span>${p ? `<span class="faint" style="font-size:12px">חלק מ${esc(p.he)}</span>` : ''}<span class="etfs">${(s.etfs || []).map((e) => esc(e.t)).join(' · ')}</span></a>`; }).join('')
    : `<p class="muted">לא נמצא תחום מתאים. נסו מילה אחרת — למשל "שבבים", "ביטחון" או טיקר של תעודת סל.</p>`;
  function renderSectors(args) {
    const all = (D.sectors && D.sectors.items) || [];
    if (args[0]) {
      const s = all.find((x) => x.id === args[0]);
      if (s) return sectorDetail(s);
    }
    const quick = ['בינה מלאכותית', 'קוואנטים', 'שבבים', 'חשמל', 'אנרגיה גרעינית', 'מרכזי נתונים', 'רחפנים', 'סייבר', 'מתכות נדירות', 'זהב', 'ביוטק', 'ישראל'];
    const counts = { sector: 0, theme: 0, sub: 0 }; all.forEach((s) => counts[s.kind]++);
    const h = head('סקטורים ותחומים', 'מה מעניין אותך?', `כתבו שם של סקטור, תחום או תת-תחום — בעברית או באנגלית — ותקבלו הסבר בסיסי, מה מזיז אותו, תעודות הסל שעוקבות אחריו ואיך המניות המובילות בו נסחרות. <span class="n">${all.length}</span> תחומים במאגר.`) + `
      <div class="search">${I.search}<input class="field" id="sq" type="search" placeholder="למשל: קוואנטים, חשמל, semiconductors, זהב..." autocomplete="off" aria-label="חיפוש סקטור"></div>
      <div class="quick">${quick.map((q) => `<button type="button" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div>
      <div class="seg" role="group" aria-label="סוג" style="margin-top:18px">
        <button type="button" data-kind="" aria-pressed="true">הכל <span class="n">${all.length}</span></button>
        <button type="button" data-kind="sector" aria-pressed="false">סקטורים <span class="n">${counts.sector}</span></button>
        <button type="button" data-kind="theme" aria-pressed="false">תחומים <span class="n">${counts.theme}</span></button>
        <button type="button" data-kind="sub" aria-pressed="false">תתי-תחומים <span class="n">${counts.sub}</span></button>
      </div>
      <div class="sector-list" id="sl">${sectorCards(all)}</div>`;
    after(() => {
      const inp = document.getElementById('sq'), sl = document.getElementById('sl');
      let kind = '';
      const run = () => { sl.innerHTML = sectorCards(sectorMatches(inp.value).filter((s) => !kind || s.kind === kind)); };
      main.querySelectorAll('[data-kind]').forEach((b) => b.addEventListener('click', () => {
        kind = b.dataset.kind; main.querySelectorAll('[data-kind]').forEach((x) => x.setAttribute('aria-pressed', x === b)); run();
      }));
      inp.addEventListener('input', run);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const m = sectorMatches(inp.value); if (m.length) location.hash = '#sectors.' + m[0].id; } });
      document.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => { inp.value = b.dataset.q; run(); inp.focus(); }));
      if (matchMedia('(min-width:761px)').matches) inp.focus();
    });
    return h;
  }
  function sectorDetail(s) {
    const asOf = D.sectors.etfsAsOf;
    const parent = s.parent && sectorById(s.parent);
    const subs = D.sectors.items.filter((x) => x.parent === s.id);
    const leaders = (s.leaders || []).map((t) => ({ t, r: UNI && UNI.byT.get(t) }));
    const live = leaders.filter((x) => x.r);
    const avg = (f) => { const v = live.map((x) => x.r[UNI.ix[f]]).filter(isNum); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
    const h = `<p style="margin-bottom:16px"><a href="#sectors">→ כל הסקטורים</a>${parent ? ` · <a href="#sectors.${esc(parent.id)}">${esc(parent.he)}</a>` : ''}</p>
      <div class="page-head sector-detail"><div><div class="kicker">${s.kind === 'sector' ? 'סקטור GICS' : s.kind === 'sub' ? `תת-תחום${parent ? ' של ' + esc(parent.he) : ''}` : 'תחום השקעה'}</div><h2>${esc(s.he)}</h2><p class="sub ltr" style="text-align:right">${esc(s.en)}</p></div>
        ${live.length ? `<div class="sector-kpis"><div><span class="lab">מובילות · יום</span>${pct(avg('chg1d'), 2)}</div><div><span class="lab">חודש</span>${pct(avg('chg1m'))}</div><div><span class="lab">3 חודשים</span>${pct(avg('chg3m'))}</div></div>` : ''}</div>
      ${subs.length ? `<div class="quick" style="margin:-10px 0 18px"><span class="lab" style="align-self:center">תתי-תחומים:</span>${subs.map((x) => `<a class="chip acc" href="#sectors.${esc(x.id)}">${esc(x.he)}</a>`).join('')}</div>` : ''}
      <p data-g style="font-size:17px;max-width:70ch;color:var(--ink-2)">${esc(s.desc)}</p>
      <div class="grid g2 block" style="margin-top:26px" data-g>
        <div class="card flat"><div class="lab" style="margin-bottom:8px"><span class="up">▲</span> מה מזיז אותו</div><ul class="bul">${(s.drivers || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="card flat"><div class="lab" style="margin-bottom:8px"><span class="down">▼</span> סיכונים</div><ul class="bul">${(s.risks || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
      <section class="block">${sec('', 'תעודות סל')}
        <div class="card flat">${(s.etfs || []).map((e, i) => `<div class="etf-row"><span class="tkr">${esc(e.t)}</span><span><b style="font-weight:600" class="ltr">${esc(e.name)}</b></span>
          <span class="m muted" style="font-size:13px">דמי ניהול ${isNum(e.er) ? `<span class="n">${e.er.toFixed(2)}%</span>` : '—'} · נכסים ${e.aum ? `<span class="n">${esc(e.aum)}</span>` : '—'}</span>
          <span class="m" style="display:flex;gap:6px"><button class="btn" type="button" data-chart="${esc(e.t)}" aria-pressed="${i === 0}">גרף</button>${starBtn(e.t)}</span></div>`).join('')}</div>
        <p class="src" style="margin-top:8px">${asOf ? `דמי ניהול ונכסים נכונים ל-${esc(shortDate(asOf))}.` : 'דמי ניהול ונכסים יתעדכנו בריענון השבועי.'} האמור אינו המלצה.</p>
      </section>
      <section class="block">${sec('', 'גרף חי')}<div class="tv-box" id="tvb" dir="ltr"></div><p class="src" style="margin-top:8px">כולל SMA150 ו-SMA20 · מקור: TradingView</p></section>
      ${leaders.length ? `<section class="block">${sec('', 'חברות מובילות בתחום')}
        ${live.length ? `<div class="tbl-wrap"><table><thead><tr><th>מניה</th><th class="num">מחיר</th><th class="num">יום</th><th class="num">חודש</th><th class="num">3 חודשים</th><th class="num">מ-SMA150</th><th class="num">RSI</th><th></th></tr></thead><tbody>
          ${live.map(({ t, r }) => `<tr><td><a class="tkr" href="${tvUrl(t)}" target="_blank" rel="noopener">${esc(t)}</a><div class="muted" style="font-size:12px">${esc(r[UNI.ix.name])}</div></td><td class="num">${usd(r[UNI.ix.price])}</td><td class="num">${pct(r[UNI.ix.chg1d], 2)}</td><td class="num">${pct(r[UNI.ix.chg1m])}</td><td class="num">${pct(r[UNI.ix.chg3m])}</td><td class="num">${pct(r[UNI.ix.d150])}</td><td class="num">${num(r[UNI.ix.rsi], 0)}</td><td>${starBtn(t)}</td></tr>`).join('')}
        </tbody></table></div><p class="src" style="margin-top:8px">${D.universe.live ? 'מסחר חי' : 'נתוני סגירה'} ${esc(shortDate(D.universe.asOf))} · Yahoo Finance · רשימת חברות מוכרות בתחום, לא המלצה.</p>` : ''}
        ${leaders.filter((x) => !x.r).length ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">${leaders.filter((x) => !x.r).map(({ t }) => `<a class="chip tkr" style="font-size:14px;padding:5px 12px" href="${tvUrl(t)}" target="_blank" rel="noopener">${esc(t)}</a>`).join('')}</div>` : ''}
      </section>` : ''}`;
    after(() => {
      const box = document.getElementById('tvb');
      const first = s.etfs && s.etfs[0];
      if (first) C.tvWidget(box, first.t);
      main.querySelectorAll('[data-chart]').forEach((b) => b.addEventListener('click', () => {
        main.querySelectorAll('[data-chart]').forEach((x) => x.setAttribute('aria-pressed', x === b));
        C.tvWidget(box, b.dataset.chart);
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }));
    });
    return h;
  }

  /* ================= MOVERS ================= */
  const MOVER_TABS = [
    { id: 'gainers', label: 'המזנקות', sub: 'העליות הגדולות ביותר היום' },
    { id: 'losers', label: 'הצונחות', sub: 'הירידות הגדולות ביותר היום' },
    { id: 'large', label: 'ענקיות בתנועה', sub: 'חברות מעל 10 מיליארד דולר שזזו 4% ומעלה' },
    { id: 'volume', label: 'נפח חריג', sub: 'מחזור מסחר של פי 2.5 ומעלה מהממוצע (50 ימים)' },
  ];
  const moverRows = (list, withRank = true) => {
    const max = Math.max(1, ...list.map((m) => Math.abs(m.chg || 0)));
    return list.map((m, i) => `
      <div class="mv-row">
        ${withRank ? `<span class="mv-rank n">${i + 1}</span>` : ''}
        <div class="mv-name"><a class="tkr" href="${tvUrl(m.t)}" target="_blank" rel="noopener">${esc(m.t)}</a><span class="muted">${esc(m.name)}</span></div>
        <div class="mv-bar" aria-hidden="true"><i class="${m.chg >= 0 ? 'u' : 'd'}" style="width:${Math.max(3, (Math.abs(m.chg) / max) * 100).toFixed(1)}%"></i></div>
        <div class="mv-chg">${pct(m.chg, 2)}</div>
        <div class="mv-meta">${usd(m.price)}${isNum(m.relVol) ? ` · נפח <span class="n">×${m.relVol.toFixed(1)}</span>` : ''}${isNum(m.cap) ? ` · <span class="n">$${m.cap >= 1 ? m.cap.toFixed(1) + 'B' : Math.round(m.cap * 1000) + 'M'}</span>` : ''}${m.sector ? ` · ${esc(m.sector)}` : ''}</div>
        <span class="mv-act">${starBtn(m.t)}</span>
      </div>`).join('');
  };
  function breadthBar(b) {
    if (!b || !b.total) return '';
    const up = (b.up / b.total) * 100, dn = (b.down / b.total) * 100;
    return `<div class="breadth"><div class="breadth-bar" role="img" aria-label="${b.up} עלו, ${b.down} ירדו"><i class="u" style="width:${up.toFixed(1)}%"></i><i class="d" style="width:${dn.toFixed(1)}%"></i></div>
      <div class="breadth-legend"><span><span class="n up">${b.up.toLocaleString('en-US')}</span> עלו</span><span><span class="n">${b.big}</span> זזו 5% ומעלה</span><span><span class="n down">${b.down.toLocaleString('en-US')}</span> ירדו</span></div></div>`;
  }
  function renderMovers() {
    const M = D.movers;
    let h = head('כל מניות ארה״ב מעל $300M', 'תנועות חזקות', `המניות שזזו הכי חזק ${M && M.live ? 'היום, בזמן המסחר — מתעדכן כל 15 דקות' : 'ביום המסחר האחרון'}, מתוך כ-3,000 מניות אמריקאיות עם שווי של 300 מיליון דולר ומעלה ומחזור של 2 מיליון דולר ביום לפחות.`, undefined, M ? marketStamp(M) : stamp(null));
    if (!M) return h + empty('עוד אין נתונים', 'רשימת התנועות תתעדכן בריענון היומי הבא.', I.movers);
    const tab = store.get('moversTab', 'gainers');
    h += `<div class="grid g2" style="align-items:start">
        <div class="card flat"><div class="lab" style="margin-bottom:10px">רוחב השוק · יום מסחר ${esc(shortDate(M.asOf))}</div>${breadthBar(M.breadth)}</div>
        <div class="card flat"><div class="lab" style="margin-bottom:10px">סקטורים (משוקלל לפי שווי)</div><div class="heat">${(M.sectors || []).map((s) => `<span class="heat-chip ${s.chg >= 0 ? 'u' : 'd'}" style="--a:${Math.min(1, Math.abs(s.chg) / 2).toFixed(2)}">${esc(s.sector)} ${pct(s.chg, 2)}</span>`).join('')}</div></div>
      </div>
      <div class="seg block" role="tablist" aria-label="סוג תנועה" style="margin-top:26px">${MOVER_TABS.map((t) => `<button type="button" role="tab" data-mt="${t.id}" aria-pressed="${t.id === tab}" aria-selected="${t.id === tab}">${t.label}</button>`).join('')}</div>
      <p class="muted" id="mvSub" style="margin:10px 0 6px;font-size:13.5px"></p>
      <div class="card flat mv-list" id="mvList"></div>
      <p class="src" style="margin-top:8px">מקור: Yahoo Finance (מחיר, שינוי ונפח) ו-Nasdaq (שווי שוק וסקטור). תנועה חזקה איננה המלצה — לפעמים היא נובעת מדוח, מיזוג או הנפקה.</p>`;
    after(() => {
      const draw = (id) => {
        const t = MOVER_TABS.find((x) => x.id === id) || MOVER_TABS[0];
        const list = M[t.id] || [];
        document.getElementById('mvSub').textContent = t.sub;
        document.getElementById('mvList').innerHTML = list.length ? moverRows(list) : '<p class="muted" style="padding:14px">אין מניות שעומדות בהגדרה היום.</p>';
        main.querySelectorAll('[data-mt]').forEach((b) => { b.setAttribute('aria-pressed', b.dataset.mt === t.id); b.setAttribute('aria-selected', b.dataset.mt === t.id); });
        store.set('moversTab', t.id);
      };
      main.querySelectorAll('[data-mt]').forEach((b) => b.addEventListener('click', () => draw(b.dataset.mt)));
      draw(tab);
    });
    return h;
  }
  function moversWidget() {
    const M = D.movers; if (!M) return '';
    const top = (k) => moverRows((M[k] || []).slice(0, 5), false);
    return `<section class="block" style="margin-top:0;margin-bottom:34px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap">${sec('', 'תנועות חזקות היום')}<a href="#movers" style="font-size:14px">לכל הרשימות ←</a></div>
      ${breadthBar(M.breadth)}
      <div class="grid g2" style="margin-top:14px">
        <div class="card flat mv-list compact"><div class="lab" style="padding:4px 0 6px">המזנקות</div>${top('gainers')}</div>
        <div class="card flat mv-list compact"><div class="lab" style="padding:4px 0 6px">הצונחות</div>${top('losers')}</div>
      </div></section>`;
  }

  /* ================= SCREENER ================= */
  const THIS_YEAR = new Date().getFullYear();
  // field catalogue: key → label, unit, kind ('num' | 'enum'), how to read it from a universe row
  const SF = {
    cap:      { label: 'שווי שוק', unit: '$B', kind: 'num', hint: 'מיליארדי דולרים' },
    price:    { label: 'מחיר', unit: '$', kind: 'num' },
    chg1d:    { label: 'שינוי יומי', unit: '%', kind: 'num' },
    chg5d:    { label: 'שינוי שבועי', unit: '%', kind: 'num' },
    chg1m:    { label: 'שינוי חודשי', unit: '%', kind: 'num' },
    chg3m:    { label: 'שינוי 3 חודשים', unit: '%', kind: 'num' },
    chg6m:    { label: 'שינוי חצי שנה', unit: '%', kind: 'num' },
    chg1y:    { label: 'שינוי שנתי', unit: '%', kind: 'num' },
    d20:      { label: 'מרחק מ-SMA20', unit: '%', kind: 'num' },
    d50:      { label: 'מרחק מ-SMA50', unit: '%', kind: 'num' },
    d150:     { label: 'מרחק מ-SMA150', unit: '%', kind: 'num' },
    d200:     { label: 'מרחק מ-SMA200', unit: '%', kind: 'num' },
    slope150: { label: 'שיפוע SMA150 (20 ימים)', unit: '%', kind: 'num' },
    rsi:      { label: 'RSI (14)', unit: '', kind: 'num' },
    fromHigh: { label: 'מרחק משיא 52 שבועות', unit: '%', kind: 'num', hint: '0 = בשיא, ‎-10 = 10% מתחת לשיא' },
    fromLow:  { label: 'מעל שפל 52 שבועות', unit: '%', kind: 'num' },
    relVol:   { label: 'נפח יחסי', unit: '×', kind: 'num', hint: 'נפח היום חלקי ממוצע 50 ימים' },
    dollarVol:{ label: 'מחזור יומי ממוצע', unit: '$M', kind: 'num' },
    atrPct:   { label: 'תנודתיות יומית (ATR)', unit: '%', kind: 'num' },
    gap:      { label: 'פער פתיחה', unit: '%', kind: 'num' },
    streak:   { label: 'ימים ברצף (+ עליות / − ירידות)', unit: '', kind: 'num' },
    years:    { label: 'שנים במסחר', unit: '', kind: 'num', get: (r) => (isNum(r[UNI.ix.since]) ? THIS_YEAR - r[UNI.ix.since] : null) },
    ma150:    { label: 'איתות MA150', kind: 'enum', opts: [['any', 'נגיעה או חציה'], ['1', 'נגיעה'], ['2', 'חציה מעל 1%'], ['0', 'אין איתות']] },
    trend:    { label: 'מגמה (SMA50 מול SMA200)', kind: 'enum', opts: [['1', 'SMA50 מעל SMA200'], ['0', 'SMA50 מתחת SMA200']] },
    cross:    { label: 'חציית ממוצעים (10 ימים)', kind: 'enum', opts: [['1', 'Golden Cross'], ['-1', 'Death Cross']] },
    sp:       { label: 'חברות ב-S&P 500', kind: 'enum', opts: [['1', 'רק S&P 500'], ['0', 'מחוץ ל-S&P 500']] },
    // fundamentals (Yahoo Finance, refreshed with the market data)
    pe:       { label: 'מכפיל רווח (P/E)', unit: '×', kind: 'num', hint: 'מחיר חלקי רווח 12 חודשים אחרונים. חברות בהפסד לא מקבלות מכפיל', sectorRel: true },
    fpe:      { label: 'מכפיל רווח עתידי', unit: '×', kind: 'num', hint: 'מחיר חלקי תחזית הרווח של האנליסטים', sectorRel: true },
    eps:      { label: 'רווח למניה (EPS)', unit: '$', kind: 'num', hint: '12 חודשים אחרונים' },
    feps:     { label: 'EPS עתידי', unit: '$', kind: 'num' },
    epsGrowth:{ label: 'צמיחת רווח צפויה', unit: '%', kind: 'num', hint: 'EPS עתידי מול EPS של 12 החודשים האחרונים', get: (r) => { const e = r[UNI.ix.eps], f = r[UNI.ix.feps]; return isNum(e) && isNum(f) && e > 0 ? (f / e - 1) * 100 : null; } },
    dy:       { label: 'תשואת דיבידנד', unit: '%', kind: 'num', sectorRel: true },
    pb:       { label: 'מכפיל הון (P/B)', unit: '×', kind: 'num', sectorRel: true },
    beta:     { label: 'בטא', unit: '', kind: 'num', hint: 'מעל 1 = תנודתית יותר מהשוק' },
    rating:   { label: 'דירוג אנליסטים', unit: '', kind: 'num', hint: '1 = קנייה חזקה … 5 = מכירה חזקה' },
    earnDays: { label: 'ימים עד הדוח הבא', unit: '', kind: 'num', get: (r) => { const d = r[UNI.ix.earn]; return d ? Math.round((Date.parse(d) - Date.now()) / 864e5) : null; } },
  };
  const sval = (r, k) => (SF[k] && SF[k].get ? SF[k].get(r) : r[UNI.ix[k]]);
  const PRESETS = [
    { id: 'ma150', name: 'שיטת MA150 שלי', desc: 'שווי מעל 500 מיליון, מעל 3 שנים במסחר, ונגיעה ב-SMA150 או חציה שלו ביותר מ-1%.',
      c: [['cap', '>=', 0.5], ['years', '>', 3], ['ma150', '=', 'any']] },
    { id: 'breakout', name: 'פריצה לשיא שנתי', desc: 'עד 2% מתחת לשיא 52 שבועות, בנפח גבוה מהרגיל.',
      c: [['fromHigh', '>=', -2], ['relVol', '>=', 1.5], ['dollarVol', '>=', 20]] },
    { id: 'pullback', name: 'תיקון במגמה עולה', desc: 'RSI מתחת ל-40 אבל המחיר עדיין מעל SMA200 וה-SMA150 עולה.',
      c: [['rsi', '<=', 40], ['d200', '>', 0], ['slope150', '>', 0]] },
    { id: 'momentum', name: 'מומנטום חזק', desc: 'עלייה של 20%+ ב-3 חודשים, מעל SMA50, ומגמה עולה.',
      c: [['chg3m', '>=', 20], ['d50', '>', 0], ['trend', '=', '1']] },
    { id: 'near150', name: 'מתקרבות ל-MA150', desc: 'עד 3% מעל ה-SMA150, כשהוא בשיפוע עולה — מועמדות לאיתות.',
      c: [['d150', 'between', 0, 3], ['slope150', '>', 0], ['cap', '>=', 2]] },
    { id: 'golden', name: 'Golden Cross טרי', desc: 'SMA50 חצה מעל SMA200 ב-10 ימי המסחר האחרונים.',
      c: [['cross', '=', '1'], ['dollarVol', '>=', 10]] },
    { id: 'oversold', name: 'מכירת יתר', desc: 'RSI מתחת ל-30 בחברות גדולות.',
      c: [['rsi', '<', 30], ['cap', '>=', 10]] },
    { id: 'value', name: 'ערך: מכפיל נמוך', desc: 'מכפיל רווח בין 0 ל-15, רווחיות חיובית, ושווי מעל 2 מיליארד.',
      c: [['pe', 'between', 0, 15], ['eps', '>', 0], ['cap', '>=', 2]] },
    { id: 'growth', name: 'צמיחה במחיר סביר', desc: 'צמיחת רווח צפויה של 20%+ במכפיל עתידי עד 25, במגמה עולה.',
      c: [['epsGrowth', '>=', 20], ['fpe', 'between', 0, 25], ['trend', '=', '1']] },
    { id: 'dividend', name: 'דיבידנד יציב', desc: 'תשואת דיבידנד מעל 3%, מכפיל עד 25 ובטא נמוכה מ-1.',
      c: [['dy', '>=', 3], ['pe', 'between', 0, 25], ['beta', '<', 1]] },
    { id: 'earnings', name: 'דוח בשבוע הקרוב', desc: 'חברות מעל 10 מיליארד שמדווחות ב-7 הימים הקרובים.',
      c: [['earnDays', 'between', 0, 7], ['cap', '>=', 10]] },
    { id: 'volume', name: 'נפח חריג', desc: 'מחזור של פי 3 ומעלה מהממוצע, במניות נזילות.',
      c: [['relVol', '>=', 3], ['dollarVol', '>=', 10]] },
  ];
  const OPS = [['>=', '≥'], ['<=', '≤'], ['>', '>'], ['<', '<'], ['between', 'בין'], ['=', '=']];
  const SECTOR_OPS = [['<sec', 'מתחת לממוצע הסקטור'], ['>sec', 'מעל ממוצע הסקטור']];
  const COLS = [['chg1d', 'יום'], ['chg1m', 'חודש'], ['d150', 'מ-SMA150'], ['rsi', 'RSI'], ['pe', 'P/E'], ['eps', 'EPS'], ['dy', 'דיב׳'], ['relVol', 'נפח'], ['cap', 'שווי']];
  // average of each sector-relative field across a sector, ignoring missing/non-positive values (loss-making companies have no P/E)
  function sectorAverages(rows) {
    const sums = {};
    for (const r of rows) {
      const sec = r[UNI.ix.sector]; if (!sec) continue;
      const bucket = sums[sec] || (sums[sec] = {});
      for (const k in SF) {
        if (!SF[k].sectorRel) continue;
        const v = r[UNI.ix[k]]; if (!isNum(v) || v <= 0) continue;
        const b = bucket[k] || (bucket[k] = { sum: 0, n: 0 });
        b.sum += v; b.n++;
      }
    }
    const avg = {};
    for (const sec in sums) { avg[sec] = {}; for (const k in sums[sec]) avg[sec][k] = sums[sec][k].sum / sums[sec][k].n; }
    return avg;
  }

  function renderScreener() {
    const U = D.universe;
    const sectorAvg = U ? sectorAverages(U.rows) : {};
    let h = head('סורק מניות · שוק ארה״ב', 'סורק מניות', 'בנו הגדרת כניסה משלכם — ממוצעים נעים, RSI, מומנטום, נפח, שיאים ועוד — והסורק יחפש את המניות האמריקאיות שעונות על כל התנאים.', undefined, U ? marketStamp(U) : stamp(null));
    if (!UNI) return h + empty('עוד אין נתונים לסריקה', 'נתוני המניות מתעדכנים בריענון היומי הבא.', I.screener);
    const state = store.get('screen', null) || { c: PRESETS[0].c, sector: '', sort: 'cap', dir: -1 };
    const saved = store.get('screens', []);
    const sectorsList = [...new Set(U.rows.map((r) => r[UNI.ix.sector]).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'he'));
    h += `<div class="presets" id="presets">${PRESETS.map((p) => `<button type="button" class="preset" data-preset="${p.id}"><b>${esc(p.name)}</b><span>${esc(p.desc)}</span></button>`).join('')}</div>
      <div id="savedScreens"></div>
      <div class="card builder">
        <div class="builder-head"><div class="lab">התנאים שלי (כולם צריכים להתקיים)</div>
          <label class="sel-wrap">סקטור <select id="scSector" class="field sel"><option value="">כל הסקטורים</option>${sectorsList.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select></label></div>
        <div id="crit"></div>
        <div class="builder-foot">
          <button class="btn" type="button" id="addCrit">${I.plus}הוסף תנאי</button>
          <button class="btn ghost" type="button" id="clearCrit">נקה</button>
          <span style="flex:1"></span>
          <form id="saveForm" class="save-form"><input class="field" id="saveName" placeholder="שם להגדרה" maxlength="40" aria-label="שם להגדרה"><button class="btn" type="submit">שמור הגדרה</button></form>
        </div>
      </div>
      <div class="result-head"><h2 class="sec" style="margin:0" id="resCount"></h2><span class="src">${U.live ? 'מסחר חי' : 'נתוני סגירה'} ${esc(shortDate(U.asOf))} · ${U.count.toLocaleString('en-US')} מניות עם שווי מעל מיליארד דולר</span></div>
      <div class="tbl-wrap"><table id="resTable"></table></div>
      <p style="margin-top:10px"><button class="btn" type="button" id="more" hidden>הצג עוד</button></p>
      <details class="card flat block"><summary style="cursor:pointer;font-weight:600">מה כל מדד אומר?</summary><div class="terms" style="margin-top:12px" data-g>${Object.entries(SF).filter(([, f]) => f.hint || f.kind === 'enum').map(([, f]) => `<div><b>${esc(f.label)}</b><p class="muted" style="font-size:13.5px">${esc(f.hint || f.opts.map((o) => o[1]).join(' / '))}</p></div>`).join('')}
        <div><b>RSI (14)</b><p class="muted" style="font-size:13.5px">מתחת ל-30 = מכירת יתר, מעל 70 = קניית יתר.</p></div></div></details>`;

    after(() => {
      let st = JSON.parse(JSON.stringify(state)), shown = 100;
      const critBox = document.getElementById('crit');
      const fieldOpts = (k) => Object.entries(SF).map(([key, f]) => `<option value="${key}"${key === k ? ' selected' : ''}>${esc(f.label)}</option>`).join('');
      const drawCrit = () => {
        critBox.innerHTML = st.c.length ? st.c.map((c, i) => {
          const f = SF[c[0]] || SF.cap;
          const sectorOp = c[1] === '<sec' || c[1] === '>sec';
          const valUI = f.kind === 'enum'
            ? `<select class="field sel" data-i="${i}" data-part="v1">${f.opts.map(([v, l]) => `<option value="${v}"${String(c[2]) === v ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`
            : sectorOp
            ? `<span class="muted">(לפי הסקטור של כל מניה)</span>`
            : `<input class="field num-in" type="number" step="any" data-i="${i}" data-part="v1" value="${esc(c[2] ?? '')}" aria-label="ערך">${c[1] === 'between' ? `<span class="muted">עד</span><input class="field num-in" type="number" step="any" data-i="${i}" data-part="v2" value="${esc(c[3] ?? '')}" aria-label="ערך עליון">` : ''}<span class="unit">${esc(f.unit || '')}</span>`;
          return `<div class="crit-row">
            <select class="field sel" data-i="${i}" data-part="k" aria-label="מדד">${fieldOpts(c[0])}</select>
            ${f.kind === 'enum' ? '<span class="muted op-eq">הוא</span>' : `<select class="field sel op" data-i="${i}" data-part="op" aria-label="תנאי">${OPS.filter((o) => o[0] !== '=').map(([v, l]) => `<option value="${v}"${c[1] === v ? ' selected' : ''}>${l}</option>`).join('')}${f.sectorRel ? SECTOR_OPS.map(([v, l]) => `<option value="${v}"${c[1] === v ? ' selected' : ''}>${l}</option>`).join('') : ''}</select>`}
            ${valUI}
            <button class="btn ghost" type="button" data-rm="${i}" aria-label="הסר תנאי">${I.x}</button></div>`;
        }).join('') : '<p class="muted" style="padding:6px 0">אין תנאים — מוצגות כל המניות. הוסיפו תנאי או בחרו הגדרה מוכנה.</p>';
      };
      const test = (r, c) => {
        const [k, op, a, b] = c; const f = SF[k]; if (!f) return true;
        const v = sval(r, k);
        if (f.kind === 'enum') { if (a === 'any') return v === 1 || v === 2; return String(v) === String(a); }
        if (op === '<sec' || op === '>sec') {
          if (!isNum(v)) return false;
          const secAvg = sectorAvg[r[UNI.ix.sector]] && sectorAvg[r[UNI.ix.sector]][k];
          if (!isNum(secAvg)) return false;
          return op === '<sec' ? v < secAvg : v > secAvg;
        }
        if (a === '' || a == null || !isFinite(+a)) return true;       // unfinished condition: ignore
        if (!isNum(v)) return false;
        switch (op) {
          case '>=': return v >= +a; case '<=': return v <= +a; case '>': return v > +a; case '<': return v < +a;
          case 'between': { const lo = Math.min(+a, isFinite(+b) && b !== '' ? +b : Infinity), hi = Math.max(+a, isFinite(+b) && b !== '' ? +b : -Infinity); return v >= lo && v <= (isFinite(hi) ? hi : Infinity); }
          default: return true;
        }
      };
      const run = () => {
        store.set('screen', st);
        const res = U.rows.filter((r) => (!st.sector || r[UNI.ix.sector] === st.sector) && st.c.every((c) => test(r, c)));
        const k = st.sort, dir = st.dir;
        res.sort((a, b) => { const x = sval(a, k), y = sval(b, k); if (!isNum(x)) return 1; if (!isNum(y)) return -1; return (x - y) * dir; });
        document.getElementById('resCount').innerHTML = `<span class="n">${res.length.toLocaleString('en-US')}</span> מניות עונות על ההגדרה`;
        const arrow = (c) => (c === k ? (dir < 0 ? ' ▼' : ' ▲') : '');
        document.getElementById('resTable').innerHTML = `<thead><tr><th>מניה</th><th>סקטור</th><th class="num">מחיר</th>${COLS.map(([c, l]) => `<th class="num sortable" data-sort="${c}" tabindex="0" aria-sort="${c === k ? (dir < 0 ? 'descending' : 'ascending') : 'none'}">${l}${arrow(c)}</th>`).join('')}<th></th></tr></thead>
          <tbody>${res.slice(0, shown).map((r) => { const g = (f) => r[UNI.ix[f]]; return `<tr>
            <td><a class="tkr" href="${tvUrl(g('t'))}" target="_blank" rel="noopener">${esc(g('t'))}</a>${g('ma150') ? ` <span class="chip up" title="איתות MA150">${g('ma150') === 2 ? 'חציה' : 'נגיעה'}</span>` : ''}<div class="muted cell-name">${esc(g('name'))}</div></td>
            <td class="muted" style="font-size:13px">${esc(g('sector'))}</td><td class="num">${usd(g('price'))}</td>
            <td class="num">${pct(g('chg1d'), 2)}</td><td class="num">${pct(g('chg1m'))}</td><td class="num">${pct(g('d150'))}</td>
            <td class="num">${num(g('rsi'), 0)}</td><td class="num">${isNum(g('pe')) ? num(g('pe'), 1) : '<span class="faint">—</span>'}</td><td class="num">${isNum(g('eps')) ? usd(g('eps')) : '<span class="faint">—</span>'}</td><td class="num">${isNum(g('dy')) && g('dy') > 0 ? `<span class="n">${g('dy').toFixed(2)}%</span>` : '<span class="faint">—</span>'}</td>
            <td class="num">${isNum(g('relVol')) ? `<span class="n">×${g('relVol').toFixed(1)}</span>` : '—'}</td>
            <td class="num"><span class="n">${isNum(g('cap')) ? (g('cap') >= 1000 ? (g('cap') / 1000).toFixed(2) + 'T' : g('cap').toFixed(1) + 'B') : '—'}</span></td>
            <td>${starBtn(g('t'))}</td></tr>`; }).join('')}</tbody>`;
        const more = document.getElementById('more');
        more.hidden = res.length <= shown; more.textContent = `הצג עוד (${(res.length - shown).toLocaleString('en-US')})`;
        main.querySelectorAll('[data-preset]').forEach((b) => b.setAttribute('aria-pressed', JSON.stringify(PRESETS.find((p) => p.id === b.dataset.preset).c) === JSON.stringify(st.c) && !st.sector));
      };
      const drawSaved = () => {
        const list = store.get('screens', []);
        document.getElementById('savedScreens').innerHTML = list.length ? `<div class="quick" style="margin:0 0 14px"><span class="lab" style="align-self:center">ההגדרות שלי:</span>${list.map((s, i) => `<span class="saved-chip"><button type="button" data-load="${i}">${esc(s.name)}</button><button type="button" data-del="${i}" aria-label="מחק ${esc(s.name)}">${I.x}</button></span>`).join('')}</div>` : '';
      };
      const refresh = () => { shown = 100; drawCrit(); run(); };

      document.getElementById('scSector').value = st.sector || '';
      drawCrit(); drawSaved(); run();

      main.querySelector('#presets').addEventListener('click', (e) => {
        const b = e.target.closest('[data-preset]'); if (!b) return;
        const p = PRESETS.find((x) => x.id === b.dataset.preset);
        st.c = JSON.parse(JSON.stringify(p.c)); st.sector = ''; document.getElementById('scSector').value = ''; refresh();
      });
      critBox.addEventListener('change', (e) => {
        const el = e.target.closest('[data-part]'); if (!el) return;
        const c = st.c[+el.dataset.i], part = el.dataset.part;
        if (part === 'k') { const f = SF[el.value]; st.c[+el.dataset.i] = f.kind === 'enum' ? [el.value, '=', f.opts[0][0]] : [el.value, '>=', '']; drawCrit(); }
        else if (part === 'op') { c[1] = el.value; if (el.value === 'between' && c[3] == null) c[3] = ''; drawCrit(); }
        else if (part === 'v1') c[2] = SF[c[0]].kind === 'enum' ? el.value : el.value === '' ? '' : +el.value;
        else if (part === 'v2') c[3] = el.value === '' ? '' : +el.value;
        shown = 100; run();
      });
      critBox.addEventListener('input', (e) => {
        const el = e.target.closest('input[data-part]'); if (!el) return;
        const c = st.c[+el.dataset.i]; if (el.dataset.part === 'v1') c[2] = el.value === '' ? '' : +el.value; else c[3] = el.value === '' ? '' : +el.value;
        shown = 100; run();
      });
      critBox.addEventListener('click', (e) => { const b = e.target.closest('[data-rm]'); if (b) { st.c.splice(+b.dataset.rm, 1); refresh(); } });
      document.getElementById('addCrit').addEventListener('click', () => { st.c.push(['rsi', '<=', '']); refresh(); const ins = critBox.querySelectorAll('input'); if (ins.length) ins[ins.length - 1].focus(); });
      document.getElementById('clearCrit').addEventListener('click', () => { st.c = []; st.sector = ''; document.getElementById('scSector').value = ''; refresh(); });
      document.getElementById('scSector').addEventListener('change', (e) => { st.sector = e.target.value; shown = 100; run(); });
      document.getElementById('more').addEventListener('click', () => { shown += 100; run(); });
      const sortBy = (th) => { const k = th.dataset.sort; if (st.sort === k) st.dir = -st.dir; else { st.sort = k; st.dir = -1; } run(); };
      document.getElementById('resTable').addEventListener('click', (e) => { const th = e.target.closest('[data-sort]'); if (th) sortBy(th); });
      document.getElementById('resTable').addEventListener('keydown', (e) => { const th = e.target.closest('[data-sort]'); if (th && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sortBy(th); } });
      document.getElementById('saveForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('saveName').value.trim(); if (!name) { document.getElementById('saveName').focus(); return; }
        const list = store.get('screens', []).filter((s) => s.name !== name); list.unshift({ name, c: st.c, sector: st.sector });
        store.set('screens', list.slice(0, 12)); document.getElementById('saveName').value = ''; drawSaved();
      });
      document.getElementById('savedScreens').addEventListener('click', (e) => {
        const l = e.target.closest('[data-load]'), d = e.target.closest('[data-del]'); const list = store.get('screens', []);
        if (l) { const s = list[+l.dataset.load]; st.c = JSON.parse(JSON.stringify(s.c)); st.sector = s.sector || ''; document.getElementById('scSector').value = st.sector; refresh(); }
        if (d) { list.splice(+d.dataset.del, 1); store.set('screens', list); drawSaved(); }
      });
    });
    return h;
  }

  /* ================= 5. PERFORMANCE ================= */
  function renderPerformance() {
    const H = D.history;
    let h = head('מעקב ביצועים', 'איך האיתותים עבדו?', 'כל איתות שיצא ב-Zozo נשמר עם המחיר ביום האיתות, ומושווה ל-SPY באותה תקופה. בלי לבחור רק את ההצלחות.', H ? H.updatedAt : null);
    const list = (H && H.signals) || [];
    if (!list.length) return h + empty('עוד אין היסטוריה', 'ברגע שיצא האיתות הראשון (MA150 או מצב חריג) הוא יופיע כאן, והתשואה שלו תתעדכן אחרי שבוע, חודש ושלושה חודשים.', I.performance);
    const withM = list.filter((x) => isNum(x.r1m));
    const wins = withM.filter((x) => x.r1m > 0).length;
    const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
    const avgM = avg(withM.map((x) => x.r1m));
    const excess = avg(withM.filter((x) => isNum(x.spy1m)).map((x) => x.r1m - x.spy1m));
    const open = list.map((x) => (isNum(x.price) && x.entry ? (x.price / x.entry - 1) * 100 : null)).filter(isNum);
    h += `<div class="kpis">
      <div class="kpi"><div class="lab">איתותים</div><div class="v n">${list.length}</div><div class="muted" style="font-size:12.5px">${withM.length} עם חודש נתונים</div></div>
      <div class="kpi"><div class="lab">אחוז הצלחה (חודש)</div><div class="v n">${withM.length ? Math.round((wins / withM.length) * 100) + '%' : '—'}</div>${withM.length ? `<div class="bar"><i style="width:${(wins / withM.length) * 100}%"></i></div>` : ''}</div>
      <div class="kpi"><div class="lab">תשואה ממוצעת (חודש)</div><div class="v">${pct(avgM)}</div></div>
      <div class="kpi"><div class="lab">מול SPY (חודש)</div><div class="v">${pct(excess)}</div><div class="muted" style="font-size:12.5px">מאז האיתות, כל האיתותים: ${pct(avg(open))}</div></div>
    </div>
    <div class="tbl-wrap"><table><thead><tr><th>מניה</th><th>סוג</th><th>תאריך</th><th class="num">כניסה</th><th class="num">היום</th><th class="num">שבוע</th><th class="num">חודש</th><th class="num">3 חודשים</th><th class="num">SPY חודש</th><th></th></tr></thead><tbody>
    ${list.map((x) => `<tr><td><span class="tkr">${esc(x.ticker)}</span><div class="muted" style="font-size:12px">${esc(x.name || '')}</div></td><td>${x.kind === 'extreme' ? '<span class="chip amber">חריג</span>' : '<span class="chip">MA150</span>'}</td><td>${esc(shortDate(x.date))}</td><td class="num">${usd(x.entry)}</td><td class="num">${usd(x.price)}</td><td class="num">${pct(x.r1w)}</td><td class="num">${pct(x.r1m)}</td><td class="num">${pct(x.r3m)}</td><td class="num">${pct(x.spy1m)}</td><td>${buyBtn(x.ticker, x.entry, x.date, x.name)}</td></tr>`).join('')}
    </tbody></table></div><p class="src" style="margin-top:8px">תשואה מחושבת ממחיר הסגירה ביום האיתות. "—" = עוד לא עבר מספיק זמן.</p>`;
    return h;
  }

  /* ================= 6. WATCHLIST ================= */
  function renderWatchlist() {
    const h = head('רשימת מעקב', 'המניות שלי', 'הוסיפו טיקרים ועקבו אחריהם בגרף חי עם ממוצע ה-150. הרשימה נשמרת בדפדפן הזה.') + `
      <form class="addrow" id="wlf"><input class="field" id="wli" placeholder="טיקר, למשל NVDA" maxlength="12" aria-label="טיקר להוספה" autocomplete="off"><button class="btn primary" type="submit">${I.plus}הוסף</button></form>
      <p class="src" id="wlerr" style="margin-top:6px" aria-live="polite"></p>
      <div class="wl" id="wl"></div>`;
    after(drawWatchlist);
    return h;
  }
  function drawWatchlist() {
    const box = document.getElementById('wl'); if (!box) return;
    const list = WL.all();
    box.innerHTML = list.length ? list.map((t) => {
      const sig = D.signals && (D.signals.items || []).find((x) => x.ticker === t);
      const hist = D.history && (D.history.signals || []).find((x) => x.ticker === t);
      const info = sig ? `<span class="chip up">איתות MA150 היום</span>` : hist ? `איתות אחרון ${esc(shortDate(hist.date))} ב-${usd(hist.entry)}` : 'אין איתות פעיל';
      return `<div class="card wl-item" data-t="${esc(t)}"><div style="display:flex;align-items:center">
        <button class="wl-head" type="button" aria-expanded="false"><span class="tkr">${esc(t)}</span><span class="info">${info}</span><span class="chev" style="width:18px;height:18px;display:inline-flex">${I.chev}</span></button>
        <button class="btn ghost" type="button" data-rm="${esc(t)}" aria-label="הסר ${esc(t)}" style="margin-inline-end:8px">${I.x}</button></div>
        <div class="wl-body" hidden><div class="tv-box" style="border:0;border-radius:0" dir="ltr"></div></div></div>`;
    }).join('') : empty('הרשימה ריקה', 'הוסיפו טיקר למעלה, או לחצו "למעקב" על כל איתות או תעודת סל באתר.', I.watchlist);
    box.querySelectorAll('.wl-head').forEach((b) => b.addEventListener('click', () => {
      const item = b.closest('.wl-item'), body = item.querySelector('.wl-body');
      const open = body.hidden; body.hidden = !open; item.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
      if (open && !body.dataset.loaded) { body.dataset.loaded = 1; C.tvWidget(body.querySelector('.tv-box'), item.dataset.t); }
    }));
    box.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { WL.toggle(b.dataset.rm); drawWatchlist(); }));
    const f = document.getElementById('wlf');
    if (f && !f.dataset.bound) {
      f.dataset.bound = 1;
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const inp = document.getElementById('wli'), err = document.getElementById('wlerr');
        const t = inp.value.trim().toUpperCase();
        if (!/^[A-Z][A-Z0-9.\-]{0,9}$/.test(t)) { err.textContent = 'טיקר לא תקין — אותיות באנגלית, למשל AAPL או BRK.B'; return; }
        err.textContent = '';
        if (!WL.has(t)) WL.toggle(t);
        inp.value = ''; drawWatchlist();
      });
    }
  }

  /* ================= 7. CALENDAR ================= */
  function renderCalendar() {
    const cal = D.calendar;
    let h = head('דוחות ומאקרו', 'לוח אירועים', 'דוחות רבעוניים, נתוני מאקרו והחלטות ריבית — בשעון ישראל.', cal ? cal.updatedAt : null);
    const evs = (cal && cal.events) || [];
    if (!evs.length) return h + empty('הלוח עוד ריק', 'אירועי השבוע יתווספו בריענון היומי הבא.', I.calendar);
    const onlyImp = store.get('calImp', false);
    h += `<div style="display:flex;gap:8px;margin-bottom:18px"><button class="btn" type="button" id="impBtn" aria-pressed="${onlyImp}">רק אירועים חשובים</button></div><div id="cal"></div>`;
    after(() => {
      const draw = () => {
        const imp = store.get('calImp', false);
        const list = evs.filter((e) => !imp || e.important).sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
        const days = {};
        list.forEach((e) => { const k = heDate(e.at, { year: 'numeric', month: '2-digit', day: '2-digit' }); (days[k] = days[k] || []).push(e); });
        const kindChip = { earnings: '<span class="chip">דוח</span>', macro: '<span class="chip acc">מאקרו</span>', fed: '<span class="chip down">פד</span>', israel: '<span class="chip amber">ישראל</span>' };
        document.getElementById('cal').innerHTML = Object.keys(days).length ? Object.keys(days).map((k) => {
          const d0 = days[k][0].at, past = Date.parse(d0) < Date.now() - 86400000;
          return `<div class="day"${past ? ' style="opacity:.55"' : ''}><h3>${esc(heDate(d0, { weekday: 'long', day: 'numeric', month: 'long' }))}<span class="muted" style="font-size:13px;font-family:var(--body)">${days[k].length === 1 ? 'אירוע אחד' : days[k].length + ' אירועים'}</span></h3>
          ${days[k].map((e) => `<div class="ev${e.important ? ' imp' : ''}"><span class="time">${e.allDay ? (e.timing === 'BMO' ? 'לפני' : e.timing === 'AMC' ? 'אחרי' : '—') : esc(heDate(e.at, { hour: '2-digit', minute: '2-digit', hour12: false }))}</span>
            <div><div class="title">${e.ticker ? `<span class="tkr">${esc(e.ticker)}</span> · ` : ''}${esc(e.title)}</div><div class="det">${[e.timing ? (e.timing === 'BMO' ? 'לפני הפתיחה (BMO)' : 'אחרי הסגירה (AMC)') : '', e.consensus ? 'קונצנזוס ' + esc(e.consensus) : '', e.prior ? 'קודם ' + esc(e.prior) : '', e.impliedMove ? 'תנודה צפויה ' + esc(e.impliedMove) : ''].filter(Boolean).join(' · ')}</div></div>
            ${kindChip[e.kind] || ''}</div>`).join('')}</div>`;
        }).join('') : '<p class="muted">אין אירועים חשובים בטווח.</p>';
      };
      draw();
      document.getElementById('impBtn').addEventListener('click', (e) => { const v = !store.get('calImp', false); store.set('calImp', v); e.currentTarget.setAttribute('aria-pressed', v); draw(); });
    });
    return h;
  }

  /* ================= 8. PORTFOLIO ================= */
  function renderPortfolio() {
    const pos = PF.all();
    let h = head('תרגול, בלי כסף אמיתי', 'תיק וירטואלי', 'קנו וירטואלית כל איתות במחיר של יום האיתות, ועקבו איך התיק היה מתנהג. התיק נשמר בדפדפן הזה.', D.history ? D.history.updatedAt : undefined);
    if (!pos.length) return h + empty('התיק ריק', 'לחצו "לתיק הווירטואלי" על איתות בעמוד <a href="#signals">האיתותים</a> או בעמוד <a href="#performance">הביצועים</a>.', I.portfolio);
    let inv = 0, val = 0, priced = 0;
    const rows = pos.map((p) => {
      const now = latestPrice(p.ticker), qty = p.amount / p.entry;
      const v = isNum(now) ? qty * now : null;
      inv += p.amount; if (v != null) { val += v; priced += p.amount; }
      return `<tr><td><span class="tkr">${esc(p.ticker)}</span><div class="muted" style="font-size:12px">${esc(p.name || '')}</div></td><td>${esc(shortDate(p.date))}</td><td class="num">${usd(p.entry)}</td><td class="num">${usd(now)}</td><td class="num">${num(qty, 2)}</td><td class="num">${usd(p.amount, 0)}</td><td class="num">${usd(v, 0)}</td><td class="num">${pct(v != null ? (v / p.amount - 1) * 100 : null)}</td><td><button class="btn ghost" type="button" data-pfrm="${esc(p.id)}" aria-label="הסר">${I.x}</button></td></tr>`;
    }).join('');
    const pl = val - priced;
    h += `<div class="kpis">
      <div class="kpi"><div class="lab">הושקע</div><div class="v">${usd(inv, 0)}</div></div>
      <div class="kpi"><div class="lab">שווי נוכחי</div><div class="v">${usd(val + (inv - priced), 0)}</div></div>
      <div class="kpi"><div class="lab">רווח / הפסד</div><div class="v"><span class="n ${pl >= 0 ? 'up' : 'down'}">${pl >= 0 ? '+' : '−'}$${Math.abs(pl).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span></div></div>
      <div class="kpi"><div class="lab">תשואה</div><div class="v">${pct(priced ? (val / priced - 1) * 100 : null)}</div></div>
    </div>
    <div class="tbl-wrap"><table><thead><tr><th>מניה</th><th>נקנה</th><th class="num">מחיר כניסה</th><th class="num">היום</th><th class="num">כמות</th><th class="num">הושקע</th><th class="num">שווי</th><th class="num">תשואה</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="src" style="margin-top:8px">המחירים מתעדכנים בריענון היומי של Zozo (מחיר סגירה).</p>
    <p style="margin-top:18px"><button class="btn ghost" type="button" id="pfReset">איפוס התיק</button></p>`;
    after(() => {
      main.querySelectorAll('[data-pfrm]').forEach((b) => b.addEventListener('click', () => { PF.remove(b.dataset.pfrm); route(); }));
      document.getElementById('pfReset').addEventListener('click', (e) => { const b = e.currentTarget; if (b.dataset.armed) { store.set('portfolio', []); route(); } else { b.dataset.armed = 1; b.textContent = 'ללחוץ שוב כדי למחוק את כל הפוזיציות'; b.classList.remove('ghost'); } });
    });
    return h;
  }

  /* ================= 9. LEARN ================= */
  function renderLearn() {
    const g = D.glossary || [];
    const cats = [...new Set(g.map((x) => x.cat))];
    const h = head('מילון ולמידה', 'למד את השפה', 'המונחים שמופיעים ב-Zozo, בשפה פשוטה. בכל מקום באתר, מונח עם קו מקווקו מציג הסבר בריחוף או בלחיצה.') + `
      <div class="search" style="margin-bottom:22px">${I.search}<input class="field" id="lq" type="search" placeholder="חיפוש מונח..." aria-label="חיפוש מונח"></div>
      <div id="terms">${cats.map((c) => `<section class="block" style="margin-top:26px" data-cat>${sec('', c)}<div class="terms">${g.filter((x) => x.cat === c).map((x) => `<article class="card flat term" data-txt="${esc((x.term + ' ' + (x.aliases || []).join(' ') + ' ' + x.def).toLowerCase())}"><h3>${esc(x.term)}</h3>${(x.aliases || []).length ? `<div class="al">${esc(x.aliases.join(' · '))}</div>` : ''}<p>${esc(x.def)}</p></article>`).join('')}</div></section>`).join('')}</div>`;
    after(() => {
      const inp = document.getElementById('lq');
      inp.addEventListener('input', () => {
        const q = inp.value.trim().toLowerCase();
        main.querySelectorAll('.term').forEach((t) => { t.hidden = q && !t.dataset.txt.includes(q); });
        main.querySelectorAll('[data-cat]').forEach((s) => { s.hidden = !s.querySelector('.term:not([hidden])'); });
      });
    });
    return h;
  }

  /* ================= 10. ALERTS ================= */
  function renderAlerts() {
    const rows = [
      { icon: I.signals, t: 'איתות MA150 יומי', d: 'בימים ש-SPY סוגר 3 ימים אדומים ברצף: רשימת המניות מ-S&P 500 שעומדות בשלושת התנאים, או הודעה מפורשת שאף אחת לא עמדה.', s: 'פעיל · מייל' },
      { icon: I.extreme, t: 'מצב חריג', d: 'רק כש-SPY ב-3+ ימים אדומים וגם מדד הפחד מתחת ל-25. נדיר — ולכן כשהוא מגיע, שווה לשים לב.', s: 'פעיל · מייל' },
      { icon: I.alerts, t: 'התראת שוק דחופה', d: 'תנועה של יותר מ-2% במדדים, VIX מעל 25, קפיצה חדה בתשואות, החלטת ריבית מפתיעה או הסלמה גיאופוליטית.', s: 'פעיל · מייל' },
    ];
    return head('התראות', 'לא לפספס רגע', 'שלוש התראות אוטומטיות רצות היום ברקע ונשלחות במייל. בשלב הבא של Zozo כל משתמש יוכל להירשם ולבחור מה לקבל.') + `
      <div class="card flat">${rows.map((r) => `<div class="alert-row"><span class="ic">${r.icon}</span><div><h3>${esc(r.t)}</h3><p class="muted">${esc(r.d)}</p></div><span class="chip up">${esc(r.s)}</span></div>`).join('')}</div>
      <section class="block">${sec('', 'בקרוב: Zozo לכולם')}
        <div class="grid g3">
          <div class="card flat"><div style="color:var(--accent);width:26px;height:26px">${I.users}</div><h3 style="margin-top:8px">חשבון אישי</h3><p class="muted">התחברות, רשימת מעקב ותיק וירטואלי שמסונכרנים בין הטלפון למחשב.</p></div>
          <div class="card flat"><div style="color:var(--accent);width:26px;height:26px">${I.mail}</div><h3 style="margin-top:8px">הרשמה להתראות</h3><p class="muted">כל משתמש בוחר אילו התראות לקבל — במייל או כהתראת Push בטלפון.</p></div>
          <div class="card flat"><div style="color:var(--accent);width:26px;height:26px">${I.brief}</div><h3 style="margin-top:8px">דיון על איתותים</h3><p class="muted">תגובות והצבעות של הקהילה על כל איתות.</p></div>
        </div>
      </section>`;
  }

  /* ================= boot ================= */
  buildNav();
  buildTape();
  addEventListener('hashchange', () => route());

  // Live data: while the US market is open the server rewrites movers/universe every 15 minutes.
  // Re-load them every 5 minutes (only on the hosted site, and only while the tab is visible) and redraw
  // the screens that use them — unless the viewer is typing in a field.
  const LIVE_ROUTES = ['brief', 'movers', 'screener', 'sectors', 'signals', 'extreme', 'performance', 'calendar'];
  const reloadScript = (src) => new Promise((res) => {
    const s = document.createElement('script');
    s.src = src + '?t=' + Date.now(); s.onload = () => { s.remove(); res(true); }; s.onerror = () => { s.remove(); res(false); };
    document.head.appendChild(s);
  });
  async function refreshLive() {
    if (document.hidden || !D.movers) return;
    const before = D.movers.updatedAt;
    const ok = await reloadScript('data/movers.js');
    if (!ok || D.movers.updatedAt === before) return;
    // every cloud run rewrites these together; the brief files change once a day
    await Promise.all(['universe', 'live', 'extreme', 'signals', 'history', 'brief', 'weekly', 'calendar'].map((n) => reloadScript(`data/${n}.js`)));
    UNI = buildUni();
    buildTape();
    const cur = (location.hash.replace(/^#\/?/, '') || 'brief').split(/[\/.]/)[0];
    const typing = document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
    if (LIVE_ROUTES.includes(cur) && !typing) route(true);
  }
  if (!window.ZOZO_ARTIFACT && location.protocol.startsWith('http')) {
    setInterval(refreshLive, 5 * 60 * 1000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && D.movers && Date.now() - Date.parse(D.movers.updatedAt) > 10 * 60 * 1000) refreshLive(); });
  }
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (!document.documentElement.getAttribute('data-theme')) route(); });
  // PWA: offline cache for the standalone site (not inside the claude.ai Artifact, where service workers are blocked)
  if ('serviceWorker' in navigator && !window.ZOZO_ARTIFACT && window.isSecureContext) {
    // only a *returning* visit already has a controller; that's the case where a controllerchange means
    // a newer version just took over. On a first-ever visit (no controller yet) the first activation also
    // fires controllerchange, and reloading then just reloads a page that was already fresh — it only
    // shows up as an unprompted flash/refresh for new visitors, so skip it in that case.
    const hadController = !!navigator.serviceWorker.controller;
    addEventListener('load', () => navigator.serviceWorker.register('sw.js').then((reg) => reg.update()).catch(() => {}));
    if (hadController) {
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloaded) { reloaded = true; location.reload(); } });
    }
  }
  const boot = () => route();
  if (window.LightweightCharts || document.readyState === 'complete') boot(); else addEventListener('load', boot, { once: true });
})();
