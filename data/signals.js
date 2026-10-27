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
 "updatedAt": "2026-10-27T22:16:23+02:00",
 "asOf": "2026-10-27",
 "universe": "S&P 500",
 "gate": {
  "streak": 0,
  "met": false,
  "candles": [
   {
    "date": "2026-10-16",
    "open": 773.24,
    "close": 763.25
   },
   {
    "date": "2026-10-19",
    "open": 767.23,
    "close": 766.48
   },
   {
    "date": "2026-10-20",
    "open": 765.86,
    "close": 769.05
   },
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
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
