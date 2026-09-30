/* Zozo — every signal ever issued + current prices. Written by the zozo-refresh skill.
Schema:
{
  updatedAt: ISO, spyNow: number,
  signals: [{
    id: "MA150-AAPL-2026-09-25", kind: "ma150"|"extreme", ticker, name, date: "YYYY-MM-DD",
    entry: number, spyEntry: number, price: number (latest close),
    r1w: % | null, r1m: % | null, r3m: % | null,        // stock return after 1w/1m/3m (null until that time has passed)
    spy1w: % | null, spy1m: % | null, spy3m: % | null   // SPY over the same windows
  }]  // newest first
}
*/
window.ZOZO = window.ZOZO || {};
ZOZO.history = {
 "updatedAt": "2026-09-30T10:07:13+03:00",
 "spyNow": 764.2,
 "signals": []
};
