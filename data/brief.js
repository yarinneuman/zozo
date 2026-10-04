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
  updatedAt: "2026-10-04T08:35:00+03:00",
  edition: "יומי",
  headline: "הצוות הבכיר של טראמפ לביטחון לאומי נפגש <em>בסתר בקאמפ דייוויד</em> על איראן ותימן, ומשלחת איראן גורשה מניו יורק. היום: ה-OPEC+ וסבב הבחירות בברזיל.",
  thesis: "וול סטריט הייתה סגורה בסוף השבוע, כך שהסגירה האחרונה היא זו של יום שישי, אחרי דו\"ח התעסוקה החלש שהוריד את סיכויי העלאת הריבית באוקטובר ל-17%. מעל השוק מרחפת הסלמה דיפלומטית: לפי Axios, הצוות הבכיר של טראמפ לביטחון לאומי נפגש בסתר בקאמפ דייוויד ביום שישי לדון בהמשך המלחמה באיראן ובתימן — פגישה דומה לזו שקדמה למלחמת ישראל-איראן ביוני 2025 — ושבוע קודם לכן גירשה וושינגטון את המשלחת האיראנית מהאסיפה הכללית של האו\"ם. היום: שבעת חברי ה-OPEC+ נפגשים לדון במכסות נובמבר, ובברזיל מתקיים הסבב הראשון בבחירות לנשיאות. שוק ת\"א סגור וייפתח מחר.",
  bottomLine: [
    "וול סטריט סגורה בסופ\"ש; הסגירה האחרונה (יום שישי 2/10) הייתה S&P 500 +0.73% ל-7,722.72, נאסד\"ק +1.19% ל-27,190.86 ודאו +0.49% ל-51,176.96, אחרי דו\"ח תעסוקה חלש (29 אלף משרות מול תחזית 84-90 אלף, אבטלה 4.2%). תשואת 10 השנים נסגרה ב-5.281% (CNBC; 2/10).",
    "דיווח של Axios (3/10): צוות הביטחון הלאומי הבכיר של טראמפ — סגן הנשיא ואנס (שהוביל), מזכיר המדינה רוביו, שר ההגנה הגסת', השליח ויטקוף, ראש הסי.איי.אי רטקליף, רמטכ\"ל המטות המשולבים קיין ושר האוצר בסנט — נפגש בסתר בקאמפ דייוויד ביום שישי לדון בהמשך המלחמה באיראן ובמלחמת סעודיה-חות'ים בתימן. לפי הדיווח, זו פגישה דומה לאחרונה שהתקיימה ביוני 2025, ימים לפני שישראל פתחה במלחמה באיראן; טראמפ אמר ביום חמישי \"עכשיו אני צריך להחליט: או שאיראן חותמת על ההסכם, או שהוא לא יתקיים יותר\" (Axios; 3/10, 1/10).",
    "מחלקת המדינה דרשה מהמשלחת האיראנית באו\"ם, בראשות שר החוץ עראקצ'י, לעזוב את ניו יורק לאחר שהשיחות בתיווך קטארי נתקעו; המשלחת עזבה לדוחא בטיסה בשעה 1:20 לפנות בוקר שלישי. לפי דיווח נוסף, שני חברי משלחת שנותרו אחרי המועד גורשו גם הם. משמעות: קריסת הניסיון הדיפלומטי האחרון מגבירה את הסיכוי לחידוש לחימה ולזעזוע נוסף בשוק הנפט (Axios; 1/10, 3/10).",
    "היום (4/10): שבעת חברי הליבה של OPEC+ (סעודיה, רוסיה, עיראק, כווית, אלג'יריה, קזחסטן ועומאן) נפגשים לדון במכסות נובמבר; לפי רויטרס, הציפייה היא שהמכסות יישארו ללא שינוי, אך ההחלטה הסופית עדיין לא התקבלה. הנפט נסגר ביום שישי ב-$91.24 ל-WTI וב-$99.68 לברנט. בברזיל מתקיים היום הסבב הראשון בבחירות לנשיאות בין לולה לבולסונארו הבן, עם סבב שני אפשרי ב-25/10 אם אין רוב מוחלט (Yahoo Finance/Reuters; 4/10).",
    "ביטקוין נסחר כ-$84,800 בערב שבת, יציב לעומת סגירת יום שישי (כ-$84,592). שוק ת\"א נותר סגור מאז יום חמישי 1/10 לרגל שמחת תורה, והמסחר יתחדש מחר, יום שני 5/10. ריבית בנק ישראל עומדת על 3.25%, וההחלטה הבאה ב-21/10 (CoinDesk; 3/10)."
  ],
  snapshot: [
    { k: "S&P 500 (2/10, שוק סגור)", v: "7,722.72", c: "+0.73%", dir: "up" },
    { k: "נאסד\"ק Composite (2/10)", v: "27,190.86", c: "+1.19%", dir: "up" },
    { k: "דאו ג'ונס (2/10)", v: "51,176.96", c: "+0.49%", dir: "up" },
    { k: "תשואה 10 שנים (2/10)", v: "5.281%", c: "+5bp", dir: "up" },
    { k: "תשואה 2 שנים (2/10)", v: "4.839%", c: "+5bp", dir: "up" },
    { k: "תשואה 30 שנה (2/10)", v: "5.629%", c: "+2bp", dir: "up" },
    { k: "נפט WTI (2/10)", v: "$91.24", c: "−1.76%", dir: "down" },
    { k: "ברנט (2/10)", v: "$99.68", c: "−2.57%", dir: "down" },
    { k: "זהב (2/10)", v: "$4,162.30", c: "−0.95%", dir: "down" },
    { k: "ביטקוין (3/10 בערב)", v: "כ-$84,800", c: "יציב מסוף השבוע", dir: "flat" },
    { k: "ת\"א 35 (1/10, שוק סגור בסופ\"ש)", v: "4,218.25", c: "+0.34%", dir: "up" },
    { k: "דולר/שקל (2/10)", v: "3.09", c: "+0.52%", dir: "flat" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9, הבאה 28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "ביטקוין", from: "כ-$84,592 (2/10)", to: "כ-$84,800 (3/10 בערב)" },
    { topic: "המו\"מ עם איראן", from: "טראמפ דוחה הצעה בת 7 ימים לפתיחת הורמוז (2/10)", to: "פגישת חירום בקאמפ דייוויד; המשלחת האיראנית גורשה מניו יורק (1-3/10)" },
    { topic: "OPEC+", from: "מכסות אוקטובר הושארו ללא שינוי (6/9)", to: "נפגשים היום לדון במכסות נובמבר, צפי להמשך קיפאון (4/10)" }
  ],
  ai: [
    { title: "אנבידיה השיקה פלטפורמת אבטחה לסוכני AI סוררים — ללא OpenAI", body: "אנבידיה הכריזה על חבילת תוכנה וחומרה (ובהן OpenShell ו-Sentry) שמטרתה למנוע מסוכני AI \"לברוח\" מסביבת הבדיקה שלהם. עשרות חברות חתמו על התמיכה, בהן אנתרופיק, מיקרוסופט ו-SpaceX, אך OpenAI לא נמנית על המשתתפות הרשמיות — אף שהיא משתפת פעולה עם אנבידיה בפיתוח OpenShell עצמו. משמעות: הפיצול בין מחנה אנבידיה-אנתרופיק לבין OpenAI בנושא ממשל AI מתחדד.", tickers: ["NVDA"], source: { name: "TechCrunch", url: "https://techcrunch.com/2026/09/29/heres-why-openai-is-absent-from-nvidias-industry-wide-effort-to-end-rogue-ai-agents/", date: "28-29/9" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 83, hike: 17 },
    polymarket: null,
    items: [
      { title: "דו\"ח התעסוקה שעדיין מכתיב את השבוע: 29 אלף משרות, אבטלה 4.2%", body: "הדו\"ח שהתפרסם ביום שישי החטיא בגדול את התחזית (84-90 אלף), והוריד את סיכויי העלאת הריבית באוקטובר ב-CME FedWatch ל-17% (מול 83% להחזקה). מכיוון שאין מסחר בסוף השבוע, זה נשאר הנתון המכריע עד ישיבת ה-ISM שירותים ופרוטוקול ה-FOMC בשבוע הקרוב.", source: { name: "CNBC", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html", date: "2/10" } },
      { title: "השבוע הקרוב: ISM שירותים, פרוטוקול FOMC ופפסיקו", body: "ביום שני (5/10) ISM שירותים (תחזית 55.7 מול 55.4). ברביעי (7/10) פרוטוקול ישיבת ספטמבר של הפד, שבה הועלתה הריבית. בחמישי (8/10) פפסיקו (תחזית EPS כ-$2.30, הכנסות כ-$25 מיליארד), ובשישי (9/10) דלתא איירליינס וסקר מישיגן.", source: { name: "CMC Markets", url: "https://cmcmarkets.com/en-ie/news-and-analysis/the-week-ahead-us-ism-services-fed-minutes-pepsico-earnings", date: "2/10" } }
    ]
  },
  voices: [
    { name: "מוחמד אל-עריאן", role: "אליאנץ, יועץ כלכלי ראשי", stance: "דובי", he: "הביקוש לעבודה חלש על כל החזיתות... הצד של הביקוש מאותת צהוב, וזה הולך להעמיד את הפד בהחלט על פאוזה באוקטובר.", en: "Weak across the board when it comes to the demand for labor... The demand side is flashing yellow … [and is] going to put the Fed definitely on hold for October.", date: "2/10", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206" },
    { name: "כריס הודג'", role: "Natixis, כלכלן ראשי", stance: "ניצי", he: "הנתונים האלה לא ישנו את שיקולי ההחלטה הרחבים של הפד, כי האינפלציה נשארת הדאגה העליונה.", en: "This data won't shift the broader decision-making calculus for the Fed as inflation remains the supreme concern.", date: "2/10", url: "https://finance.yahoo.com/economy/live/september-jobs-report-live-updates-labor-market-adds-29000-124648123.html" },
    { name: "ביל אדמס", role: "Fifth Third Commercial Bank, כלכלן ראשי לארה\"ב", stance: "ניטרלי", he: "שיעור האבטלה עלה מעט כשיותר אנשים נכנסו לכוח העבודה, אבל שיעור האבטלה והתת-תעסוקה ירד מעט, מה שמקהה במידה מסוימת את הכותרת.", en: "The unemployment rate edged up as more people entered the labor force, but the unemployment-and-underemployment rate edged lower, taking some sting out of the headline.", date: "2/10", url: "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-2-135416764.html" },
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "בפעולת המדיניות שנקטנו בישיבת ספטמבר, אין צורך במיידיות. אם הכלכלה תתפתח בהתאם לתחזית שלי, ייתכן שתיקון נוסף כלפי מעלה בטווח הריבית יתאים בהמשך השנה.", en: "With the policy action we took at our September meeting, there is no need for urgency. If the economy evolves in a manner broadly consistent with my forecast, one further upward adjustment of the federal funds target range may be appropriate late this year.", date: "29/9", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "טוד שנברגר", role: "Crosscheck Management, מנהל השקעות ראשי", stance: "שורי", he: "נתון המשרות הנמוך, כולל העדכון, הוא באופן מוזר דווקא חדשות טובות למניות.", en: "The lower jobs print including the revision is, oddly enough, good news for stocks.", date: "2/10", url: "https://www.investing.com/news/economy-news/soft-september-jobs-report-sends-markets-higher-4929845" },
    { name: "ג'יימי דיימון", role: "JPMorgan, יו\"ר ומנכ\"ל", stance: "זהיר", he: "אני חושב שהסבירות שמשהו רע יקרה גבוהה יותר ממה שלדעתי מגולם בשוק.", en: "I think the probability of something bad happening is higher than I think it's embedded in the market.", date: "28/9", url: "https://pymnts.com/economy/2026/jamie-dimon-urges-economic-reforms-prevent-decline-western-democracies", note: "ממאמר דעה ב-WSJ שבו קרא לרפורמות בארה\"ב ובאירופה נוכח המלחמות באיראן ובאוקראינה." }
  ],
  israel: [
    { title: "ת\"א 35 עלה 0.34% ל-4,218.25 בסשן האחרון; המסחר יתחדש מחר", body: "בסשן האחרון, יום חמישי 1/10, הובילו את העליות הבנקים, הנפט והגז והתקשורת; נייס זינקה 6.41% ופאלו אלטו (CYBR) עלתה 5.48% לשיא. שוק ת\"א היה סגור ביום שישי לרגל שמחת תורה ונותר סגור בסוף השבוע; המסחר יתחדש ביום שני 5/10.", source: { name: "Investing.com", url: "https://www.investing.com/news/stock-market-news/israel-stocks-higher-at-close-of-trade-ta-35-up-034-4927821", date: "1/10" } },
    { title: "הדולר עומד על 3.09 שקלים; בנק ישראל מחליט ב-21/10", body: "הריבית עומדת על 3.25% מאז ההורדה ב-1/9. משמעות: קריסת סיכויי העלאת הריבית בארה\"ב ל-17% מקלה על פער הריביות, אך ההסלמה האפשרית באיראן בעקבות הפגישה בקאמפ דייוויד מחייבת זהירות בנוגע לנפט ולשקל.", source: { name: "Investing.com", url: "https://www.investing.com/news/stock-market-news/israel-stocks-higher-at-close-of-trade-ta-35-up-034-4927821", date: "1-2/10" } }
  ],
  sources: [
    { name: "CNBC: סיכויי העלאת הריבית באוקטובר", url: "https://www.cnbc.com/2026/10/02/fed-rate-hike-odds-decline-after-september-jobs-report.html" },
    { name: "Yahoo Finance: שוק המניות 2/10", url: "https://finance.yahoo.com/markets/stocks/articles/stock-market-today-oct-2-135416764.html" },
    { name: "Yahoo Finance: בלוג דו\"ח התעסוקה", url: "https://finance.yahoo.com/economy/live/september-jobs-report-live-updates-labor-market-adds-29000-124648123.html" },
    { name: "Investing.com: תגובות מומחים לדו\"ח התעסוקה", url: "https://www.investing.com/news/economy-news/reaction-roundup-experts-analysts-weigh-in-on-september-jobs-report-4930206" },
    { name: "Investing.com: תגובת השווקים", url: "https://www.investing.com/news/economy-news/soft-september-jobs-report-sends-markets-higher-4929845" },
    { name: "Investing.com: ת\"א 35, 1/10", url: "https://www.investing.com/news/stock-market-news/israel-stocks-higher-at-close-of-trade-ta-35-up-034-4927821" },
    { name: "Axios: הצוות הבכיר של טראמפ נפגש בסתר בקאמפ דייוויד", url: "https://www.axios.com/2026/10/03/trumps-cabinet-camp-david-iran-war-yemen-houthis" },
    { name: "Axios: הסיבות שהמו\"מ בין ארה\"ב לאיראן נכשל", url: "https://www.axios.com/2026/10/02/iran-trump-negotiations-war-reasons-fail" },
    { name: "Axios: רוביו דרש מהמשלחת האיראנית לעזוב", url: "https://www.axios.com/2026/10/01/rubio-iran-unga-delegation-kicked-out" },
    { name: "Axios: עוד חברי משלחת איראנים גורשו", url: "https://www.axios.com/2026/10/03/iran-un-kicked-out-rubio" },
    { name: "Yahoo Finance: OPEC+ צפוי להשאיר מכסות נובמבר ללא שינוי", url: "https://finance.yahoo.com/energy/articles/opec-expected-keep-november-oil-102921735.html" },
    { name: "CNBC: OPEC+ השאירה את מכסות אוקטובר ללא שינוי", url: "https://www.cnbc.com/2026/09/06/opec-oil-output-october.html" },
    { name: "CoinDesk: מחיר הביטקוין", url: "https://www.coindesk.com/price/bitcoin" },
    { name: "TechCrunch: OpenAI לא ברשימת שותפי פלטפורמת האבטחה של אנבידיה", url: "https://techcrunch.com/2026/09/29/heres-why-openai-is-absent-from-nvidias-industry-wide-effort-to-end-rogue-ai-agents/" },
    { name: "CMC Markets: השבוע הבא", url: "https://cmcmarkets.com/en-ie/news-and-analysis/the-week-ahead-us-ism-services-fed-minutes-pepsico-earnings" }
  ]
};
