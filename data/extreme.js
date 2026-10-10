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
 "updatedAt": "2026-10-10T08:22:43+03:00",
 "fearGreed": {
  "score": 45,
  "rating": "fear",
  "timestamp": "2026-10-09T23:59:54+00:00",
  "previousClose": 37.9,
  "oneWeekAgo": 40,
  "oneMonthAgo": 38.2,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
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
   }
  ],
  "streak": 0,
  "lastClose": 778.57,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
