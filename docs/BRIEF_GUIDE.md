# Zozo — writing the daily and weekly brief

This guide is for the cloud routine that runs every morning at **08:00 Israel time**. It researches the markets
and writes the brief that Zozo shows under "התדריך היומי" (and on Sundays also "הסיכום השבועי").
Everything else on the site (live board, movers, screener, headlines, Fear & Greed, Fed odds, SPY red-day counter,
MA150 signals) is produced automatically by `tools/*.mjs` in the GitHub workflow — **do not edit those data files**.

## What to write

| File | When | Variable |
|---|---|---|
| `data/brief.js` | every day | `ZOZO.brief` — the daily brief |
| `data/weekly.js` | Sundays only (leave it alone on other days) | `ZOZO.weekly` — the weekly summary |
| `data/calendar.js` | every day (keep the current week + next 7 days) | `ZOZO.calendar` |

Each file starts with a comment describing its schema. Keep the comment, then
`window.ZOZO = window.ZOZO || {};` and one assignment. The result must be valid JavaScript
(check with `node --check data/brief.js`). Use `\"` or ״ for Hebrew abbreviations inside strings.

### `ZOZO.brief` (daily) and `ZOZO.weekly` (weekly)

```js
{
  updatedAt: "2026-10-01T08:04:00+03:00",   // ISO with the Israel offset (+03:00 summer, +02:00 winter)
  edition: "יומי" | "שבועי",
  headline: "…",                // one line; may wrap one phrase in <em>…</em>
  thesis: "…",                  // 1–2 sentences: the story of the day / week
  bottomLine: ["…", …],         // exactly 5 points, most important first, each with numbers
  changes: [{ topic, from, to }],                       // what moved since the previous edition
  ai: [{ title, body, tickers: ["NVDA"], source: { name, url, date } }],
  macro: {
    fedwatch: { meeting: "אוקטובר", cut, hold, hike },  // CME FedWatch %, from a dated news source
    polymarket: { cut, hold, hike, url } | null,
    items: [{ title, body, source: { name, url, date } }]
  },
  voices: [{ name, role, stance: "שורי"|"זהיר"|"ניטרלי"|"דובי"|"ניצי", he, en, date, url, note? }],
  israel: [{ title, body, source: { name, url, date } }],
  sources: [{ name, url }],
  // weekly only (optional on daily):
  recap: [{ title: "ריביות ואג״ח", points: ["…", …] }],   // "what happened this week", 3–5 blocks
  weekAhead: ["רביעי 7/10: CPI (15:30)", …]               // the coming week's key events, Israel time
}
```

### `ZOZO.calendar`

```js
{ updatedAt, weekOf: "YYYY-MM-DD",
  events: [{ at: "2026-10-02T15:30:00+03:00", allDay?: true, kind: "earnings"|"macro"|"fed"|"israel",
             title, ticker?, timing?: "BMO"|"AMC", consensus?, prior?, impliedMove?: "±6%", important: bool,
             source?: { name, url } }] }
```
`allDay: true` when there's no exact time (earnings before the open → `at` ~14:00 Israel time, after the close → ~23:05).

## Research (WebSearch + WebFetch, in parallel)

| Topic | First choice | Fallbacks |
|---|---|---|
| Closes, movers | Yahoo Finance live blog, AP, TheStreet | CNBC, Reuters, MarketWatch |
| Macro calendar | Newsquawk weekly, Investing.com | Schaeffer's, Trading Economics |
| Fed | federalreserve.gov, CME FedWatch (via news), Schwab FOMC notes | Reuters |
| Prediction markets | Polymarket / Kalshi | — |
| Yields | Advisor Perspectives, FRED | Yahoo |
| Earnings (dates, consensus) | company IR release (always wins), Kiplinger, Earnings Whispers | Nasdaq |
| Options-implied moves | TipRanks, Barchart | Investing.com |
| AI | TechCrunch, Reuters Tech, company blogs | The Information |
| Israel | Bizportal, boi.org.il, Globes, Calcalist | TheMarker |
| Crypto | The Block, CoinDesk | — |
| Geopolitics | Axios, AP, Reuters | official statements |

Paywalled sites (Bloomberg, WSJ, FT): use search headlines and confirm elsewhere. Never bypass paywalls or bot checks.

**Expert voices** (6–8 per edition, a real spread of views): recent (≈14 days) comments from strategists, Fed officials
and analysts — e.g. Tom Lee, Ed Yardeni, Rick Rieder, Mike Wilson, Goldman strategists, Liz Ann Sonders, El-Erian,
Dimon, Dalio, Schiff, Cathie Wood, Dan Ives. **Verbatim quotes only**, seen in this run: Hebrew translation in `he`,
the English original in `en`, with date and link. Verify who holds an office (e.g. the Fed chair) — never assume.

## Accuracy rules
- Every number and quote comes from a source seen **in this run**, with its date. Nothing from memory.
- Interpretation starts with "משמעות:". If sources conflict, say so; if something can't be verified, leave it out.
- Check article dates — no stale stories presented as news, no rumors as facts.
- Information only, no buy/sell advice.
- Hebrew, plain and precise; numbers as digits (5.22%, $97.44, 7,743).

## Finish
1. `node --check` every file you changed.
2. `git add data/brief.js data/calendar.js` (and `data/weekly.js` on Sundays), commit
   `"Brief <YYYY-MM-DD>"`, then `git pull --rebase --autostash` and `git push`.
   The push publishes the site automatically within ~2 minutes.
3. Never force-push, never touch other files, never change repository settings.
