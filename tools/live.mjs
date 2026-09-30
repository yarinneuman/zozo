// Zozo — live context for the brief, refreshed every 15 minutes with the market data:
//   - headlines from public RSS feeds (markets, macro & Fed, AI & tech, Israel, crypto, geopolitics)
//   - CNN Fear & Greed (score, rating, previous close / week / month)
//   - Polymarket odds for the next Fed decision
// Writes data/live.js. Every source is optional: a failing feed is skipped and reported in `failed`.
// Usage: node tools/live.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';
const failed = [];
const get = async (url, headers = {}) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA, ...headers }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r;
};
const isoIL = (d) => {
  const local = d.toLocaleString('sv-SE', { timeZone: 'Asia/Jerusalem' }).replace(' ', 'T');
  const off = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jerusalem', timeZoneName: 'shortOffset' }).formatToParts(d).find((p) => p.type === 'timeZoneName').value;
  return local + '+0' + off.replace('GMT+', '') + ':00';
};

/* ---------- headlines ---------- */
const FEEDS = {
  markets: [['CNBC', 'https://www.cnbc.com/id/15839069/device/rss/rss.html'], ['CNBC', 'https://www.cnbc.com/id/100003114/device/rss/rss.html'],
            ['Yahoo Finance', 'https://finance.yahoo.com/news/rssindex']],   // MarketWatch "top stories" is mostly personal-finance columns: left out
  macro:   [['CNBC', 'https://www.cnbc.com/id/20910258/device/rss/rss.html'], ['CNBC', 'https://www.cnbc.com/id/10000664/device/rss/rss.html'],
            ['MarketWatch', 'https://feeds.content.dowjones.io/public/rss/mw_realtimeheadlines'], ['Federal Reserve', 'https://www.federalreserve.gov/feeds/press_monetary.xml']],
  tech:    [['TechCrunch', 'https://techcrunch.com/category/artificial-intelligence/feed/'], ['CNBC', 'https://www.cnbc.com/id/19854910/device/rss/rss.html']],
  israel:  [['גלובס', 'https://www.globes.co.il/webservice/rss/rssfeeder.asmx/FeederNode?iID=585'], ['TheMarker', 'https://www.themarker.com/srv/tm-markets']],
  crypto:  [['CoinDesk', 'https://www.coindesk.com/arc/outboundfeeds/rss/'], ['The Block', 'https://www.theblock.co/rss.xml']],
  geo:     [['Axios', 'https://api.axios.com/feed/']],
};
const decode = (s) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
const tag = (item, name) => { const m = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i')); return m ? decode(m[1]) : ''; };
const MAX_AGE = 36 * 3600 * 1000, PER_TOPIC = 10;
const headlines = {};
for (const [topic, feeds] of Object.entries(FEEDS)) {
  const items = [];
  for (const [src, url] of feeds) {
    try {
      const xml = await (await get(url)).text();
      for (const raw of xml.split(/<item[\s>]/i).slice(1)) {
        const t = tag(raw, 'title'), link = tag(raw, 'link') || (raw.match(/<guid[^>]*>(https?:[^<]+)<\/guid>/) || [])[1] || '';
        const at = Date.parse(tag(raw, 'pubDate') || tag(raw, 'dc:date') || '');
        if (!t || !/^https?:\/\//.test(link)) continue;
        if (isFinite(at) && Date.now() - at > MAX_AGE * (topic === 'macro' ? 2 : 1)) continue;   // macro news moves slower: 72h window
        items.push({ t, src, url: link, at: isFinite(at) ? isoIL(new Date(at)) : null, ts: isFinite(at) ? at : 0 });
      }
    } catch (e) { failed.push(`${src} (${topic}): ${e.message}`); }
  }
  const seen = new Set();
  headlines[topic] = items.sort((a, b) => b.ts - a.ts)
    .filter((x) => { const k = x.t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').slice(0, 60); if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, PER_TOPIC).map(({ ts, ...x }) => x);
}

/* ---------- CNN Fear & Greed ---------- */
let fearGreed = null;
try {
  const j = await (await get('https://production.dataviz.cnn.io/index/fearandgreed/graphdata', { Accept: 'application/json', Referer: 'https://edition.cnn.com/', Origin: 'https://edition.cnn.com' })).json();
  const f = j.fear_and_greed;
  const r1 = (x) => (isFinite(x) ? Math.round(x * 10) / 10 : null);
  fearGreed = { score: r1(f.score), rating: f.rating, timestamp: f.timestamp, previousClose: r1(f.previous_close), oneWeekAgo: r1(f.previous_1_week), oneMonthAgo: r1(f.previous_1_month), source: 'CNN Fear & Greed (production.dataviz.cnn.io)' };
} catch (e) { failed.push('CNN Fear & Greed: ' + e.message); }

/* ---------- Polymarket: next Fed decision ---------- */
let fed = null;
try {
  const s = await (await get('https://gamma-api.polymarket.com/public-search?q=fed%20decision&events_status=active&limit_per_type=20', { Accept: 'application/json' })).json();
  const ev = (s.events || []).filter((e) => /^fed-decision-in-/.test(e.slug) && !e.closed)
    .sort((a, b) => Date.parse(a.endDate || 0) - Date.parse(b.endDate || 0))[0];
  if (ev) {
    const full = (await (await get('https://gamma-api.polymarket.com/events?slug=' + encodeURIComponent(ev.slug), { Accept: 'application/json' })).json())[0];
    const p = (re) => Math.round((full.markets || []).filter((m) => re.test(m.groupItemTitle || m.question || ''))
      .reduce((a, m) => a + (+JSON.parse(m.outcomePrices || '[0]')[0] || 0), 0) * 1000) / 10;
    const MONTHS = { January: 'ינואר', February: 'פברואר', March: 'מרץ', April: 'אפריל', May: 'מאי', June: 'יוני', July: 'יולי', August: 'אוגוסט', September: 'ספטמבר', October: 'אוקטובר', November: 'נובמבר', December: 'דצמבר' };
    const month = (full.title.match(/in (\w+)/) || [])[1];
    fed = { meeting: MONTHS[month] || month || '', title: full.title, hike: p(/increase/i), hold: p(/no change/i), cut: p(/decrease/i), url: 'https://polymarket.com/event/' + full.slug, endDate: full.endDate };
  }
} catch (e) { failed.push('Polymarket: ' + e.message); }

const out = { updatedAt: isoIL(new Date()), fearGreed, fed, headlines, failed };
writeFileSync(join(ROOT, 'data', 'live.js'),
`/* Zozo — live context for the brief (headlines, Fear & Greed, Fed odds). Written every 15 minutes by tools/live.mjs.
   Sources: public RSS feeds (CNBC, MarketWatch, Yahoo Finance, Federal Reserve, TechCrunch, Globes, TheMarker, CoinDesk, The Block, Axios),
   CNN Fear & Greed, Polymarket. Headlines are shown as published (title + link to the source). */
window.ZOZO = window.ZOZO || {};
ZOZO.live = ${JSON.stringify(out)};
`);
const n = Object.values(headlines).reduce((a, x) => a + x.length, 0);
console.log(`live: ${n} headlines (${Object.entries(headlines).map(([k, v]) => k + ' ' + v.length).join(', ')}), F&G ${fearGreed ? fearGreed.score : '—'}, Fed ${fed ? `${fed.meeting}: hold ${fed.hold}% hike ${fed.hike}% cut ${fed.cut}%` : '—'}${failed.length ? ' | failed: ' + failed.join('; ') : ''}`);
