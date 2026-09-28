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
  updatedAt: "2026-09-28T16:00:00+03:00",
  weekOf: "2026-09-28",
  events: [
    { at: "2026-09-28T09:00:00+03:00", allDay: true, kind: "macro", title: "רווחי תעשייה בסין · פרוטוקול BoJ", important: false },
    { at: "2026-09-28T09:30:00+03:00", allDay: true, kind: "israel", title: "בורסת ת״א: יום מסחר מקוצר (חול המועד סוכות)", important: false, source: { name: "הבורסה לני״ע", url: "https://www.tase.co.il/he/content/knowledge_center/trading_vacation_schedule" } },
    { at: "2026-09-28T10:00:00+03:00", allDay: true, kind: "fed", title: "נאומים: ברקין (פד), לגארד (ECB)", important: false },
    { at: "2026-09-28T17:30:00+03:00", kind: "macro", title: "מדד התעשייה של הפד בדאלאס (ספטמבר)", important: false, source: { name: "Investrade", url: "https://investrade.com/morning-preview-september-28-2026/" } },
    { at: "2026-09-28T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "MTN", title: "Vail Resorts", timing: "AMC", consensus: "EPS −$5.30", important: false },
    { at: "2026-09-28T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "JEF", title: "Jefferies (גם IDT, TRAK, IVA)", timing: "AMC", important: false, source: { name: "Investrade", url: "https://investrade.com/morning-preview-september-28-2026/" } },

    { at: "2026-09-29T14:00:00+03:00", allDay: true, kind: "earnings", ticker: "KMX", title: "CarMax", timing: "BMO", consensus: "EPS $0.72", important: false },
    { at: "2026-09-29T16:00:00+03:00", kind: "macro", title: "מחירי דיור קייס-שילר", important: false },
    { at: "2026-09-29T17:00:00+03:00", kind: "macro", title: "JOLTS משרות פנויות", important: true },
    { at: "2026-09-29T18:00:00+03:00", allDay: true, kind: "fed", title: "ריבית RBA · נאומים: גולסבי, ויליאמס", important: false },
    { at: "2026-09-29T23:05:00+03:00", allDay: true, kind: "earnings", title: "FedEx Freight · Concentrix · AAR", timing: "AMC", consensus: "EPS $1.39 · $2.71 · $1.31", important: false },

    { at: "2026-09-30T09:00:00+03:00", allDay: true, kind: "macro", title: "PMI תעשייה בסין · אינפלציה בגרמניה", important: false },
    { at: "2026-09-30T14:00:00+03:00", allDay: true, kind: "earnings", title: "Jabil · FactSet · Conagra · Cal-Maine", timing: "BMO", consensus: "EPS $4.06 · $4.35 · $0.28 · −$0.71", important: false },
    { at: "2026-09-30T15:15:00+03:00", kind: "macro", title: "ADP תעסוקה", important: false },
    { at: "2026-09-30T15:30:00+03:00", kind: "macro", title: "PCE, הכנסה והוצאה + תמ״ג Q2 סופי", consensus: "PCE +0.4% בחודש (CMC)", prior: "+0.2%", important: true, source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-weekly-economic-release-28th-september---2nd-october-2026-" } },
    { at: "2026-09-30T16:45:00+03:00", allDay: true, kind: "fed", title: "שיקגו PMI · נאומים: קוק, קשקרי", important: false },
    { at: "2026-09-30T23:05:00+03:00", kind: "earnings", ticker: "MU", title: "Micron", timing: "AMC", consensus: "EPS $31.16 · הכנסות $50.45B", impliedMove: "±11%", important: true, source: { name: "Micron IR", url: "https://investors.micron.com/news/press-release/2026/Micron-Technology-to-Report-Fiscal-Fourth-Quarter-Results-on-September-30-2026/default.aspx" } },

    { at: "2026-10-01T09:00:00+03:00", allDay: true, kind: "macro", title: "Tankan ביפן · פיטורים (Challenger)", important: false },
    { at: "2026-10-01T14:00:00+03:00", allDay: true, kind: "earnings", ticker: "ACN", title: "Accenture (גם McCormick, Acuity)", timing: "BMO", consensus: "EPS $3.18", important: true, source: { name: "Accenture Newsroom", url: "https://newsroom.accenture.com/news/2026/accenture-to-announce-fourth-quarter-and-full-year-fiscal-2026-results" } },
    { at: "2026-10-01T15:30:00+03:00", kind: "macro", title: "תביעות אבטלה", important: false },
    { at: "2026-10-01T17:00:00+03:00", kind: "macro", title: "ISM תעשייה", important: true },
    { at: "2026-10-01T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NKE", title: "Nike", timing: "AMC", consensus: "EPS $0.44 · הכנסות $11.33B", impliedMove: "±8.3%", important: true, source: { name: "Nike IR", url: "https://investors.nike.com/investors/news-events-and-reports/investor-news/investor-news-details/2026/NIKE-Inc--Announces-First-Quarter-Fiscal-2027-Earnings-and-Conference-Call/default.aspx" } },

    { at: "2026-10-02T12:00:00+03:00", allDay: true, kind: "macro", title: "אינפלציה בגוש האירו (מקדמי)", important: false },
    { at: "2026-10-02T15:30:00+03:00", kind: "macro", title: "דוח תעסוקה NFP + אבטלה + שכר", consensus: "90K · אבטלה 4.1%", prior: "162K · 4.1%", important: true, source: { name: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-09-26/us-jobs-report-seen-showing-90-000-payrolls-4-1-unemployment-rate" } },
    { at: "2026-10-02T17:00:00+03:00", kind: "macro", title: "הזמנות מפעלים", important: false },

    { at: "2026-10-21T12:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25%", important: true },
    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC", prior: "3.75–4.00%", consensus: "העלאה 68% (Reuters)", important: true, source: { name: "Beansprout: FedWatch", url: "https://growbeansprout.com/tools/fedwatch" } }
  ]
};
