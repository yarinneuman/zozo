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
  updatedAt: "2026-10-31T08:15:00+02:00",
  weekOf: "2026-10-25",
  events: [
    { at: "2026-10-31T00:00:00+02:00", allDay: true, kind: "israel", title: "סיום רוב ספירת הקולות (53 בלוק נתניהו, 48 בלוק איזנקוט, 19 מפלגות ערביות) - בלי רוב לאף צד; איזנקוט צפוי לקבל מהנשיא הרצוג את המנדט הראשון. הבורסה בתל אביב סגורה (שבת)", important: true, source: { name: "Haaretz; Ynetnews, 28-29/10", url: "https://www.haaretz.com/israel-news/elections/2026-10-29/ty-article/.premium/eisenkots-only-advantage-getting-first-chance-at-forming-a-government/000001a1-8448-de48-aba1-c6db890a0000" } },

    { at: "2026-11-02T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש התעשייתי ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: true, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },
    { at: "2026-11-02T23:30:00+02:00", allDay: true, kind: "earnings", ticker: "AAPL", title: "Apple (רבעון רביעי, שנת פיסקלית 2026) - אחרי נעילת המסחר", timing: "AMC", important: true, source: { name: "Apple Investor Relations", url: "https://www.macrumors.com/2026/10/06/apple-q4-2026-earnings-nov-2" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות הביניים (midterms) לקונגרס ארה\"ב - כל 435 מושבי הבית, 33-35 מושבי הסנאט ו-39 בחירות למושלים", important: true, source: { name: "Council on Foreign Relations", url: "https://www.cfr.org/articles/five-things-to-know-about-the-midterms" } },
    { at: "2026-11-03T17:00:00+02:00", kind: "macro", title: "סקר JOLTS (משרות פנויות) לחודש ספטמבר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } },
    { at: "2026-11-03T23:00:00+02:00", allDay: true, kind: "earnings", ticker: "AMD", title: "AMD (רבעון שלישי 2026) - אחרי נעילת המסחר", timing: "AMC", important: false, source: { name: "AMD Investor Relations", url: "https://ir.amd.com/news-events/press-releases/detail/1300/amd-to-report-fiscal-third-quarter-2026-financial-results" } },

    { at: "2026-11-04T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש בשירותים ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },

    { at: "2026-11-06T15:30:00+02:00", kind: "macro", title: "דוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר - ארה\"ב", important: true, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } }
  ]
};
