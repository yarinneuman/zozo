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
  updatedAt: "2026-10-01T08:12:00+03:00",
  edition: "יומי",
  headline: "<em>מיקרון</em> מרסקת תחזיות ו-PCE קריר יותר מהצפוי שולחים את סיכויי העלאת הריבית באוקטובר למטה. היום: ISM, תביעות אבטלה ו-Nike, מחר תעסוקה.",
  thesis: "מדד ה-PCE הליבה התקרר ל-3.0% בשנה באוגוסט, מתחת לתחזית 3.3%, ושלח את סיכויי ההעלאה באוקטובר ב-CME FedWatch מ-76.9% ל-47.1% תוך יום. וול סטריט נסגרה מעורבת ברביעי: נאסד\"ק עלה לשיא רבעוני, דאו צנח יותר מ-440 נקודות. אחרי הסגירה מיקרון ריסקה את התחזיות עם הכנסות שיא והנחיה חזקה לרבעון הבא, מה שתומך בסנטימנט השבבים הבוקר. היום: אקצ'נצ'ר כבר דיווחה, ISM תעשייה ותביעות אבטלה בצהריים, ואחרי הסגירה נייקי. מחר - דוח התעסוקה הקריטי של ספטמבר.",
  bottomLine: [
    "וול סטריט מעורבת ברביעי: S&P 500 ירד 0.25% ל-7,651.54, דאו צנח 0.86% (443.87 נק') ל-50,906.05, ונאסד\"ק עלה 0.24% לשיא ל-26,861.06 בסיום רבעון שלישי. בחודש ספטמבר: S&P -0.5%, דאו -4.3%, נאסד\"ק +1.9%; ברבעון: S&P +2%, נאסד\"ק +2.5%, דאו -2.7% (TheStreet, ABC News; 30/9).",
    "ה-PCE הליבה התקרר ל-3.0% בשנה באוגוסט מול תחזית 3.3%, וה-PCE הכללי עלה רק 0.2% בחודש מול תחזית 0.3%. בעקבות הנתון סיכויי העלאת ריבית באוקטובר ב-CME FedWatch צנחו מ-76.9% ל-47.1% (CNBC, Phemex; 30/9). קשקארי (פד מיניאפוליס): \"האינפלציה עדיין גבוהה מדי\", אך שוק העבודה \"טוב למדי\" ולא \"מצוין\" (CNBC; 30/9).",
    "מיקרון ריסקה תחזיות אחרי הסגירה: הכנסות שיא של $54.23 מיליארד מול תחזית $50.45 מיליארד, ורווח מתואם של $33.42 למניה מול תחזית $31.16 — חמישית פעם ברציפות של שיא הכנסות. ההנחיה לרבעון הבא: הכנסות כ-$61.5 מיליארד ו-EPS $38.15, מעל תחזית האנליסטים. מניית מיקרון עצמה נעה בתנודתיות באיחור המסחר, אך שבבי זיכרון אחרים (סאנדיסק, וסטרן דיגיטל, קוואלקום) זינקו במסחר המוקדם (CNBC, Investing.com; 30/9-1/10).",
    "היום: אקצ'נצ'ר כבר דיווחה רבעון רביעי עם EPS של $3.18 מול תחזית $3.19 — כמעט בדיוק לפי הצפי. בהמשך היום (אחה\"צ שעון ישראל) ISM תעשייה (תחזית כ-55 מול 54.6% באוגוסט) ותביעות אבטלה שבועיות, ואחרי הסגירה נייקי מדווחת (תחזית EPS $0.44, הכנסות $11.35 מיליארד). מחר - דוח התעסוקה של ספטמבר, תחזית 90 אלף משרות מול 162 אלף בחודש הקודם (Newsquawk, MarketBeat, IndMoney, FXStreet; 30/9-1/10).",
    "בישראל: ת\"א 35 ירד 0.43% ל-4,203.98 ברביעי, מתוך 22 מניות יורדות מול 12 עולות; הראל צנחה 4%. השקל נסחר סביב 3.07 לדולר. בנק ישראל השאיר את הריבית על 3.25%, ההחלטה הבאה ב-21/10 (Bizportal, Investing.com; 30/9-1/10)."
  ],
  snapshot: [
    { k: "S&P 500", v: "7,651.54", c: "−0.25%", dir: "down" },
    { k: "נאסד\"ק Composite", v: "26,861.06", c: "+0.24%", dir: "up" },
    { k: "דאו ג'ונס", v: "50,906.05", c: "−0.86%", dir: "down" },
    { k: "תשואה 10 שנים", v: "5.29%", c: "+4bp", dir: "up" },
    { k: "תשואה 2 שנים", v: "4.90%", c: "+2bp", dir: "up" },
    { k: "תשואה 30 שנה", v: "5.63%", c: "+6bp", dir: "up" },
    { k: "מדד הדולר DXY", v: "101.26", c: "−0.11%", dir: "down" },
    { k: "נפט WTI", v: "$90.06", c: "−0.40%", dir: "down" },
    { k: "ברנט", v: "$97.09", c: "+0.97%", dir: "up" },
    { k: "זהב", v: "כ-$4,188", c: "+0.14%", dir: "up" },
    { k: "ביטקוין", v: "כ-$83,035", c: "−0.51%", dir: "down" },
    { k: "ת\"א 35 (30/9)", v: "4,203.98", c: "−0.43%", dir: "down" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "סיכוי להעלאה באוקטובר", from: "76.9% (CME FedWatch, 29/9)", to: "47.1% אחרי ה-PCE (CME FedWatch, 30/9)" },
    { topic: "S&P 500", from: "7,670.84 (29/9)", to: "7,651.54, −0.25% (30/9)" },
    { topic: "תשואת 10 שנים", from: "5.282% (29/9)", to: "5.29% (30/9)" },
    { topic: "נפט WTI", from: "$89.38 (29/9)", to: "$90.06 (1/10)" },
    { topic: "זהב", from: "כ-$4,150, שפל 7 שבועות (29/9)", to: "כ-$4,188 (30/9)" }
  ],
  ai: [
    { title: "מיקרון שוברת שיא הכנסות, מניות זיכרון מזנקות במסחר המוקדם", body: "הכנסות רבעוניות שיא של $54.23 מיליארד מול תחזית $50.45 מיליארד, ורווח מתואם $33.42 למניה מול $31.16 — חמישית פעם ברציפות של שיא הכנסות. ההנחיה לרבעון הבא ($61.5 מיליארד הכנסות, $38.15 EPS) עברה את תחזיות הרחוב. בעקבות הדוח זינקו במסחר המוקדם גם סאנדיסק, וסטרן דיגיטל וקוואלקום.", tickers: ["MU", "SNDK", "WDC", "QCOM"], source: { name: "CNBC / Investing.com", url: "https://www.cnbc.com/2026/09/30/micron-mu-q4-earnings-report-2026.html", date: "30/9" } },
    { title: "גוגל חושפת את Gemini 4 (\"ארגון\") בניסיון לסגור פער מול אנתרופיק ו-OpenAI", body: "גוגל הציגה היום מודל דגל חדש בשם \"Argon\" לדור Gemini 4, המתואר כמודל המתקדם ביותר שלה למשימות מורכבות ומושווה למודלים המתחרים בבנצ'מרקים של קוד ואבטחת סייבר. החברה לא פרסמה לוח זמנים להשקה ציבורית, ובמקביל ביטלה את תוכנית ה-Gemini 3.5 Pro.", tickers: ["GOOGL"], source: { name: "BusinessWorld", url: "https://bworldonline.com/technology/2026/10/01/783519/google-announces-gemini-4-flagship-ai-model-after-months-of-delays/", date: "1/10" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 52.9, hike: 47.1 },
    polymarket: null,
    items: [
      { title: "PCE הליבה מתקרר ל-3.0%, מתחת לתחזית", body: "מדד ה-PCE הכללי עלה 0.2% בחודש (תחזית 0.3%) ו-3.0% בשנה בליבה (תחזית 3.3%). משמעות: הנתון מחליש את ההצדקה להעלאת ריבית נוספת באוקטובר, ולאחריו קפצו סיכויי ה\"ללא שינוי\" ב-CME FedWatch מתחת ל-30% ל-52.9%.", source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/feds-preferred-gauge-showed-core-inflation-at-3point0percent-in-august-much-lighter-than-expected.html", date: "30/9" } },
      { title: "קשקארי: האינפלציה \"עדיין גבוהה מדי\"", body: "נשיא הפד של מיניאפוליס אמר בראיון בלעדי ל-CNBC כי האינפלציה \"עדיין גבוהה מדי\" גם אחרי נתון ה-PCE המקל, אך שוק העבודה \"טוב למדי\" ולא \"מצוין\".", source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/30/watch-minneapolis-fed-president-neel-kashkari.html", date: "30/9" } },
      { title: "בארקין: הכלכלה מתחזקת, אך סיכוני האינפלציה גוברים על סיכוני התעסוקה", body: "נשיא הפד של ריצ'מונד אמר כי התנאים הכלכליים \"אם כבר מתחזקים\", עם מומנטום גם מחוץ למגזר ה-AI — בענף הביטחוני, בתעשייה ובבנקאות. לדבריו \"סיכוני האינפלציה עולים על סיכוני התעסוקה המקסימלית, ולכן העלינו את הריבית\".", source: { name: "Yahoo Finance", url: "https://finance.yahoo.com/economy/policy/articles/fed-barkin-says-us-economy-173258518.html", date: "22/9" } },
      { title: "מחר: דוח התעסוקה הקריטי של ספטמבר", body: "תחזית לתוספת של כ-90 אלף משרות מול 162 אלף בחודש הקודם, ואבטלה של 4.1%. הנתון, יחד עם ISM תעשייה ותביעות האבטלה היום, יהיה המכריע לקראת החלטת הריבית ב-28/10.", source: { name: "FXStreet / MarketBeat", url: "https://www.fxstreet.com/macroeconomics/economic-indicator/nfp", date: "1/10" } }
    ]
  },
  voices: [
    { name: "ניל קשקארי", role: "נשיא הפד של מיניאפוליס", stance: "ניצי", he: "האינפלציה עדיין גבוהה מדי.", en: "Inflation is still too high.", date: "30/9", url: "https://www.cnbc.com/2026/09/30/watch-minneapolis-fed-president-neel-kashkari.html", note: "הוסיף ששוק העבודה \"טוב למדי\" אך לא \"מצוין\"." },
    { name: "תום בארקין", role: "נשיא הפד של ריצ'מונד", stance: "ניצי", he: "סיכוני האינפלציה עולים על סיכוני התעסוקה המקסימלית, ולכן העלינו את הריבית.", en: "The risks to inflation outweigh the risks to maximum employment. That's why we raised rates.", date: "22/9", url: "https://finance.yahoo.com/economy/policy/articles/fed-barkin-says-us-economy-173258518.html" },
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "בפעולת המדיניות שנקטנו בישיבת ספטמבר, אין צורך במיידיות. אם הכלכלה תתפתח בהתאם לתחזית שלי, ייתכן שתיקון נוסף כלפי מעלה בטווח הריבית יתאים בהמשך השנה.", en: "With the policy action we took at our September meeting, there is no need for urgency. If the economy evolves in a manner broadly consistent with my forecast, one further upward adjustment of the federal funds target range may be appropriate late this year.", date: "29/9", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "ג'פרי גאנדלך", role: "DoubleLine, מייסד ומנכ\"ל", stance: "זהיר", he: "אם הפד יעלה ריבית זה יחמיר את בעיית הוצאות הריבית (מכיוון שחלק גדול מהחוב הוא לטווח קצר). אם הפד יוריד ריבית זה יחמיר את בעיית האינפלציה.", en: "If the Fed hikes it will worsen the interest expense problem (since so much borrowing is at the short end). If the Fed cuts it will worsen the inflation problem.", date: "20/9", url: "https://www.gurufocus.com/news/9087290/jeffrey-gundlach-warns-of-debt-crisis-amid-potential-us-recession" },
    { name: "טום לי", role: "Fundstrat, ראש מחקר", stance: "שורי", he: "זו יכולה להיות אחת העליות הגדולות ביותר, ואני חושב שזה ימשיך גם בשנה הבאה — אחת העליות הגדולות ביותר בחיים שלנו.", en: "It could be one of the biggest rallies, and I think it continues next year to one of the biggest rallies of our lifetime.", date: "18/9", url: "https://www.foreignpolicyjournal.com/2026/09/18/tom-lee-predicts-historic-q4-rally-but-bitcoin-crypto-btc-ethereum-crypto-eth-and-xrp-crypto-xrp-face-steeper-climb-than-stocks/" },
    { name: "דנה פיטרסון", role: "קונפרנס בורד, כלכלנית ראשית", stance: "ניטרלי", he: "תפיסת הצרכנים את מצב העסקים הנוכחי הפכה שלילית לראשונה מאז ספטמבר 2024.", en: "Consumer appraisals of current business conditions became negative for the first time since September 2024.", date: "29/9", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-sept-29-2026" },
    { name: "ריק רידר", role: "BlackRock, מנהל השקעות ראשי באג\"ח", stance: "זהיר", he: "הולכת להיות לנו בעיית חוב מצטברת במדינה.", en: "We're going to have a compounding debt problem in the country.", date: "19/9", url: "https://www.benzinga.com/markets/bonds/26/09/61811344/blackrocks-rick-rieder-turns-cautious-on-us-stocks-warns-40-trillion-debt-is-becoming-a-compoundingproblem" }
  ],
  israel: [
    { title: "ת\"א 35 ירד 0.43% ל-4,203.98", body: "מתוך 35 מניות המדד, 22 ירדו ו-12 עלו; הראל צנחה 4%, פתאל עלתה 3%. היום צפויה פתיחה רגילה לאחר שבוע מסחר מקוצר של חול המועד סוכות.", source: { name: "Bizportal", url: "https://www.bizportal.co.il/capitalmarket/indices/generalview/33343333", date: "30/9" } },
    { title: "השקל יציב סביב 3.07 לדולר; בנק ישראל ממתין להחלטה הבאה ב-21/10", body: "הריבית נותרה ללא שינוי מאז הורדתה ל-3.25% ב-1/9. משמעות: בעוד בארה\"ב סיכויי ההעלאה באוקטובר ירדו בחדות אחרי ה-PCE, בנק ישראל צפוי להמשיך במסלול נפרד התלוי בנתוני האינפלציה המקומית.", source: { name: "Investing.com / בנק ישראל", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/01-9-26-en/", date: "1/9" } }
  ],
  sources: [
    { name: "TheStreet: שוק המניות 30/9", url: "https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-sept-30-2026" },
    { name: "ABC News: מדדים 30/9", url: "https://abcnews.com/Business/wireStory/major-us-stock-indexes-fared-wednesday-9302026-136901112" },
    { name: "CNBC: PCE הליבה 3.0%", url: "https://www.cnbc.com/2026/09/30/feds-preferred-gauge-showed-core-inflation-at-3point0percent-in-august-much-lighter-than-expected.html" },
    { name: "CNBC: דוח מיקרון רבעון רביעי", url: "https://www.cnbc.com/2026/09/30/micron-mu-q4-earnings-report-2026.html" },
    { name: "Investing.com: מיקרון עקפה תחזיות", url: "https://www.investing.com/news/earnings/micron-earnings-beat-by-226-revenue-topped-estimates-4925835" },
    { name: "CNBC: קשקארי על האינפלציה", url: "https://www.cnbc.com/2026/09/30/watch-minneapolis-fed-president-neel-kashkari.html" },
    { name: "Yahoo Finance: בארקין על הכלכלה", url: "https://finance.yahoo.com/economy/policy/articles/fed-barkin-says-us-economy-173258518.html" },
    { name: "US News (Reuters): נאום וויליאמס", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "Phemex: סיכויי ריבית אוקטובר", url: "https://phemex.com/news/article/cme-fedwatch-529-chance-fed-holds-rates-in-october-after-pce-data-98336" },
    { name: "GuruFocus: גאנדלך על החוב", url: "https://www.gurufocus.com/news/9087290/jeffrey-gundlach-warns-of-debt-crisis-amid-potential-us-recession" },
    { name: "Foreign Policy Journal: טום לי", url: "https://www.foreignpolicyjournal.com/2026/09/18/tom-lee-predicts-historic-q4-rally-but-bitcoin-crypto-btc-ethereum-crypto-eth-and-xrp-crypto-xrp-face-steeper-climb-than-stocks/" },
    { name: "Benzinga: רידר על החוב", url: "https://www.benzinga.com/markets/bonds/26/09/61811344/blackrocks-rick-rieder-turns-cautious-on-us-stocks-warns-40-trillion-debt-is-becoming-a-compoundingproblem" },
    { name: "BusinessWorld: גוגל Gemini 4", url: "https://bworldonline.com/technology/2026/10/01/783519/google-announces-gemini-4-flagship-ai-model-after-months-of-delays/" },
    { name: "Bizportal: ת\"א 35", url: "https://www.bizportal.co.il/capitalmarket/indices/generalview/33343333" },
    { name: "בנק ישראל: החלטת ריבית 1/9", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/01-9-26-en/" },
    { name: "MarketBeat: אקצ'נצ'ר ונייקי", url: "https://www.marketbeat.com/earnings/reports/2026-10-1-accenture-plc-stock/" },
    { name: "Newsquawk: לוח רווחים 1/10", url: "https://www.newsquawk.com/headlines/newsquawk-daily-us-earnings-estimates---1st-october-2026-acn-nke" },
    { name: "TradingEconomics: תשואות ומט\"ח", url: "https://tradingeconomics.com/united-states/government-bond-yield" }
  ]
};
