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
  updatedAt: "2026-10-26T08:16:00+02:00",
  weekOf: "2026-10-26",
  events: [
    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 - הסקרים מאופלים מאז מוצ\"ש (23/10, 23:59) עד לסגירת הקלפיות (22:00); נתניהו הזהיר (25/10) מניסיון איראני לשבש את ההצבעה, איזנקוט ערך עצרת סיום בתל אביב; בשוק החיזוי Polymarket (25/10) איזנקוט מתומחר ב-52% סיכוי להיות ראש הממשלה הבא ומפלגתו \"ישר!\" ב-62% מול 39% לליכוד", important: true, source: { name: "Times of Israel / Ynet / Polymarket", url: "https://www.timesofisrael.com/liveblog_entry/netanyahu-claims-iran-may-try-to-disrupt-election-warns-dont-test-us/" } },

    { at: "2026-10-27T16:00:00+02:00", kind: "macro", title: "מדד אמון הצרכנים של Conference Board - ארה\"ב (אוקטובר)", important: false },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75-4.00% (העלאה של 25 נ\"ב בספטמבר)", consensus: "Kalshi/DeFiRate (25/10): כ-93% החזקה / כ-7% העלאה; יו\"ר הפד וורש (16/10) נמנע מרמז לקראת ההחלטה", important: true, source: { name: "DeFiRate; Axios", url: "https://defirate.com/odds/fed-decision/" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "MSFT", title: "Microsoft (רבעון ראשון, שנת פיסקלית 2027) - אחרי נעילת המסחר", timing: "AMC", important: true, source: { name: "Microsoft (הודעה רשמית)", url: "https://news.microsoft.com/source/?p=25114" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "GOOGL", title: "Alphabet (רבעון שלישי 2026) - אחרי נעילת המסחר, שיחת משקיעים ב-16:30 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "Sentisense (כינוס דיווחי Big Tech)", url: "https://sentisense.ai/blog/big-tech-earnings-this-week/" } },

    { at: "2026-10-29T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "AMZN", title: "Amazon (רבעון שלישי 2026) - אחרי נעילת המסחר, שיחת משקיעים ב-17:00 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "Sentisense (כינוס דיווחי Big Tech)", url: "https://sentisense.ai/blog/big-tech-earnings-this-week/" } }
  ]
};
