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
  updatedAt: "2026-11-03T08:15:00+02:00",
  weekOf: "2026-11-02",
  events: [
    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות הביניים (midterms) לקונגרס ארה\"ב - כל 435 מושבי הבית, 33-35 מושבי הסנאט ו-39 בחירות למושלים; רפובליקנים מחזיקים כיום 53 מול 47 לדמוקרטים בסנאט", important: true, source: { name: "PollCheck; ABC News 4", url: "https://www.pollcheck.co.uk/us-midterms-2026" } },
    { at: "2026-11-03T14:00:00+02:00", kind: "earnings", ticker: "TEVA", title: "טבע (רבעון שלישי 2026) - שיחת ועידה בשעה 8:00 בבוקר לפי זמן מזרח ארה\"ב", timing: "BMO", consensus: "צפי מוקדם למכירות של כ-5 מיליארד דולר", important: true, source: { name: "finviz; bizportal", url: "https://finviz.com/news/394958/teva-to-host-conference-call-to-discuss-third-quarter-2026-financial-results-on-november-3-2026-at-8-am-et" } },
    { at: "2026-11-03T17:00:00+02:00", kind: "macro", title: "סקר JOLTS (משרות פנויות) לחודש ספטמבר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } },
    { at: "2026-11-03T23:30:00+02:00", allDay: true, kind: "earnings", ticker: "AMD", title: "AMD (רבעון שלישי 2026) - אחרי נעילת המסחר", timing: "AMC", consensus: "EPS צפי: 1.66$ (12 אנליסטים)", prior: "רבעון קודם (4/8): הכנסות 11.5 מיליארד$, מעל תחזית; המניה נפלה 7.0% בפועל", impliedMove: "±10.7%", important: true, source: { name: "EarningsWatcher", url: "https://earnings-watcher.com/wiki/amd-earnings-november-2026" } },

    { at: "2026-11-04T17:00:00+02:00", kind: "macro", title: "מדד מנהלי הרכש בשירותים ISM לחודש אוקטובר - ארה\"ב (10:00 שעון מזרח ארה\"ב)", important: false, source: { name: "ISM", url: "https://www.ismworld.org/supply-management-news-and-reports/reports/rob-report-calendar/" } },

    { at: "2026-11-06T15:30:00+02:00", kind: "macro", title: "דוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר - ארה\"ב; נחשב לקטליזטור אפשרי להסתברויות הפד לדצמבר", important: true, source: { name: "BLS", url: "https://www.financecalendar.com/events/category/economic-indicators/day/2026-11-07/" } }
  ]
};
