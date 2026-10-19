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
 "updatedAt": "2026-10-19T22:45:53+03:00",
 "fearGreed": {
  "score": 25.4,
  "rating": "fear",
  "timestamp": "2026-10-19T19:41:54+00:00",
  "previousClose": 17.9,
  "oneWeekAgo": 46.3,
  "oneMonthAgo": 30.4,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
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
  "streak": 1,
  "lastClose": 763.25,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
