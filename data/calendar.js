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
  updatedAt: "2026-10-06T08:45:00+03:00",
  weekOf: "2026-10-05",
  events: [
    { at: "2026-10-04T12:00:00+03:00", allDay: true, kind: "macro", title: "איראן הציעה לפתוח את מיצרי הורמוז בתוך שבוע; ארה\"ב ואיראן חלוקות על סדר הצעדים", important: true, source: { name: "Times of Israel", url: "https://timesofisrael.com/liveblog-october-04-2026" } },

    { at: "2026-10-05T17:00:00+03:00", kind: "macro", title: "וול סטריט: נאסד\"ק ואנבידיה סוגרים בשיא; תשואת 10 שנים נוגעת בשיא מאז 2002", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/05/treasury-yields-bonds-fed-rates.html" } },

    { at: "2026-10-06T15:30:00+03:00", kind: "macro", title: "מאזן סחר (אוגוסט)", important: false, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-calendar-of-key-events---october-2026" } },
    { at: "2026-10-06T23:05:00+03:00", kind: "earnings", ticker: "STZ", title: "Constellation Brands (רבעון שני, שנת כספים 2027)", timing: "AMC", consensus: "EPS כ-$3.55", important: false, source: { name: "Constellation Brands IR", url: "https://ir.cbrands.com/news-events/press-releases/detail/345/constellation-brands-to-report-second-quarter-fiscal-2027-financial-results-on-october-6-2026-after-market-close-and-host-conference-call-on-october-7-2026-at-8-00-am-et" } },

    { at: "2026-10-07T21:00:00+03:00", kind: "fed", title: "פרוטוקול ה-FOMC מישיבת 15-16/9 (שבה הועלתה הריבית ב-25 נ\"ב)", important: true, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-calendar-of-key-events---october-2026" } },

    { at: "2026-10-08T14:00:00+03:00", allDay: true, kind: "earnings", ticker: "PEP", title: "PepsiCo (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$2.29 · הכנסות כ-$24.9B", important: true, source: { name: "Yahoo Finance / Zacks", url: "https://finance.yahoo.com/news/delta-air-lines-pepsico-earnings-132758950.html" } },
    { at: "2026-10-08T15:30:00+03:00", kind: "macro", title: "תביעות אבטלה שבועיות", important: false, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-calendar-of-key-events---october-2026" } },

    { at: "2026-10-09T14:00:00+03:00", allDay: true, kind: "earnings", ticker: "DAL", title: "Delta Air Lines (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$1.96 · הכנסות כ-$17.70B", important: true, source: { name: "Yahoo Finance / Zacks", url: "https://finance.yahoo.com/news/delta-air-lines-pepsico-earnings-132758950.html" } },
    { at: "2026-10-09T17:00:00+03:00", kind: "macro", title: "סנטימנט צרכנים, מישיגן (מקדמי, אוקטובר)", important: false, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-calendar-of-key-events---october-2026" } },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר)", important: true },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25%", important: true },
    { at: "2026-10-25T20:00:00+03:00", allDay: true, kind: "macro", title: "ברזיל: סיבוב שני בבחירות לנשיאות — בולסונארו מול לולה", important: true, source: { name: "NPR", url: "https://www.npr.org/2026/10/04/nx-s1-5981181/brazil-presidential-lula-bolsonaro" } },
    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch: החזקה כ-82% · העלאה כ-18% (5/10)", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/05/treasury-yields-bonds-fed-rates.html" } }
  ]
};
