/* Zozo — MA150 daily screen. Written by the zozo-refresh skill (from ma150-daily-screen).
Schema:
{
  updatedAt: ISO, asOf: "YYYY-MM-DD" (latest completed candle), universe: "S&P 500",
  gate: { streak: int, met: bool, candles: [{ date, open, close }] (newest last), source },
  scanned: int, failed: int,
  items: [{
    ticker, name, sector, price, sma150, distancePct, type: "touch"|"cross",
    marketCap: "2.1T", listedSince: 1980,
    context: { slope: "עולה"|"שטוח"|"יורד", approach: "מלמעלה"|"מלמטה", sma20: "מעל"|"מתחת", sma200: "מעל"|"מתחת", volRatio: 1.3, fromHighPct: -12.4 },
    explanation: string (Hebrew, 2-3 sentences),
    ohlc: [["YYYY-MM-DD", open, high, low, close, volume], ...] (>= 300 rows, oldest first; SMAs computed in the browser)
  }]
}
*/
window.ZOZO = window.ZOZO || {};
ZOZO.signals = {
 "updatedAt": "2026-10-07T12:20:17+03:00",
 "asOf": "2026-10-06",
 "universe": "S&P 500",
 "gate": {
  "streak": 0,
  "met": false,
  "candles": [
   {
    "date": "2026-09-25",
    "open": 768.78,
    "close": 771.35
   },
   {
    "date": "2026-09-28",
    "open": 768.35,
    "close": 765.61
   },
   {
    "date": "2026-09-29",
    "open": 766.83,
    "close": 764.2
   },
   {
    "date": "2026-09-30",
    "open": 766.45,
    "close": 762.63
   },
   {
    "date": "2026-10-01",
    "open": 764.36,
    "close": 763.99
   },
   {
    "date": "2026-10-02",
    "open": 770.58,
    "close": 769.64
   },
   {
    "date": "2026-10-05",
    "open": 769.69,
    "close": 774.83
   },
   {
    "date": "2026-10-06",
    "open": 778.15,
    "close": 779.09
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
