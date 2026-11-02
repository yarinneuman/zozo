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
  updatedAt: "2026-11-02T08:24:00+02:00",
  weekOf: "2026-11-02",
  events: [
    { at: "2026-11-02T00:00:00+02:00", allDay: true, kind: "israel", title: "המשא ומתן הקואליציוני נתקע: נתניהו מתנה ממשלה משותפת עם איזנקוט בהישארות אמיר אוחנה כיו\"ר הכנסת; הנשיא הרצוג העלה אפשרות לממשלת אחדות, בית הנשיא מכחיש שיחות רשמיות", important: true, source: { name: "ynet; כאן חדשות, 31/10-1/11", url: "https://www.ynet.co.il/news/article/h1ri3yeagx" } },

    { at: "2026-11-02T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש התעשייתי ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: true, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },
    { at: "2026-11-02T23:30:00+02:00", allDay: true, kind: "earnings", ticker: "AAPL", title: "Apple (רבעון רביעי, שנת פיסקלית 2026) - אחרי נעילת המסחר; שיחת הדו\"חות הראשונה של המנכ\"ל החדש ג'ון טרנוס", timing: "AMC", consensus: "הכנסות: צמיחה של 9-11% לעומת התקופה המקבילה (כ-111.7-113.7 מיליארד דולר); שולי רווח גולמי: 47-48%", important: true, source: { name: "MacRumors; iGeeks Blog", url: "https://macrumors.com/2026/10/06/apple-q4-2026-earnings-nov-2" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות הביניים (midterms) לקונגרס ארה\"ב - כל 435 מושבי הבית, 33-35 מושבי הסנאט ו-39 בחירות למושלים; הדמוקרטים מועדפים להשתלט על הבית (כ-85-88%), הסנאט צמוד מאוד (הערכות שונות בין כ-48% ל-74%)", important: true, source: { name: "Defirate / Silver Bulletin / Kalshi", url: "https://defirate.com/?p=7780" } },
    { at: "2026-11-03T17:00:00+02:00", kind: "macro", title: "סקר JOLTS (משרות פנויות) לחודש ספטמבר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } },
    { at: "2026-11-03T23:00:00+02:00", allDay: true, kind: "earnings", ticker: "AMD", title: "AMD (רבעון שלישי 2026) - אחרי נעילת המסחר (תאריך צפי, לא אושר רשמית)", timing: "AMC", impliedMove: "±9.3%", important: false, source: { name: "AMD Investor Relations (צפי)", url: "https://ir.amd.com/news-events/press-releases/detail/1300/amd-to-report-fiscal-third-quarter-2026-financial-results" } },

    { at: "2026-11-04T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש בשירותים ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },

    { at: "2026-11-06T15:30:00+02:00", kind: "macro", title: "דוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר - ארה\"ב", important: true, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } }
  ]
};
