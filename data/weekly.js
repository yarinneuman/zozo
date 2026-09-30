/* Zozo — weekly summary (Sunday edition). Written every Sunday at 08:00 by the Zozo cloud routine (see docs/BRIEF_GUIDE.md).
   Same schema as data/brief.js, plus optional: recap: [{ title, points: [string] }], weekAhead: [string]. */
window.ZOZO = window.ZOZO || {};
ZOZO.weekly = {
  updatedAt: "2026-09-27T12:30:00+03:00",
  edition: "שבועי",
  headline: "האג״ח קובע את הקצב. <em>וול סטריט</em> מחכה ל-PCE ולמשרות.",
  thesis: "תשואות האג״ח בשיא של כמעט 20 שנה והפד כבר העלה ריבית — ובכל זאת הנאסד״ק עלה בשבוע האחרון בזכות הטכנולוגיה. השבוע שני נתונים יכריעו אם תגיע העלאה נוספת באוקטובר.",
  bottomLine: [
    "תשואת ה-10 שנים נגעה ב-5.22%, הגבוהה מאז 2007, וה-30 שנים ב-5.50%, הגבוהה מאז 2004. הנאסד״ק עלה בכל זאת בזכות הטכנולוגיה.",
    "הפד בראשות קווין וורש העלה ב-16/9 את הריבית ל-3.75–4.00% פה אחד. השוק מתמחר 54% להעלאה נוספת באוקטובר.",
    "PCE ביום רביעי ודוח התעסוקה ביום שישי (צפי 90K, אבטלה 4.1%) יכריעו את ההימור הזה.",
    "מיקרון מדווחת ביום רביעי בערב: צפי EPS של $31.16 על הכנסות של $50.45B, והשוק יסתכל בעיקר על התחזית.",
    "הנפט ירד על רקע שיחות על מצר הורמוז, אבל לפי WSJ טראמפ דחה את ההצעה האיראנית. השאלה הזאת עדיין פתוחה."
  ],
  weekAhead: [
    "רביעי 30/9: PCE ותמ״ג Q2 סופי (15:30), ובערב דוח מיקרון (אופציות מתמחרות ±11%).",
    "חמישי 1/10: ISM תעשייה (17:00), דוחות אקסנצ׳ר ונייקי (±8.3%).",
    "שישי 2/10: דוח התעסוקה — צפי 90K משרות ואבטלה 4.1% (15:30).",
    "21/10: החלטת הריבית של בנק ישראל."
  ],
  recap: [
    { title: "ריביות ואג״ח", points: ["תשואת ה-10 שנים הגיעה ל-5.225%, אחרי שעלתה מ-3.97% מאז תחילת העימות עם איראן.", "ציפיות האינפלציה בסקר מישיגן עלו ל-4.6% מ-4%.", "משמעות: תשואה מעל 5% לוחצת על המכפילים; רווחי הטכנולוגיה מחזיקים את השוק."] },
    { title: "AI וטכנולוגיה", points: ["מטא: סוכן ה-Muse הגיע לראש ה-App Store והמניה קפצה בכ-11% ביום.", "אקמאי ו-Anthropic: חוזה ענן של $11.6B לשבע שנים.", "אורקל ירדה 3.5% אחרי הודעת כוח עליון במרכז נתונים; מיקרון עלתה 16.6% בשבוע שלפני הדוח."] },
    { title: "דוחות", points: ["קוסטקו: הכנסות $95.72B מול $94.88B צפוי, המניה +2.9%.", "נייקי: בנק אוף אמריקה הוריד ל-Underperform עם יעד $30.", "TD SYNNEX ירדה כ-10% למרות הכנסות מעל הצפי."] },
    { title: "גיאופוליטיקה וקריפטו", points: ["ארה״ב וסין: הפחתת מכסים על $30B; על מתכות נדירות אין הסכמה.", "איראן: הוצעה פתיחה של הורמוז; לפי WSJ טראמפ דחה, והברנט ירד מ-$100.22 לכ-$97.", "קרנות הביטקוין גייסו $2.4B בשבוע — הגיוס הגדול מאז אוקטובר 2025."] }
  ],
  changes: [
    { topic: "Fear & Greed", from: "33 (23/9)", to: "36 (24/9) — עדיין פחד" },
    { topic: "ברנט", from: "$100.22", to: "$97.44 — מתחת ל-$100" },
    { topic: "תשואת 10 שנים", from: "3.97% בתחילת העימות", to: "5.17% (שיא 5.225%)" },
    { topic: "ריבית הפד", from: "3.50–3.75%", to: "3.75–4.00% (12-0)" }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר", cut: 0, hold: 45.8, hike: 54.2 },
    polymarket: { cut: 0, hold: 34, hike: 66, url: "https://predictionnews.com/story/polymarket-traders-price-65-odds-of-25-basis-point-fed-hike-in-october" },
    items: []
  },
  voices: [
    { name: "טום לי", role: "Fundstrat, ראש מחקר", stance: "שורי", he: "ה-S&P 500 יכול בקלות להיות מעל 8,200 עד סוף השנה", en: "easily be above 8,200 by the end of the year", date: "16/9", url: "https://finance.yahoo.com/markets/stocks/articles/fundstrat-tom-lee-sees-p-073202187.html" },
    { name: "קווין וורש", role: "יו״ר הפדרל ריזרב", stance: "ניצי", he: "האינפלציה גבוהה מדי, וכבר זמן רב מדי.", en: "Inflation is too high and has been for too long.", date: "16/9", url: "https://www.schwab.com/learn/story/fomc-meeting" },
    { name: "ריק רידר", role: "BlackRock, מנהל השקעות ראשי באג״ח", stance: "זהיר", he: "זה לא משבר, אלא תמרור אזהרה, וזה משהו שצריך לחשוב עליו", en: "not a crisis but an eye-opener, and it's something I think you've got to think about", date: "24/9", url: "https://finance.yahoo.com/markets/article/bond-market-sell-off-not-a-crisis-but-an-eye-opener-former-fed-chair-contender-says-144707057.html" },
    { name: "פיטר שיף", role: "כלכלן, Euro Pacific", stance: "דובי", he: "אל תתבלבלו ותחשבו שזה השיא.", en: "Don't be fooled into thinking this is the top", date: "14/9", url: "https://www.benzinga.com/markets/economic-data/26/09/61780988/ed-yardeni-calls-ten-year-bond-yields-high-a-vote-of-confidence" }
  ],
  israel: [
    { title: "בנק ישראל: ריבית 3.25%", body: "הריבית הורדה ב-1/9; ההחלטה הבאה ב-21/10. הפד מעלה ובנק ישראל מוריד — הפער בין הריביות מתרחב לטובת הדולר.", source: { name: "בנק ישראל", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/01-9-26-en/", date: "1/9" } },
    { title: "ת״א 35 ירד 1.12% בשבוע", body: "סגר ב-4,242.12 ב-24/9, ועדיין +16.81% מתחילת השנה.", source: { name: "ביזפורטל", url: "https://www.bizportal.co.il/capitalmarket/indices/performance/33343333", date: "24/9" } }
  ],
  sources: [
    { name: "Yahoo Finance", url: "https://finance.yahoo.com/markets/live/stock-market-today-friday-september-25-dow-sp-500-nasdaq-081738529.html" },
    { name: "TheStreet", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-sept-25-2026" },
    { name: "Advisor Perspectives", url: "https://www.advisorperspectives.com/dshort/updates/2026/09/25/treasury-yields-snapshot-september-25-2026" },
    { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-weekly-economic-release-28th-september---2nd-october-2026-" },
    { name: "Axios", url: "https://www.axios.com/2026/09/26/us-china-tariffs-trade-30-billion" },
    { name: "The Block", url: "https://www.theblock.co/news/markets/2026-09-26-bitcoin-etfs-turn-positive-for-2026-with-2-4-billion-weekly-inflow-their-largest-since-october-416944" }
  ]
};
