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
  updatedAt: "2026-11-07T08:20:00+02:00",
  weekOf: "2026-11-08",
  events: [
    { at: "2026-11-09T00:00:00+02:00", allDay: true, kind: "fed", title: "נשיא הפד של ריצ'מונד, טום ברקין, נואם - ייתכן שיתייחס לדו\"ח התעסוקה החזק ולסיכויי העלאת הריבית בדצמבר", important: false, source: { name: "fedratecalc", url: "https://fedratecalc.com/us-economic-calendar/november-2026/" } },
    { at: "2026-11-09T00:00:00+02:00", allDay: true, kind: "macro", title: "תחילת שיווק ההנפקה (IPO) של Anthropic; הערכות שווי נדונות בטווח של כ-1-1.3 טריליון דולר", important: true, source: { name: "Axios; Unite.ai", url: "https://www.axios.com/2026/11/06/anthropicai-ipo-valuation-ai-trade" } },
    { at: "2026-11-09T23:05:00+02:00", kind: "earnings", title: "Take-Two Interactive - דו\"ח רבעוני", ticker: "TTWO", timing: "AMC", important: false, source: { name: "Stocktitan", url: "https://www.stocktitan.net/articles/earnings-calendar-week-of-november-9-2026" } },

    { at: "2026-11-10T00:00:00+02:00", allDay: true, kind: "israel", title: "הכנסת ה-26 מתכנסת; גוש השינוי טוען שאסף 61 חתימות לדרישה להחליף את יו\"ר הכנסת אוחנה", important: true, source: { name: "Ynet; Walla", url: "https://www.ynet.co.il/news/article/rktlgckpml" } },
    { at: "2026-11-10T15:30:00+02:00", kind: "macro", title: "מדד המחירים לצרכן (CPI) לאוקטובר - ארה\"ב; נתון אינפלציה מרכזי לפני החלטת הריבית של הפד ב-9/12", important: true, source: { name: "BLS; Schaeffer's Investment Research", url: "https://www.schaeffersresearch.com/content/news/2026/11/05/the-week-ahead-inflation-data-on-deck-as-earnings-slow" } },

    { at: "2026-11-12T15:30:00+02:00", kind: "macro", title: "תביעות דמי אבטלה שבועיות - ארה\"ב", important: false, source: { name: "fedratecalc", url: "https://fedratecalc.com/us-economic-calendar/november-2026/" } },
    { at: "2026-11-12T23:05:00+02:00", kind: "earnings", title: "סיסקו - דו\"ח רבעוני", ticker: "CSCO", timing: "AMC", important: true, source: { name: "Stocktitan", url: "https://www.stocktitan.net/articles/earnings-calendar-week-of-november-9-2026" } },
    { at: "2026-11-12T23:05:00+02:00", kind: "earnings", title: "Applied Materials - דו\"ח רבעוני", ticker: "AMAT", timing: "AMC", important: true, source: { name: "Stocktitan", url: "https://www.stocktitan.net/articles/earnings-calendar-week-of-november-9-2026" } },

    { at: "2026-11-13T15:30:00+02:00", kind: "macro", title: "מדד מחירי היצרן (PPI) לאוקטובר - ארה\"ב", important: true, source: { name: "BLS; Schaeffer's Investment Research", url: "https://www.schaeffersresearch.com/content/news/2026/11/05/the-week-ahead-inflation-data-on-deck-as-earnings-slow" } }
  ]
};
