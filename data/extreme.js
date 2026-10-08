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
 "updatedAt": "2026-10-08T20:46:13+03:00",
 "fearGreed": {
  "score": 37.2,
  "rating": "fear",
  "timestamp": "2026-10-08T17:41:07+00:00",
  "previousClose": 44.5,
  "oneWeekAgo": 29,
  "oneMonthAgo": 39.1,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
   {
    "date": "2026-09-28",
    "open": 768.35,
    "close": 765.61
   },
   {
    "date": "2026-09-29",
    "open": 766.83,
    "close": 764.2
   },
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
   }
  ],
  "streak": 0,
  "lastClose": 777.22,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
