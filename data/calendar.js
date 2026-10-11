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
  updatedAt: "2026-10-11T08:40:00+03:00",
  weekOf: "2026-10-11",
  events: [
    { at: "2026-10-09T17:00:00+03:00", kind: "macro", title: "וול סטריט סוגרת שבוע שיא: S&P 500 +1.2% שבועי (7,811.54), נאסד\"ק קבע שיא (27,477.31) בתחילת השבוע, אחרי מכירה סביב דיווח על הכנסות OpenAI", important: true, source: { name: "TheStreet / Yahoo Finance", url: "https://finance.yahoo.com/markets/live/stock-market-today-friday-october-9-dow-sp-500-nasdaq-080148117.html" } },

    { at: "2026-10-12T00:00:00+03:00", allDay: true, kind: "macro", title: "חג קולומבוס בארה\"ב — שוק האג\"ח סגור, שוק המניות פתוח", important: false },

    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "JPM", title: "JPMorgan Chase (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$5.90, הכנסות כ-$50.9 מיליארד", important: true, source: { name: "Zacks / tickerleague", url: "https://tickerleague.com/companies/JPM/estimates" } },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "GS", title: "Goldman Sachs (רבעון שלישי 2026)", timing: "BMO", important: true },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "WFC", title: "Wells Fargo (רבעון שלישי 2026)", timing: "BMO", important: false },
    { at: "2026-10-13T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "C", title: "Citigroup (רבעון שלישי 2026)", timing: "BMO", important: false },

    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר), ארה\"ב — תחזית כ-3.6-3.7% שנתי, בסיס כ-2.4%", important: true, source: { name: "fedratecalc.com", url: "https://fedratecalc.com/cpi-release-date/" } },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל — שבוע לפני הבחירות לכנסת", prior: "3.25%", important: true, source: { name: "בנק ישראל - לוח מועדים 2026-2027", url: "https://boi.org.il/media/pnplqicn/רשימת-מועדים-המשפיעים-על-פעילות-בנק-ישראל-לשנים-2026-2027.pdf" } },

    { at: "2026-10-27T00:00:00+03:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה; הליכוד ו\"ישר!\" מובילות בסקרים", important: true, source: { name: "skarim.org (ממוצע סקרים)", url: "https://www.skarim.org/average-poll" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "FedWatch: החזקה ~82% · העלאה ~18%", important: true, source: { name: "Daily Sabah (Anadolu)", url: "https://www.dailysabah.com/business/finance/more-hikes-needed-to-lower-inflation-to-2-target-feds-waller" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true, source: { name: "CBS News", url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-strait-of-hormuz-7-day-proposal/" } }
  ]
};
