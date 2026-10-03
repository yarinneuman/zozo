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
  updatedAt: "2026-10-03T08:23:00+03:00",
  weekOf: "2026-09-27",
  events: [
    { at: "2026-10-02T15:30:00+03:00", kind: "macro", title: "דו\"ח התעסוקה NFP ספטמבר: 29 אלף משרות מול תחזית כ-84 אלף, אבטלה 4.2%", consensus: "כ-84K · אבטלה 4.1%", prior: "133K (מתוקן) · 4.1%", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/02/jobs-report-september-2026.html" } },
    { at: "2026-10-02T23:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרת בעלייה חדה: S&P 500 +0.7% ל-7,722.93, נאסד\"ק +1.2%, דאו +0.5%", important: true, source: { name: "Yahoo Finance Live", url: "https://finance.yahoo.com/markets/live/stock-market-today-friday-october-2-dow-sp-500-nasdaq-september-jobs-report-080623878.html" } },
    { at: "2026-10-02T20:00:00+03:00", allDay: true, kind: "macro", title: "טראמפ דוחה כ\"בלתי מתקבל\" מתווה שבעת-ימים של איראן להורמוז; הנפט נסוג מהשיאים", important: true, source: { name: "Al Jazeera / CBS News", url: "https://www.aljazeera.com/news/2026/10/2/new-aircraft-carrier-10000-us-troops-is-the-iran-war-about-to-escalate" } },

    { at: "2026-10-03T00:00:00+03:00", allDay: true, kind: "israel", title: "שוק ת\"א סגור (ערב שמחת תורה ושבת); יום המסחר הבא ביום ראשון 4/10", important: false },

    { at: "2026-10-05T17:00:00+03:00", kind: "macro", title: "ISM שירותים (ספטמבר)", important: true },
    { at: "2026-10-06T23:05:00+03:00", kind: "earnings", ticker: "STZ", title: "Constellation Brands (רבעון שני, שנת כספים 2027)", timing: "AMC", consensus: "EPS כ-$3.55", important: false, source: { name: "Constellation Brands IR", url: "https://ir.cbrands.com/news-events/press-releases/detail/345/constellation-brands-to-report-second-quarter-fiscal-2027-financial-results-on-october-6-2026-after-market-close-and-host-conference-call-on-october-7-2026-at-8-00-am-et" } },
    { at: "2026-10-07T21:00:00+03:00", kind: "fed", title: "פרוטוקול ה-FOMC מישיבת 15-16/9", important: false, source: { name: "Federal Reserve", url: "https://www.federalreserve.gov/newsevents/2026-october.htm" } },
    { at: "2026-10-08T14:00:00+03:00", kind: "earnings", ticker: "PEP", title: "PepsiCo (רבעון שלישי 2026)", timing: "BMO", consensus: "EPS כ-$2.30", important: true, source: { name: "TipRanks / Earnings Whispers", url: "https://beta.earningswhispers.com/go/w/PEP" } },
    { at: "2026-10-09T17:00:00+03:00", kind: "earnings", ticker: "DAL", title: "Delta Air Lines (רבעון שלישי 2026), שיחת משקיעים 10:00 שעון מזרח", timing: "BMO", consensus: "EPS כ-$2.05-2.21", important: true, source: { name: "Delta IR", url: "https://briefglance.com/companies/delta-air-lines-inc/pulses/79908" } },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25%", important: true },
    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC", prior: "3.75–4.00%", consensus: "CME FedWatch: החזקה כ-83% · העלאה כ-17% (2/10, אחרי דו\"ח התעסוקה)", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html" } }
  ]
};
