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
 "updatedAt": "2026-10-15T20:01:07+03:00",
 "fearGreed": {
  "score": 29.6,
  "rating": "fear",
  "timestamp": "2026-10-15T16:55:21+00:00",
  "previousClose": 32.3,
  "oneWeekAgo": 39.8,
  "oneMonthAgo": 28,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
   {
    "date": "2026-10-05",
    "open": 769.69,
    "close": 774.83
   },
   {
    "date": "2026-10-06",
    "open": 778.15,
    "close": 779.09
   },
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
   }
  ],
  "streak": 1,
  "lastClose": 769.6,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
