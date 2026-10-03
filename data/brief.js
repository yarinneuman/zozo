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
  updatedAt: "2026-10-03T10:55:00+03:00",
  edition: "יומי",
  headline: "דו\"ח תעסוקה חלש בהרבה מהצפי <em>מוריד את סיכויי העלאת הריבית</em> באוקטובר ל-17%. וול סטריט עלתה ואנבידיה נגעה בשיא, אבל תשואת 10 השנים נסגרה גבוה יותר. טראמפ דחה את המתווה של איראן להורמוז.",
  thesis: "דו\"ח התעסוקה של ספטמבר החטיא בגדול: נוספו 29 אלף משרות בלבד מול תחזית של 84-90 אלף, והאבטלה עלתה ל-4.2%. הנתון כמעט מחק את הסיכוי להעלאת ריבית באוקטובר, ווול סטריט עלתה בהובלת הטכנולוגיה. עם זאת, תשואת 10 השנים, שירדה בתחילת המסחר, התהפכה ונסגרה גבוה יותר. מדד המחירים של ISM קפץ ל-77.9, ודצמבר עדיין מתומחר כהעלאה. משמעות: שוק האג\"ח עוד לא משוכנע שהאינפלציה בשליטה. במקביל, הנשיא טראמפ דחה כ\"בלתי מתקבל על הדעת\" מתווה של שבעה ימים שאיראן העבירה דרך קטאר לפתיחת מיצרי הורמוז. בורסת ת\"א הייתה סגורה בשישי לרגל שמחת תורה, והמסחר יתחדש ביום שני 5/10.",
  bottomLine: [
    "דו\"ח התעסוקה של ספטמבר: נוספו 29 אלף משרות מול תחזית של 84-90 אלף, והאבטלה עלתה ל-4.2% מ-4.1%, בעיקר בגלל הצטרפות לכוח העבודה (השתתפות 61.8%). השכר הממוצע עלה 0.1% בחודש ו-3.0% בשנה, הקצב האיטי ביותר מאז מאי 2021. נתוני יולי ואוגוסט עודכנו כלפי מטה ב-60 אלף משרות יחד (CNBC, Yahoo Finance, Employ America; 2/10).",
    "וול סטריט עלתה: S&P 500 עלה 0.73% ל-7,722.72, נאסד\"ק 1.19% ל-27,190.86 ודאו 0.49% ל-51,176.96. בשבוע כולו נאסד\"ק עלה, ו-S&P ודאו ירדו. אנבידיה נגעה בשיא של $237.88, הראשון מאז מאי, בשווי של כ-$5.7 טריליון. טסלה עלתה כ-4%-5% אחרי 486,532 מסירות (קונצנזוס 461,974). נייקי ירדה 3.64% אחרי תחזית חלשה וצניחה של 26% בסין (Yahoo Finance; 2/10).",
    "סיכויי העלאת הריבית באוקטובר ב-CME FedWatch ירדו ל-17%, וסיכויי ההחזקה עלו ל-83% (72% לפני הדוח). בשווקים החוזים העתידיים מתמחרים כ-22.2 נקודות בסיס של הידוק עד סוף 2026, מול 25.5 לפני הדוח. תשואת 10 השנים ירדה בבוקר ל-5.176%, אבל נסגרה בעלייה של כ-5 נקודות בסיס ל-5.281%, קרוב לשיא של 24 שנה (CNBC, Phemex, Reuters/Investing.com; 2/10).",
    "הנשיא טראמפ דחה כ\"בלתי מתקבל על הדעת\" מתווה של שבעה ימים שאיראן העבירה דרך קטאר לפתיחת מיצרי הורמוז. לדבריו, חידוש התקיפות אחרי הבחירות לקונגרס ב-3/11 \"אפשרי\". משמר המהפכה הודיע שתפס רכב תת-ימי אמריקאי במיצרים. הנפט נסוג: WTI ירד ל-כ-$91.2 וברנט 2.57% ל-$99.68. הזהב ירד 0.95% ל-$4,162 והביטקוין 1.74% ל-כ-$84,592 (Al Jazeera, CBS News, TradingEconomics, Yahoo; 2/10).",
    "בישראל: ת\"א 35 עלה 0.34% ל-4,218.25 ביום חמישי. נייס זינקה 6.41% ופאלו אלטו (CYBR) עלתה 5.48% לשיא. הדולר עלה 0.52% ל-3.09 שקלים. בשישי הבורסה הייתה סגורה לרגל שמחת תורה, והמסחר יתחדש ביום שני 5/10. ריבית בנק ישראל עומדת על 3.25%, וההחלטה הבאה ב-21/10 (Investing.com, בנק ישראל; 1/10)."
  ],
  snapshot: [
    { k: "S&P 500", v: "7,722.72", c: "+0.73%", dir: "up" },
    { k: "נאסד\"ק Composite", v: "27,190.86", c: "+1.19%", dir: "up" },
    { k: "דאו ג'ונס", v: "51,176.96", c: "+0.49%", dir: "up" },
    { k: "תשואה 10 שנים", v: "5.281%", c: "+5bp", dir: "up" },
    { k: "תשואה 2 שנים", v: "4.839%", c: "+5bp", dir: "up" },
    { k: "תשואה 30 שנה", v: "5.629%", c: "+2bp", dir: "up" },
    { k: "נפט WTI", v: "$91.24", c: "−1.76%", dir: "down" },
    { k: "ברנט", v: "$99.68", c: "−2.57%", dir: "down" },
    { k: "זהב", v: "$4,162.30", c: "−0.95%", dir: "down" },
    { k: "ביטקוין", v: "כ-$84,592", c: "−1.74%", dir: "down" },
    { k: "ת\"א 35 (1/10)", v: "4,218.25", c: "+0.34%", dir: "up" },
    { k: "דולר/שקל (1/10)", v: "3.09", c: "+0.52%", dir: "up" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9, הבאה 28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "סיכוי להעלאת ריבית באוקטובר (CME FedWatch)", from: "38.2% (1/10)", to: "17% (2/10, אחרי דו\"ח התעסוקה)" },
    { topic: "שיעור האבטלה", from: "4.1% (אוגוסט)", to: "4.2% (ספטמבר)" },
    { topic: "S&P 500", from: "7,666.45, +0.19% (1/10)", to: "7,722.72, +0.73% (2/10)" },
    { topic: "נאסד\"ק קומפוזיט", from: "26,871.60, +0.04% (1/10)", to: "27,190.86, +1.19% (2/10)" },
    { topic: "תשואת 10 שנים", from: "5.24% בסיום (1/10)", to: "5.281% בסיום (2/10)" },
    { topic: "נפט WTI", from: "$92.87 (1/10)", to: "$91.24 (2/10)" },
    { topic: "ISM מחירים (תעשייה)", from: "71.1 (אוגוסט)", to: "77.9 (ספטמבר)" }
  ],
  ai: [
    { title: "אנבידיה בשיא ראשון מאז מאי, בשווי של כ-$5.7 טריליון", body: "המניה נגעה בשיא של $237.88 ביום שישי, אחרי עלייה של כמעט 25% מהשפל של סוף יולי. ברקע: אנבידיה וסופטבנק השלימו כל אחת את הנתח האחרון של $10 מיליארד בסבב הגיוס של OpenAI, והתלהבות מסוכני AI. משמעות: החברה נמצאת במרחק של כ-$300 מיליארד מהחברה הראשונה בשווי $6 טריליון.", tickers: ["NVDA"], source: { name: "Yahoo Finance", url: "https://finance.yahoo.com/markets/stocks/articles/nvidia-stock-hits-record-high-175422059.html", date: "2/10" } },
    { title: "דיווחים: אנתרופיק מכוונת להנפקה באמצע נובמבר, וברודקום תממן עד $42 מיליארד", body: "לפי בלומברג (1/10), אנתרופיק שואפת להנפקה כבר באמצע נובמבר, והשיווק הרשמי עשוי להתחיל בשבוע של 9/11. בדיווחים קודמים דובר על אוקטובר. לפי רויטרס, על בסיס מסמך רשמי, ברודקום תעמיד לאנתרופיק עד $42 מיליארד במימון בשטרות להמרה, הקשור לחכירת שבבים. מדובר בדיווחים, לא בהודעות רשמיות של החברה.", tickers: ["AVGO"], source: { name: "The Neuron (Bloomberg, Reuters)", url: "https://theneuron.ai/digest/everything-that-happened-in-ai-today-thursday-october-1-2026", date: "1/10" } },
    { title: "סופטבנק השלימה את ההשקעה ב-OpenAI", body: "סופטבנק העבירה את הנתח האחרון של $10 מיליארד. לפי הדיווח, ההשקעה המצטברת שלה הגיעה לכ-$64.6 מיליארד, תמורת כ-13% מ-OpenAI. גם אנבידיה השלימה התחייבות של $30 מיליארד.", tickers: ["NVDA"], source: { name: "The Neuron / SoftBank", url: "https://theneuron.ai/digest/everything-that-happened-in-ai-today-thursday-october-1-2026", date: "1/10" } },
    { title: "טסלה: 486,532 מסירות ברבעון השלישי, מעל התחזית", body: "המסירות עקפו את הקונצנזוס של 461,974 ב-5.3%. הן עלו 1.3% לעומת הרבעון השני וירדו 2.1% לעומת השיא ברבעון השלישי של 2025. הייצור עמד על 464,391 רכבים, ופריסת האחסון על 13.7GWh, מתחת לצפי.", tickers: ["TSLA"], source: { name: "Not a Tesla App", url: "https://www.notateslaapp.com/news/4759/tesla-announces-q3-2026-vehicle-deliveries-beating-analyst-estimates", date: "2/10" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 83, hike: 17 },
    polymarket: null,
    items: [
      { title: "דו\"ח התעסוקה: 29 אלף משרות, אבטלה 4.2%", body: "במגזר הפרטי נוספו 46 אלף משרות. יולי עודכן ל-10 אלף- ואוגוסט ל-133 אלף. השכר הממוצע עלה 0.13% בחודש ו-3.0% בשנה. שיעור התעסוקה בגילאי 25-54 עלה ל-80.68%. משמעות: Employ America מגדירה את שוק העבודה \"רך, אבל לא קשה\". האטה בשכר מקלה על לחץ האינפלציה, אבל מעלה את החשש מהאטה בצמיחה.", source: { name: "Employ America", url: "https://www.employamerica.org/jobs-day/september-2026-labor-market-recap/", date: "2/10" } },
      { title: "סיכויי העלאת הריבית באוקטובר קורסים", body: "ב-CME FedWatch הסיכוי להעלאה ב-28/10 ירד ל-17%, עם כ-83% להחזקה ו-0% להורדה. בקאלשי הסיכויים ירדו מכ-70% לכ-18% בתוך שבוע. לפי FXStreet, דצמבר עדיין מתומחר כהעלאה. משמעות: השוק מתמחר הפוגה בחודש הקרוב, לא סוף למחזור ההעלאות. ה-CPI ב-14/10 יהיה המבחן הבא.", source: { name: "CNBC / FXStreet", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html", date: "2/10" } },
      { title: "ISM תעשייה 54.5 מול תחזית 55, ומדד המחירים קפץ ל-77.9", body: "התעשייה בהתרחבות זה החודש התשיעי ברציפות. ההזמנות החדשות עלו ל-55.3 והתעסוקה ל-52.7. מדד המחירים עלה 6.8 נקודות ל-77.9, לפי ISM בגלל פלדה ואלומיניום, מכסים ומוצרי נפט על רקע הסכסוך במזרח התיכון. משמעות: לחץ המחירים בשרשרת האספקה מחזק את הנימוק הניצי.", source: { name: "FXStreet / ISM", url: "https://www.fxstreet.com/news/us-ism-manufacturing-pmi-fell-to-545-in-september-202610011406", date: "1/10" } },
      { title: "תשואת 10 שנים נסגרת גבוה יותר למרות הנתון החלש", body: "התשואה ירדה בתחילת המסחר ל-5.176%, אבל התהפכה ונסגרה בעלייה של כ-5 נקודות בסיס ל-5.281%, קרוב לשיא של 24 שנה שנרשם השבוע. תשואת השנתיים עלתה ל-4.839%. משמעות: שוק האג\"ח ממשיך לתמחר פרמיית סיכון על רקע האינפלציה והגירעון.", source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/02/treasury-yields-bonds-nonfarm-payrolls.html", date: "2/10" } },
      { title: "השבוע הבא: ISM שירותים, פרוטוקול ה-FOMC ופפסיקו", body: "ביום שני ISM שירותים (תחזית 55.7 מול 55.4). ברביעי 7/10 פרוטוקול ישיבת ספטמבר, שבה הועלתה הריבית. בחמישי פפסיקו (תחזית EPS $2.30, הכנסות $25 מיליארד), ובשישי סקר מישיגן. ביום ראשון מתכנסת OPEC+, ובברזיל מתקיים הסיבוב הראשון של הבחירות.", source: { name: "CMC Markets / Newsquawk", url: "https://cmcmarkets.com/en-ie/news-and-analysis/the-week-ahead-us-ism-services-fed-minutes-pepsico-earnings", date: "2/10" } }
    ]
  },
  voices: [
    { name: "מוחמד אל-עריאן", role: "אליאנץ, יועץ כלכלי ראשי", stance: "דובי", he: "הביקוש לעבודה חלש על כל החזיתות... הצד של הביקוש מאותת צהוב, וזה הולך להעמיד את הפד בהחלט על פאוזה באוקטובר.", en: "Weak across the board when it comes to the demand for labor... The demand side is flashing yellow … [and is] going to put the Fed definitely on hold for October.", date: "2/10", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206" },
    { name: "לינדזי רוזנר", role: "גולדמן זאקס אסט מנג'מנט, ראשת השקעות רב-מגזריות בהכנסה קבועה", stance: "זהיר", he: "חדשות רעות הן שוב חדשות טובות בוול סטריט.", en: "Bad news is once again good news on Wall Street.", date: "2/10", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206", note: "ציינה שמשקיעים חששו שהפד יעלה ריבית יותר ומהר מהנדרש לפני פרסום הדו\"ח." },
    { name: "כריס הודג'", role: "Natixis, כלכלן ראשי", stance: "ניצי", he: "הנתונים האלה לא ישנו את שיקולי ההחלטה הרחבים של הפד, כי האינפלציה נשארת הדאגה העליונה.", en: "This data won't shift the broader decision-making calculus for the Fed as inflation remains the supreme concern.", date: "2/10", url: "https://finance.yahoo.com/economy/live/september-jobs-report-live-updates-labor-market-adds-29000-124648123.html" },
    { name: "פיליפ ג'פרסון", role: "סגן יו\"ר הפדרל ריזרב", stance: "ניצי", he: "אני רואה את הסיכונים לתחזית האינפלציה שלי מוטים כלפי מעלה, בגלל התפתחויות גיאופוליטיות אחרונות וביקוש מצרפי חזק מהצפוי.", en: "I view risks to my inflation forecast as tilted to the upside due to recent geopolitical developments and stronger-than-anticipated aggregate demand.", date: "1/10", url: "https://www.federalreserve.gov/newsevents/speech/jefferson20261001a.htm" },
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "זו נראית לי דרך סבירה לחשוב על זה.", en: "That seems to me a reasonable way of thinking about it.", date: "24/9", url: "https://www.cnbc.com/2026/09/24/feds-williams-another-rate-hike-by-year-end.html", note: "בהתייחס לסבירות של העלאת ריבית נוספת עד סוף 2026, בלי להתחייב לאוקטובר." },
    { name: "טוד שנברגר", role: "Crosscheck Management, מנהל השקעות ראשי", stance: "שורי", he: "נתון המשרות הנמוך, כולל העדכון, הוא באופן מוזר דווקא חדשות טובות למניות.", en: "The lower jobs print including the revision is, oddly enough, good news for stocks.", date: "2/10", url: "https://www.investing.com/news/economy-news/soft-september-jobs-report-sends-markets-higher-4929845" },
    { name: "בריאן ג'ייקובסן", role: "Annex Wealth Management, אסטרטג כלכלי ראשי", stance: "זהיר", he: "זה לא היה דוח זיקוקים; זה היה יותר פַּסְפּוּס.", en: "This wasn't a firecracker of a report; it was more like a dud.", date: "2/10", url: "https://www.investing.com/news/economy-news/soft-september-jobs-report-sends-markets-higher-4929845" },
    { name: "ביל אדמס", role: "Fifth Third Commercial Bank, כלכלן ראשי לארה\"ב", stance: "ניטרלי", he: "שיעור האבטלה עלה מעט כשיותר אנשים נכנסו לכוח העבודה, אבל שיעור האבטלה והתת-תעסוקה ירד מעט, מה שמקהה במידה מסוימת את הכותרת.", en: "The unemployment rate edged up as more people entered the labor force, but the unemployment-and-underemployment rate edged lower, taking some sting out of the headline.", date: "2/10", url: "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-2-135416764.html" }
  ],
  israel: [
    { title: "ת\"א 35 עלה 0.34% ל-4,218.25; המסחר יתחדש ביום שני", body: "ביום חמישי הובילו את העליות הבנקים, הנפט והגז והתקשורת. נייס זינקה 6.41%, פאלו אלטו (CYBR) עלתה 5.48% לשיא ונובה 4.48%. אנלייט ירדה 5.65% ומנורה 3.44%. בכל השוק היורדות גברו על העולות, 279 מול 164. בשישי הבורסה הייתה סגורה לרגל שמחת תורה. מאז ינואר 2026 המסחר מתקיים בימים שני עד שישי, ולכן יום המסחר הבא הוא שני 5/10.", source: { name: "Investing.com", url: "https://www.investing.com/news/stock-market-news/israel-stocks-higher-at-close-of-trade-ta-35-up-034-4927821", date: "1/10" } },
    { title: "הדולר עלה ל-3.09 שקלים; בנק ישראל מחליט ב-21/10", body: "הדולר עלה 0.52% מול השקל ביום חמישי, והאירו ירד 0.15% ל-3.48 שקלים. הריבית עומדת על 3.25% מאז ההורדה ב-1/9, ורוב הכלכלנים בסקר FocusEconomics צופים השארה עד סוף 2026. משמעות: הירידה בסיכוי להעלאה בארה\"ב מקלה על פער הריביות, אבל המלחמה מול איראן והתנודתיות בנפט מחייבות זהירות.", source: { name: "Investing.com / FocusEconomics", url: "https://www.focus-economics.com/countries/israel/news/monetary-policy/israel-central-bank-meeting-01-09-2026-central-bank-cuts-rates-again-in-september/", date: "1/10" } }
  ],
  sources: [
    { name: "Yahoo Finance: שוק המניות 2/10", url: "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-2-135416764.html" },
    { name: "Yahoo Finance Live: וול סטריט 2/10", url: "https://finance.yahoo.com/markets/live/stock-market-today-friday-october-2-dow-sp-500-nasdaq-september-jobs-report-080623878.html" },
    { name: "Yahoo Finance: בלוג דו\"ח התעסוקה", url: "https://finance.yahoo.com/economy/live/september-jobs-report-live-updates-labor-market-adds-29000-124648123.html" },
    { name: "CNBC: דו\"ח התעסוקה של ספטמבר", url: "https://www.cnbc.com/2026/10/02/jobs-report-september-2026.html" },
    { name: "Employ America: סיכום התעסוקה", url: "https://www.employamerica.org/jobs-day/september-2026-labor-market-recap/" },
    { name: "CNBC: תשואות האג\"ח אחרי דו\"ח התעסוקה", url: "https://www.cnbc.com/2026/10/02/treasury-yields-bonds-nonfarm-payrolls.html" },
    { name: "CNBC: סיכויי העלאת הריבית באוקטובר", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html" },
    { name: "Phemex: CME FedWatch אחרי הדוח", url: "https://phemex.com/news/article/fed-october-hike-probability-drops-to-17-after-nonfarm-payrolls-signal-cooling-labor-market-98610" },
    { name: "FXStreet: מה הדוח אומר על הריבית", url: "https://www.fxstreet.com/analysis/the-october-fed-hike-just-died-heres-what-the-29k-jobs-report-really-means-for-rates-202610021806" },
    { name: "Reuters (Investing.com): תגובת השווקים", url: "https://www.investing.com/news/economy-news/soft-september-jobs-report-sends-markets-higher-4929845" },
    { name: "Investing.com: תגובות מומחים לדו\"ח התעסוקה", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206" },
    { name: "FXStreet: ISM תעשייה", url: "https://www.fxstreet.com/news/us-ism-manufacturing-pmi-fell-to-545-in-september-202610011406" },
    { name: "Federal Reserve: נאום ג'פרסון 1/10", url: "https://www.federalreserve.gov/newsevents/speech/jefferson20261001a.htm" },
    { name: "CNBC: וויליאמס על העלאת ריבית נוספת", url: "https://www.cnbc.com/2026/09/24/feds-williams-another-rate-hike-by-year-end.html" },
    { name: "Yahoo Finance: אנבידיה בשיא", url: "https://finance.yahoo.com/markets/stocks/articles/nvidia-stock-hits-record-high-175422059.html" },
    { name: "The Neuron: חדשות AI 1/10", url: "https://theneuron.ai/digest/everything-that-happened-in-ai-today-thursday-october-1-2026" },
    { name: "Not a Tesla App: מסירות Q3", url: "https://www.notateslaapp.com/news/4759/tesla-announces-q3-2026-vehicle-deliveries-beating-analyst-estimates" },
    { name: "SEC: דוח נייקי Q1 FY27", url: "https://www.sec.gov/Archives/edgar/data/0000320187/000032018726000184/q1fy27exhibit991er.htm" },
    { name: "Trading Economics: נפט WTI", url: "https://tradingeconomics.com/commodity/crude-oil" },
    { name: "Trading Economics: נפט ברנט", url: "https://tradingeconomics.com/commodity/brent-crude-oil" },
    { name: "Al Jazeera: נושאת מטוסים נוספת למזרח התיכון", url: "https://www.aljazeera.com/news/2026/10/2/new-aircraft-carrier-10000-us-troops-is-the-iran-war-about-to-escalate" },
    { name: "CBS News: טראמפ דוחה את מתווה איראן להורמוז", url: "https://www.cbsnews.com/live-updates/iran-war-us-trump-talks-strait-of-hormuz/" },
    { name: "Investing.com: ת\"א 35, 1/10", url: "https://www.investing.com/news/stock-market-news/israel-stocks-higher-at-close-of-trade-ta-35-up-034-4927821" },
    { name: "TipRanks: הבורסה עוברת למסחר שני-שישי", url: "https://www.tipranks.com/news/the-tel-aviv-stock-exchange-tase-moves-to-monday-friday-trading-tipranks-aids-the-transition" },
    { name: "בנק ישראל: הודעת ריבית 1/9", url: "https://www.boi.org.il/media/vuubo40c/הודעת-ריבית-01092026.pdf" },
    { name: "CMC Markets: השבוע הבא", url: "https://cmcmarkets.com/en-ie/news-and-analysis/the-week-ahead-us-ism-services-fed-minutes-pepsico-earnings" },
    { name: "Newsquawk: השבוע 4-9/10", url: "https://newsquawk.com/headlines/week-in-focus-4-9th-october-2026-fomc-minutes-us-ism-services-pmi-opec-canadian-jobs-and-ecb-minutes" }
  ]
};
