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
  updatedAt: "2026-10-02T08:22:00+03:00",
  edition: "יומי",
  headline: "ארה\"ב שולחת נושאת מטוסים שלישית לאיראן, הנפט קופץ ותשואת 10 שנים נוגעת בשיא 24 שנה — וול סטריט מתאוששת. היום: <em>דו\"ח התעסוקה</em> הקריטי של ספטמבר.",
  thesis: "דיווח שארה\"ב שולחת נושאת מטוסים שלישית (USS Theodore Roosevelt) ועד 10 אלף חיילים נוספים למזרח התיכון שלח את הנפט מעלה בחדות ברביעי, על רקע מלחמת ארה\"ב-ישראל-איראן הנמשכת כבר כשבעה חודשים ומיצרי הורמוז החסום. תשואת ה-10 שנים נגעה ב-5.342% תוך-יומי — השיא מאז 2002 — לפני שנסוגה ל-5.24% בסיום, מה שסייע למניות להתאושש מירידות מוקדמות. היום שעון ישראל: דו\"ח התעסוקה של ספטמבר ב-15:30, המכריע לקראת החלטת הריבית של הפד ב-28/10. שוק ת\"א סגור היום בשל ערב שמחת תורה.",
  bottomLine: [
    "וול סטריט התאוששה מירידות מוקדמות ברביעי: S&P 500 עלה 0.19% ל-7,666.45, נאסד\"ק עלה 0.04% ל-26,871.60 ודאו ג'ונס עלה 0.04% ל-50,926.56, אחרי שתשואת ה-10 שנים נגעה ב-5.342% תוך-יומי (שיא מאז 2002, מעל שיא 2007) ואז נסוגה ל-5.24% (CNBC/Yahoo Finance, Fool.com; 1/10).",
    "הנפט זינק אחרי דיווח שה-וול סטריט ג'ורנל פרסם כי ארה\"ב שולחת נושאת מטוסים שלישית, ה-USS Theodore Roosevelt, ועד 10 אלף חיילים נוספים למזרח התיכון (הגעה צפויה עד סוף נובמבר): ברנט קפץ 4.4% ל-$102.31, ו-WTI עלה 2.7% ל-$92.87 לחבית — על רקע מלחמת ארה\"ב-ישראל-איראן בת כשבעה חודשים והפרעות מתמשכות במיצרי הורמוז (CNBC, FXStreet; 1-2/10).",
    "ISM תעשייה ספטמבר ירד קלות ל-54.5 (מתחזית כ-55 ומ-54.6 באוגוסט) — התרחבות תשיעית ברציפות, עם לחצי תמחור שהמשיבים ייחסו בין היתר למכסים ולמלחמה באיראן. גולדמן זאקס דחה את תחזית העלאת הריבית השנייה שלו מאוקטובר לדצמבר בעקבות ה-PCE הקריר, אך CME FedWatch ו-Polymarket מציגים תמונה סותרת וקפיצות גדולות משעה לשעה בסיכויי אוקטובר (ISM, Investing.com, Babypips; 1/10).",
    "עונת הדו\"חות נמשכת: נייקי עקפה את תחזית הרווח למניה ($0.48 מול $0.43) אך החטיאה בהכנסות ($11.21 מיליארד מול $11.32 מיליארד) כשהמכירות בסין צנחו 26%; החברה מתכננת תוכנית התייעלות Pace שתחסוך כ-$2.5 מיליארד עד 2029-2030, עם צפי לירידת הכנסות חד-ספרתית גבוהה ב-2027. אקצ'נצ'ר דיווחה EPS של $3.18 מול תחזית $3.19 — כמעט בדיוק לפי הצפי (CNBC/MarketBeat; 1/10).",
    "שוק ת\"א סגור היום (ערב שמחת תורה); בסשן האחרון, ביום חמישי, ת\"א 35 עלה 0.34% ל-4,218.25, בהובלת נייס שזינקה 6.41%. בנק ישראל השאיר את הריבית על 3.25%, ההחלטה הבאה ב-21/10. השקל נסחר סביב 3.07-3.09 לדולר (Investing.com, Bizportal; 1-2/10)."
  ],
  snapshot: [
    { k: "S&P 500", v: "7,666.45", c: "+0.19%", dir: "up" },
    { k: "נאסד\"ק Composite", v: "26,871.60", c: "+0.04%", dir: "up" },
    { k: "דאו ג'ונס", v: "50,926.56", c: "+0.04%", dir: "up" },
    { k: "תשואה 10 שנים", v: "5.24%", c: "שיא תוך-יומי 5.342%", dir: "up" },
    { k: "תשואה 2 שנים", v: "4.80%", c: "−10bp", dir: "down" },
    { k: "תשואה 30 שנה", v: "5.61%", c: "−2bp", dir: "down" },
    { k: "מדד הדולר DXY", v: "101.64", c: "+0.17%", dir: "up" },
    { k: "נפט WTI", v: "$92.87", c: "+2.7%", dir: "up" },
    { k: "ברנט", v: "$102.31", c: "+4.4%", dir: "up" },
    { k: "זהב", v: "כ-$4,167", c: "+0.26%", dir: "up" },
    { k: "ביטקוין", v: "כ-$84,500", c: "תנודתי, $83.5-85.4 אלף", dir: "up" },
    { k: "ת\"א 35 (1/10, שוק סגור היום)", v: "4,218.25", c: "+0.34%", dir: "up" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "הועלתה 16/9", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "תשואת 10 שנים", from: "5.29% (30/9)", to: "5.24% בסיום, שיא תוך-יומי 5.342% (1/10)" },
    { topic: "S&P 500", from: "7,651.54, −0.25% (30/9)", to: "7,666.45, +0.19% (1/10)" },
    { topic: "נפט WTI", from: "$90.06 (30/9)", to: "$92.87, +2.7% (1/10)" },
    { topic: "ברנט", from: "$97.09 (30/9)", to: "$102.31, +4.4% (1/10)" },
    { topic: "ת\"א 35", from: "4,203.98, −0.43% (30/9)", to: "4,218.25, +0.34% (1/10); שוק סגור ב-2/10" }
  ],
  ai: [
    { title: "אנתרופיק דוחה הנפקה אפשרית לאמצע אוקטובר-נובמבר, שווי מוערך כ-$2 טריליון", body: "לפי דיווחים, אנתרופיק דוחה את תוכנית ההנפקה שלה מאוקטובר לאמצע החודש ואף לנובמבר, כדי להציג קודם תוצאות רבעון שלישי חזקות. גולדמן זאקס ומורגן סטנלי מובילים את ההנפקה, שצפויה לגייס לפחות $60 מיליארד בשווי של כ-$2 טריליון. עלויות תשתית גואות — כולל כ-$1.25 מיליארד בחודש על עסקת SpaceX — וסיכוני אבטחה שטרם נפתרו מסבכים את התהליך. OpenAI כבר דחתה את ההנפקה שלה ל-2027.", tickers: [], source: { name: "TechRepublic", url: "https://www.techrepublic.com/article/news-anthropic-ipo-mid-october-2-trillion-valuation/", date: "1-2/10" } },
    { title: "אנבידיה משיקה פלטפורמת אבטחה פתוחה לסוכני AI, עם 100+ שותפים כולל אנתרופיק ומיקרוסופט", body: "אנבידיה הכריזה על Open Agent Safety Platform — מערכת קוד פתוח לממשל ובקרה על סוכני AI, הכוללת את OpenShell לאבטחת ריצה בסביבות בדיקה ואת Sentry, שומר-סף שרץ על שבבי BlueField-4 ויכול לבודד סוכן חורג תוך מילישניות. מעל 100 ארגונים הצטרפו, בהם אנתרופיק, מיקרוסופט, Palantir, SpaceX ו-JPMorgan.", tickers: ["NVDA"], source: { name: "NVIDIA Newsroom / CyberScoop", url: "https://nvidianews.nvidia.com/news/open-agent-safety-platform", date: "28-29/9" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (28/10)", cut: 0, hold: 61.8, hike: 38.2 },
    polymarket: null,
    items: [
      { title: "ISM תעשייה: 54.5 בספטמבר, התרחבות תשיעית ברציפות — ולחצי תמחור גוברים", body: "המדד ירד קלות מ-54.6 באוגוסט ומתחת לתחזית כ-55. הזמנות חדשות ותעסוקה עלו בקצב מהיר יותר, אך המשיבים ציינו תנודתיות תמחור (46% מהתגובות), מכסים (34%), מלחמת איראן (30%) וזמני אספקה מתארכים (21%). משמעות: לחצי העלויות שמייצרת המלחמה באיראן והמכסים עשויים להקשות על הפד להוריד ריבית, גם אם הצמיחה בייצור נמשכת.", source: { name: "ISM / Trading Economics", url: "https://tradingeconomics.com/united-states/business-confidence/news/588826", date: "1/10" } },
      { title: "גולדמן זאקס: דחיית העלאת הריבית השנייה מאוקטובר לדצמבר", body: "גולדמן זאקס עדכן את תחזיתו ודוחה את ההעלאה השנייה הצפויה לדצמבר, בעקבות ה-PCE הליבה הקריר באוגוסט (3.0% מול תחזית 3.3%) ודברי נשיא הפד של ניו יורק וויליאמס. הבנק מצפה לליבת PCE של כ-3.0% (רבעון/רבעון) עד סוף השנה, מתחת לתחזית החציונית של ה-FOMC (3.4%), ורואה סיכוי סביר שהוועדה תחליט בסופו של דבר שאין צורך בהעלאות נוספות.", source: { name: "Investing.com / crypto.news", url: "https://www.investing.com/news/analyst-ratings/goldman-sachs-pushes-back-fed-rate-hike-forecast-to-december-93CH-4925693", date: "30/9" } },
      { title: "סיכויי אוקטובר ב-CME FedWatch ו-Polymarket סותרים זה את זה", body: "לאחר נתון ה-PCE הקריר ב-30/9 צנחו סיכויי ההעלאה ב-CME FedWatch עד כ-35%, אך תיקון כלפי מעלה בתמ\"ג הרבעון השני (מ-1.5% ל-2.2%) החזיר אותם לכ-38.2% (מול 61.8% ל\"ללא שינוי\") בסיום יום המסחר. במקביל, בפולימרקט נרשמו תנודות קיצוניות — בין כ-23% לכ-65% לסיכויי העלאה — תוך יממה אחת. משמעות: בשל הפיזור הרחב בין המקורות, אי אפשר לקבוע מספר אמין יחיד לסיכויי אוקטובר; דו\"ח התעסוקה היום צפוי להכריע.", source: { name: "Babypips, Phemex, cryptobriefing", url: "https://babypips.com/analysis/headline-mixed-us-data-october-rate-hike-odds-2026-10-01", date: "1/10" } },
      { title: "היום: דו\"ח התעסוקה הקריטי של ספטמבר, 15:30 שעון ישראל", body: "תחזית לתוספת של כ-89-93 אלף משרות מול 162 אלף באוגוסט, ואבטלה שצפויה להישאר 4.1%. הנתון, יחד עם ISM התעשייה ותשואות האג\"ח שזינקו, יהיה המכריע לקראת החלטת הריבית של הפד ב-28/10.", source: { name: "Newsquawk, Continuum Economics", url: "https://www.newsquawk.com/headlines/preview-us-september-jobs-data-is-due-on-2nd-october-2026-at-1330bst0830edt", date: "1-2/10" } }
    ]
  },
  voices: [
    { name: "קווין וורש", role: "יו\"ר הפד (מכהן מאז 22/5/26)", stance: "ניצי", he: "על אף שנתוני ה-PCE וה-CPI של הקיץ היו טובים מהצפוי, הם אינם מלמדים אותי שהמגמות הבסיסיות השתפרו באופן משמעותי.", en: "While this summer's PCE and CPI readings were better than expected, they do not tell me that underlying trends have meaningfully improved.", date: "28/8", url: "https://www.federalreserve.gov/newsevents/speech/warsh20260828a.htm", note: "בנאום ג'קסון הול; וורש החליף את פאוול כיו\"ר הפד במאי 2026." },
    { name: "ניל קשקארי", role: "נשיא הפד של מיניאפוליס", stance: "ניצי", he: "האינפלציה עדיין גבוהה מדי.", en: "Inflation is still too high.", date: "30/9", url: "https://www.cnbc.com/2026/09/30/watch-minneapolis-fed-president-neel-kashkari.html", note: "הוסיף ששוק העבודה \"טוב למדי\" אך לא \"מצוין\"." },
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "בפעולת המדיניות שנקטנו בישיבת ספטמבר, אין צורך במיידיות. אם הכלכלה תתפתח בהתאם לתחזית שלי, ייתכן שתיקון נוסף כלפי מעלה בטווח הריבית יתאים בהמשך השנה.", en: "With the policy action we took at our September meeting, there is no need for urgency. If the economy evolves in a manner broadly consistent with my forecast, one further upward adjustment of the federal funds target range may be appropriate late this year.", date: "29/9", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "מוחמד אל-עריאן", role: "אליאנץ, יועץ כלכלי ראשי", stance: "זהיר", he: "המוטיב הדומיננטי נשאר זהה לעת עתה: לחץ כלפי מעלה על תשואות אג\"ח ממשלתיות.", en: "The dominant theme remains the same for now: upward pressure on government bond yields.", date: "1/10", url: "https://gokhshtein.com/news/2026-10-01-mohamed-el-erian-says-upward-pressure-dominates-bond-yields", note: "ציין שתשואת ה-30 שנה הבריטית הגיעה לרמה שלא נראתה מאז 1998, ותשואות ה-10 וה-30 שנה בארה\"ב נסחרות סביב רמות 2002." },
    { name: "מייק ווילסון", role: "מורגן סטנלי, אסטרטג ראשי למניות ארה\"ב", stance: "זהיר", he: "אני חושב שבתוך 30 הימים הקרובים, אם הנפט יגיע ל-120, 130, 140 דולר, זה יהיה ניקוז נזילות.", en: "I do think in the next 30 days, if oil goes to $120, $130, $140, that's a drain on liquidity.", date: "12/9", url: "https://dailyhodl.com/2026/09/12/morgan-stanley-strategist-mike-wilson-warning-of-sp-500-correction-within-30-days/", note: "עדיין שורי לטווח הארוך, אך מזהיר מתיקון אפשרי אם הנפט ימשיך לטפס." },
    { name: "ג'יימי דיימון", role: "JPMorgan, יו\"ר ומנכ\"ל", stance: "זהיר", he: "אני חושב שהסבירות שמשהו רע יקרה גבוהה יותר ממה שלדעתי מגולם בשוק.", en: "I think the probability of something bad happening is higher than I think it's embedded in the market.", date: "28/9", url: "https://pymnts.com/economy/2026/jamie-dimon-urges-economic-reforms-prevent-decline-western-democracies", note: "ממאמר דעה ב-WSJ שבו קרא לרפורמות בארה\"ב ובאירופה נוכח המלחמות באיראן ובאוקראינה." },
    { name: "ג'פרי גאנדלך", role: "DoubleLine, מייסד ומנכ\"ל", stance: "זהיר", he: "אם הפד יעלה ריבית זה יחמיר את בעיית הוצאות הריבית (מכיוון שחלק גדול מהחוב הוא לטווח קצר). אם הפד יוריד ריבית זה יחמיר את בעיית האינפלציה.", en: "If the Fed hikes it will worsen the interest expense problem (since so much borrowing is at the short end). If the Fed cuts it will worsen the inflation problem.", date: "20/9", url: "https://www.gurufocus.com/news/9087290/jeffrey-gundlach-warns-of-debt-crisis-amid-potential-us-recession" },
    { name: "אד יארדני", role: "Yardeni Research, נשיא", stance: "שורי", he: "כש[ספטמבר] קשה, הוא נוטה ליצור הזדמנויות קנייה לקראת עליית סוף שנה שלעיתים קרובות מתחילה באוקטובר.", en: "When September proves difficult, it tends to create buying opportunities for a year-end rally that often starts in October.", date: "16/9", url: "https://www.advisorperspectives.com/articles/2026/09/16/stocks-bull-yardeni-cuts-s-p-500-7-900-downturn-risks", note: "למרות הורדת יעד ה-S&P 500 לסוף השנה ל-7,900 מ-8,400." }
  ],
  israel: [
    { title: "שוק ת\"א סגור היום (ערב שמחת תורה); בסשן האחרון ת\"א 35 עלה 0.34% ל-4,218.25", body: "ביום חמישי עלה ת\"א 35 ב-14.27 נקודות (0.34%) ל-4,218.25, בהובלת מגזרי הבנקים, האנרגיה והטכנולוגיה; נייס הייתה המניה הבולטת ביותר עם זינוק של 6.41%. יום המסחר הבא בבורסה צפוי ביום שני, לאחר סוף שבוע החג.", source: { name: "Investing.com India", url: "https://in.investing.com/news/stock-market-news/israel-shares-higher-at-close-of-trade-ta-35-up-034-5615252", date: "1/10" } },
    { title: "בנק ישראל נותר על 3.25%; מניות הביטחון ממשיכות להוביל על רקע המלחמה באיראן", body: "הריבית נותרה ללא שינוי מאז הורדתה ל-3.25% ב-1/9, וההחלטה הבאה ב-21/10. ברקע, מלחמת ארה\"ב-ישראל-איראן נמשכת כשבעה חודשים; מניית אלביט מערכות זינקה כ-60% מתחילת 2026, ובנק אוף אמריקה העלה לאחרונה את מחיר היעד שלה. משמעות: הביקוש הביטחוני הגלובלי ממשיך לתמוך בחברות הישראליות, גם כשהמלחמה עצמה מכבידה על שוק הנפט והסחר באזור.", source: { name: "CNBC (BofA על אלביט) / Bank of Israel", url: "https://www.cnbc.com/2026/04/10/buy-this-defense-stock-with-battlefield-tested-tech-bofa-says-.html", date: "1/9-10/4" } }
  ],
  sources: [
    { name: "Fool.com: וול סטריט 1/10", url: "https://www.fool.com/coverage/stock-market-today/2026/10/01/stock-market-midday-oct-1-stocks-edge-lower-as-treasury-yields-surge-to-24-year-high/" },
    { name: "FXStreet: נושאת מטוסים שלישית לאיראן", url: "https://www.fxstreet.com/news/us-may-send-third-aircraft-carrier-and-10-000-troops-to-middle-east-202610020042" },
    { name: "FXStreet: WTI סביב $92", url: "https://www.fxstreet.com/news/wti-holds-steady-near-9200-as-us-weighs-sending-more-troops-to-middle-east-202610020121" },
    { name: "ISM: מדד התעשייה ספטמבר", url: "https://tradingeconomics.com/united-states/business-confidence/news/588826" },
    { name: "PRNewswire: דו\"ח ISM תעשייה ספטמבר", url: "https://www.prnewswire.com/news-releases/manufacturing-pmi-at-54-5-september-2026-ism-manufacturing-pmi-report-302894520.html" },
    { name: "Investing.com: גולדמן זאקס דוחה העלאה לדצמבר", url: "https://www.investing.com/news/analyst-ratings/goldman-sachs-pushes-back-fed-rate-hike-forecast-to-december-93CH-4925693" },
    { name: "Babypips: סיכויי ריבית אוקטובר", url: "https://babypips.com/analysis/headline-mixed-us-data-october-rate-hike-odds-2026-10-01" },
    { name: "Newsquawk: תצוגה מקדימה לדו\"ח התעסוקה", url: "https://www.newsquawk.com/headlines/preview-us-september-jobs-data-is-due-on-2nd-october-2026-at-1330bst0830edt" },
    { name: "Federal Reserve: נאום וורש בג'קסון הול", url: "https://www.federalreserve.gov/newsevents/speech/warsh20260828a.htm" },
    { name: "NPR: אישור קווין וורש כיו\"ר הפד", url: "https://www.npr.org/2026/05/13/nx-s1-5816235/kevin-warsh-federal-reserve-chair-jerome-powell" },
    { name: "CNBC: קשקארי על האינפלציה", url: "https://www.cnbc.com/2026/09/30/watch-minneapolis-fed-president-neel-kashkari.html" },
    { name: "US News (Reuters): נאום וויליאמס", url: "https://money.usnews.com/investing/news/articles/2026-09-29/feds-williams-sees-no-urgency-for-next-fed-rate-hike" },
    { name: "Gokhshtein: אל-עריאן על תשואות האג\"ח", url: "https://gokhshtein.com/news/2026-10-01-mohamed-el-erian-says-upward-pressure-dominates-bond-yields" },
    { name: "Daily Hodl: מייק ווילסון על נזילות ונפט", url: "https://dailyhodl.com/2026/09/12/morgan-stanley-strategist-mike-wilson-warning-of-sp-500-correction-within-30-days/" },
    { name: "PYMNTS: דיימון, מאמר הדעה ב-WSJ", url: "https://pymnts.com/economy/2026/jamie-dimon-urges-economic-reforms-prevent-decline-western-democracies" },
    { name: "GuruFocus: גאנדלך על החוב", url: "https://www.gurufocus.com/news/9087290/jeffrey-gundlach-warns-of-debt-crisis-amid-potential-us-recession" },
    { name: "Advisor Perspectives: יארדני מוריד יעד", url: "https://www.advisorperspectives.com/articles/2026/09/16/stocks-bull-yardeni-cuts-s-p-500-7-900-downturn-risks" },
    { name: "Nike Q1 FY27 (CNBC)", url: "https://www.cnbc.com/2026/10/01/nike-nke-q1-2027-earnings.html" },
    { name: "TechRepublic: הנפקת אנתרופיק", url: "https://www.techrepublic.com/article/news-anthropic-ipo-mid-october-2-trillion-valuation/" },
    { name: "NVIDIA Newsroom: Open Agent Safety Platform", url: "https://nvidianews.nvidia.com/news/open-agent-safety-platform" },
    { name: "Investing.com India: ת\"א 35 1/10", url: "https://in.investing.com/news/stock-market-news/israel-shares-higher-at-close-of-trade-ta-35-up-034-5615252" },
    { name: "CNBC: אלביט מערכות (BofA)", url: "https://www.cnbc.com/2026/04/10/buy-this-defense-stock-with-battlefield-tested-tech-bofa-says-.html" },
    { name: "Foreign Policy: הורמוז ואיראן", url: "https://foreignpolicy.com/2026/10/01/oil-strait-hormuz-iran-trump-war-gulf-gas-diesel-prices/" }
  ]
};
