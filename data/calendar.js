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
  updatedAt: "2026-10-16T08:50:00+03:00",
  weekOf: "2026-10-19",
  events: [
    { at: "2026-10-14T15:30:00+03:00", kind: "macro", title: "מדד המחירים לצרכן CPI (ספטמבר), ארה\"ב: עלה 3.7% שנתי (מול תחזית 3.6%), חודשי +0.6%; מדד הבסיס +2.6% שנתי", prior: "שנתי 3.4%", important: true, source: { name: "CBS News / BLS", url: "https://www.cbsnews.com/news/september-cpi-report-inflation-energy-costs/" } },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "BAC", title: "Bank of America (רבעון שלישי 2026): EPS מדולל 0.91$ (מול 1.04$), מתואם 1.08$ מול תחזית 1.10$ - פספוס בשל חיוב AML של 1.2 מיליארד דולר", timing: "BMO", important: true, source: { name: "Vested Finance", url: "https://vestedfinance.com/blog/us-stocks/bank-of-america-q3-earnings-2026/" } },
    { at: "2026-10-14T13:00:00+03:00", allDay: true, kind: "earnings", ticker: "MS", title: "Morgan Stanley (רבעון שלישי 2026): הכנסות נטו 20.3 מיליארד דולר, EPS 3.03$ (מול 2.80$), ROTCE 22.6%", timing: "BMO", important: false, source: { name: "SEC 8-K", url: "https://www.sec.gov/Archives/edgar/data/0000895421/000089542126000288/a3q26msearningsrelease.htm" } },

    { at: "2026-10-15T15:30:00+03:00", kind: "macro", title: "מדד מחירי היצרן PPI (ספטמבר): +1.3% חודשי - הגדול ביותר מאז מרץ 2022; מכירות קמעונאיות +0.8% מול תחזית 0.3%", important: true, source: { name: "babypips.com / CNN", url: "https://www.cnn.com/2026/10/15/economy/us-retail-sales-wholesale-inflation-ppi-september" } },
    { at: "2026-10-15T23:00:00+03:00", allDay: true, kind: "macro", title: "וול סטריט נסגרה בעליות: דאו ג'ונס +1.1% (52,177.69), S&P 500 +0.3% (7,744.06), נאסד\"ק +0.1% (26,713.03); תשואת ה-10 שנים נרגעה לכ-5.09% משיא תוך-יומי של 5.27%", important: true, source: { name: "AP via kare11.com", url: "https://www.kare11.com/article/syndication/associatedpress/how-major-us-stock-indexes-fared-thursday-10152026/616-45863d85-4e3b-4f71-879a-08f0c61ea824" } },

    { at: "2026-10-16T14:00:00+03:00", kind: "macro", title: "תפוקה תעשייתית, ניצולת כושר ייצור ומחירי יבוא/יצוא (ספטמבר) — ארה\"ב", important: false },
    { at: "2026-10-16T13:00:00+03:00", allDay: true, kind: "macro", title: "יו\"ר הפד קווין וורש נואם בכנס ה-IMF/הבנק העולמי בבנגקוק - נמנע מאותות על החלטת 27-28/10, קורא לנתיב ה-AI \"תנודתי מאוד אך טוב מאוד לעושר\"", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/16/feds-warsh-says-ai-development-path-will-be-very-bumpy-.html" } },

    { at: "2026-10-20T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "NFLX", title: "Netflix (רבעון שלישי 2026)", timing: "AMC", important: true },

    { at: "2026-10-21T16:00:00+03:00", allDay: true, kind: "israel", title: "החלטת ריבית בנק ישראל", prior: "3.25% (מאז 1/9)", important: true, source: { name: "בנק ישראל", url: "https://www.boi.org.il/%D7%94%D7%AA%D7%A4%D7%A7%D7%99%D7%93%D7%99%D7%9D-%D7%94%D7%9B%D7%9C%D7%9B%D7%9C%D7%99%D7%99%D7%9D/%D7%9E%D7%93%D7%99%D7%A0%D7%99%D7%95%D7%AA-%D7%9E%D7%95%D7%A0%D7%99%D7%98%D7%A8%D7%99%D7%AA/%D7%9E%D7%95%D7%A2%D7%93%D7%99-%D7%94%D7%97%D7%9C%D7%98%D7%95%D7%AA-%D7%94%D7%A8%D7%99%D7%91%D7%99%D7%AA/" } },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "TSLA", title: "Tesla (רבעון שלישי 2026)", timing: "AMC", important: true },
    { at: "2026-10-21T23:05:00+03:00", allDay: true, kind: "earnings", ticker: "IBM", title: "IBM (רבעון שלישי 2026)", timing: "AMC", important: false },

    { at: "2026-10-23T17:00:00+03:00", kind: "macro", title: "מדד אמון הצרכנים של אוניברסיטת מישיגן (אוקטובר, נתון סופי) — ארה\"ב", important: false },

    { at: "2026-10-27T00:00:00+02:00", allDay: true, kind: "israel", title: "בחירות לכנסת ה-26 — הראשונות במועדן החוקי מזה 38 שנה", important: true, source: { name: "סרוגים - ממוצע סקרים", url: "https://www.srugim.co.il/elections/elections2026" } },

    { at: "2026-10-28T20:00:00+02:00", kind: "fed", title: "החלטת ריבית FOMC (מפגש 27-28/10)", prior: "3.75–4.00%", consensus: "CME FedWatch (16/10, אחרי דברי וורש): החזקה ~72% · העלאה ~28%", important: true, source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/16/feds-warsh-says-ai-development-path-will-be-very-bumpy-.html" } },

    { at: "2026-11-03T00:00:00+02:00", allDay: true, kind: "macro", title: "בחירות לקונגרס האמריקאי (midterms)", important: true }
  ]
};
