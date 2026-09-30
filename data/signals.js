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
 "updatedAt": "2026-09-30T10:07:13+03:00",
 "asOf": "2026-09-29",
 "universe": "S&P 500",
 "gate": {
  "streak": 2,
  "met": false,
  "candles": [
   {
    "date": "2026-09-18",
    "open": 761.31,
    "close": 761.69
   },
   {
    "date": "2026-09-21",
    "open": 766.25,
    "close": 773.5
   },
   {
    "date": "2026-09-22",
    "open": 774.03,
    "close": 773.38
   },
   {
    "date": "2026-09-23",
    "open": 772.79,
    "close": 767.81
   },
   {
    "date": "2026-09-24",
    "open": 764.07,
    "close": 767.18
   },
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
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
