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
 "updatedAt": "2026-11-13T22:25:58+02:00",
 "asOf": "2026-11-12",
 "universe": "S&P 500",
 "gate": {
  "streak": 0,
  "met": false,
  "candles": [
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
   },
   {
    "date": "2026-11-06",
    "open": 734.82,
    "close": 735.29
   },
   {
    "date": "2026-11-09",
    "open": 741.95,
    "close": 752.69
   },
   {
    "date": "2026-11-10",
    "open": 747.94,
    "close": 749.92
   },
   {
    "date": "2026-11-11",
    "open": 756.8,
    "close": 759.81
   },
   {
    "date": "2026-11-12",
    "open": 753.98,
    "close": 757.12
   }
  ],
  "source": "Yahoo Finance"
 },
 "scanned": 0,
 "failed": 0,
 "items": []
};
