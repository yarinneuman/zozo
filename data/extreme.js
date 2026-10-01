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
 "updatedAt": "2026-10-01T19:15:53+03:00",
 "fearGreed": {
  "score": 26.7,
  "rating": "fear",
  "timestamp": "2026-10-01T16:11:39+00:00",
  "previousClose": 30.8,
  "oneWeekAgo": 35.7,
  "oneMonthAgo": 44.9,
  "source": "CNN Fear & Greed (production.dataviz.cnn.io)"
 },
 "spy": {
  "candles": [
   {
    "date": "2026-09-21",
    "open": 766.25,
    "close": 773.5
   },
   {
    "date": "2026-09-22",
    "open": 774.03,
    "close": 773.38
   },
   {
    "date": "2026-09-23",
    "open": 772.79,
    "close": 767.81
   },
   {
    "date": "2026-09-24",
    "open": 764.07,
    "close": 767.18
   },
   {
    "date": "2026-09-25",
    "open": 768.78,
    "close": 771.35
   },
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
   }
  ],
  "streak": 3,
  "lastClose": 762.63,
  "source": "Yahoo Finance, נרות יומיים של SPY (ימי מסחר שהסתיימו)"
 },
 "active": false,
 "history": []
};
