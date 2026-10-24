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
 "updatedAt": "2026-10-24T08:22:18+03:00",
 "fearGreed": {
  "score": 21,
  "rating": "extreme fear",
  "timestamp": "2026-10-23T23:59:44+00:00",
  "previousClose": 19.8,
  "oneWeekAgo": 22.1,
  "oneMonthAgo": 32.5,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
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
   },
   {
    "date": "2026-10-20",
    "open": 765.86,
    "close": 769.05
   },
   {
    "date": "2026-10-21",
    "open": 771.17,
    "close": 773.09
   },
   {
    "date": "2026-10-22",
    "open": 766.37,
    "close": 763.96
   },
   {
    "date": "2026-10-23",
    "open": 759.9,
    "close": 759.97
   }
  ],
  "streak": 0,
  "lastClose": 759.97,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
