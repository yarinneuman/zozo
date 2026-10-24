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
  updatedAt: "2026-10-24T09:10:00+03:00",
  weekOf: "2026-10-24",
  events: [
    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 - הסקרים האחרונים (הארץ, מעריב, חדשות 12) נותנים יתרון זהיר ל\"ישר!\" בהנהגת גדי איזנקוט על הליכוד, לצד סקר חריג של ערוץ 14 שהראה מגמה הפוכה; אף גוש לא עובר את רף 61 המנדטים לפי מרבית הסקרים", important: true, source: { name: "הארץ / מעריב / חדשות 12", url: "https://www.haaretz.co.il/news/elections/2026-10-23/ty-article/000001a1-69ad-d29a-a1a5-ebaf49c50000" } },

    { at: "2026-10-27T16:00:00+02:00", kind: "macro", title: "מדד אמון הצרכנים של Conference Board - ארה\"ב (אוקטובר)", important: false },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75-4.00% (העלאה של 25 נ\"ב בספטמבר - הראשונה מאז 2023)", consensus: "סקר רויטרס בין כלכלנים (20/10): 94% מצפים להחזקה; FedWatch (19/10, Forbes): כ-80% החזקה", important: true, source: { name: "Reuters/Kitco; Forbes", url: "https://www.kitco.com/news/off-the-wire/2026-10-20/fed-skip-october-raise-rates-again-december-nearly-all-economists-say" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "MSFT", title: "Microsoft (רבעון ראשון, שנת פיסקלית 2027) - אחרי נעילת המסחר, שיחת משקיעים ב-17:30 לפי שעון מזרח ארה\"ב", timing: "AMC", important: true, source: { name: "Microsoft (הודעה רשמית, 7/10)", url: "https://news.microsoft.com/source/?p=25114" } },
    { at: "2026-10-28T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "GOOGL", title: "Alphabet (רבעון שלישי 2026) - אחרי נעילת המסחר, קונצנזוס הכנסות כ-127.4-131.8 מיליארד דולר", timing: "AMC", important: true, source: { name: "cmelitegroup.com / insiderfinance.io", url: "https://www.insiderfinance.io/news/alphabet-q3-2026-earnings-preview" } },

    { at: "2026-10-29T23:05:00+02:00", allDay: true, kind: "earnings", ticker: "AMZN", title: "Amazon (רבעון שלישי 2026) - אחרי נעילת המסחר", timing: "AMC", important: true, source: { name: "SmartCalendars", url: "https://www.smartcalendars.ai/en/feeds/magnificent-7-earnings-calendar" } }
  ]
};
