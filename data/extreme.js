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
 "updatedAt": "2026-11-04T20:15:56+02:00",
 "fearGreed": {
  "score": 28.5,
  "rating": "fear",
  "timestamp": "2026-11-04T18:14:26+00:00",
  "previousClose": 19.1,
  "oneWeekAgo": 34.4,
  "oneMonthAgo": 38.2,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
   {
    "date": "2026-10-23",
    "open": 759.9,
    "close": 759.97
   },
   {
    "date": "2026-10-26",
    "open": 762.25,
    "close": 765.37
   },
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
   }
  ],
  "streak": 0,
  "lastClose": 754.35,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
