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
  updatedAt: "2026-10-20T08:15:00+03:00",
  weekOf: "2026-10-20",
  events: [
    { at: "2026-10-20T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NFLX", title: "Netflix (רבעון שלישי 2026) - קונצנזוס EPS כ-0.82$ על הכנסות כ-12.87-12.88 מיליארד דולר; החברה כבר לא מדווחת מנויים", timing: "AMC", impliedMove: "±9.5%", important: true, source: { name: "AlphaStreet / MarketBeat", url: "https://news.alphastreet.com/netflix-nflx-q3-2026-preview-eps-est-0-82-reports-october-20/" } },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25% (מאז 1/9); אינפלציה שנתית ספטמבר 1.6%; שוק מתמחר כ-79% סיכוי להחזקה", important: true, source: { name: "בנק ישראל / ICE", url: "https://www.ice.co.il/finance/news/article/1103658" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "TSLA", title: "Tesla (רבעון שלישי 2026) - מסירות הרבעון (486,532) כבר דיווחו וחרגו מהקונצנזוס (461,974); קונצנזוס הכנסות כ-27.6 מיליארד דולר, EPS GAAP כ-0.26$", timing: "AMC", important: true, source: { name: "electrek / Hudson Labs", url: "https://www.hudson-labs.com/research/tesla-q3-2026-earnings-preview-tsla-revenue-margins-outlook" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "IBM", title: "IBM (רבעון שלישי 2026) - קונצנזוס EPS לא-GAAP כ-2.89$ על הכנסות כ-16.85 מיליארד דולר", timing: "AMC", important: false, source: { name: "Benzinga" } },

    { at: "2026-10-23T16:30:00+03:00", kind: "macro", title: "מדדי PMI מקדמיים (Flash) לייצור ולשירותים בארה\"ב - אוקטובר", important: false },
    { at: "2026-10-23T17:00:00+03:00", kind: "macro", title: "מדד אמון הצרכנים של אוניברסיטת מישיגן (אוקטובר, נתון סופי) — ארה\"ב", important: false },

    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה; סקרי 18-19/10 (ערוץ 12, 13, קאן) נתנו לגוש הנגדי לנתניהו בהנהגת גדי איזנקוט יתרון צר, בלי שאף גוש עובר את רף 61 המנדטים", important: true, source: { name: "Times of Israel", url: "https://www.timesofisrael.com/liveblog_entry/toi-poll-anti-netanyahu-bloc-regains-lead-eisenkots-yashar-comes-1st-with-likud-in-2nd-place/" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch (19/10): החזקה ~85% · העלאה ~15%", important: true, source: { name: "FXStreet", url: "https://vantagemarkets.com/market-analysis/why-usd-jpy-stalled-ueda-fed-hike-bets-fade-october-19-2026" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true }
  ]
};
