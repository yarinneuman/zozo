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
 "updatedAt": "2026-10-20T19:31:08+03:00",
 "fearGreed": {
  "score": 26.9,
  "rating": "fear",
  "timestamp": "2026-10-20T16:24:30+00:00",
  "previousClose": 23.1,
  "oneWeekAgo": 44.1,
  "oneMonthAgo": 30.4,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
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
   },
   {
    "date": "2026-10-19",
    "open": 767.23,
    "close": 766.48
   }
  ],
  "streak": 2,
  "lastClose": 766.48,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
