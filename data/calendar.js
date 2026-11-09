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
  updatedAt: "2026-11-09T08:25:00+02:00",
  weekOf: "2026-11-09",
  events: [
    { at: "2026-11-09T00:00:00+02:00", allDay: true, kind: "israel", title: "איזנקוט וליברמן נפגשים בניסיון לגשר על המחלוקות בהרכבת הממשלה (חוק הגיוס, הישענות על המפלגות הערביות)", important: true, source: { name: "N12; Maariv", url: "https://www.maariv.co.il/breaking-news/article-1386265" } },
    { at: "2026-11-09T00:00:00+02:00", allDay: true, kind: "israel", title: "בבורסת תל אביב נפתח יום המסחר הראשון של השבוע (שבוע מסחר שני-שישי)", important: false, source: { name: "TASE", url: "https://www.tase.co.il" } },
    { at: "2026-11-10T00:00:00+02:00", allDay: true, kind: "macro", title: "שיווק ההנפקה (IPO) של Anthropic עשוי להתחיל החל מהיום, לפי כלל ה-15 יום של ה-SEC; הערכות שווי נדונות בטווח של כ-1-1.3 טריליון דולר", important: true, source: { name: "CNN; Capital Brief", url: "https://www.cnn.com/2026/11/06/investing/wall-street-mayhem-complicates-anthropics-already-complicated-ipo" } },
    { at: "2026-11-10T15:30:00+02:00", kind: "macro", title: "מדד המחירים לצרכן (CPI) לאוקטובר - ארה\"ב; נתון אינפלציה מרכזי לפני החלטת הריבית של הפד ב-9/12", important: true, source: { name: "BLS; Schaeffer's Investment Research", url: "https://www.schaeffersresearch.com/content/news/2026/11/05/the-week-ahead-inflation-data-on-deck-as-earnings-slow" } },
    { at: "2026-11-10T16:00:00+02:00", kind: "israel", title: "הכנסת ה-26 מתכנסת לטקס השבעה ובחירת יו\"ר כנסת; גוש השינוי מבקש להחליף את אמיר אוחנה, שדורש 61 חתימות להצבעה מוקדמת", important: true, source: { name: "JNS", url: "https://www.jns.org/news/israel-news/knesset-speaker-amir-ohana-no-early-speaker-vote-without-61-signatures" } },

    { at: "2026-11-12T15:30:00+02:00", kind: "macro", title: "תביעות דמי אבטלה שבועיות - ארה\"ב", important: false, source: { name: "fedratecalc", url: "https://fedratecalc.com/us-economic-calendar/november-2026/" } },
    { at: "2026-11-12T23:05:00+02:00", kind: "earnings", title: "סיסקו - דו\"ח רבעוני", ticker: "CSCO", timing: "AMC", important: true, source: { name: "Stocktitan", url: "https://www.stocktitan.net/articles/earnings-calendar-week-of-november-9-2026" } },
    { at: "2026-11-12T23:05:00+02:00", kind: "earnings", title: "Applied Materials - דו\"ח רבעוני", ticker: "AMAT", timing: "AMC", important: true, source: { name: "Stocktitan", url: "https://www.stocktitan.net/articles/earnings-calendar-week-of-november-9-2026" } },

    { at: "2026-11-13T15:30:00+02:00", kind: "macro", title: "מדד מחירי היצרן (PPI) לאוקטובר - ארה\"ב", important: true, source: { name: "BLS; Schaeffer's Investment Research", url: "https://www.schaeffersresearch.com/content/news/2026/11/05/the-week-ahead-inflation-data-on-deck-as-earnings-slow" } },

    { at: "2026-11-16T00:00:00+02:00", allDay: true, kind: "macro", title: "לפי חלק מהדיווחים, רישום Anthropic למסחר בנאסד\"ק עשוי להתרחש בשבוע זה (טרם אושר; המטרה המוצהרת היא לפני חג ההודיה ב-26/11)", important: false, source: { name: "valueaddvc.com", url: "https://valueaddvc.com/blog/anthropic-2-trillion-ipo-october-2026-largest-ever-spacex" } }
  ]
};
