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
 "updatedAt": "2026-10-30T22:19:57+02:00",
 "asOf": "2026-10-30",
 "universe": "S&P 500",
 "gate": {
  "streak": 1,
  "met": false,
  "candles": [
   {
    "date": "2026-10-21",
    "open": 771.17,
    "close": 773.09
   },
   {
    "date": "2026-10-22",
    "open": 766.37,
    "close": 763.96
   },
   {
    "date": "2026-10-23",
    "open": 759.9,
    "close": 759.97
   },
   {
    "date": "2026-10-26",
    "open": 762.25,
    "close": 765.37
   },
   {
    "date": "2026-10-27",
    "open": 767.34,
    "close": 769.66
   },
   {
    "date": "2026-10-28",
    "open": 771.43,
    "close": 772.31
   },
   {
    "date": "2026-10-29",
    "open": 768.79,
    "close": 769.36
   },
   {
    "date": "2026-10-30",
    "open": 761.38,
    "close": 751.78
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
