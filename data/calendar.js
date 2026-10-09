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
  updatedAt: "2026-10-09T08:35:00+03:00",
  weekOf: "2026-10-05",
  events: [
    { at: "2026-10-08T17:00:00+03:00", kind: "macro", title: "וול סטריט: נאסד\"ק נופל יום שני ברצף על רקע דיווח ה-FT על הכנסות OpenAI; תשואת 10 שנים ונפט מזנקים", important: true, source: { name: "Yahoo Finance / Motley Fool", url: "https://www.fool.com/coverage/stock-market-today/2026/10/08/stock-market-today-oct-8-tech-stocks-slide-as-treasury-yields-and-oil-prices-surge/" } },

    { at: "2026-10-09T14:00:00+03:00", allDay: true, kind: "earnings", ticker: "DAL", title: "Delta Air Lines (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$1.96 · הכנסות כ-$17.70B", important: true, source: { name: "Yahoo Finance / Zacks / Delta IR", url: "https://ir.delta.com" } },
    { at: "2026-10-09T17:00:00+03:00", kind: "macro", title: "סנטימנט צרכנים, מישיגן (מקדמי, אוקטובר)", important: false },

    { at: "2026-10-12T00:00:00+03:00", allDay: true, kind: "macro", title: "חג קולומבוס בארה\"ב — שוק האג\"ח סגור, שוק המניות פתוח", important: false },

    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "JPM", title: "JPMorgan Chase (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$5.88", important: true, source: { name: "akrostec / IR דיווחי החברה", url: "https://www.akrostec.com/indices/AUL500/events/2026-10-13t00-00-00z-jpmorgan-chase-co-jpm-financial-results-fd4c7e25" } },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "GS", title: "Goldman Sachs (רבעון שלישי 2026)", timing: "BMO", important: true },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "WFC", title: "Wells Fargo (רבעון שלישי 2026)", timing: "BMO", important: false },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "C", title: "Citigroup (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר) — תאריך לפי אתרי יומן כלכלי, ללא אישור רשמי מה-BLS בעת הכתיבה", important: true },
    { at: "2026-10-14T12:00:00+03:00", allDay: true, kind: "earnings", ticker: "BAC", title: "Bank of America (רבעון שלישי 2026) — תאריך לא מאושר רשמית", timing: "BMO", important: false },
    { at: "2026-10-14T12:00:00+03:00", allDay: true, kind: "earnings", ticker: "MS", title: "Morgan Stanley (רבעון שלישי 2026) — תאריך לא מאושר רשמית", timing: "BMO", important: false },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25%", important: true, source: { name: "Focus Economics", url: "https://www.focus-economics.com/countries/israel/news/monetary-policy/israel-central-bank-meeting-01-09-2026-central-bank-cuts-rates-again-in-september/" } },
    { at: "2026-10-25T20:00:00+03:00", allDay: true, kind: "macro", title: "ברזיל: סיבוב שני בבחירות לנשיאות — בולסונארו מול לולה", important: true, source: { name: "NPR", url: "https://www.npr.org/2026/10/04/nx-s1-5981181/brazil-presidential-lula-bolsonaro" } },
    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "סיכוי להעלאה ירד לכ-20%-25% אחרי הצהרות וויליאמס וג'פרסון (29/9-1/10)", important: true, source: { name: "Reuters, לפי Roic.ai", url: "https://www.roic.ai/news/fed-leaders-signal-no-urgency-for-october-rate-hike-10-01-2026" } },
    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms); טראמפ דווח שיחדש הפצצות על איראן רק אחריהן", important: true, source: { name: "Wall Street Journal, לפי Times of Israel", url: "https://www.timesofisrael.com/liveblog-september-26-2026/" } }
  ]
};
