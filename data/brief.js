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
  updatedAt: "2026-10-03T08:23:00+03:00",
  edition: "יומי",
  headline: "דו\"ח תעסוקה חלש בהרבה מהצפי שולח את סיכויי העלאת הריבית באוקטובר לקרוס — וול סטריט מזנקת, אך תשואת 10 שנים נסגרת גבוה. טראמפ דוחה את מתווה שבעת-הימים של איראן להורמוז, הנפט נסוג מהשיאים.",
  thesis: "דו\"ח התעסוקה של ספטמבר, שפורסם ביום שישי, החטיא בגדול: 29 אלף משרות בלבד מול תחזית לכ-84 אלף, ואבטלה שעלתה ל-4.2%. הנתון החלש כמעט מחק את הסיכוי להעלאת ריבית באוקטובר, ווול סטריט הגיבה בעלייה חדה — אך תשואת ה-10 שנים, שצנחה בתחילת המסחר, התאוששה ונסגרה גבוה יותר מיום חמישי, סימן לכך ששוק האג\"ח עדיין לא משוכנע. במקביל, הנשיא טראמפ דחה כ\"בלתי מתקבל על הדעת\" מתווה שבעת-ימים שאיראן העלתה (באמצעות קטאר) לפתיחת מיצרי הורמוז, ואמר שחידוש התקיפות אחרי הבחירות לקונגרס ב-3/11 \"אפשרי\" — הנפט נסוג קלות מהשיאים אך המלחמה נמשכת. שוק ת\"א סגור עד יום ראשון בשל סיום חג שמחת תורה ושבת.",
  bottomLine: [
    "דו\"ח התעסוקה של ספטמבר החטיא בגדול: 29 אלף משרות בלבד מול תחזית לכ-84 אלף (קונצנזוס דאו ג'ונס), ואבטלה שעלתה ל-4.2% מ-4.1%. עליית השכר השעתי הממוצע הייתה אנמית — 0.1% בלבד חודש-חודש ו-3% שנה-שנה, הקצב האיטי ביותר מאז מאי 2021 — ונתוני יולי-אוגוסט עודכנו למטה בכ-60 אלף משרות נוספות (CNBC, Yahoo Finance; 2/10).",
    "וול סטריט הגיבה בעלייה חדה לנתון החלש: S&P 500 עלה 0.7% לשיא של 7,722.93, נאסד\"ק קומפוזיט זינק 1.2% ל-27,190.86 ודאו ג'ונס עלה כ-0.5% (250 נקודות) ל-51,176.46 — \"חדשות רעות הן חדשות טובות\" לוול סטריט כרגיל כשמדובר בסיכויי ריבית (Yahoo Finance Live, Investing.com; 2/10).",
    "סיכויי העלאת ריבית באוקטובר קרסו: ב-CME FedWatch צנח הסיכוי ל-25 נק' בסיס ל-17% בלבד (מ-36% שבוע קודם), עם כ-83% סיכוי להחזקה; בקאלשי צנחו הסיכויים לכ-18% מכ-70% שבוע קודם. ברקע, תשואת ה-10 שנים צנחה בתחילת המסחר אך התאוששה ונסגרה בעלייה של כ-5 נק' בסיס ל-5.281% — עדיין קרוב לשיא של 24 שנה שנרשם השבוע (CNBC; 2/10).",
    "הנשיא טראמפ דחה כ\"בלתי מתקבל על הדעת\" מתווה שבעת-ימים שאיראן העלתה באמצעות קטאר לפתיחת מיצרי הורמוז, אמר שחידוש התקיפות אחרי הבחירות לקונגרס ב-3/11 \"אפשרי\", ולפי דיווחים הורה הממשל להוציא את משלחת איראן מניו יורק; משמר המהפכה האיראני הודיע שתפס רכב תת-מימי אמריקאי במיצרי הורמוז. הנפט נסוג קלות: WTI ירד 1.76% ל-$91.24 וברנט ירד 2.57% ל-$99.68 לחבית (Al Jazeera, CBS News, Trading Economics; 2/10).",
    "שוק ת\"א סגור עד יום ראשון (סיום חג שמחת תורה ושבת); בסשן האחרון, ביום חמישי 1/10, עלה ת\"א 35 ב-0.34% ל-4,218.25. בנק ישראל השאיר את הריבית על 3.25% (ללא שינוי מ-1/9), וההחלטה הבאה ב-21/10."
  ],
  snapshot: [
    { k: "S&P 500", v: "7,722.93", c: "+0.7%", dir: "up" },
    { k: "נאסד\"ק Composite", v: "27,190.86", c: "+1.2%", dir: "up" },
    { k: "דאו ג'ונס", v: "51,176.46", c: "+0.5%", dir: "up" },
    { k: "תשואה 10 שנים", v: "5.281%", c: "+5bp", dir: "up" },
    { k: "נפט WTI", v: "$91.24", c: "−1.76%", dir: "down" },
    { k: "ברנט", v: "$99.68", c: "−2.57%", dir: "down" },
    { k: "ביטקוין", v: "כ-$86,700", c: "+2.2% מפתיחת יום שישי", dir: "up" },
    { k: "ת\"א 35 (1/10, שוק סגור עד יום א')", v: "4,218.25", c: "+0.34%", dir: "up" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9, הבאה 28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "סיכוי להעלאת ריבית באוקטובר (CME FedWatch)", from: "38.2% (1/10)", to: "17% (2/10, אחרי דו\"ח התעסוקה)" },
    { topic: "S&P 500", from: "7,666.45, +0.19% (1/10)", to: "7,722.93, +0.7% (2/10)" },
    { topic: "נאסד\"ק קומפוזיט", from: "26,871.60, +0.04% (1/10)", to: "27,190.86, +1.2% (2/10)" },
    { topic: "תשואת 10 שנים", from: "5.24% בסיום (1/10)", to: "5.281% בסיום (2/10)" },
    { topic: "נפט WTI", from: "$92.87 (1/10)", to: "$91.24 (2/10)" },
    { topic: "ביטקוין", from: "כ-$84,500 (1/10)", to: "כ-$86,700 (2/10)" }
  ],
  ai: [
    { title: "אנתרופיק מקדימה את OpenAI לוול סטריט: הנפקה אפשרית באוקטובר, שווי שעד $2 טריליון", body: "אנתרופיק הגישה טיוטת S-1 חסויה לרשות ניירות הערך האמריקאית ב-1/6, ימים אחרי שסגרה סבב Series H של $65 מיליארד בשווי $965 מיליארד — מעל השווי של OpenAI באותו שלב. החברה ממוקדת לנאסד\"ק ומכוונת לרישום אפשרי כבר באוקטובר 2026, עם שווי שחלק מהאנליסטים מעריכים בעד $2 טריליון; בשוק המשני נסחרות המניות כבר לפי שווי של מעל $1 טריליון. OpenAI, לעומת זאת, דחתה את ההנפקה שלה ל-2027. משמעות: ככל שהתוכנית תתממש, אנתרופיק תהיה מעבדת ה-AI הטהורה הראשונה שנסחרת בבורסה — אירוע שעלול להגדיר מחדש את תמחור כל הסקטור.", tickers: [], source: { name: "Yahoo Finance / Futurum Group", url: "https://finance.yahoo.com/markets/stocks/articles/anthropic-files-confidential-1-joins-161008569.html", date: "ספטמבר-אוקטובר 2026" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 83, hike: 17 },
    polymarket: null,
    items: [
      { title: "דו\"ח התעסוקה: 29 אלף משרות בלבד, אבטלה 4.2% — הכי חלש מזמן", body: "המשק האמריקאי הוסיף רק 29 אלף משרות בספטמבר מול תחזית לכ-84 אלף, ואבטלה עלתה ל-4.2% מ-4.1%. השכר השעתי הממוצע עלה 0.1% בלבד חודשית ו-3% שנתית — הקצב האיטי ביותר מאז מאי 2021 — ונתוני יולי-אוגוסט עודכנו למטה בכ-60 אלף משרות. מוחמד אל-עריאן תיאר את הביקוש לעבודה כ\"חלש על כל החזיתות\". משמעות: שוק עבודה שמקרר במהירות מגביר את הסיכוי שהפד יישאר על הגדר באוקטובר, אך גם מעלה חששות ממיתון הדרגתי.", source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/02/jobs-report-september-2026.html", date: "2/10" } },
      { title: "סיכויי העלאת ריבית באוקטובר קורסים ב-CME FedWatch ובקאלשי", body: "בעקבות דו\"ח התעסוקה החלש, הסיכוי להעלאת ריבית ב-28/10 צנח ב-CME FedWatch ל-17% (מ-36% שבוע קודם), עם כ-83% סיכוי להחזקה ו-0% לקיצוץ. בקאלשי נרשמה תנודה דרמטית דומה — מכ-70% לכ-18% בתוך שבוע. לינדזי רוזנר מגולדמן זאקס אסט מנג'מנט אמרה כי \"חדשות רעות הן שוב חדשות טובות בוול סטריט\", אחרי שהמשקיעים חששו שהפד יעלה ריבית יותר ומהר מהנדרש. משמעות: הפד של וורש עדיין לא נשבר, אך שוק החוזים מתמחר כעת פאוזה בחודש הקרוב.", source: { name: "CNBC / Investing.com", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html", date: "2/10" } },
      { title: "תשואת 10 שנים נסגרת גבוה יותר חרף הנתון החלש", body: "תשואת ה-10 שנים צנחה בתחילת המסחר של יום שישי בתגובה לדו\"ח התעסוקה החלש, אך התאוששה במהלך היום ונסגרה בעלייה של כ-5 נק' בסיס ל-5.281% — עדיין קרוב לשיא של 24 שנה שנרשם בשבוע שעבר. משמעות: שוק האג\"ח ממשיך לתמחר פרמיית סיכון גבוהה על רקע האינפלציה והגירעון, גם כשנתוני התעסוקה מצדיקים ריבית נמוכה יותר.", source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/02/treasury-yields-bonds-nonfarm-payrolls.html", date: "2/10" } }
    ]
  },
  voices: [
    { name: "מוחמד אל-עריאן", role: "אליאנץ, יועץ כלכלי ראשי", stance: "דובי", he: "הביקוש לעבודה חלש על כל החזיתות... הצד של הביקוש מאותת צהוב, וזה הולך להעמיד את הפד בהחלט על פאוזה באוקטובר.", en: "Weak across the board when it comes to the demand for labor... The demand side is flashing yellow … [and is] going to put the Fed definitely on hold for October.", date: "2/10", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206" },
    { name: "לינדזי רוזנר", role: "גולדמן זאקס אסט מנג'מנט, ראשת השקעות רב-מגזריות בהכנסה קבועה", stance: "זהיר", he: "חדשות רעות הן שוב חדשות טובות בוול סטריט.", en: "Bad news is once again good news on Wall Street.", date: "2/10", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206", note: "ציינה שמשקיעים חששו שהפד יעלה ריבית יותר ומהר מהנדרש לפני פרסום הדו\"ח." },
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "זו נראית לי דרך סבירה לחשוב על זה.", en: "That seems to me a reasonable way of thinking about it.", date: "24/9", url: "https://www.cnbc.com/2026/09/24/feds-williams-another-rate-hike-by-year-end.html", note: "בהתייחס לסבירות של העלאת ריבית נוספת עד סוף 2026 — אך בלי להתחייב למועד אוקטובר." },
    { name: "קווין וורש", role: "יו\"ר הפד", stance: "ניצי", he: "האינפלציה נותרת גבוהה, עם קטגוריות רבות מדי שממשיכות לעלות בקצב של מעל 3%, גם על בסיס 6 חודשים וגם על בסיס 12 חודשים.", en: "Inflation remains elevated, with too many categories still posting increases above 3 percent, on both a 6- and 12-month basis.", date: "16/9", url: "https://www.federalreserve.gov/mediacenter/files/FOMCpresconf20260916.pdf", note: "בתדרוך העיתונאים אחרי החלטת הריבית של 16/9, בה הועלתה הריבית ל-3.75–4.00%." }
  ],
  israel: [
    { title: "שוק ת\"א סגור עד יום ראשון (סיום חג שמחת תורה ושבת)", body: "בסשן האחרון, ביום חמישי 1/10, עלה ת\"א 35 ב-0.34% ל-4,218.25. ביום שישי 2/10 (ערב שמחת תורה) ובשבת 3/10 אין מסחר; יום המסחר הבא בבורסה צפוי ביום ראשון, 4/10.", source: { name: "Investing.com India / בורסת ת\"א", url: "https://in.investing.com/news/stock-market-news/israel-shares-higher-at-close-of-trade-ta-35-up-034-5615252", date: "1/10" } },
    { title: "בנק ישראל משאיר את הריבית על 3.25%; ההחלטה הבאה ב-21/10", body: "הריבית נותרה ללא שינוי מאז הורדתה ל-3.25% ב-1/9. ברקע, מלחמת ארה\"ב-ישראל-איראן נמשכת, וטראמפ דחה ביום שישי מתווה הפסקת-אש שהעלתה איראן. משמעות: בנק ישראל צפוי להמשיך לפעול בזהירות כל עוד אי-הוודאות הגיאופוליטית והתנודתיות במחירי הנפט גבוהות.", source: { name: "בנק ישראל", url: "https://www.boi.org.il/media/vuubo40c/הודעת-ריבית-01092026.pdf", date: "1/9" } }
  ],
  sources: [
    { name: "Yahoo Finance Live: וול סטריט 2/10", url: "https://finance.yahoo.com/markets/live/stock-market-today-friday-october-2-dow-sp-500-nasdaq-september-jobs-report-080623878.html" },
    { name: "CNBC: דו\"ח התעסוקה של ספטמבר", url: "https://www.cnbc.com/2026/10/02/jobs-report-september-2026.html" },
    { name: "CNBC: תשואות האג\"ח אחרי דו\"ח התעסוקה", url: "https://www.cnbc.com/2026/10/02/treasury-yields-bonds-nonfarm-payrolls.html" },
    { name: "CNBC: סיכויי העלאת הריבית באוקטובר", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html" },
    { name: "Investing.com: תגובות מומחים לדו\"ח התעסוקה", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206" },
    { name: "CNBC: וויליאמס על העלאת ריבית נוספת", url: "https://www.cnbc.com/2026/09/24/feds-williams-another-rate-hike-by-year-end.html" },
    { name: "Federal Reserve: תדרוך עיתונאים 16/9", url: "https://www.federalreserve.gov/mediacenter/files/FOMCpresconf20260916.pdf" },
    { name: "Trading Economics: נפט WTI", url: "https://tradingeconomics.com/commodity/crude-oil" },
    { name: "Trading Economics: נפט ברנט", url: "https://tradingeconomics.com/commodity/brent-crude-oil" },
    { name: "Al Jazeera: נושאת מטוסים נוספת וחיילים למזרח התיכון", url: "https://www.aljazeera.com/news/2026/10/2/new-aircraft-carrier-10000-us-troops-is-the-iran-war-about-to-escalate" },
    { name: "CBS News: טראמפ דוחה את מתווה איראן להורמוז", url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-talks-strait-of-hormuz/" },
    { name: "Yahoo Finance: מחירי ביטקוין ואת'ריום 2/10", url: "https://finance.yahoo.com/personal-finance/investing/article/bitcoin-and-ethereum-prices-today-friday-october-2-2026-crypto-prices-surging-ahead-of-september-jobs-report-112959413.html" },
    { name: "CoinGabbar: עדכון שוק הקריפטו 2/10", url: "https://www.coingabbar.com/en/crypto-news-today-october-2026-bitcoin-ethereum-market-update" },
    { name: "Yahoo Finance: הגשת S-1 חסויה של אנתרופיק", url: "https://finance.yahoo.com/markets/stocks/articles/anthropic-files-confidential-1-joins-161008569.html" },
    { name: "Futurum Group: אנתרופיק מגישה להנפקה", url: "https://futurumgroup.com/insights/anthropic-files-for-ipo-looking-to-beat-openai-to-the-punch/" },
    { name: "Investing.com India: ת\"א 35, 1/10", url: "https://in.investing.com/news/stock-market-news/israel-shares-higher-at-close-of-trade-ta-35-up-034-5615252" },
    { name: "בנק ישראל: הודעת ריבית 1/9", url: "https://www.boi.org.il/media/vuubo40c/הודעת-ריבית-01092026.pdf" }
  ]
};
