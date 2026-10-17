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
  updatedAt: "2026-10-17T08:55:00+03:00",
  weekOf: "2026-10-18",
  events: [
    { at: "2026-10-15T23:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרה בעליות: דאו ג'ונס +1.1% (52,177.69), S&P 500 +0.3% (7,744.06), נאסד\"ק +0.1% (26,713.03); תשואת ה-10 שנים נרגעה לכ-5.09% משיא תוך-יומי של 5.27%", important: false, source: { name: "AP via kare11.com", url: "https://www.kare11.com/article/syndication/associatedpress/how-major-us-stock-indexes-fared-thursday-10152026/616-45863d85-4e3b-4f71-879a-08f0c61ea824" } },
    { at: "2026-10-16T13:00:00+03:00", allDay: true, kind: "macro", title: "יו\"ר הפד קווין וורש נואם בכנס ה-IMF/הבנק העולמי בבנגקוק - נמנע מאותות על החלטת 27-28/10", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/16/feds-warsh-says-ai-development-path-will-be-very-bumpy-.html" } },
    { at: "2026-10-16T23:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרה בירידות חדות - השבוע הגרוע ביותר לנאסד\"ק מאז יוני: S&P 500 -1.1% (7,659.44), נאסד\"ק -2.14% (26,140.03), דאו ג'ונס -0.3% (52,002.41); קורוויב צנחה כ-12%, הנפט זינק כ-3.5-3.7% על מתיחות איראן-רוסיה, VIX מעל 22", important: true, source: { name: "ABC News/AP; CNBC; CNN", url: "https://abcnews.com/Business/wireStory/major-us-stock-indexes-fared-friday-10162026-137331951" } },

    { at: "2026-10-20T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NFLX", title: "Netflix (רבעון שלישי 2026) - תוצאות יפורסמו בכ-13:01 לפי זמן החוף המערבי (כ-23:01 בישראל)", timing: "AMC", important: true, source: { name: "Netflix IR", url: "https://www.insiderfinance.io/news/netflix-q3-2026-earnings-oct-20" } },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25% (מאז 1/9)", important: true, source: { name: "בנק ישראל", url: "https://www.boi.org.il/%D7%94%D7%AA%D7%A4%D7%A7%D7%99%D7%93%D7%99%D7%9D-%D7%94%D7%9B%D7%9C%D7%9B%D7%9C%D7%99%D7%99%D7%9D/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%95%D7%A0%D7%99%D7%98%D7%A8%D7%99%D7%AA/%D7%9E%D7%95%D7%A2%D7%93%D7%99-%D7%94%D7%97%D7%9C%D7%98%D7%95%D7%AA-%D7%94%D7%A8%D7%99%D7%91%D7%99%D7%AA/" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "TSLA", title: "Tesla (רבעון שלישי 2026)", timing: "AMC", important: true },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "IBM", title: "IBM (רבעון שלישי 2026)", timing: "AMC", important: false },

    { at: "2026-10-23T17:00:00+03:00", kind: "macro", title: "מדד אמון הצרכנים של אוניברסיטת מישיגן (אוקטובר, נתון סופי) — ארה\"ב", important: false },

    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה", important: true, source: { name: "i24NEWS - סקרים", url: "https://www.i24news.tv/he/news/israel-elections-2026/polls" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch (16/10, אחרי דברי וורש): החזקה ~85% · העלאה ~15%", important: true, source: { name: "Benzinga", url: "https://www.benzinga.com/markets/prediction-markets/26/10/62408879/fed-rate-hike-odds-warsh-ai" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true }
  ]
};
