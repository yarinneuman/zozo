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
 "updatedAt": "2026-10-16T23:16:02+03:00",
 "asOf": "2026-10-16",
 "universe": "S&P 500",
 "gate": {
  "streak": 1,
  "met": false,
  "candles": [
   {
    "date": "2026-10-07",
    "open": 775.77,
    "close": 777.22
   },
   {
    "date": "2026-10-08",
    "open": 774.86,
    "close": 773.93
   },
   {
    "date": "2026-10-09",
    "open": 776.24,
    "close": 778.57
   },
   {
    "date": "2026-10-12",
    "open": 778.78,
    "close": 778.1
   },
   {
    "date": "2026-10-13",
    "open": 777.34,
    "close": 778.01
   },
   {
    "date": "2026-10-14",
    "open": 774.92,
    "close": 769.6
   },
   {
    "date": "2026-10-15",
    "open": 766.25,
    "close": 771.79
   },
   {
    "date": "2026-10-16",
    "open": 773.24,
    "close": 763.25
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
