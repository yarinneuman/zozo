// Zozo — market-wide data: daily movers (all US stocks) + technical snapshot for the stock screener.
// Sources: Nasdaq stock screener (all ~7,000 US-listed stocks: price, % change, volume, market cap, sector)
//          Yahoo Finance chart API (1y daily OHLCV per stock, for the indicators).
// Writes: data/movers.js, data/universe.js
// Usage:  node tools/market.mjs [--min-cap 1e9] [--concurrency 12] [--limit N]
import { writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const MIN_CAP = +arg('--min-cap', 1e9);          // screener universe: market cap >= $1B
const MOVER_CAP = +arg('--mover-cap', 3e8);      // movers: market cap >= $300M (skip penny noise)
const CONC = +arg('--concurrency', 10);
const LIMIT = +arg('--limit', 0);
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36', Accept: 'application/json' };

const SECTOR_HE = {
  'Technology': 'טכנולוגיה', 'Health Care': 'בריאות', 'Finance': 'פיננסים', 'Consumer Discretionary': 'צריכה מחזורית',
  'Industrials': 'תעשייה', 'Energy': 'אנרגיה', 'Real Estate': 'נדל"ן', 'Utilities': 'תשתיות וחשמל',
  'Basic Materials': 'חומרים', 'Telecommunications': 'תקשורת', 'Consumer Staples': 'צריכה בסיסית', 'Miscellaneous': 'שונות',
};
// S&P 500 members: use their official GICS sector (tools/sp500.tsv) instead of Nasdaq's looser labels
const GICS_HE = {
  'Information Technology': 'טכנולוגיה', 'Health Care': 'בריאות', 'Financials': 'פיננסים', 'Consumer Discretionary': 'צריכה מחזורית',
  'Industrials': 'תעשייה', 'Energy': 'אנרגיה', 'Real Estate': 'נדל"ן', 'Utilities': 'תשתיות וחשמל', 'Materials': 'חומרים',
  'Communication Services': 'תקשורת', 'Consumer Staples': 'צריכה בסיסית',
};
const GICS = new Map();
try {
  readFileSync(join(ROOT, 'tools', 'sp500.tsv'), 'utf8').split(/\r?\n/).forEach((line) => {
    const [t, , sec] = line.replace(/^﻿/, '').split('\t'); if (t && GICS_HE[sec]) GICS.set(t.trim(), GICS_HE[sec]);
  });
} catch {}
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const num = (s) => { const v = parseFloat(String(s ?? '').replace(/[$,%]/g, '')); return isFinite(v) ? v : null; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) });
      if (res.status === 429) { await sleep(2000 * (i + 1)); continue; }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (e) { if (i === tries - 1) throw e; await sleep(800 * (i + 1)); }
  }
}

/* ---------- 1. all US stocks from the Nasdaq screener ---------- */
const nas = await getJSON('https://api.nasdaq.com/api/screener/stocks?tableonly=true&download=true');
const BAD = /warrant|\bright(s)?\b|\bunits?\b|preferred|depositary shares? representing .*preferred|notes due|%/i;
const all = nas.data.rows
  .filter((r) => /^[A-Z][A-Z.\-]*$/.test(r.symbol.replace('/', '.')) && !r.symbol.includes('^') && !BAD.test(r.name))
  .map((r) => ({
    t: r.symbol.replace('/', '.'), name: r.name.replace(/ (Common Stock|Class [A-C] Common Stock|Ordinary Shares|American Depositary Shares).*$/i, '').trim(),
    price: num(r.lastsale), chg: num(r.pctchange), vol: num(r.volume), cap: num(r.marketCap),
    sector: GICS.get(r.symbol.replace('/', '.')) || SECTOR_HE[r.sector] || r.sector || '', sp500: GICS.has(r.symbol.replace('/', '.')), industry: r.industry || '', ipo: num(r.ipoyear),
  }))
  .filter((r) => r.price != null && r.cap != null);
console.log(`nasdaq: ${nas.data.rows.length} rows, ${all.length} common stocks`);

/* ---------- 2. technical snapshot per stock (Yahoo daily candles) ---------- */
const SMA = (a, n, end) => { if (end < n - 1) return null; let s = 0; for (let k = end - n + 1; k <= end; k++) s += a[k]; return s / n; };
function indicators(q) {
  const ts = q.timestamp || [], o = q.indicators.quote[0];
  const rows = [];
  for (let i = 0; i < ts.length; i++) if (o.close[i] != null && o.open[i] != null && o.high[i] != null && o.low[i] != null) rows.push({ t: ts[i], o: o.open[i], h: o.high[i], l: o.low[i], c: o.close[i], v: o.volume[i] || 0 });
  if (rows.length < 60) return null;
  const c = rows.map((r) => r.c), n = rows.length - 1, last = rows[n], prev = rows[n - 1];
  const ch = (k) => (n - k >= 0 ? (last.c / c[n - k] - 1) * 100 : null);
  const s20 = SMA(c, 20, n), s50 = SMA(c, 50, n), s150 = SMA(c, 150, n), s200 = SMA(c, 200, n);
  const d = (s) => (s ? (last.c / s - 1) * 100 : null);
  // RSI(14), Wilder smoothing
  let g = 0, l = 0;
  for (let i = 1; i <= 14; i++) { const x = c[i] - c[i - 1]; if (x > 0) g += x; else l -= x; }
  g /= 14; l /= 14;
  for (let i = 15; i <= n; i++) { const x = c[i] - c[i - 1]; g = (g * 13 + Math.max(x, 0)) / 14; l = (l * 13 + Math.max(-x, 0)) / 14; }
  const rsi = l === 0 ? 100 : 100 - 100 / (1 + g / l);
  // ATR(14) as % of price
  let atr = 0; for (let i = n - 13; i <= n; i++) atr += Math.max(rows[i].h - rows[i].l, Math.abs(rows[i].h - c[i - 1]), Math.abs(rows[i].l - c[i - 1])); atr /= 14;
  const look = rows.slice(-252);
  const hi = Math.max(...look.map((r) => r.h)), lo = Math.min(...look.map((r) => r.l));
  const avgV = rows.slice(-51, -1).reduce((a, r) => a + r.v, 0) / Math.min(50, rows.length - 1);
  const avgDollar = rows.slice(-50).reduce((a, r) => a + r.v * r.c, 0) / Math.min(50, rows.length);
  // MA150 rule (same as ma150-entry-screen): 1 = touch (low <= SMA150 <= high), 2 = cross (prev close < prev SMA150, close >= SMA150*1.01)
  const p150 = SMA(c, 150, n - 1);
  let ma150 = 0;
  if (s150 && last.l <= s150 && s150 <= last.h) ma150 = 1;
  else if (s150 && p150 && prev.c < p150 && last.c >= s150 * 1.01) ma150 = 2;
  // consecutive up/down closes
  let streak = 0; for (let i = n; i > 0; i--) { const up = c[i] > c[i - 1]; if (streak === 0) streak = up ? 1 : -1; else if ((streak > 0) === up) streak += up ? 1 : -1; else break; }
  // 50/200 cross in the last 10 sessions: 1 golden, -1 death
  let cross = 0;
  for (let k = 0; k < 10 && n - k - 1 >= 199; k++) {
    const a = SMA(c, 50, n - k) - SMA(c, 200, n - k), b = SMA(c, 50, n - k - 1) - SMA(c, 200, n - k - 1);
    if (a > 0 && b <= 0) { cross = 1; break; } if (a < 0 && b >= 0) { cross = -1; break; }
  }
  const s150ago = SMA(c, 150, n - 20);
  return {
    date: new Date((last.t - 4 * 3600) * 1000).toISOString().slice(0, 10), price: last.c,
    chg1d: (last.c / prev.c - 1) * 100, chg5d: ch(5), chg1m: ch(21), chg3m: ch(63), chg6m: ch(126), chg1y: (last.c / c[0] - 1) * 100,
    d20: d(s20), d50: d(s50), d150: d(s150), d200: d(s200), rsi, fromHigh: (last.c / hi - 1) * 100, fromLow: (last.c / lo - 1) * 100,
    relVol: avgV ? last.v / avgV : null, vol: last.v, dollarVol: avgDollar / 1e6, atrPct: (atr / last.c) * 100, ma150, streak,
    gap: (last.o / prev.c - 1) * 100, trend: s50 && s200 ? (s50 > s200 ? 1 : 0) : null, slope150: s150 && s150ago ? (s150 / s150ago - 1) * 100 : null, cross,
    since: q.meta && q.meta.firstTradeDate ? new Date(q.meta.firstTradeDate * 1000).getUTCFullYear() : null,
    mt: q.meta && q.meta.regularMarketTime ? q.meta.regularMarketTime : null,   // time of the last trade Yahoo saw
  };
}

// Fetch candles for everything >= $300M (movers need it); the screener file keeps >= $1B.
let fetchList = all.filter((r) => r.cap >= Math.min(MIN_CAP, MOVER_CAP)).sort((a, b) => b.cap - a.cap);
if (LIMIT) fetchList = fetchList.slice(0, LIMIT);
console.log(`yahoo fetch list (cap >= $${MOVER_CAP / 1e6}M): ${fetchList.length}`);
const out = new Array(fetchList.length);
let done = 0, failed = [];
async function worker(ids) {
  for (const i of ids) {
    const s = fetchList[i];
    try {
      const j = await getJSON(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(s.t.replace('.', '-'))}?range=1y&interval=1d`);
      const ind = j.chart.result && indicators(j.chart.result[0]);
      if (ind) out[i] = ind; else failed.push(s.t);
    } catch { failed.push(s.t); }
    if (++done % 500 === 0) console.log(`  ${done}/${fetchList.length}`);
  }
}
const lanes = Array.from({ length: CONC }, (_, k) => fetchList.map((_, i) => i).filter((i) => i % CONC === k));
const t0 = Date.now();
await Promise.all(lanes.map(worker));
console.log(`yahoo: ${fetchList.length - failed.length} ok, ${failed.length} failed, ${((Date.now() - t0) / 1000).toFixed(0)}s`);

// session date = the most common last-candle date
const dates = {}; out.forEach((x) => x && (dates[x.date] = (dates[x.date] || 0) + 1));
const asOf = Object.keys(dates).sort((a, b) => dates[b] - dates[a])[0];

const FIELDS = ['t', 'name', 'sector', 'industry', 'cap', 'price', 'chg1d', 'chg5d', 'chg1m', 'chg3m', 'chg6m', 'chg1y', 'd20', 'd50', 'd150', 'd200', 'rsi', 'fromHigh', 'fromLow', 'relVol', 'dollarVol', 'atrPct', 'ma150', 'since', 'streak', 'gap', 'trend', 'slope150', 'cross', 'sp'];
const tech = [];   // one row per stock with a fresh candle for asOf
fetchList.forEach((s, i) => {
  const x = out[i]; if (!x || x.date !== asOf) return;   // skip stale/halted tickers
  const since = [s.ipo, x.since].filter(Boolean);
  const row = [s.t, s.name, s.sector, s.industry, r2(s.cap / 1e9), r2(x.price), r2(x.chg1d), r2(x.chg5d), r2(x.chg1m), r2(x.chg3m), r2(x.chg6m), r2(x.chg1y),
    r2(x.d20), r2(x.d50), r2(x.d150), r2(x.d200), r2(x.rsi), r2(x.fromHigh), r2(x.fromLow), r2(x.relVol), r2(x.dollarVol), r2(x.atrPct), x.ma150,
    since.length ? Math.min(...since) : null, x.streak, r2(x.gap), x.trend, r2(x.slope150), x.cross, s.sp500 ? 1 : 0];
  row.vol = x.vol; row.capRaw = s.cap;
  tech.push(row);
});
const rows = tech.filter((r) => r.capRaw >= MIN_CAP);
const now = new Date();
const isoIL = (d) => {
  const local = d.toLocaleString('sv-SE', { timeZone: 'Asia/Jerusalem' }).replace(' ', 'T');
  const off = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jerusalem', timeZoneName: 'shortOffset' }).formatToParts(d).find((p) => p.type === 'timeZoneName').value; // "GMT+3"
  return local + '+0' + off.replace('GMT+', '') + ':00';
};
const updatedAt = isoIL(now);
// Intraday: during US regular hours today's candle is still forming, so every number is live, not a close.
const etParts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  .formatToParts(now).map((p) => [p.type, p.value]));
const etDate = `${etParts.year}-${etParts.month}-${etParts.day}`, etMin = +etParts.hour * 60 + +etParts.minute;
const live = !['Sat', 'Sun'].includes(etParts.weekday) && etMin >= 570 && etMin < 960 && asOf === etDate;   // 9:30–16:00 ET
const lastTrade = Math.max(0, ...out.filter(Boolean).map((x) => x.mt || 0));
const marketTime = lastTrade ? isoIL(new Date(lastTrade * 1000)) : null;
console.log(`session: ${live ? 'LIVE' : 'closed'} (ET ${etDate} ${etParts.hour}:${etParts.minute}), last trade ${marketTime}`);

writeFileSync(join(ROOT, 'data', 'universe.js'),
`/* Zozo — technical snapshot of US stocks (market cap >= $${MIN_CAP / 1e9}B) for the stock screener. Written by tools/market.mjs (zozo-refresh).
   Sources: Nasdaq stock screener (market cap, sector, IPO year; S&P 500 sectors are GICS from tools/sp500.tsv) + Yahoo Finance daily candles (1y) for price and every indicator.
   Row fields: ${FIELDS.join(', ')}
   (cap in $B; chg1d..chg1y, d20..d200, fromHigh, fromLow, gap, atrPct, slope150 in %; dollarVol in $M/day (50d avg); relVol = today / 50d avg volume;
    ma150: 0 none, 1 touch, 2 cross >1%; trend: 1 if SMA50 > SMA200; streak: consecutive up (+) / down (-) closes; cross: 1 golden / -1 death cross in last 10 sessions; sp: 1 if S&P 500 member) */
window.ZOZO = window.ZOZO || {};
ZOZO.universe = ${JSON.stringify({ updatedAt, asOf, live, marketTime, count: rows.length, failed: failed.length, fields: FIELDS, rows })};
`);

/* ---------- 3. movers: all US stocks >= $300M with real liquidity (>= $2M/day), from Yahoo's session data ---------- */
const mv = (r) => ({ t: r[0], name: r[1], sector: r[2], price: r[5], chg: r[6], cap: r[4], vol: r.vol, relVol: r[19], d150: r[14], chg1m: r[8] });
const movable = tech.filter((r) => r.capRaw >= MOVER_CAP && r[6] != null && r[20] >= 2);
const gainers = movable.filter((r) => r[6] > 0).sort((a, b) => b[6] - a[6]).slice(0, 25).map(mv);
const losers = movable.filter((r) => r[6] < 0).sort((a, b) => a[6] - b[6]).slice(0, 25).map(mv);
const large = movable.filter((r) => r.capRaw >= 1e10 && Math.abs(r[6]) >= 4).sort((a, b) => Math.abs(b[6]) - Math.abs(a[6])).slice(0, 25).map(mv);
const volume = movable.filter((r) => r[19] >= 2.5 && r[20] >= 5).sort((a, b) => b[19] - a[19]).slice(0, 25).map(mv);
const breadth = { up: movable.filter((r) => r[6] > 0).length, down: movable.filter((r) => r[6] < 0).length, big: movable.filter((r) => Math.abs(r[6]) >= 5).length, total: movable.length };
const bySector = {};
movable.forEach((r) => { if (!r[2]) return; const b = (bySector[r[2]] = bySector[r[2]] || { w: 0, s: 0, n: 0 }); b.w += r.capRaw; b.s += r.capRaw * r[6]; b.n++; });
const sectors = Object.entries(bySector).filter(([k, b]) => b.n >= 20 && k !== 'שונות').map(([k, b]) => ({ sector: k, chg: r2(b.s / b.w), n: b.n })).sort((a, b) => b.chg - a.chg);

writeFileSync(join(ROOT, 'data', 'movers.js'),
`/* Zozo — the day's strongest moves across US stocks (market cap >= $${MOVER_CAP / 1e6}M, >= $2M/day traded). Written by tools/market.mjs (zozo-refresh).
   Source: Yahoo Finance daily candles (price, % change, volume vs 50-day average); names, caps and sectors from the Nasdaq stock screener. */
window.ZOZO = window.ZOZO || {};
ZOZO.movers = ${JSON.stringify({ updatedAt, asOf, live, marketTime, source: 'Yahoo Finance + Nasdaq stock screener', minCap: MOVER_CAP, breadth, sectors, gainers, losers, large, volume })};
`);
console.log(`wrote universe.js (${rows.length} rows, asOf ${asOf}) and movers.js (${gainers.length}/${losers.length}/${large.length}/${volume.length}, breadth ${breadth.up}/${breadth.down})`);