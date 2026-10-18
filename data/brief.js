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
  updatedAt: "2026-10-18T08:55:00+03:00",
  edition: "יומי",
  headline: "וול סטריט סגורה לסוף השבוע אחרי שישי (16/10) שהביא את השבוע הגרוע ביותר לנאסד\"ק מאז יוני, על רקע משבר האמון בחוב ה-AI של קורוויב; השבוע הקרוב מביא את דו\"חות נטפליקס וטסלה, החלטת ריבית בנק ישראל ו<em>ספירה לאחור של תשעה ימים</em> לבחירות בישראל",
  thesis: "השוק האמריקאי סגור בסוף השבוע אחרי המכירה החדה של יום שישי (16/10): S&P 500 ירד 1.1% ל-7,659.44 ונאסד\"ק קומפוזיט צנח 2.14% ל-26,140.03 - ירידה שבועית של כ-4.5%, השבוע הגרוע ביותר לנאסד\"ק מאז יוני - על רקע חששות ממימון החוב של תשתיות ה-AI, שהתמקדו במניית קורוויב (CoreWeave) שצנחה כ-20% על פני השבוע והאג\"ח שלה נסחר בתשואה של מעל 15%. מדד הפחד VIX טיפס מעל 22 לראשונה בארבעה חודשים, והנפט זינק על מתיחות איראן ורוסיה-אוקראינה (WTI ל-101.41$, ברנט ל-109.86$) - לראשונה קרוב ל-110$ מאז מאי. יו\"ר הפד קווין וורש נמנע ביום חמישי-שישי (בכנס ה-IMF/הבנק העולמי בבנגקוק) מאיתות על החלטת 27-28/10, ו-CME FedWatch מתמחר כעת סיכוי של כ-15% בלבד להעלאת ריבית (מכ-27% יום קודם). השבוע הקרוב בישראל: בנק ישראל יכריע על הריבית ברביעי (21/10, 16:00; ריבית נוכחית 3.25%, אינפלציה שנתית 1.5% - מתחת לאמצע היעד) - תשעה ימים לפני הבחירות לכנסת ה-26 (27/10), שסקר i24NEWS מה-7/10 מצא בהן מירוץ צמוד (60 מנדטים לגוש הקואליציה, 48 לגוש השינוי, 12 לערבים). בארה\"ב, נטפליקס וטסלה מדווחות על רבעון שלישי ביום שלישי (20/10) ורביעי (21/10) בהתאמה.",
  bottomLine: [
    "וול סטריט נסגרה לסוף השבוע אחרי שישי (16/10) שסיכם את השבוע הגרוע ביותר לנאסד\"ק מאז יוני: S&P 500 -1.1% ל-7,659.44 (כ-2%- שבועי), נאסד\"ק קומפוזיט -2.14% ל-26,140.03 (כ-4.5%- שבועי); דאו ג'ונס -0.3% ל-52,002.41 אך סגר את השבוע בעלייה של כ-0.7% (ABC News/AP, Bloomingbit; 16/10).",
    "מניית קורוויב (CoreWeave) צנחה כ-20% על פני השבוע (כ-12% בשישי בלבד) על חששות ממימון חוב ה-AI; האג\"ח שלה לפדיון 2032 נסחר בתשואה של מעל 15%, וה-CDS החמישייתי שלה הגיע לשיא של כ-1,195 נקודות בסיס. מניות תוכנת ה-AI מחקו כ-260 מיליארד דולר משווי שוק השבוע, לפי גולדמן זאקס (Investing.com/Reuters, Bloomberg; 16/10).",
    "הנפט זינק בשישי על מתיחות איראן ורוסיה-אוקראינה: WTI +3.5% ל-101.41$ לחבית, ברנט +3.7% ל-109.86$ - לראשונה קרוב ל-110$ מאז מאי; VIX טיפס מעל 22 נקודות לראשונה בארבעה חודשים (thewallstreetrepublic.substack.com, cnttrading.substack.com; 16/10).",
    "CME FedWatch: סיכויי העלאת ריבית הפד באוקטובר (27-28/10) נסוגו לכ-15% אחרי שיו\"ר הפד וורש נמנע מאיתות בבנגקוק; מנגד נגיד הפד וולר (8/10) אמר שהוא מצפה להעלאות נוספות אם הנתונים יתאמתו - חילוקי דעות גלויים בתוך הפד (Benzinga, CNBC; 8-16/10).",
    "בישראל: בנק ישראל יכריע על הריבית ברביעי (21/10, 16:00; ריבית נוכחית 3.25%, אינפלציה 1.5%) - תשעה ימים לפני הבחירות לכנסת ה-26 (27/10); סקר i24NEWS (7/10) נתן לגוש הקואליציה 60 מנדטים, לגוש השינוי 48 ולערבים 12, בלי רוב לאף צד (funder.co.il, i24NEWS; 7-18/10)."
  ],
  snapshot: [
    { k: "S&P 500 (16/10)", v: "7,659.44", c: "-1.1%", dir: "down" },
    { k: "נאסד\"ק Composite (16/10)", v: "26,140.03", c: "-2.14%", dir: "down" },
    { k: "דאו ג'ונס (16/10)", v: "52,002.41", c: "-0.3%", dir: "down" },
    { k: "תשואה 10 שנים (16/10)", v: "כ-5.08%", c: "ללא שינוי משמעותי", dir: "flat" },
    { k: "ביטקוין (16/10)", v: "כ-$81,300", c: "יציב בטווח 80-82 אלף $", dir: "flat" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "FedWatch (16/10): החזקה ~85% · העלאה ~15%, הבאה 27-28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "מאז 1/9; הבאה 21/10 16:00", dir: "flat" }
  ],
  changes: [
    { topic: "ימים לבחירות בישראל", from: "10 ימים (16/10)", to: "9 ימים (18/10)" }
  ],
  ai: [
    { title: "קורוויב (CoreWeave) בלב סערת החוב של ה-AI: ירידה שבועית של כ-20%, האג\"ח בתשואה של מעל 15%", body: "מניית קורוויב, מספקות המחשוב הגדולות לתשתיות AI, צנחה כ-11.9% ביום שישי (16/10) והשלימה ירידה של כ-20% על פני השבוע, לפי בלומברג. האג\"ח שלה לפדיון 2032, שהונפק ביוני בתשואה של כ-9.675%, נסחר בתשואה של מעל 15% ובמחיר של כ-78 סנט לדולר (רויטרס, Investing.com), וה-CDS החמישייתי שלה הגיע לשיא של כ-1,195 נקודות בסיס. חוב החברה, כולל התחייבויות ליסינג, מוערך בכ-50-52 מיליארד דולר. גיל לוריה, אנליסט ב-D.A. Davidson עם דירוג Sell, טען שעלויות המימון של קורוויב גבוהות בהרבה מהתשואה על הנכסים; מנכ\"ל קורוויב מייקל אינטרייטור תיאר את המכירה כ\"לא רציונלית\" לאור צבר הזמנות חתום של מעל 104 מיליארד דולר. מדד השבבים הפילדלפיה ירד 3.8% בשישי - יום המסחר השלילי השמיני ברצף - ומניות תוכנת ה-AI מחקו כ-260 מיליארד דולר משווי השוק השבוע, לפי גולדמן זאקס. משמעות: קורוויב הפכה למקרה הבוחן המרכזי לשאלה אם מימון בניית תשתיות ה-AI יחזיק מעמד, בעוד הביקוש עצמו נותר חזק.", tickers: ["NVDA"], source: { name: "Bloomberg / Reuters via Investing.com / CNBC", url: "https://www.investing.com/news/stock-market-news/coreweave-bond-rout-tests-markets-math-on-ai-buildout-4953576", date: "16/10" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (27-28/10)", cut: 0, hold: 85, hike: 15 },
    polymarket: null,
    items: [
      { title: "סיכויי העלאת הריבית נסוגו לכ-15% אחרי שוורש נמנע מאיתות; הפד נכנס להחלטה בלי קו ברור", body: "לאחר שנתוני ה-CPI וה-PPI החמים (14-15/10) הקפיצו זמנית את סיכויי העלאת הריבית באוקטובר (CME FedWatch) לכ-41.5%-50%, יו\"ר הפד קווין וורש נמנע ביום חמישי-שישי (15-16/10, כנס ה-IMF/הבנק העולמי בבנגקוק) מלאותת על כיוון החלטת 27-28/10, ו-CME FedWatch תיעד נסיגה בסיכויי ההעלאה לכ-15% ביום שישי (16/10), מכ-27% יום קודם. נגיד הפד כריסטופר וולר אמר כשבוע קודם (8/10, פורום כלכלי באיסטנבול) שהוא מצפה להעלאות נוספות של הריבית אם הנתונים הכלכליים יתפתחו כצפוי, אך השאיר אפשרות לעצירה בהחלטה הקרובה. משמעות: הפד נכנס להחלטת 27-28/10 בלי איתות ברור, עם חילוקי דעות גלויים בין הבכירים בעצמו, מה שמשמר תנודתיות חריגה בשווקים עד להחלטה.", source: { name: "Benzinga / CNBC / dailysabah.com", url: "https://www.benzinga.com/markets/prediction-markets/26/10/62408879/fed-rate-hike-odds-warsh-ai", date: "8-16/10" } },
      { title: "הנפט זינק מעל 100$ לחבית על מתיחות איראן ורוסיה-אוקראינה; VIX מעל 22 לראשונה בארבעה חודשים", body: "מחירי הנפט זינקו ביום שישי (16/10) על רקע החמרת המתיחות הגאופוליטיות: חוזי WTI עלו 3.5% ל-101.41$ לחבית, וחוזי ברנט עלו 3.7% ל-109.86$ - לראשונה קרוב לרמה של 110$ לחבית מאז מאי. התייקרות האנרגיה, בשילוב עם נתוני האינפלציה החמים מהשבוע, הזינה חששות מלחץ אינפלציוני נוסף, ומדד הפחד VIX טיפס מעל 22 נקודות - לראשונה בארבעה חודשים. משמעות: שילוב של נפט יקר ואינפלציה דביקה מקשה עוד יותר על הפד לאותת על כיוון ברור לפני ההחלטה הקרובה.", source: { name: "thewallstreetrepublic.substack.com / cnttrading.substack.com", url: "https://thewallstreetrepublic.substack.com/p/coreweave-sinks-1191-as-ai-financing", date: "16/10" } }
    ]
  },
  voices: [
    { name: "קווין וורש", role: "יו\"ר הפדרל ריזרב", stance: "ניטרלי", he: "אני לא קובע מראש החלטות ריבית; זה יהיה מוקדם מדי להצביע מראש על הפעולות שבהן ננקוט בפגישות שנותרו השנה.", en: "I don't prejudge interest-rate decisions; it would be premature to indicate in advance what actions we might take at the remaining meetings this year.", date: "16/10", url: "https://www.cnbc.com/2026/10/16/feds-warsh-says-ai-development-path-will-be-very-bumpy-.html", note: "בכנס ה-IMF/הבנק העולמי בבנגקוק." },
    { name: "כריסטופר וולר", role: "נגיד בפדרל ריזרב", stance: "ניצי", he: "אם הנתונים הכלכליים יתפתחו כצפוי, אני מצפה להעלאות נוספות שיביאו את האינפלציה בחזרה ליעד של 2% שלנו בצורה מהירה יותר.", en: "If the economic data continue to come in as expected, I anticipate additional hikes to support a timelier return of inflation to our 2% goal.", date: "8/10", url: "https://www.dailysabah.com/business/finance/more-hikes-needed-to-lower-inflation-to-2-target-feds-waller/amp", note: "בכנס הפורום הכלכלי של איסטנבול." },
    { name: "רי דליו", role: "מייסד בריג'ווטר אסושייטס", stance: "דובי", he: "אנחנו בחלק של המחזור שהוא לפני הנקודה הזו אבל מתקרבים אליה. אני חושב שאנחנו קרובים לכך.", en: "We're in the part of the cycle that is before that but approaching that. I think we're close to that.", date: "6-7/10", url: "https://stocktwits.com/news-articles/markets/equity/ray-dalio-reportedly-warns-ai-bubble-is-close-to-bursting-as-rising-rates-test-debt-fueled-spending/cZDvIxzRBmQ", note: "בכנס Forbes Global CEO בסינגפור; תיאר את בועת ה-AI כ\"בועה קלאסית\"." },
    { name: "דן אייבס", role: "אנליסט בכיר, Wedbush", stance: "שורי", he: "זו הייתה הזדמנות קנייה לרכוש את המניות האלה שנפלו.", en: "It's been a buying opportunity to buy these stocks that have sold off.", date: "15/10", url: "https://www.tokenpost.com/news/investing/33565", note: "לגבי המכירה במניות ה-AI והשבבים, כולל נבידיה שנסחרת כ-10.5% מתחת לשיא של 6/10." },
    { name: "קאת'י ווד", role: "מנכ\"לית ARK Invest", stance: "שורי", he: "העובדה שאנשים מפוחדים אומרת שאנחנו לא בבועה.", en: "The fact people are afraid means we are not in a bubble.", date: "16/10", url: "https://www.briefs.co/news/cathie-wood-backs-coreweave-as-ai-jitters-hit-bonds-and-stoc/", note: "ARK רכשה מניות קורוויב בשווי כ-14.7 מיליון דולר במהלך המכירה החדה השבוע." },
    { name: "ג'יימי דיימון", role: "מנכ\"ל JPMorgan Chase", stance: "זהיר", he: "גורמים כמו גירעונות פיסקליים גדולים, אינפלציה דביקה, מחירי נכסים גבוהים, ריביות עולות ותנאים גאופוליטיים ממשיכים לזוז מתחת לפני השטח.", en: "Forces like large fiscal deficits, sticky inflation, elevated asset prices, rising interest rates and geopolitical conditions continue to shift under the surface.", date: "13/10", url: "https://247wallst.com/investing/2026/10/14/jamie-dimon-warns-of-forces-that-continue-to-shift-under-the-surface-as-half-of-russell-3000-stocks-sit-in-a-bear-market-with-the-sp-500-near-records/", note: "בשיחת הדו\"חות של JPMorgan לרבעון השלישי." }
  ],
  israel: [
    { title: "ת\"א 35 נסגר ב-4,156.68 נק' (+1.6% שבועי); בנק ישראל יכריע על הריבית ב-21/10, הבחירות ב-27/10 - תשעה ימים מהיום", body: "מדד ת\"א 35 נסגר ביום חמישי (15/10, המסחר האחרון לפני סוף השבוע) על 4,156.68 נקודות - עלייה של כ-1.63% מהשבוע הקודם. בנק ישראל יפרסם את החלטת הריבית הבאה ברביעי, 21/10, בשעה 16:00; הריבית הנוכחית עומדת על 3.25% מאז 1/9, והאינפלציה ב-12 החודשים האחרונים עומדת על 1.5% - מתחת לאמצע יעד האינפלציה. הבחירות לכנסת ה-26 יתקיימו ב-27/10 - הראשונות במועדן החוקי מזה 38 שנה - תשעה ימים מהיום. סקר i24NEWS/Direct Polls שנערך ב-7/10 נתן לגוש הקואליציה 60 מנדטים, לגוש השינוי 48 ולמפלגות הערביות 12 - בלי שאף גוש חוצה את רף 61 המנדטים. משמעות: המירוץ נותר צמוד תשעה ימים לפני הבחירות, על רקע החלטת ריבית שתתפרסם ממש לפניהן.", source: { name: "funder.co.il / i24NEWS", url: "https://www.i24news.tv/he/news/israel-elections-2026/polls/artc-e0e93683", date: "7-18/10" } }
  ],
  sources: [
    { name: "ABC News/AP: סגירת וול סטריט, 16/10", url: "https://abcnews.com/Business/wireStory/major-us-stock-indexes-fared-friday-10162026-137331951" },
    { name: "Bloomingbit: סגירת וול סטריט 16/10", url: "https://en.bloomingbit.io/feed/news/122309" },
    { name: "Investing.com (Reuters): מבחן האג\"ח של קורוויב, 16/10", url: "https://www.investing.com/news/stock-market-news/coreweave-bond-rout-tests-markets-math-on-ai-buildout-4953576" },
    { name: "thewallstreetrepublic.substack.com: נתוני שוק 16/10", url: "https://thewallstreetrepublic.substack.com/p/coreweave-sinks-1191-as-ai-financing" },
    { name: "TokenPost: דן אייבס על מניות ה-AI, 15-16/10", url: "https://www.tokenpost.com/news/investing/33565" },
    { name: "briefs.co: קאת'י ווד וקורוויב, 16/10", url: "https://www.briefs.co/news/cathie-wood-backs-coreweave-as-ai-jitters-hit-bonds-and-stoc/" },
    { name: "Benzinga: סיכויי העלאת ריבית אחרי וורש, 16/10", url: "https://www.benzinga.com/markets/prediction-markets/26/10/62408879/fed-rate-hike-odds-warsh-ai" },
    { name: "dailysabah.com: נגיד הפד וולר על העלאות נוספות, 8/10", url: "https://www.dailysabah.com/business/finance/more-hikes-needed-to-lower-inflation-to-2-target-feds-waller/amp" },
    { name: "247wallst: ג'יימי דיימון על הכוחות מתחת לפני השטח, 14/10", url: "https://247wallst.com/investing/2026/10/14/jamie-dimon-warns-of-forces-that-continue-to-shift-under-the-surface-as-half-of-russell-3000-stocks-sit-in-a-bear-market-with-the-sp-500-near-records/" },
    { name: "funder.co.il: החלטת ריבית בנק ישראל 21/10", url: "https://funder.co.il/article/211282" },
    { name: "i24NEWS: סקר בחירות 2026, 7/10", url: "https://www.i24news.tv/he/news/israel-elections-2026/polls/artc-e0e93683" },
    { name: "Netflix IR / insiderfinance.io: תאריך דו\"ח רבעון שלישי", url: "https://www.insiderfinance.io/news/netflix-q3-2026-earnings-oct-20" },
    { name: "Tesla 8-K (SEC): תאריך דו\"ח רבעון שלישי 2026", url: "https://www.sec.gov/Archives/edgar/data/0001318605/000162828026064366/exhibit991111111.htm" }
  ]
};
