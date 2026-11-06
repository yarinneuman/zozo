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
  updatedAt: "2026-11-06T08:25:00+02:00",
  weekOf: "2026-11-02",
  events: [
    { at: "2026-11-06T15:30:00+02:00", kind: "macro", title: "דוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר - ארה\"ב (8:30 בבוקר לפי זמן מזרח ארה\"ב); קונצנזוס של כ-59-65 אלף משרות, שיעור אבטלה צפוי להישאר 4.2%", consensus: "כ-59-65 אלף משרות; אבטלה 4.2%", prior: "ספטמבר: 29 אלף משרות, אבטלה 4.2%", important: true, source: { name: "CNBC; Kiplinger", url: "https://www.cnbc.com/2026/11/05/october-jobs-report-preview.html" } },

    { at: "2026-11-09T00:00:00+02:00", allDay: true, kind: "fed", title: "נשיא הפד של ריצ'מונד, טום ברקין, נואם - ייתכן שיתייחס לנתוני התעסוקה ולסיכויי העלאת הריבית בדצמבר", important: false, source: { name: "fedratecalc", url: "https://fedratecalc.com/us-economic-calendar/november-2026/" } },

    { at: "2026-11-10T00:00:00+02:00", allDay: true, kind: "israel", title: "הכנסת ה-26 מתכנסת; האופוזיציה דורשת מיו\"ר הכנסת אוחנה הצבעה רשמית על החלפתו", important: true, source: { name: "מאקו", url: "https://www.mako.co.il/news-politics/2026_q4/Article-aedcc12192ba1a1027.htm" } },
    { at: "2026-11-10T15:30:00+02:00", kind: "macro", title: "מדד המחירים לצרכן (CPI) לאוקטובר - ארה\"ב; נתון האינפלציה האחרון לפני החלטת הריבית של הפד ב-9/12", important: true, source: { name: "Schaeffer's Investment Research", url: "https://www.schaeffersresearch.com/content/news/2026/11/05/the-week-ahead-inflation-data-on-deck-as-earnings-slow" } },

    { at: "2026-11-12T15:30:00+02:00", kind: "macro", title: "תביעות דמי אבטלה שבועיות - ארה\"ב", important: false, source: { name: "fedratecalc", url: "https://fedratecalc.com/us-economic-calendar/november-2026/" } },

    { at: "2026-11-13T15:30:00+02:00", kind: "macro", title: "מדד מחירי היצרן (PPI) לאוקטובר - ארה\"ב", important: true, source: { name: "Schaeffer's Investment Research", url: "https://www.schaeffersresearch.com/content/news/2026/11/05/the-week-ahead-inflation-data-on-deck-as-earnings-slow" } }
  ]
};
