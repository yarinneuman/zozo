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
  updatedAt: "2026-11-01T08:20:00+02:00",
  weekOf: "2026-11-01",
  events: [
    { at: "2026-11-02T00:00:00+02:00", allDay: true, kind: "israel", title: "הנשיא הרצוג מתוכנן להזמין את ראשי הסיעות להתייעצויות השבוע, לאחר אישור רשמי של תוצאות הבחירות (53 בלוק נתניהו, 48 בלוק איזנקוט, 19 הרשימה המשותפת - בלי רוב לאף צד); הרשימה המשותפת מציעה תמיכה חוץ-קואליציונית באיזנקוט בלי להצטרף לממשלה", important: true, source: { name: "Republic World, 28/10", url: "https://www.republicworld.com/global-news/arrive-with-an-open-mind-israeli-president-herzog-urges-party-leaders-ahead-of-coalition-talks-2026-10-28-139882" } },

    { at: "2026-11-02T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש התעשייתי ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: true, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },
    { at: "2026-11-02T23:30:00+02:00", allDay: true, kind: "earnings", ticker: "AAPL", title: "Apple (רבעון רביעי, שנת פיסקלית 2026) - אחרי נעילת המסחר", timing: "AMC", impliedMove: "±4.4%", important: true, source: { name: "Apple Investor Relations / S&P Global", url: "https://www.macrumors.com/2026/10/06/apple-q4-2026-earnings-nov-2" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות הביניים (midterms) לקונגרס ארה\"ב - כל 435 מושבי הבית, 33-35 מושבי הסנאט ו-39 בחירות למושלים; הדמוקרטים מועדפים להשתלט על הבית (כ-85-88%), הסנאט צמוד מאוד (הערכות שונות בין כ-48% ל-74%)", important: true, source: { name: "Defirate / Silver Bulletin / Kalshi", url: "https://defirate.com/?p=7780" } },
    { at: "2026-11-03T17:00:00+02:00", kind: "macro", title: "סקר JOLTS (משרות פנויות) לחודש ספטמבר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } },
    { at: "2026-11-03T23:00:00+02:00", allDay: true, kind: "earnings", ticker: "AMD", title: "AMD (רבעון שלישי 2026) - אחרי נעילת המסחר (תאריך צפי, לא אושר רשמית)", timing: "AMC", impliedMove: "±9.3%", important: false, source: { name: "AMD Investor Relations (צפי)", url: "https://ir.amd.com/news-events/press-releases/detail/1300/amd-to-report-fiscal-third-quarter-2026-financial-results" } },

    { at: "2026-11-04T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש בשירותים ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },

    { at: "2026-11-06T15:30:00+02:00", kind: "macro", title: "דוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר - ארה\"ב", important: true, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } }
  ]
};
