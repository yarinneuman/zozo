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
  updatedAt: "2026-10-01T08:12:00+03:00",
  weekOf: "2026-09-27",
  events: [
    { at: "2026-09-29T18:00:00+03:00", allDay: true, kind: "fed", title: "נאום וויליאמס (פד ניו יורק): \"אין צורך במיידיות\", עוד העלאה אפשרית השנה", important: true, source: { name: "US News (Reuters)", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" } },

    { at: "2026-09-30T14:00:00+03:00", allDay: true, kind: "earnings", title: "Jabil · FactSet · Conagra · Cal-Maine", timing: "BMO", consensus: "EPS $4.06 · $4.35 · $0.28 · −$0.71", important: false },
    { at: "2026-09-30T15:30:00+03:00", kind: "macro", title: "PCE הליבה: 3.0% בשנה (תחזית 3.3%) · תמ\"ג Q2 סופי", consensus: "PCE ליבה 3.3% בשנה", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/feds-preferred-gauge-showed-core-inflation-at-3point0percent-in-august-much-lighter-than-expected.html" } },
    { at: "2026-09-30T18:00:00+03:00", allDay: true, kind: "fed", title: "קשקארי (פד מיניאפוליס): האינפלציה \"עדיין גבוהה מדי\", שוק העבודה \"טוב למדי\"", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/watch-minneapolis-fed-president-neel-kashkari.html" } },
    { at: "2026-09-30T23:05:00+03:00", kind: "earnings", ticker: "MU", title: "Micron: הכנסות שיא $54.23B מול תחזית $50.45B, EPS $33.42 מול $31.16", timing: "AMC", consensus: "הנחיה Q1: הכנסות כ-$61.5B · EPS $38.15", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/micron-mu-q4-earnings-report-2026.html" } },

    { at: "2026-10-01T14:00:00+03:00", kind: "earnings", ticker: "ACN", title: "Accenture: EPS בפועל $3.18 מול תחזית $3.19 (גם McCormick, Acuity)", timing: "BMO", consensus: "EPS $3.19", important: true, source: { name: "IndMoney / MarketBeat", url: "https://www.marketbeat.com/earnings/reports/2026-10-1-accenture-plc-stock/" } },
    { at: "2026-10-01T15:30:00+03:00", kind: "macro", title: "תביעות אבטלה שבועיות", important: false },
    { at: "2026-10-01T17:00:00+03:00", kind: "macro", title: "ISM תעשייה (ספטמבר)", consensus: "כ-55 (מול 54.6% באוגוסט)", important: true, source: { name: "FinanceCalendar", url: "https://www.financecalendar.com/us-ism-manufacturing-pmi/" } },
    { at: "2026-10-01T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NKE", title: "Nike", timing: "AMC", consensus: "EPS $0.44 · הכנסות $11.35B", important: true, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-daily-us-earnings-estimates---1st-october-2026-acn-nke" } },

    { at: "2026-10-02T12:00:00+03:00", allDay: true, kind: "macro", title: "אינפלציה בגוש האירו (מקדמי)", important: false },
    { at: "2026-10-02T15:30:00+03:00", kind: "macro", title: "דוח תעסוקה NFP + אבטלה + שכר (ספטמבר)", consensus: "90K · אבטלה 4.1%", prior: "162K · 4.1%", important: true, source: { name: "FXStreet", url: "https://www.fxstreet.com/macroeconomics/economic-indicator/nfp" } },
    { at: "2026-10-02T17:00:00+03:00", kind: "macro", title: "הזמנות מפעלים", important: false },

    { at: "2026-10-07T21:00:00+03:00", kind: "fed", title: "פרוטוקול ה-FOMC מישיבת 15-16/9", important: false, source: { name: "Federal Reserve", url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" } },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25%", important: true },
    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC", prior: "3.75–4.00%", consensus: "העלאה 47.1% (CME FedWatch, 30/9)", important: true, source: { name: "Phemex: FedWatch", url: "https://phemex.com/news/article/cme-fedwatch-529-chance-fed-holds-rates-in-october-after-pce-data-98336" } }
  ]
};
