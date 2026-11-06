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
 "updatedAt": "2026-11-06T17:00:54+02:00",
 "fearGreed": {
  "score": 24.4,
  "rating": "extreme fear",
  "timestamp": "2026-11-06T14:58:33+00:00",
  "previousClose": 19.9,
  "oneWeekAgo": 26.3,
  "oneMonthAgo": 47,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
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
  "streak": 1,
  "lastClose": 733,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
