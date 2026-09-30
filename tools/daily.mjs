// Zozo — signals that depend on completed trading sessions, recomputed on every run (cheap, idempotent):
//   - SPY red-day streak (close < open, counted back from the last COMPLETED session)  → signals.js gate + extreme.js
//   - CNN Fear & Greed (from data/live.js, written just before by tools/live.mjs)       → extreme.js
//   - Extreme signal (streak >= 3 AND Fear & Greed < 25) + its history                 → extreme.js
//   - MA150 screen over the S&P 500 when the gate is open (streak >= 3)                 → signals.js
//   - every signal ever issued, with returns after 1w / 1m / 3m vs SPY                   → history.js
// Same rules as the ma150-entry-screen / ma150-daily-screen / spy-fear-greed-alert skills.
// Files are rewritten each run (fresh updatedAt); data/.changed lists the ones whose content really changed,
// so the workflow commits only those.
// Usage: node tools/daily.mjs
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36', Accept: 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const isoIL = (d) => {
  const local = d.toLocaleString('sv-SE', { timeZone: 'Asia/Jerusalem' }).replace(' ', 'T');
  const off = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jerusalem', timeZoneName: 'shortOffset' }).formatToParts(d).find((p) => p.type === 'timeZoneName').value;
  return local + '+0' + off.replace('GMT+', '') + ':00';
};
async function getJSON(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) });
      if (res.status === 429) { await sleep(2500 * (i + 1)); continue; }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (e) { if (i === tries - 1) throw e; await sleep(1000 * (i + 1)); }
  }
  throw new Error('rate limited');
}

/* ---------- data files: keep each file's header comment, replace only the ZOZO.<key> assignment ---------- */
const file = (n) => join(ROOT, 'data', n);
function load(name, key) {
  if (!existsSync(file(name))) return null;
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);   // window === global, as in a browser, so bare `ZOZO` resolves
  try { vm.runInContext(readFileSync(file(name), 'utf8').replace(/^﻿/, ''), ctx); } catch { return null; }
  return ctx.ZOZO ? ctx.ZOZO[key] : null;
}
const strip = (o) => JSON.stringify(o, (k, v) => (k === 'updatedAt' ? undefined : v));
function save(name, key, obj) {
  const src = existsSync(file(name)) ? readFileSync(file(name), 'utf8') : '';
  const i = src.indexOf('window.ZOZO');
  const header = i > 0 ? src.slice(0, i) : `/* Zozo — ${key}. Written by tools/daily.mjs. */\n`;
  const before = load(name, key);
  writeFileSync(file(name), `${header}window.ZOZO = window.ZOZO || {};\nZOZO.${key} = ${JSON.stringify(obj, null, 1)};\n`);
  if (!before || strip(before) !== strip(obj)) appendFileSync(file('.changed'), `data/${name}\n`);
}

/* ---------- Yahoo daily candles; drop today's candle while the session is still open ---------- */
const nyNow = () => Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  .formatToParts(new Date()).map((p) => [p.type, p.value]));
const NY = nyNow(), NY_DATE = `${NY.year}-${NY.month}-${NY.day}`, NY_MIN = +NY.hour * 60 + +NY.minute;
async function daily(sym, range = '1y') {
  const r = (await getJSON(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym.replace('.', '-'))}?range=${range}&interval=1d`)).chart.result[0];
  const q = r.indicators.quote[0], rows = [];
  for (let i = 0; i < r.timestamp.length; i++) {
    if (q.close[i] == null || q.open[i] == null || q.high[i] == null || q.low[i] == null) continue;
    const d = new Date(r.timestamp[i] * 1000).toLocaleDateString('sv-SE', { timeZone: 'America/New_York' });
    rows.push({ d, o: q.open[i], h: q.high[i], l: q.low[i], c: q.close[i], v: q.volume[i] || 0 });
  }
  // the regular session closes at 16:00 New York time; until a few minutes after, today's candle is not final
  if (rows.length && rows[rows.length - 1].d === NY_DATE && NY_MIN < 16 * 60 + 10) rows.pop();
  return { rows, meta: r.meta };
}
const SMA = (a, n, end) => { if (end < n - 1) return null; let s = 0; for (let k = end - n + 1; k <= end; k++) s += a[k]; return s / n; };

const now = new Date(), updatedAt = isoIL(now);
const live = load('live.js', 'live');
const universe = load('universe.js', 'universe');

/* ---------- 1. SPY streak ---------- */
const spy = await daily('SPY', '6mo');
const last8 = spy.rows.slice(-8);
let streak = 0; for (let i = last8.length - 1; i >= 0; i--) { if (last8[i].c < last8[i].o) streak++; else break; }
const asOf = last8[last8.length - 1].d, spyClose = r2(last8[last8.length - 1].c);
const candles = last8.map((x) => ({ date: x.d, open: r2(x.o), close: r2(x.c) }));
console.log(`SPY: last completed session ${asOf}, red streak ${streak}, close ${spyClose}`);

/* ---------- 2. Extreme signal ---------- */
const prevExt = load('extreme.js', 'extreme') || {};
const fg = (live && live.fearGreed) || prevExt.fearGreed || null;
const active = streak >= 3 && fg && isFinite(fg.score) && fg.score < 25;
const extHistory = (prevExt.history || []).map((h) => ({ ...h, spyNow: spyClose }));
if (active && !extHistory.some((h) => h.date === asOf)) extHistory.unshift({ date: asOf, score: fg.score, streak, spyClose, spyNow: spyClose });
save('extreme.js', 'extreme', {
  updatedAt, fearGreed: fg,
  spy: { candles, streak, lastClose: spyClose, source: 'Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)' },
  active: !!active, history: extHistory,
});

/* ---------- 3. MA150 screen (S&P 500) when the gate is open ---------- */
const prevSig = load('signals.js', 'signals') || {};
const gate = { streak, met: streak >= 3 || process.env.ZOZO_TEST_GATE === '1', candles, source: 'Yahoo Finance' };   // ZOZO_TEST_GATE=1: test the screen path
let items = [], scanned = 0, failedN = 0;
if (gate.met && prevSig.asOf === asOf && prevSig.gate && prevSig.gate.met) {
  ({ items, scanned, failed: failedN } = prevSig);            // this session was already screened
  console.log(`MA150: gate open, session ${asOf} already screened (${items.length} signals)`);
} else if (gate.met) {
  const GICS_HE = { 'Information Technology': 'טכנולוגיה', 'Health Care': 'בריאות', Financials: 'פיננסים', 'Consumer Discretionary': 'צריכה מחזורית', Industrials: 'תעשייה', Energy: 'אנרגיה', 'Real Estate': 'נדל"ן', Utilities: 'תשתיות וחשמל', Materials: 'חומרים', 'Communication Services': 'תקשורת', 'Consumer Staples': 'צריכה בסיסית' };
  const sp = readFileSync(join(ROOT, 'tools', 'sp500.tsv'), 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean).map((l) => { const [t, name, sec] = l.split('\t'); return { t: t.trim(), name, sector: GICS_HE[sec] || sec }; });
  const capOf = new Map(universe ? universe.rows.map((r) => [r[0], r[universe.fields.indexOf('cap')]]) : []);
  const fmtCap = (b) => (b >= 1000 ? (b / 1000).toFixed(2) + 'T' : b >= 1 ? b.toFixed(1) + 'B' : Math.round(b * 1000) + 'M');
  const MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  let idx = 0;
  const worker = async () => {
    while (idx < sp.length) {
      const s = sp[idx++];
      try {
        const { rows, meta } = await daily(s.t, '2y');
        if (rows.length < 160 || rows[rows.length - 1].d !== asOf) { failedN++; continue; }
        scanned++;
        const c = rows.map((x) => x.c), n = rows.length - 1, b = rows[n];
        const s150 = SMA(c, 150, n), p150 = SMA(c, 150, n - 1);
        const touch = b.l <= s150 && s150 <= b.h, cross = c[n - 1] < p150 && b.c >= s150 * 1.01;
        if (!touch && !cross) continue;
        const capB = capOf.get(s.t); const listed = meta.firstTradeDate ? new Date(meta.firstTradeDate * 1000) : null;
        if (!(capB >= 0.5) || !listed || now - listed < 3 * 365.25 * 864e5) continue;   // rules 1–2: > $500M, > 3 years
        const s20 = SMA(c, 20, n), s200 = SMA(c, 200, n), s150ago = SMA(c, 150, n - 20);
        const avgV = rows.slice(-51, -1).reduce((a, x) => a + x.v, 0) / 50, hi = Math.max(...rows.slice(-252).map((x) => x.h));
        const slopePct = (s150 / s150ago - 1) * 100, slope = slopePct > 0.5 ? 'עולה' : slopePct < -0.5 ? 'יורד' : 'שטוח';
        const approach = c[n - 5] > SMA(c, 150, n - 5) ? 'מלמעלה' : 'מלמטה';
        const volRatio = r2(b.v / avgV), fromHighPct = r2((b.c / hi - 1) * 100);
        const [, mm, dd] = asOf.split('-');
        items.push({
          ticker: s.t, name: meta.longName || s.name, sector: s.sector, price: r2(b.c), sma150: r2(s150), distancePct: r2((b.c / s150 - 1) * 100),
          type: touch ? 'touch' : 'cross', marketCap: fmtCap(capB), listedSince: listed.getUTCFullYear(),
          context: { slope, approach, sma20: b.c >= s20 ? 'מעל' : 'מתחת', sma200: s200 ? (b.c >= s200 ? 'מעל' : 'מתחת') : null, volRatio, fromHighPct },
          explanation: `${touch ? `בנר של ${+dd} ב${MONTHS[+mm - 1]} המניה נגעה בממוצע ה-150 — הקו היה בתוך טווח הנר (שפל ${r2(b.l)}, שיא ${r2(b.h)}), כשהיא מגיעה ${approach}.` : `בנר של ${+dd} ב${MONTHS[+mm - 1]} המניה חצתה את ממוצע ה-150 ביותר מ-1%, אחרי שיום קודם סגרה מתחתיו.`} הממוצע בשיפוע ${slope} ב-20 הימים האחרונים. המניה ${Math.abs(fromHighPct)}% מתחת לשיא השנתי, והנפח ביום האיתות ×${volRatio} מהממוצע.`,
          ohlc: rows.slice(-320).map((x) => [x.d, r2(x.o), r2(x.h), r2(x.l), r2(x.c), x.v]),
        });
      } catch { failedN++; }
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));
  items.sort((a, b) => Math.abs(a.distancePct) - Math.abs(b.distancePct));
  console.log(`MA150: gate open — screened ${scanned} S&P 500 stocks, ${items.length} signals, ${failedN} failed`);
} else {
  console.log(`MA150: gate closed (${streak}/3)`);
}
save('signals.js', 'signals', { updatedAt, asOf, universe: 'S&P 500', gate, scanned, failed: failedN, items });

/* ---------- 4. History of every signal + returns vs SPY ---------- */
const hist = load('history.js', 'history') || { signals: [] };
const list = hist.signals || [];
for (const it of items) {
  const id = `MA150-${it.ticker}-${asOf}`;
  if (!list.some((x) => x.id === id)) list.unshift({ id, kind: 'ma150', ticker: it.ticker, name: it.name, date: asOf, entry: it.price, spyEntry: spyClose });
}
if (active && !list.some((x) => x.id === `EXT-SPY-${asOf}`)) list.unshift({ id: `EXT-SPY-${asOf}`, kind: 'extreme', ticker: 'SPY', name: 'SPDR S&P 500 ETF', date: asOf, entry: spyClose, spyEntry: spyClose });
const after = (rows, date, k, entry) => { const i = rows.findIndex((x) => x.d === date); return i >= 0 && rows[i + k] ? r2((rows[i + k].c / entry - 1) * 100) : null; };
const spy1y = await daily('SPY', '1y');
for (const t of [...new Set(list.map((x) => x.ticker))]) {
  try {
    const rows = t === 'SPY' ? spy1y.rows : (await daily(t, '1y')).rows;
    for (const x of list.filter((y) => y.ticker === t)) {
      x.price = r2(rows[rows.length - 1].c);
      x.r1w = after(rows, x.date, 5, x.entry); x.r1m = after(rows, x.date, 21, x.entry); x.r3m = after(rows, x.date, 63, x.entry);
      x.spy1w = after(spy1y.rows, x.date, 5, x.spyEntry); x.spy1m = after(spy1y.rows, x.date, 21, x.spyEntry); x.spy3m = after(spy1y.rows, x.date, 63, x.spyEntry);
    }
  } catch { /* keep the last known values */ }
  await sleep(150);
}
save('history.js', 'history', { updatedAt, spyNow: spyClose, signals: list });
console.log(`history: ${list.length} signals · extreme ${active ? 'ACTIVE' : 'off'} (F&G ${fg ? fg.score : '—'})`);
