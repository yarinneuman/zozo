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
  updatedAt: "2026-09-30T10:58:00+03:00",
  edition: "יומי",
  headline: "תשואת ה-30 שנה בשיא מאז 2002, אמון הצרכנים בשפל של 12 שנה. <em>מיקרון</em> ו-PCE היום.",
  thesis: "התשואות הארוכות ממשיכות לטפס לרמות שלא נראו כבר עשרים ומעלה שנה, ואמון הצרכנים האמריקאי צנח לשפל של 12 שנה — שילוב שמעיב על המניות גם בלי החלטת ריבית חדשה. הנפט נסוג אחרי שחרור מהמאגר האסטרטגי ותקוות לשיחות ארה\"ב-איראן, אבל טראמפ דחה את הצעת שביתת הנשק של טהראן. היום: PCE, ADP ותמ\"ג סופי, ואחרי הסגירה מיקרון מדווחת.",
  bottomLine: [
    "וול סטריט נסגרה בירידה קלה שנייה ברציפות: S&P 500 ירד 0.16% ל-7,670.84, דאו ירד 0.26% ל-51,349.92 ונאסד\"ק ירד 0.09% ל-26,797.54 (Investrade, AP; 29/9).",
    "התשואות ממשיכות לעלות: ל-30 שנה עלתה 4.7bp ל-5.61%, השיא מאז יוני 2002; ל-10 שנים עלתה ל-5.282%; ל-2 שנים ל-4.934%. נשיא הפד של ניו יורק וויליאמס אמר ש\"אין צורך במיידיות\", אך צפוי \"תיקון נוסף כלפי מעלה\" עוד השנה (29/9).",
    "מדד אמון הצרכנים של קונפרנס בורד צנח 6.7 נקודות ל-81.9 בספטמבר — השפל מאז 2014 ומתחת לתחזית של 89.2 (Conference Board, TheStreet; 29/9).",
    "הנפט נסוג: WTI צנח 3.48% ל-$89.38 אחרי שחרור מהמאגר האסטרטגי ותקוות לשיחות ארה\"ב-איראן. עם זאת טראמפ דחה את הצעת שביתת הנשק בת 7 הימים של איראן לפתיחת מצר הורמוז, וצפוי לחדש תקיפות אחרי הבחירות באמצע הקדנציה (AP, Al Jazeera; 29-30/9).",
    "היום: PCE (15:30) ותמ\"ג רבעון שני סופי, ותעסוקת ADP (15:15). אחרי הסגירה מיקרון מדווחת — לפי הנחיית החברה $50B±$1B הכנסות ו-EPS $31±$1, ואופציות מתמחרות תנודה של כ-10.3% (TipRanks)."
  ],
  snapshot: [
    { k: "S&P 500", v: "7,670.84", c: "−0.16%", dir: "down" },
    { k: "נאסד\"ק Composite", v: "26,797.54", c: "−0.09%", dir: "down" },
    { k: "דאו ג'ונס", v: "51,349.92", c: "−0.26%", dir: "down" },
    { k: "ראסל 2000", v: "2,807", c: "−0.35%", dir: "down" },
    { k: "תשואה 10 שנים", v: "5.282%", c: "+4bp", dir: "up" },
    { k: "תשואה 2 שנים", v: "4.934%", c: "+1bp", dir: "up" },
    { k: "תשואה 30 שנה", v: "5.61%", c: "שיא מאז 2002", dir: "up" },
    { k: "מדד הדולר DXY", v: "101.50", c: "+0.3%", dir: "up" },
    { k: "נפט WTI", v: "$89.38", c: "−3.48%", dir: "down" },
    { k: "ברנט", v: "$105.31", c: "כמעט ל״ש", dir: "flat" },
    { k: "זהב", v: "כ-$4,150", c: "שפל 7 שבועות", dir: "down" },
    { k: "ביטקוין", v: "$83,502", c: "−1.1%", dir: "down" },
    { k: "ת״א 35 (29/9)", v: "4,221.94", c: "+0.02%", dir: "flat" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "תשואת 30 שנה", from: "5.52% (28/9)", to: "5.61%, שיא מאז 2002 (29/9)" },
    { topic: "סיכוי להעלאה באוקטובר", from: "68% (Reuters, 28/9)", to: "76.9% (CME FedWatch, 29/9)" },
    { topic: "נפט WTI", from: "$96.26 (28/9)", to: "$89.38, −3.48% (29/9)" },
    { topic: "ביטקוין", from: "$83,310 (28/9)", to: "$83,502 (29/9)" },
    { topic: "זהב", from: "$4,151 (28/9)", to: "כ-$4,150, שפל 7 שבועות (29/9)" }
  ],
  ai: [
    { title: "מיקרון מדווחת היום אחרי הסגירה", body: "לפי הנחיית החברה עצמה, ההכנסות צפויות ב-$50B (±$1B) והרווח המתואם ב-$31 (±$1) למניה, עם שולי רווח גולמי של כ-86%. אופציות מתמחרות תנודה של כ-10.3% בשני הכיוונים סביב הדוח.", tickers: ["MU"], source: { name: "TipRanks", url: "https://www.tipranks.com/news/why-micron-stock-options-signal-a-10-3-move-after-q4-results", date: "29/9" } },
    { title: "וושינגטון ופקין משאירות את הפיקוח על שבבי AI בצד", body: "בפסגת טראמפ-שי הוסכם על הקלה במכסים של $30B ופתיחת ערוץ דיאלוג משותף על AI, אך הפיקוח על ייצוא שבבים מתקדמים לסין נותר ללא שינוי.", source: { name: "Roll Call", url: "https://rollcall.com/2026/09/23/ai-export-controls-debate-rages-as-trump-xi-meet/", date: "23/9" } },
    { title: "זיכרון: היצע הדוק עד 2027", body: "לפי ברנסטיין, שוק שבבי הזיכרון העולמי צפוי להישאר בהיצע-ביקוש הדוק עד 2027 בשל הביקוש ל-AI, נרטיב שתומך באנבידיה ובמיקרון לקראת דוח הרבעון.", tickers: ["NVDA", "MU"], source: { name: "GuruFocus", url: "https://www.gurufocus.com/news/9102307/nvidia-nvda-faces-adjusted-ai-chip-demand-amid-storage-market-insights", date: "29/9" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 23.1, hike: 76.9 },
    polymarket: { cut: 2, hold: 31, hike: 69, url: "https://defirate.com/prediction-markets/fed-decision-odds/" },
    items: [
      { title: "וויליאמס: \"אין צורך במיידיות\", אך עוד העלאה קרובה", body: "נשיא הפד של ניו יורק אמר שההעלאה בספטמבר מספקת לעת עתה, אך אם התחזית שלו תתממש \"תיקון נוסף כלפי מעלה\" בריבית עשוי להתאים עוד השנה. הוא צופה אינפלציה של כ-3.5% השנה וחזרה ליעד 2% רק ב-2028.", source: { name: "US News (Reuters)", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike", date: "29/9" } },
      { title: "PCE ותמ\"ג סופי היום ב-15:30", body: "הצפי הוא לעלייה חודשית של כ-0.3%-0.5% ב-PCE הכללי וכ-0.3% בליבה, ול-3.3% בשנה בליבה — עדיין רחוק מיעד 2% של הפד. לצד זה מתפרסם האומדן הסופי לתמ\"ג הרבעוני.", source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-weekly-economic-release-28th-september---2nd-october-2026-", date: "29/9" } },
      { title: "אמון הצרכנים צונח לשפל של 12 שנה", body: "מדד קונפרנס בורד צנח 6.7 נקודות ל-81.9, מתחת לתחזית של 89.2. הכלכלנית הראשית דנה פיטרסון: \"תפיסת הצרכנים את מצב העסקים הנוכחי הפכה שלילית לראשונה מאז ספטמבר 2024\". משמעות: זה מגביר את הסיכון לחולשה בצריכה הפרטית לקראת הרבעון הרביעי.", source: { name: "TheStreet", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-sept-29-2026", date: "29/9" } },
      { title: "תשואות בשיא של עשורים", body: "ה-30 שנה נגע ב-5.61%-5.62% ביום שלישי, השיא מאז 2002; ה-10 שנים נגע ב-5.29% תוך-יומי, השיא מאז 2007. משמעות: עלות המימון הממשלתי והמשכנתאות ממשיכה לעלות גם בלי החלטת ריבית חדשה של הפד.", source: { name: "Investrade Market Review", url: "https://investrade.com/market-review-september-29-2026/", date: "29/9" } }
    ]
  },
  voices: [
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "בפעולת המדיניות שנקטנו בישיבת ספטמבר, אין צורך במיידיות. אם הכלכלה תתפתח בהתאם לתחזית שלי, ייתכן שתיקון נוסף כלפי מעלה בטווח הריבית יתאים בהמשך השנה.", en: "With the policy action we took at our September meeting, there is no need for urgency. If the economy evolves in a manner broadly consistent with my forecast, one further upward adjustment of the federal funds target range may be appropriate late this year.", date: "29/9", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "דנה פיטרסון", role: "קונפרנס בורד, כלכלנית ראשית", stance: "ניטרלי", he: "תפיסת הצרכנים את מצב העסקים הנוכחי הפכה שלילית לראשונה מאז ספטמבר 2024.", en: "Consumer appraisals of current business conditions became negative for the first time since September 2024.", date: "29/9", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-sept-29-2026" },
    { name: "אד יארדני", role: "Yardeni Research, נשיא", stance: "זהיר", he: "לאור העלייה האחרונה בתשואות האג\"ח, אנחנו מורידים את הערכתנו למכפיל הרווח העתידי של S&P 500 בסוף השנה מ-19.8 ל-18.6, מה שמוריד את יעד סוף השנה שלנו מ-8,400 ל-7,900.", en: "Given the recent backup in bond yields, we are lowering our estimate for the forward P/E of the S&P 500 at year-end from 19.8 to 18.6, which lowers our year-end target from 8,400 to 7,900.", date: "16/9", url: "https://www.advisorperspectives.com/articles/2026/09/16/stocks-bull-yardeni-cuts-s-p-500-7-900-downturn-risks" },
    { name: "טום לי", role: "Fundstrat, ראש מחקר", stance: "שורי", he: "זו יכולה להיות אחת העליות הגדולות ביותר, ואני חושב שזה ימשיך גם בשנה הבאה — אחת העליות הגדולות ביותר בחיים שלנו.", en: "It could be one of the biggest rallies, and I think it continues next year to one of the biggest rallies of our lifetime.", date: "18/9", url: "https://www.foreignpolicyjournal.com/2026/09/18/tom-lee-predicts-historic-q4-rally-but-bitcoin-crypto-btc-ethereum-crypto-eth-and-xrp-crypto-xrp-face-steeper-climb-than-stocks/" },
    { name: "מוחמד אל-עריאן", role: "כלכלן, יועץ באליאנץ", stance: "זהיר", he: "זה מדהים כמה משתתפי שוק הופתעו מהעלייה האחרונה בתשואות בארה\"ב. הגורמים הבסיסיים היו ברורים כבר זמן מה.", en: "It is striking how many market participants have been surprised by the recent surge in US yields. The fundamental drivers have been evident for some time.", date: "24/9", url: "https://www.benzinga.com/markets/bonds/26/09/61968162/bond-market-alarm-bells-are-ringing-but-mohamed-el-erian-says-psychology-may-be-fueling-the-fear-more-than-fundamentals" },
    { name: "ריק רידר", role: "BlackRock, מנהל השקעות ראשי באג\"ח", stance: "זהיר", he: "הולכת להיות לנו בעיית חוב מצטברת במדינה.", en: "We're going to have a compounding debt problem in the country.", date: "19/9", url: "https://www.benzinga.com/markets/bonds/26/09/61811344/blackrocks-rick-rieder-turns-cautious-on-us-stocks-warns-40-trillion-debt-is-becoming-a-compoundingproblem" }
  ],
  israel: [
    { title: "בנק ישראל: ריבית 3.25%, ההחלטה הבאה ב-21/10", body: "הריבית נותרה ללא שינוי מאז הורדתה ל-3.25% ב-1/9. משמעות: בעוד בארה\"ב שוקלים העלאה נוספת ב-28/10, בנק ישראל נמצא בכיוון המנוגד, מה שעשוי ללחוץ על השקל בטווח הקצר.", source: { name: "בנק ישראל", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/01-9-26-en/", date: "1/9" } },
    { title: "ת\"א נסגרה בעליות בחוה\"מ סוכות; הבוקר נפתחה בעליות קלות", body: "אתמול (29/9), במסחר מקוצר של חול המועד סוכות, ת\"א 35 נסגר כמעט ללא שינוי (4,221.94, +0.02%), ת\"א 125 עלה 0.2% ות\"א 90 עלה 0.7%. הבוקר (30/9) המסחר נפתח בעליות קלות אחרי שהוסר החשש מחטיפת מטוס פלייי-דובאי שנחת בסעודיה, והשקל התחזק מעט לכ-3.07 לדולר.", source: { name: "TheMarker", url: "https://www.themarker.com/markets/2026-09-30/ty-article-live/000001a0-f122-dea0-adb5-f96e8c730000", date: "30/9" } }
  ],
  sources: [
    { name: "Investrade: סקירת שוק 29/9", url: "https://investrade.com/market-review-september-29-2026/" },
    { name: "TheStreet: שוק המניות 29/9", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-sept-29-2026" },
    { name: "US News (Reuters): נאום וויליאמס", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "Newsquawk: לוח כלכלי שבועי", url: "https://www.newsquawk.com/headlines/newsquawk-weekly-economic-release-28th-september---2nd-october-2026-" },
    { name: "TipRanks: תנודה גלומה במיקרון", url: "https://www.tipranks.com/news/why-micron-stock-options-signal-a-10-3-move-after-q4-results" },
    { name: "Roll Call: AI ופיקוח ייצוא", url: "https://rollcall.com/2026/09/23/ai-export-controls-debate-rages-as-trump-xi-meet/" },
    { name: "GuruFocus: אנבידיה וזיכרון", url: "https://www.gurufocus.com/news/9102307/nvidia-nvda-faces-adjusted-ai-chip-demand-amid-storage-market-insights" },
    { name: "Advisor Perspectives: יארדני מוריד יעד", url: "https://www.advisorperspectives.com/articles/2026/09/16/stocks-bull-yardeni-cuts-s-p-500-7-900-downturn-risks" },
    { name: "Benzinga: אל-עריאן על התשואות", url: "https://www.benzinga.com/markets/bonds/26/09/61968162/bond-market-alarm-bells-are-ringing-but-mohamed-el-erian-says-psychology-may-be-fueling-the-fear-more-than-fundamentals" },
    { name: "Benzinga: רידר על החוב", url: "https://www.benzinga.com/markets/bonds/26/09/61811344/blackrocks-rick-rieder-turns-cautious-on-us-stocks-warns-40-trillion-debt-is-becoming-a-compoundingproblem" },
    { name: "בנק ישראל: החלטת ריבית 1/9", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/01-9-26-en/" },
    { name: "TheMarker: ת\"א 30/9", url: "https://www.themarker.com/markets/2026-09-30/ty-article-live/000001a0-f122-dea0-adb5-f96e8c730000" },
    { name: "SKN: סקירת שווקים גלובליים 29/9", url: "https://skn.co.il/skn-%D7%A1%D7%A7%D7%99%D7%A8%D7%AA-%D7%94%D7%A9%D7%95%D7%95%D7%A7%D7%99%D7%9D-%D7%94%D7%92%D7%9C%D7%95%D7%91%D7%9C%D7%99%D7%99%D7%9D-29-%D7%91%D7%A1%D7%A4%D7%98%D7%9E%D7%91%D7%A8-2026/" },
    { name: "Al Jazeera: איראן ומצר הורמוז", url: "https://www.aljazeera.com/news/liveblog/2026/9/29/iran-war-live-trump-says-he-did-not-offer-tehran-sanctions-relief" }
  ]
};
