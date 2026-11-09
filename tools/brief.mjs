// Zozo — automatic brief, calendar and weekly summary, built from the data files the other tools already write
// (movers.js, live.js, extreme.js, universe.js). No LLM, no keys: Hebrew text comes from fixed templates,
// headlines are translated by tools/translate.mjs (free, open source) or shown as published.
// A brief written by hand/Claude that is less than 20h old is never overwritten (use --force to override).
// Usage: node tools/brief.mjs [--force] [--weekly]
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { translate } from './translate.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = (n) => join(ROOT, 'data', n);
const load = (name, key) => {
  if (!existsSync(file(name))) return null;
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  try { vm.runInContext(readFileSync(file(name), 'utf8').replace(/^﻿/, ''), ctx); } catch { return null; }
  return ctx.ZOZO ? ctx.ZOZO[key] : null;
};
const isoIL = (d) => {
  const local = d.toLocaleString('sv-SE', { timeZone: 'Asia/Jerusalem' }).replace(' ', 'T');
  const off = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jerusalem', timeZoneName: 'shortOffset' }).formatToParts(d).find((p) => p.type === 'timeZoneName').value;
  return local + '+0' + off.replace('GMT+', '') + ':00';
};
function save(name, key, comment, obj) {
  writeFileSync(file(name), `/* ${comment} */\nwindow.ZOZO = window.ZOZO || {};\nZOZO.${key} = ${JSON.stringify(obj, null, 1)};\n`);
  appendFileSync(file('.changed'), `data/${name}\n`);
}

const force = process.argv.includes('--force');
const now = new Date(), nowIL = isoIL(now);
const weekly = process.argv.includes('--weekly') || now.toLocaleDateString('en-US', { timeZone: 'Asia/Jerusalem', weekday: 'short' }) === 'Sun';
const prev = load(weekly ? 'weekly.js' : 'brief.js', weekly ? 'weekly' : 'brief');
if (!force && prev && !prev.auto && Date.now() - Date.parse(prev.updatedAt) < 20 * 3600e3) {
  console.log('brief: a fresh hand-written brief exists — not overwriting'); process.exit(0);
}

const movers = load('movers.js', 'movers'), live = load('live.js', 'live'), ext = load('extreme.js', 'extreme'), uni = load('universe.js', 'universe');
if (!movers || !movers.indices) { console.log('brief: no market data — keeping the last brief'); process.exit(0); }

const sign = (x) => (x > 0 ? 'עלה' : x < 0 ? 'ירד' : 'ללא שינוי');
const idx = (name) => movers.indices.find((i) => i.k === name);
const pct = (i) => (i ? `${Math.abs(i.chg).toFixed(2)}%` : '—');
const spx = idx('S&P 500'), ndq = idx('נאסד״ק'), vix = idx('VIX'), tnx = idx('תשואה 10 שנים'), oil = idx('נפט WTI');
const secs = [...(movers.sectors || [])].sort((a, b) => b.chg - a.chg);
const top = secs[0], bot = secs[secs.length - 1];
const fg = (live && live.fearGreed) || (ext && ext.fearGreed);
const FG_HE = { 'extreme fear': 'פחד קיצוני', fear: 'פחד', neutral: 'ניטרלי', greed: 'חמדנות', 'extreme greed': 'חמדנות קיצונית' };
const streak = ext && ext.spy ? ext.spy.streak : 0;
const b = movers.breadth || {};

// headlines: translate the ones we show
const pick = (arr, n) => (arr || []).slice(0, n);
const shown = { ai: pick(live && live.headlines.tech, 4), macro: pick(live && live.headlines.macro, 4), israel: pick(live && live.headlines.israel, 4) };
const tr = await translate([...shown.ai, ...shown.macro].map((h) => h.t));
const trMap = new Map([...shown.ai, ...shown.macro].map((h, i) => [h, tr[i]]));
const story = (h, he) => ({ title: he ? trMap.get(h) : h.t, body: he ? 'כותרת מתורגמת אוטומטית. המקור באנגלית בקישור.' : '', tickers: [], source: { name: h.src, url: h.url, date: (h.at || '').slice(0, 10) } });

const bottomLine = [
  `ה-S&P 500 ${sign(spx && spx.chg)} ${pct(spx)} ל-${spx ? spx.v : '—'}, הנאסד״ק ${sign(ndq && ndq.chg)} ${pct(ndq)} (נתוני ${movers.asOf}).`,
  b.total ? `רוחב השוק: ${b.up} מניות עלו מול ${b.down} שירדו מתוך ${b.total} שנבדקו.` : 'רוחב השוק אינו זמין כרגע.',
  top ? `הסקטור החזק: ${top.sector} (${top.chg > 0 ? '+' : ''}${top.chg}%). החלש: ${bot.sector} (${bot.chg > 0 ? '+' : ''}${bot.chg}%).` : 'נתוני סקטורים אינם זמינים.',
  fg ? `מדד הפחד והחמדנות של CNN: ${fg.score} (${FG_HE[fg.rating] || fg.rating}). רצף ימים אדומים ב-SPY: ${streak}.` : `רצף ימים אדומים ב-SPY: ${streak}.`,
  `${tnx ? `תשואת 10 שנים ${tnx.v}` : ''}${oil ? `, נפט WTI ${oil.v}` : ''}${vix ? `, VIX ${vix.v}` : ''}.`.replace(/^, /, ''),
];

const fed = live && live.fed;
const changes = [];
if (fg && fg.previousClose != null) changes.push({ topic: 'פחד/חמדנות (יום קודם)', from: String(fg.previousClose), to: String(fg.score) });
if (fg && fg.oneWeekAgo != null) changes.push({ topic: 'פחד/חמדנות (שבוע)', from: String(fg.oneWeekAgo), to: String(fg.score) });

const brief = {
  auto: true, updatedAt: nowIL, edition: weekly ? 'שבועי' : 'יומי',
  headline: `ה-S&P 500 ${sign(spx && spx.chg)} ${pct(spx)}${top ? `; הסקטור המוביל: <em>${top.sector}</em>` : ''}`,
  thesis: `${bottomLine[0]} ${bottomLine[2]} ${bottomLine[3]} התדריך נוצר אוטומטית מנתוני שוק ציבוריים, בלי ניתוח אנושי.`,
  bottomLine,
  snapshot: movers.indices.map((i) => ({ k: i.k, v: i.v, c: i.c, dir: i.dir })),
  changes,
  ai: shown.ai.map((h) => story(h, true)),
  macro: {
    fedwatch: fed ? { meeting: fed.meeting, cut: fed.cut, hold: fed.hold, hike: fed.hike } : null,
    polymarket: fed ? { cut: fed.cut, hold: fed.hold, hike: fed.hike, url: fed.url } : null,
    items: shown.macro.map((h) => story(h, true)),
  },
  voices: [],
  israel: shown.israel.map((h) => story(h, false)),
  sources: [...new Map(Object.values(live ? live.headlines : {}).flat().map((h) => [h.src, { name: h.src, url: new URL(h.url).origin }])).values()],
};

if (weekly && uni) {
  const ix = Object.fromEntries(uni.fields.map((f, i) => [f, i]));
  const rows = [...uni.rows].sort((a, c) => c[ix.chg5d] - a[ix.chg5d]);
  const fmt = (r) => `${r[0]} (${r[ix.chg5d] > 0 ? '+' : ''}${r[ix.chg5d]}%)`;
  brief.recap = [
    { title: 'המניות החזקות השבוע', points: rows.slice(0, 5).map(fmt) },
    { title: 'המניות החלשות השבוע', points: rows.slice(-5).reverse().map(fmt) },
  ];
}

/* calendar: earnings in the next 7 days (large caps) + the next Fed decision */
const events = [];
if (uni) {
  const ix = Object.fromEntries(uni.fields.map((f, i) => [f, i]));
  const t0 = Date.now() - 864e5, t1 = Date.now() + 7 * 864e5;
  for (const r of uni.rows) {
    const e = r[ix.earn]; if (!e || r[ix.cap] < 50) continue;
    const at = Date.parse(e + 'T12:00:00Z'); if (at < t0 || at > t1) continue;
    events.push({ at: `${e}T00:00:00+03:00`, allDay: true, kind: 'earnings', ticker: r[0], title: `${r[1]} (דוחות רבעון)`, important: r[ix.cap] >= 200 });
  }
}
if (fed && fed.endDate) events.push({ at: fed.endDate.replace('Z', '+00:00'), allDay: true, kind: 'fed', title: `החלטת ריבית ${fed.meeting} (הימורים: החזקה ${fed.hold}%, העלאה ${fed.hike}%, הורדה ${fed.cut}%)`, important: true, source: { name: 'Polymarket', url: fed.url } });
events.sort((a, c) => Date.parse(a.at) - Date.parse(c.at));

save(weekly ? 'weekly.js' : 'brief.js', weekly ? 'weekly' : 'brief', `Zozo — ${weekly ? 'weekly' : 'daily'} brief. Written automatically by tools/brief.mjs (templates + public data, no LLM). Same schema as before.`, brief);
save('calendar.js', 'calendar', 'Zozo — earnings & Fed calendar. Written automatically by tools/brief.mjs.', { updatedAt: nowIL, weekOf: now.toISOString().slice(0, 10), events });
console.log(`brief: ${weekly ? 'weekly' : 'daily'} written, ${brief.ai.length} tech + ${brief.macro.items.length} macro stories, ${events.length} calendar events`);
