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
 "updatedAt": "2026-11-06T08:24:38+02:00",
 "asOf": "2026-11-05",
 "universe": "S&P 500",
 "gate": {
  "streak": 1,
  "met": false,
  "candles": [
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
    "close": 755.72
   },
   {
    "date": "2026-11-02",
    "open": 759.45,
    "close": 752.1
   },
   {
    "date": "2026-11-03",
    "open": 752.73,
    "close": 754.35
   },
   {
    "date": "2026-11-04",
    "open": 762.99,
    "close": 766.81
   },
   {
    "date": "2026-11-05",
    "open": 765.47,
    "close": 733
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
