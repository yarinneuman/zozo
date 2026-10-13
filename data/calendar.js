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
  updatedAt: "2026-10-13T08:22:00+03:00",
  weekOf: "2026-10-12",
  events: [
    { at: "2026-10-12T20:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרה במגמה מעורבת: דאו +0.38% (51,850.55), S&P 500 -0.06% (7,807.24), נאסד\"ק -0.44% (27,245.90); ברנט נשאר מעל 105$; זלנסקי: רוסיה הפרה את \"הפסקת האש האנרגטית\" שהכריז עליה טראמפ", important: true, source: { name: "Yahoo Finance / CNBC", url: "https://finance.yahoo.com/markets/live/stock-market-today-monday-october-12-dow-sp-500-nasdaq-080321571.html" } },

    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "JPM", title: "JPMorgan Chase (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$5.90-5.93, הכנסות כ-$51.2-51.3 מיליארד", impliedMove: "±5.3%", important: true, source: { name: "IndMoney / Benzinga", url: "https://www.benzinga.com/markets/options/26/10/62310288/jpmorgan-chase-could-swing-28-billion-after-earnings" } },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "GS", title: "Goldman Sachs (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS $12.86-13.03 (פיזור חריג), הכנסות כ-$16.7-16.8 מיליארד", impliedMove: "±6.6%", important: true, source: { name: "StoneX / Admiral Markets", url: "https://www.cnbc.com/2026/10/11/bank-earnings-jpmorgan-goldman.html" } },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "WFC", title: "Wells Fargo (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$1.85, הכנסות כ-$22.3 מיליארד", important: false },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "C", title: "Citigroup (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$2.65-2.66, הכנסות כ-$23.7 מיליארד", important: false },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר), ארה\"ב", consensus: "חודשי +0.6%, שנתי כ-3.6% (בסיס +0.2% חודשי, 2.5% שנתי)", prior: "חודשי +0.4%, שנתי 3.4%", important: true, source: { name: "TradingKey / CMC Markets", url: "https://www.tradingkey.com/analysis/stocks/us-stocks/262210228-weekly-preview-us-september-cpi-ppi-wall-street-banks-earnings-tsmc-tradingkey" } },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "BAC", title: "Bank of America (רבעון שלישי 2026)", timing: "BMO", important: false },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "MS", title: "Morgan Stanley (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-15T15:30:00+03:00", kind: "macro", title: "מדד המחירים ליצרן (PPI) ומכירות קמעונאיות, ספטמבר — ארה\"ב", important: true, source: { name: "TradingKey", url: "https://www.tradingkey.com/analysis/stocks/us-stocks/262210228-weekly-preview-us-september-cpi-ppi-wall-street-banks-earnings-tsmc-tradingkey" } },

    { at: "2026-10-16T16:15:00+03:00", kind: "macro", title: "מחירי יבוא/יצוא, תפוקה תעשייתית וניצולת כושר ייצור — ארה\"ב", important: false },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל (בתוקף מ-25/10) — שבוע לפני הבחירות לכנסת", prior: "3.25% (מאז 1/9)", consensus: "שוק מתמחר ~81% החזקה", important: true, source: { name: "ice.co.il / בנק ישראל", url: "https://www.boi.org.il/" } },

    { at: "2026-10-27T00:00:00+03:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה", important: true, source: { name: "זמן ישראל", url: "https://www.zman.co.il/731622/" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "FedWatch/Kalshi/Polymarket: החזקה ~80-85% · העלאה ~15-20%", important: true, source: { name: "CME FedWatch (via קיטקו, Reuters)", url: "https://www.kitco.com/news/off-the-wire/2026-09-30/feds-williams-sees-no-urgency-next-rate-hike" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true, source: { name: "CBS News", url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-saudi-arabia-houthi/" } }
  ]
};
