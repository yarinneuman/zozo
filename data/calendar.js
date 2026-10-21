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
  updatedAt: "2026-10-21T08:20:00+03:00",
  weekOf: "2026-10-20",
  events: [
    { at: "2026-10-20T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NFLX", title: "Netflix (רבעון שלישי 2026) - EPS 0.87$ מול קונצנזוס כ-0.82$, הכנסות +12%; המניה נפלה כ-5%-6% על תחזית רבעון רביעי חלשה וגזירת תחזית הכנסות הפרסום", timing: "AMC", impliedMove: "-5% עד -6% בפועל", important: true, source: { name: "Netflix 8-K / fxstreet", url: "https://www.sec.gov/Archives/edgar/data/0001065280/000106528026000290/ex991_q326.htm" } },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25% (מאז 1/9); אינפלציה שנתית 1.5%-1.6%; שוקי חיזוי מתמחרים כ-75%-77% סיכוי להחזקה", important: true, source: { name: "בנק ישראל / Polymarket", url: "https://predscope.com/event/bank-of-israel-decision-in-october" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "TSLA", title: "Tesla (רבעון שלישי 2026) - מסירות הרבעון (486,532) כבר דיווחו וחרגו מהקונצנזוס (461,974); קונצנזוס הכנסות כ-27.6 מיליארד דולר, EPS GAAP כ-0.26$", timing: "AMC", important: true, source: { name: "electrek / Hudson Labs", url: "https://www.hudson-labs.com/research/tesla-q3-2026-earnings-preview-tsla-revenue-margins-outlook" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "IBM", title: "IBM (רבעון שלישי 2026) - קונצנזוס EPS לא-GAAP כ-2.89$ על הכנסות כ-16.85 מיליארד דולר", timing: "AMC", important: false, source: { name: "Benzinga" } },

    { at: "2026-10-23T16:30:00+03:00", kind: "macro", title: "מדדי PMI מקדמיים (Flash) לייצור ולשירותים בארה\"ב - אוקטובר", important: false },
    { at: "2026-10-23T17:00:00+03:00", kind: "macro", title: "מדד אמון הצרכנים של אוניברסיטת מישיגן (אוקטובר, נתון סופי) — ארה\"ב", important: false },

    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה; סקרי 18-19/10 (ערוץ 12, 13, קאן, ממוצע סרוגים) ממשיכים להצביע על מירוץ צמוד מאוד, בלי שאף גוש עובר את רף 61 המנדטים", important: true, source: { name: "Srugim poll average", url: "https://www.srugim.co.il/elections/elections2026" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch (השבוע): החזקה ~83-85% · העלאה ~15-17%", important: true, source: { name: "Yardeni Research", url: "https://invezz.com/news/2026/10/16/fed-rate-hold-odds-jump-to-85-even-as-warsh-offers-no-clues-on-policy-path/" } }
  ]
};
