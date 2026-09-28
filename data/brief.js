/* Zozo — market brief. Written by the zozo-refresh skill (from market-intel-brief).
Schema:
{
  updatedAt: ISO string, edition: "יומי" | "שבועי", fullUrl?: link to the full brief page,
  headline: string (may contain <em>..</em> once), thesis: string,
  bottomLine: [string x5],
  snapshot: [{ k: "S&P 500", v: "6,512.3", c: "+0.42%", dir: "up"|"down"|"flat" }],
  changes: [{ topic, from, to }],
  ai: [{ title, body, tickers: ["NVDA"], source: { name, url, date } }],
  macro: { fedwatch: { meeting, cut, hold, hike }, polymarket: { cut, hold, hike, url } | null,
           items: [{ title, body, source: { name, url, date } }] },
  voices: [{ name, role, stance: "שורי"|"זהיר"|"ניטרלי"|"דובי"|"ניצי", he, en, date, url, note }],
  israel: [{ title, body, source: { name, url, date } }],
  sources: [{ name, url }]
}
*/
window.ZOZO = window.ZOZO || {};
ZOZO.brief = {
  updatedAt: "2026-09-28T16:00:00+03:00",
  edition: "יומי",
  fullUrl: "https://claude.ai/artifact/BbnxxaFxkQTEbmWqtCmRYZ",
  headline: "טראמפ דחה את איראן. <em>הנפט</em> קופץ והחוזים יורדים.",
  thesis: "בסוף השבוע טראמפ דחה את ההצעה האיראנית לפתוח מחדש את מצר הורמוז, והנפט חזר מעל $100. התשואות והדולר עלו יחד איתו, והחוזים העתידיים מצביעים על פתיחה בירידה, יומיים לפני PCE ומיקרון.",
  bottomLine: [
    "טראמפ דחה את ההצעה האיראנית לפתוח את הורמוז. WTI עלה 4.2% ל-$96.26, וברנט לדצמבר עלה 3.6% ל-$100.98. חוזה נובמבר הגיע לכ-$108 (AP).",
    "תשואת ה-10 שנים עלתה ל-5.22%, ה-2 שנים ל-4.914% וה-30 שנים ל-5.52%. מדד הדולר ב-101.39, השיא של החודשיים האחרונים (Reuters).",
    "החוזים העתידיים יורדים: S&P −0.59%, נאסד״ק −1.02%, דאו −0.48%. הזהב צונח 3% ל-$4,151, והביטקוין יורד 1.7% לכ-$83,300.",
    "השוק מתמחר 68% להעלאת ריבית נוספת ב-28/10 (Reuters), לעומת 54% ביום רביעי שעבר.",
    "אנבידיה הגדילה את תוכנית הרכישה העצמית ב-$150B, לסך של $235B. היום: מדד התעשייה של דאלאס ב-17:30, ו-Jefferies מדווחת אחרי הסגירה."
  ],
  snapshot: [
    { k: "חוזי S&P 500", v: "7,761", c: "−0.59%", dir: "down" },
    { k: "חוזי נאסד״ק 100", v: "30,573", c: "−1.02%", dir: "down" },
    { k: "חוזי דאו", v: "51,911", c: "−0.48%", dir: "down" },
    { k: "תשואה 10 שנים", v: "5.22%", c: "+4bp", dir: "up" },
    { k: "תשואה 2 שנים", v: "4.914%", c: "+5bp", dir: "up" },
    { k: "מדד הדולר DXY", v: "101.39", c: "שיא חודשיים", dir: "up" },
    { k: "נפט WTI", v: "$96.26", c: "+4.2%", dir: "up" },
    { k: "ברנט (דצמבר)", v: "$100.98", c: "+3.6%", dir: "up" },
    { k: "זהב", v: "$4,151", c: "−3%", dir: "down" },
    { k: "ביטקוין", v: "$83,310", c: "−1.72%", dir: "down" },
    { k: "ניקיי 225", v: "65,877.62", c: "−0.7%", dir: "down" },
    { k: "ת״א 35 (24/9)", v: "4,242.12", c: "שבוע −1.12%", dir: "down" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הורדה 1/9", dir: "flat" }
  ],
  changes: [
    { topic: "ברנט (דצמבר)", from: "$97.44 (שישי)", to: "$100.98, שוב מעל $100" },
    { topic: "WTI", from: "$92.41", to: "$96.26" },
    { topic: "תשואת 10 שנים", from: "5.17%", to: "5.22%" },
    { topic: "סיכוי להעלאה באוקטובר", from: "54.2% (FedWatch, 23/9)", to: "68% (Reuters, 28/9)" },
    { topic: "זהב", from: "$4,321.20", to: "$4,151, הנמוך מאז 5/8" }
  ],
  ai: [
    { title: "אנבידיה: $150B נוספים לרכישה עצמית", body: "התוכנית גדלה לסך של $235B, שיבוצעו עד שנת הכספים 2028. זו ההגדלה הגדולה אי פעם של תוכנית כזאת, והמניה עלתה 0.84% בפרה-מרקט.", tickers: ["NVDA"], source: { name: "NVIDIA Newsroom", url: "https://nvidianews.nvidia.com/news/nvidia-announces-a-150-billion-share-repurchase-authorization-increase", date: "28/9" } },
    { title: "מיקרון מדווחת ביום רביעי", body: "לפי CMC Markets הצפי הוא EPS של $31.45 על הכנסות של $50.8B. Investing.com מציגה $31.16 ו-$50.45B. שוק האופציות מתמחר תנודה של ±11%.", tickers: ["MU", "SOXX"], source: { name: "CMC Markets", url: "https://www.cmcmarkets.com/en-gb/news-and-analysis/the-week-ahead-us-pce-jobs-report-micron-earnings", date: "28/9" } },
    { title: "מניות סין ירדו 1.9%", body: "אחרי חוק אמריקאי שמגביל רכיבים סיניים במרכזי נתונים של AI בשימוש ממשלתי.", tickers: ["FXI", "KWEB"], source: { name: "Reuters דרך Yahoo", url: "https://finance.yahoo.com/markets/articles/stocks-cautious-asia-oil-gains-005009179.html", date: "28/9" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 27.7, hike: 72.3 },
    polymarket: { cut: 0, hold: 32.5, hike: 66.5, url: "https://financefeeds.com/polymarket-puts-an-october-fed-hike-at-67-and-a-2026-rate-cut-at-3/" },
    items: [
      { title: "איראן: טראמפ דחה את ההצעה", body: "איראן הציעה לחדש את השיחות על הגרעין, בתנאי שארה״ב תסיר את הסגר הימי ואת הסנקציות על הנפט. טראמפ דחה, ולפי Al Jazeera הוא מצפה שהמשא ומתן יתחדש השבוע. הנפט עלה בכ-20% מתחילת החודש.", source: { name: "AP", url: "https://www.news4jax.com/business/2026/09/28/asian-shares-trade-mixed-as-oil-prices-rise/", date: "28/9" } },
      { title: "תשואות ודולר עולים", body: "ה-10 שנים ב-5.22%, ה-2 שנים ב-4.914%, ה-30 שנים ב-5.52%. מדד הדולר ב-101.39. לפי Reuters השוק מתמחר 68% להעלאה באוקטובר. משמעות: נפט יקר ותשואות גבוהות לוחצים על המניות באותו זמן.", source: { name: "Reuters דרך Yahoo", url: "https://finance.yahoo.com/markets/articles/stocks-cautious-asia-oil-gains-005009179.html", date: "28/9" } },
      { title: "PCE ביום רביעי", body: "הצפי ל-PCE הכללי של אוגוסט הוא עלייה של 0.4% בחודש, לעומת 0.2% ביולי. בדוח הקודם ה-PCE ללא מזון ואנרגיה עמד על 3.3% בשנה.", source: { name: "CMC Markets", url: "https://www.cmcmarkets.com/en-gb/news-and-analysis/the-week-ahead-us-pce-jobs-report-micron-earnings", date: "28/9" } },
      { title: "זהב בנפילה", body: "ירידה של 3% ל-$4,151, על רקע דולר חזק, תשואות גבוהות וציפייה להעלאת ריבית נוספת.", source: { name: "Yahoo Finance", url: "https://finance.yahoo.com/personal-finance/investing/article/gold-prices-today-monday-september-28-2026-gold-prices-slump-as-iran-tensions-and-oil-prices-rise-110730952.html", date: "28/9" } }
    ]
  },
  voices: [
    { name: "מארק מקורמיק", role: "BMO, אסטרטג מט״ח ראשי", stance: "ניטרלי", he: "שוק האג״ח לא מאותת על משבר. הוא מתמחר חוסן של ארה״ב וריבית שיווי משקל גבוהה יותר.", en: "The bond market is not flashing crisis. It is pricing US resilience and a higher equilibrium rate.", date: "28/9", url: "https://finance.yahoo.com/markets/articles/stocks-cautious-asia-oil-gains-005009179.html" },
    { name: "סטיבן אינס", role: "Quintex Intel", stance: "זהיר", he: "המתיחות במזרח התיכון התלקחה שוב.", en: "Middle East tensions have flared again.", date: "28/9", url: "https://www.bloomberg.com/news/articles/2026-09-28/emerging-stocks-slide-as-oil-gains-on-renewed-mideast-tensions" },
    { name: "ג׳נסן הואנג", role: "Nvidia, מנכ״ל", stance: "שורי", he: "יצירת המזומנים שלנו נותנת לנו את היכולת להשקיע בטכנולוגיות שמקדמות את השינוי הזה, ולהחזיר הון לבעלי המניות.", en: "Our cash generation gives us the capacity to invest in the technologies that advance this transformation and return capital to shareholders.", date: "28/9", url: "https://nvidianews.nvidia.com/news/nvidia-announces-a-150-billion-share-repurchase-authorization-increase", note: "בהודעה על הגדלת תוכנית הרכישה העצמית." },
    { name: "ריק רידר", role: "BlackRock, מנהל השקעות ראשי באג״ח", stance: "זהיר", he: "זה לא משבר, אלא תמרור אזהרה, וזה משהו שצריך לחשוב עליו", en: "not a crisis but an eye-opener, and it's something I think you've got to think about", date: "24/9", url: "https://finance.yahoo.com/markets/article/bond-market-sell-off-not-a-crisis-but-an-eye-opener-former-fed-chair-contender-says-144707057.html" },
    { name: "טום לי", role: "Fundstrat, ראש מחקר", stance: "שורי", he: "ה-S&P 500 יכול בקלות להיות מעל 8,200 עד סוף השנה", en: "easily be above 8,200 by the end of the year", date: "16/9", url: "https://finance.yahoo.com/markets/stocks/articles/fundstrat-tom-lee-sees-p-073202187.html" },
    { name: "פיטר שיף", role: "כלכלן, Euro Pacific", stance: "דובי", he: "אל תתבלבלו ותחשבו שזה השיא.", en: "Don't be fooled into thinking this is the top", date: "14/9", url: "https://www.benzinga.com/markets/economic-data/26/09/61780988/ed-yardeni-calls-ten-year-bond-yields-high-a-vote-of-confidence" }
  ],
  israel: [
    { title: "בנק ישראל: ריבית 3.25%", body: "ההחלטה הבאה ב-21/10. משמעות: מדד הדולר בשיא של חודשיים והסיכוי להעלאה בארה״ב עולה, ובנק ישראל בכיוון ההפוך. זה לחץ פוטנציאלי על השקל.", source: { name: "בנק ישראל", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/01-9-26-en/", date: "1/9" } },
    { title: "הבורסה בחול המועד", body: "אחרי שהייתה סגורה בערב סוכות ובראשון, היום יום מסחר מקוצר. הסגירה האחרונה של ת״א 35 שאומתה: 4,242.12 ב-24/9. שער הדולר-שקל להיום לא אומת.", source: { name: "הבורסה לני״ע", url: "https://www.tase.co.il/he/content/knowledge_center/trading_vacation_schedule", date: "28/9" } }
  ],
  sources: [
    { name: "Investrade: תצוגה מקדימה 28/9", url: "https://investrade.com/morning-preview-september-28-2026/" },
    { name: "Reuters דרך Yahoo", url: "https://finance.yahoo.com/markets/articles/stocks-cautious-asia-oil-gains-005009179.html" },
    { name: "AP: אסיה, נפט ואיראן", url: "https://www.news4jax.com/business/2026/09/28/asian-shares-trade-mixed-as-oil-prices-rise/" },
    { name: "Al Jazeera", url: "https://www.aljazeera.com/economy/2026/9/28/oil-prices-surge-after-trump-rejects-irans-plan-to-reopen-strait-of-hormuz" },
    { name: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-09-28/emerging-stocks-slide-as-oil-gains-on-renewed-mideast-tensions" },
    { name: "CoinDesk", url: "https://www.coindesk.com/markets/2026/09/28/bitcoin-falls-to-usd83-000-while-altcoins-unwind-friday-s-rally" },
    { name: "Yahoo Finance: זהב", url: "https://finance.yahoo.com/personal-finance/investing/article/gold-prices-today-monday-september-28-2026-gold-prices-slump-as-iran-tensions-and-oil-prices-rise-110730952.html" },
    { name: "NVIDIA Newsroom", url: "https://nvidianews.nvidia.com/news/nvidia-announces-a-150-billion-share-repurchase-authorization-increase" },
    { name: "Beansprout: FedWatch", url: "https://growbeansprout.com/tools/fedwatch" },
    { name: "FinanceFeeds: Polymarket", url: "https://financefeeds.com/polymarket-puts-an-october-fed-hike-at-67-and-a-2026-rate-cut-at-3/" },
    { name: "CMC Markets", url: "https://www.cmcmarkets.com/en-gb/news-and-analysis/the-week-ahead-us-pce-jobs-report-micron-earnings" },
    { name: "Investrade (Fear & Greed 25/9)", url: "https://investrade.com/market-review-september-25-2026/" }
  ]
};
