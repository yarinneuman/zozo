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
  updatedAt: "2026-10-18T08:55:00+03:00",
  weekOf: "2026-10-18",
  events: [
    { at: "2026-10-16T23:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרה בירידות חדות - השבוע הגרוע ביותר לנאסד\"ק מאז יוני: S&P 500 -1.1% (7,659.44), נאסד\"ק -2.14% (26,140.03), דאו ג'ונס -0.3% (52,002.41); קורוויב צנחה כ-12%, הנפט זינק כ-3.5-3.7% על מתיחות איראן-רוסיה, VIX מעל 22", important: true, source: { name: "ABC News/AP; CNBC; CNN", url: "https://abcnews.com/Business/wireStory/major-us-stock-indexes-fared-friday-10162026-137331951" } },

    { at: "2026-10-19T00:00:00+03:00", allDay: true, kind: "macro", title: "מדד שוק הבתים של NAHB בארה\"ב (אוקטובר)", important: false },

    { at: "2026-10-20T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NFLX", title: "Netflix (רבעון שלישי 2026) - תוצאות יפורסמו בכ-13:01 לפי זמן החוף המערבי (כ-23:01 בישראל)", timing: "AMC", important: true, source: { name: "Netflix IR", url: "https://www.insiderfinance.io/news/netflix-q3-2026-earnings-oct-20" } },
    { at: "2026-10-20T00:00:00+03:00", allDay: true, kind: "macro", title: "התחלות בנייה ומכירות בתים ממתינות בארה\"ב (ספטמבר)", important: false },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25% (מאז 1/9); אינפלציה שנתית 1.5% - מתחת לאמצע היעד", important: true, source: { name: "בנק ישראל / funder.co.il", url: "https://funder.co.il/article/211282" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "TSLA", title: "Tesla (רבעון שלישי 2026)", timing: "AMC", important: true, source: { name: "Tesla 8-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/0001318605/000162828026064366/exhibit991111111.htm" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "IBM", title: "IBM (רבעון שלישי 2026)", timing: "AMC", important: false },

    { at: "2026-10-23T16:30:00+03:00", kind: "macro", title: "מדדי PMI מקדמיים (Flash) לייצור ולשירותים בארה\"ב - אוקטובר", important: false },
    { at: "2026-10-23T17:00:00+03:00", kind: "macro", title: "מדד אמון הצרכנים של אוניברסיטת מישיגן (אוקטובר, נתון סופי) — ארה\"ב", important: false },

    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה; סקר i24NEWS (7/10): גוש הקואליציה 60, גוש השינוי 48, ערבים 12", important: true, source: { name: "i24NEWS - סקרים", url: "https://www.i24news.tv/he/news/israel-elections-2026/polls/artc-e0e93683" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch (16/10, אחרי דברי וורש): החזקה ~85% · העלאה ~15%", important: true, source: { name: "Benzinga", url: "https://www.benzinga.com/markets/prediction-markets/26/10/62408879/fed-rate-hike-odds-warsh-ai" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true }
  ]
};
