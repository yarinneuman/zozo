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
  updatedAt: "2026-10-10T08:16:00+03:00",
  weekOf: "2026-10-11",
  events: [
    { at: "2026-10-09T17:00:00+03:00", kind: "macro", title: "וול סטריט מסיימת שבוע סוער בעליות: הדאו +0.83%, S&P 500 +0.6%, נאסד\"ק +0.64%, אחרי שOpenAI הכחישה דיווח FT על הכנסות נמוכות", important: true, source: { name: "TheStreet / Yahoo Finance / CNBC", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-oct-09-2026" } },

    { at: "2026-10-12T00:00:00+03:00", allDay: true, kind: "macro", title: "חג קולומבוס בארה\"ב — שוק האג\"ח סגור, שוק המניות פתוח", important: false },

    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "JPM", title: "JPMorgan Chase (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$5.88-5.90", important: true, source: { name: "akrostec / IR דיווחי החברה", url: "https://www.akrostec.com/indices/AUL500/events/2026-10-13t00-00-00z-jpmorgan-chase-co-jpm-financial-results-fd4c7e25" } },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "GS", title: "Goldman Sachs (רבעון שלישי 2026)", timing: "BMO", important: true },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "WFC", title: "Wells Fargo (רבעון שלישי 2026)", timing: "BMO", important: false },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "C", title: "Citigroup (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר), ארה\"ב", important: true, source: { name: "financecalendar.com", url: "https://www.financecalendar.com/events/2026-10-14/" } },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל — שבוע לפני הבחירות לכנסת", prior: "3.25%", important: true, source: { name: "בנק ישראל - לוח מועדים 2026-2027", url: "https://boi.org.il/media/pnplqicn/רשימת-מועדים-המשפיעים-על-פעילות-בנק-ישראל-לשנים-2026-2027.pdf" } },

    { at: "2026-10-27T00:00:00+03:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה", important: true, source: { name: "Ynetnews / Al Jazeera", url: "https://www.ynetnews.com/article/hk6t3kcfh" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "FedWatch: החזקה ~82% · העלאה ~18%", important: true, source: { name: "Axios", url: "https://www.axios.com/2026/10/08/interest-rate-hikes-fed-waller" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms); טראמפ התחייב שלא לחדש הפצצות על איראן לפניהן", important: true, source: { name: "CBS News", url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-strait-of-hormuz-7-day-proposal/" } }
  ]
};
