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
  updatedAt: "2026-10-02T08:22:00+03:00",
  weekOf: "2026-09-28",
  events: [
    { at: "2026-09-30T15:30:00+03:00", kind: "macro", title: "PCE הליבה: 3.0% בשנה (תחזית 3.3%) · תמ\"ג Q2 סופי עודכן ל-2.2%", consensus: "PCE ליבה 3.3% בשנה", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/feds-preferred-gauge-showed-core-inflation-at-3point0percent-in-august-much-lighter-than-expected.html" } },
    { at: "2026-09-30T23:05:00+03:00", kind: "earnings", ticker: "MU", title: "Micron: הכנסות שיא $54.23B מול תחזית $50.45B, EPS $33.42 מול $31.16", timing: "AMC", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/micron-mu-q4-earnings-report-2026.html" } },

    { at: "2026-10-01T14:00:00+03:00", kind: "earnings", ticker: "ACN", title: "Accenture: EPS בפועל $3.18 מול תחזית $3.19", timing: "BMO", consensus: "EPS $3.19", important: true, source: { name: "MarketBeat", url: "https://www.marketbeat.com/earnings/reports/2026-10-1-accenture-plc-stock/" } },
    { at: "2026-10-01T17:00:00+03:00", kind: "macro", title: "ISM תעשייה ספטמבר: 54.5 (תחזית כ-55, אוגוסט 54.6)", consensus: "כ-55", important: true, source: { name: "ISM / PRNewswire", url: "https://www.prnewswire.com/news-releases/manufacturing-pmi-at-54-5-september-2026-ism-manufacturing-pmi-report-302894520.html" } },
    { at: "2026-10-01T23:05:00+03:00", kind: "earnings", ticker: "NKE", title: "Nike: EPS $0.48 מול תחזית $0.43, הכנסות $11.21B מול $11.32B (סין −26%)", timing: "AMC", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/01/nike-nke-q1-2027-earnings.html" } },
    { at: "2026-10-01T22:00:00+03:00", allDay: true, kind: "macro", title: "דיווח ה-WSJ: ארה\"ב שולחת נושאת מטוסים שלישית (USS Theodore Roosevelt) ועד 10,000 חיילים למזרח התיכון; נפט קופץ", important: true, source: { name: "FXStreet", url: "https://www.fxstreet.com/news/us-may-send-third-aircraft-carrier-and-10-000-troops-to-middle-east-202610020042" } },

    { at: "2026-10-02T02:00:00+03:00", allDay: true, kind: "israel", title: "שוק ת\"א סגור (ערב שמחת תורה); יום המסחר הבא ביום שני", important: false },
    { at: "2026-10-02T12:00:00+03:00", allDay: true, kind: "macro", title: "אינפלציה בגוש האירו (מקדמי)", important: false },
    { at: "2026-10-02T15:30:00+03:00", kind: "macro", title: "דוח תעסוקה NFP + אבטלה + שכר (ספטמבר)", consensus: "כ-89-93K · אבטלה 4.1%", prior: "162K · 4.1%", important: true, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/preview-us-september-jobs-data-is-due-on-2nd-october-2026-at-1330bst0830edt" } },
    { at: "2026-10-02T17:00:00+03:00", kind: "macro", title: "הזמנות מפעלים", important: false },

    { at: "2026-10-05T17:00:00+03:00", kind: "macro", title: "ISM שירותים (ספטמבר)", important: true },
    { at: "2026-10-06T23:05:00+03:00", kind: "earnings", ticker: "STZ", title: "Constellation Brands (רבעון שני, שנת כספים 2027)", timing: "AMC", consensus: "EPS כ-$3.55", important: false, source: { name: "Constellation Brands IR", url: "https://ir.cbrands.com/news-events/press-releases/detail/345/constellation-brands-to-report-second-quarter-fiscal-2027-financial-results-on-october-6-2026-after-market-close-and-host-conference-call-on-october-7-2026-at-8-00-am-et" } },
    { at: "2026-10-07T21:00:00+03:00", kind: "fed", title: "פרוטוקול ה-FOMC מישיבת 15-16/9", important: false, source: { name: "Federal Reserve", url: "https://www.federalreserve.gov/newsevents/2026-october.htm" } },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25%", important: true },
    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC", prior: "3.75–4.00%", consensus: "CME FedWatch: החזקה 61.8% · העלאה 38.2% (1/10, נתון תנודתי מאוד)", important: true, source: { name: "Babypips: סיכויי ריבית אוקטובר", url: "https://babypips.com/analysis/headline-mixed-us-data-october-rate-hike-odds-2026-10-01" } }
  ]
};
