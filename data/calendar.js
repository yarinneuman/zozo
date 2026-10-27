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
  updatedAt: "2026-10-27T08:16:00+02:00",
  weekOf: "2026-10-26",
  events: [
    { at: "2026-10-27T07:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 - הקלפיות פתוחות 7:00-22:00 (12,018 קלפיות, כ-7.3 מיליון בעלי זכות בחירה); אבטחה כבדה - כ-20,000 שוטרים, הבורסה בתל אביב סגורה. בשוק החיזוי Polymarket (26/10) איזנקוט מתומחר ב-49% סיכוי להיות ראש הממשלה הבא מול 31% לנתניהו, ומפלגתו \"ישר!\" ב-68% סיכוי למספר המנדטים הגדול ביותר מול 33% לליכוד", important: true, source: { name: "JPost; Israel National News; i24NEWS, 26-27/10", url: "https://www.jpost.com/israel-election-2026/article-912973" } },

    { at: "2026-10-27T16:00:00+02:00", kind: "macro", title: "מדד אמון הצרכנים של Conference Board - ארה\"ב (אוקטובר)", important: false },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75-4.00% (העלאה של 25 נ\"ב בספטמבר)", consensus: "Kalshi/DeFiRate/PredictionMarketsPicks (26/10): כ-91-93% החזקה / כ-7-10% העלאה", important: true, source: { name: "DeFiRate; PredictionMarketsPicks", url: "https://defirate.com/odds/fed-decision/" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "MSFT", title: "Microsoft (רבעון ראשון, שנת פיסקלית 2027) - אחרי נעילת המסחר", timing: "AMC", important: true, source: { name: "Microsoft (הודעה רשמית)", url: "https://news.microsoft.com/source/?p=25114" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "GOOGL", title: "Alphabet (רבעון שלישי 2026) - אחרי נעילת המסחר, שיחת משקיעים ב-16:30 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "Sentisense (כינוס דיווחי Big Tech)", url: "https://sentisense.ai/blog/big-tech-earnings-this-week/" } },

    { at: "2026-10-29T14:30:00+02:00", kind: "macro", title: "אומדן ראשוני לתמ\"ג ארה\"ב לרבעון השלישי של 2026 + מדד PCE לספטמבר", important: true, source: { name: "BEA - לוח פרסומים רשמי", url: "https://www.bea.gov/index.php/news/schedule/full" } },
    { at: "2026-10-29T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "AMZN", title: "Amazon (רבעון שלישי 2026) - אחרי נעילת המסחר, שיחת משקיעים ב-17:00 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "Sentisense (כינוס דיווחי Big Tech)", url: "https://sentisense.ai/blog/big-tech-earnings-this-week/" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות ביניים (midterms) לקונגרס ארה\"ב", important: true }
  ]
};
