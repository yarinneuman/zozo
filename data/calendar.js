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
  updatedAt: "2026-10-14T08:26:00+03:00",
  weekOf: "2026-10-12",
  events: [
    { at: "2026-10-13T20:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרה בירידות קלות: S&P 500 -0.02% (7,805.45), נאסד\"ק -0.15% (27,204.38), דאו ג'ונס -0.35% (51,670.10); גולדמן זאקס הכתה (EPS 17.01$), JPMorgan פספסה (EPS 5.57$), באנק אוף אמריקה נקנס ב-1.21 מיליארד דולר על ידי משרד האוצר האמריקאי", important: true, source: { name: "Yahoo Finance / Bloomberg", url: "https://finance.yahoo.com/markets/live/stock-market-today-tuesday-october-13-dow-sp-500-nasdaq-chip-stocks-192419999.html" } },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר), ארה\"ב", consensus: "חודשי +0.6%, שנתי כ-3.6-3.7% (בסיס כ-2.4% שנתי)", prior: "חודשי +0.4%, שנתי 3.4%", important: true, source: { name: "TradingKey / CryptoTimes", url: "https://cryptotimes.io/2026/10/14/us-cpi-data-inflation-may-hit-3-7-what-to-expect-for-bitcoin" } },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "BAC", title: "Bank of America (רבעון שלישי 2026)", timing: "BMO", important: true, source: { name: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-10-13/bofa-hit-with-1-2-billion-of-fines-over-money-laundering-lapses" } },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "MS", title: "Morgan Stanley (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-15T15:30:00+03:00", kind: "macro", title: "מדד המחירים ליצרן (PPI) ומכירות קמעונאיות, ספטמבר — ארה\"ב", important: true },

    { at: "2026-10-16T16:15:00+03:00", kind: "macro", title: "מחירי יבוא/יצוא, תפוקה תעשייתית וניצולת כושר ייצור — ארה\"ב", important: false },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25% (מאז 1/9)", important: true, source: { name: "בנק ישראל", url: "https://www.boi.org.il/%D7%94%D7%AA%D7%A4%D7%A7%D7%99%D7%93%D7%99%D7%9D-%D7%94%D7%9B%D7%9C%D7%9B%D7%9C%D7%99%D7%99%D7%9D/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%95%D7%A0%D7%99%D7%98%D7%A8%D7%99%D7%AA/%D7%9E%D7%95%D7%A2%D7%93%D7%99-%D7%94%D7%97%D7%9C%D7%98%D7%95%D7%AA-%D7%94%D7%A8%D7%99%D7%91%D7%99%D7%AA/" } },

    { at: "2026-10-27T00:00:00+03:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה", important: true, source: { name: "זמן ישראל", url: "https://www.zman.co.il/731622/" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch (14/10): החזקה ~77% · העלאה ~23%", important: true, source: { name: "CME FedWatch (via FXStreet, CryptoTimes)", url: "https://cryptotimes.io/2026/10/14/us-cpi-data-inflation-may-hit-3-7-what-to-expect-for-bitcoin" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true }
  ]
};
