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
  updatedAt: "2026-10-12T08:23:00+03:00",
  weekOf: "2026-10-12",
  events: [
    { at: "2026-10-11T20:00:00+03:00", allDay: true, kind: "macro", title: "הסלמה בריאד: שלוש התקפות חות'יות על שדה התעופה בתוך 3 ימים, כ-13 הרוגים; נפט ברנט טיפס לכ-100-105$; טראמפ מכריז על \"הפסקת אש אנרגטית\" רוסיה-אוקראינה, זלנסקי: \"חדשות בשבילי\"", important: true, source: { name: "CNN / CNBC", url: "https://edition.cnn.com/2026/10/10/middleeast/riyadh-airport-saudi-houthis-intl" } },

    { at: "2026-10-12T00:00:00+03:00", allDay: true, kind: "macro", title: "חג קולומבוס בארה\"ב — שוק האג\"ח סגור, שוק המניות פתוח", important: false },

    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "JPM", title: "JPMorgan Chase (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$5.93, הכנסות כ-$51.2 מיליארד", impliedMove: "±5.3%", important: true, source: { name: "MarketBeat / AlphaStreet", url: "https://www.marketbeat.com/earnings/reports/2026-10-13-jpmorgan-chase-co-stock/" } },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "GS", title: "Goldman Sachs (רבעון שלישי 2026)", timing: "BMO", impliedMove: "±6.6%", important: true },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "WFC", title: "Wells Fargo (רבעון שלישי 2026)", timing: "BMO", important: false },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "C", title: "Citigroup (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר), ארה\"ב — תחזית כ-3.6-3.7% שנתי, בסיס כ-2.4%", important: true, source: { name: "fedratecalc.com", url: "https://fedratecalc.com/us-economic-calendar/october-2026/" } },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "BAC", title: "Bank of America (רבעון שלישי 2026)", timing: "BMO", important: false },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "MS", title: "Morgan Stanley (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-15T15:30:00+03:00", kind: "macro", title: "מדד המחירים ליצרן (PPI) ומכירות קמעונאיות, ספטמבר — ארה\"ב", important: true, source: { name: "fedratecalc.com", url: "https://fedratecalc.com/us-economic-calendar/october-2026/" } },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל — שבוע לפני הבחירות לכנסת", prior: "3.25%", important: true, source: { name: "בנק ישראל - לוח מועדים 2026-2027", url: "https://boi.org.il/media/pnplqicn/רשימת-מועדים-המשפיעים-על-פעילות-בנק-ישראל-לשנים-2026-2027.pdf" } },

    { at: "2026-10-27T00:00:00+03:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה; סקר זמן ישראל (7-8/10): \"ישר!\" 24 מנדטים מול 20 לליכוד", important: true, source: { name: "זמן ישראל", url: "https://www.zman.co.il/731622/" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "FedWatch/Kalshi/Polymarket: החזקה ~82-85% · העלאה ~15-18%", important: true, source: { name: "predictionmarketspicks.com", url: "https://www.investing.com/news/economy-news/feds-kashkari-says-more-rate-hikes-needed-but-not-sure-about-this-month-4928047" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true, source: { name: "CBS News", url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-strait-of-hormuz-7-day-proposal/" } }
  ]
};
