/* Zozo — extreme-condition buy signal. Written by the zozo-refresh skill (from spy-fear-greed-alert).
Schema:
{
  updatedAt: ISO,
  fearGreed: { score: 0-100, rating, timestamp, previousClose, oneWeekAgo, oneMonthAgo, source },
  spy: { candles: [{ date, open, close }] (newest last, ~8), streak: int, lastClose, source },
  active: bool (streak >= 3 && score < 25),
  history: [{ date, score, streak, spyClose, spyNow }]  // every day the signal fired, newest first
}
*/
window.ZOZO = window.ZOZO || {};
ZOZO.extreme = {
 "updatedAt": "2026-11-13T22:25:58+02:00",
 "fearGreed": {
  "score": 38.5,
  "rating": "fear",
  "timestamp": "2026-11-13T20:22:43+00:00",
  "previousClose": 39.8,
  "oneWeekAgo": 24.4,
  "oneMonthAgo": 45.6,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
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
  "streak": 0,
  "lastClose": 757.12,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
