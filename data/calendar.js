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
  updatedAt: "2026-10-23T08:20:00+03:00",
  weekOf: "2026-10-23",
  events: [
    { at: "2026-10-23T16:30:00+03:00", kind: "macro", title: "מדדי PMI מקדמיים (Flash) לייצור ולשירותים בארה\"ב - אוקטובר", important: false },
    { at: "2026-10-23T17:00:00+03:00", kind: "macro", title: "מדד אמון הצרכנים של אוניברסיטת מישיגן (אוקטובר, נתון סופי) - ארה\"ב", important: false },

    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 - הראשונות במועדן החוקי מזה 38 שנה; הסקרים חלוקים מאוד בין המכונים (זמן ישראל וישראל היום/קנטאר מ-22/10 מובילים את \"ישר!\" 23-21 על הליכוד, לצד סקר i24NEWS/Direct Polls שהראה מגמה הפוכה - התחזקות לליכוד)", important: true, source: { name: "זמן ישראל / ישראל היום-קנטאר / i24NEWS", url: "https://www.i24news.tv/he/news/israel-elections-2026/polls" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75-4.00% (העלאה של 25 נ\"ב בספטמבר - הראשונה מאז 2023)", consensus: "CME FedWatch (22/10): החזקה ~83.9% · העלאה ~16.1%", important: true, source: { name: "Gate.com / Phemex (CME FedWatch)", url: "https://www.gate.com/news/detail/fed-likely-to-hold-rates-steady-in-october-at-839-probability-cme-fedwatch-25114566" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "MSFT", title: "Microsoft (רבעון ראשון, שנת פיסקלית 2027) - אחרי נעילת המסחר", timing: "AMC", important: true, source: { name: "SmartCalendars / Summit Cap News", url: "https://www.smartcalendars.ai/en/feeds/magnificent-7-earnings-calendar" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "GOOGL", title: "Alphabet (רבעון שלישי 2026) - אחרי נעילת המסחר, שיחת משקיעים ב-16:30 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "cmelitegroup.com", url: "https://www.cmelitegroup.com/knowledge-hub/alphabet-earnings-date/" } },

    { at: "2026-10-29T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "AMZN", title: "Amazon (רבעון שלישי 2026) - אחרי נעילת המסחר, שיחת משקיעים ב-17:00 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "SmartCalendars", url: "https://www.smartcalendars.ai/en/feeds/magnificent-7-earnings-calendar" } }
  ]
};
