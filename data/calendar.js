/* Zozo — earnings & macro calendar. Written by the zozo-refresh skill.
Schema:
{
  updatedAt: ISO, weekOf: "YYYY-MM-DD",
  events: [{
    at: ISO with offset (e.g. "2026-09-29T15:30:00+03:00"), allDay?: true (no exact time; BMO/AMC or TBD),
    kind: "earnings"|"macro"|"fed"|"israel", title, ticker?, timing?: "BMO"|"AMC",
    consensus?, prior?, impliedMove?: "±6.1%", important: bool, source?: { name, url }
  }]
}
*/
window.ZOZO = window.ZOZO || {};
ZOZO.calendar = {
  updatedAt: "2026-10-30T08:16:00+02:00",
  weekOf: "2026-10-26",
  events: [
    { at: "2026-10-30T00:00:00+02:00", allDay: true, kind: "israel", title: "ממשיכים לספור פתקי מעטפות כפולות (כ-480,000, חיילים/שוטרים/דיפלומטים); משא ומתן קואליציוני בין בלוק נתניהו (53) לבלוק איזנקוט (48) - בלי רוב לאף צד. הבורסה בתל אביב סגורה (שישי)", important: true, source: { name: "JPost; Times of Israel, 28-29/10", url: "https://www.jpost.com/israel-election-2026/article-913122" } },

    { at: "2026-11-02T17:00:00+02:00", allDay: true, kind: "earnings", ticker: "AAPL", title: "Apple (רבעון רביעי, שנת פיסקלית 2026) - אחרי נעילת המסחר", timing: "AMC", important: true, source: { name: "Apple (יעד משוער לפי Schwab/לוחות דיווחים)", url: "https://www.schwab.com/learn/story/stock-market-update-open" } },
    { at: "2026-11-02T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש התעשייתי ISM לחודש אוקטובר - ארה\"ב", important: true, source: { name: "ISM", url: "https://www.schwab.com/learn/story/stock-market-update-open" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות ביניים (midterms) לקונגרס ארה\"ב", important: true },
    { at: "2026-11-03T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "AMD", title: "AMD (רבעון שלישי 2026) - אחרי נעילת המסחר", timing: "AMC", important: false },

    { at: "2026-11-04T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש בשירותים ISM לחודש אוקטובר - ארה\"ב", important: false, source: { name: "ISM", url: "https://www.schwab.com/learn/story/stock-market-update-open" } },

    { at: "2026-11-06T15:30:00+02:00", kind: "macro", title: "דוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר - ארה\"ב", important: true, source: { name: "BLS", url: "https://www.bls.gov/schedule/news_release/empsit.htm" } }
  ]
};
