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
 "updatedAt": "2026-11-18T23:15:57+02:00",
 "fearGreed": {
  "score": 24.5,
  "rating": "extreme fear",
  "timestamp": "2026-11-18T21:00:41+00:00",
  "previousClose": 25.2,
  "oneWeekAgo": 35.9,
  "oneMonthAgo": 18.2,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
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
   },
   {
    "date": "2026-11-13",
    "open": 760.07,
    "close": 754.37
   },
   {
    "date": "2026-11-16",
    "open": 749.66,
    "close": 739.95
   },
   {
    "date": "2026-11-17",
    "open": 738.39,
    "close": 732.44
   },
   {
    "date": "2026-11-18",
    "open": 733.37,
    "close": 730.2
   }
  ],
  "streak": 4,
  "lastClose": 730.2,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": true,
 "history": [
  {
   "date": "2026-11-18",
   "score": 24.5,
   "streak": 4,
   "spyClose": 730.2,
   "spyNow": 730.2
  }
 ]
};
