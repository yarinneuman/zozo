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
  updatedAt: "2026-10-06T08:45:00+03:00",
  edition: "יומי",
  headline: "נאסד\"ק ואנבידיה סגרו אתמול בשיא, אבל תשואת ה-10 שנים נגעה בשיא מאז 2002; וושינגטון וטהרן <em>נתקעות על סדר הצעדים</em> בחודש השמיני למלחמה באיראן",
  thesis: "וול סטריט נסגרה אתמול (5/10) בעליות: הנאסד\"ק ואנבידיה קבעו שיאי כל הזמנים, אבל תשואת האג\"ח ל-10 שנים זינקה לשיא מאז 2002 (5.34%) — תזכורת שהרקע המאקרו עדיין רגיש. בזירת הפד, שוק החזאים (CME FedWatch) ממשיך להצמיד משקל גבוה להחזקת הריבית במפגש 27-28/10 (כ-82%) מול כ-17-18% סיכוי להעלאה נוספת, אך קולות ניציים כמו מישל בר וג'ון וויליאמס ממשיכים להזהיר שתיקון נוסף כלפי מעלה עדיין אפשרי השנה. במזרח התיכון, המלחמה בין ישראל-ארה\"ב לאיראן נכנסת לחודשה השמיני: איראן הציעה לפתוח את מיצרי הורמוז בתוך שבוע בתמורה להסרת המצור האמריקאי, אך הצדדים חלוקים על סדר הביצוע. בזירת ה-AI, OpenAI מתקרבת להכנסה שנתית מחושבת (annualized) של כ-70 מיליארד דולר ומגייסת קרנות ענק מאבו דאבי ובלאקרוק לסבב של 30 מיליארד דולר, בעוד מייקל בורי מחדד את האזהרה מפיצוץ מוקדם של בועת ה-AI.",
  bottomLine: [
    "וול סטריט נסגרה אתמול (5/10) בעליות מעורבות: S&P 500 עלה 0.66% ל-7,773.95, נאסד\"ק קומפוזיט טיפס 1.05% לשיא כל הזמנים של 27,477.31 ודאו ג'ונס הוסיף 0.18% (90.94 נק') ל-51,267.90. אנבידיה נסגרה בשיא כל הזמנים של $238.90 (+2.12%). במקביל, תשואת האג\"ח ל-10 שנים זינקה 6.8 נ\"ב ל-5.34% — השיא הגבוה ביותר מאז 2002, ונפט WTI נחלש לכ-$89.8 (-1.4%) (Yahoo Finance, CNBC; 5/10).",
    "סיכויי הפד להחליט על החזקת הריבית במפגש 27-28/10 עומדים על כ-82% לפי CME FedWatch, לעומת כ-17-18% סיכוי להעלאה נוספת של 0.25% ו-0% לסיכוי להורדה (5/10). בשוקי החיזוי, Polymarket ו-Kalshi נתנו (2/10) סיכוי ממוצע של כ-15.5-16.5% להעלאה. חברי הפד נשמעים ניציים: מישל בר אמר ש\"התאמות מדיניות נוספות ככל הנראה יידרשו כדי להבטיח שהאינפלציה תרד ליעד בזמן\" (23/9), וג'ון וויליאמס מנשיא הפד של ניו יורק אמר ש\"אין צורך במיידיות, ויש לנו זמן לאסוף מידע נוסף\" אך ציין שתיקון נוסף כלפי מעלה עדיין סביר השנה (24/9) (CNBC).",
    "המלחמה בין ישראל-ארה\"ב לאיראן נכנסת לחודשה השמיני: איראן, בתיווך קטארי, הציעה לפתוח מחדש את מיצרי הורמוז בתוך שבעה ימים בתמורה להסרת המצור האמריקאי על נמלי איראן, אך הצדדים מסכימים על עיקרי הצעדים ועדיין חלוקים על סדר הביצוע. שר ההגנה האמריקאי פיט הגסת' אמר שהמצור על המיצרים \"בלתי ניתן לפריצה\" (Times of Israel; 4/10).",
    "היום (6/10): מאזן הסחר האמריקאי לאוגוסט. בהמשך השבוע: פרוטוקול ה-FOMC ממפגש 15-16/9 (רביעי, 21:00), דו\"ח פפסיקו לפני הפתיחה (חמישי, תחזית EPS כ-$2.29 והכנסות כ-$24.9 מיליארד) ותביעות אבטלה שבועיות (חמישי), דו\"ח דלתא איירליינס לפני הפתיחה (שישי, תחזית EPS כ-$1.96) וסקר אמון הצרכנים של מישיגן (שישי) (Newsquawk, Yahoo Finance).",
    "בזירת ה-AI: OpenAI, שהקפיאה תוכניות הנפקה לפי סם אלטמן כי התזמון \"לא מומלץ\", במו\"מ עם קרנות מאבו דאבי (MGX) ועם בלאקרוק לעגינת סבב גיוס של 30 מיליארד דולר לפי שווי 1.4 טריליון דולר; ההכנסה השנתית המחושבת שלה התקרבה ל-70 מיליארד דולר — צמיחה של יותר מ-70% מתחילת הרבעון השלישי (Axios/Yahoo Finance; 29/9). מייקל בורי הזהיר: \"התשתית לבנייה של AI מתמוטטת. מחירי CDS זזים, הלוואות ואג\"ח נופלות או לא נסחרות\" (CNBC; 28/9)."
  ],
  snapshot: [
    { k: "S&P 500 (5/10, שוק סגור)", v: "7,773.95", c: "+0.66%", dir: "up" },
    { k: "נאסד\"ק Composite (5/10)", v: "27,477.31", c: "+1.05% (שיא)", dir: "up" },
    { k: "דאו ג'ונס (5/10)", v: "51,267.90", c: "+0.18%", dir: "up" },
    { k: "תשואה 10 שנים (5/10)", v: "5.34%", c: "+6.8 נ\"ב (שיא מאז 2002)", dir: "up" },
    { k: "נפט WTI (5/10)", v: "כ-$89.8", c: "−1.4%", dir: "down" },
    { k: "זהב (5/10)", v: "כ-$4,167", c: "+0.1%", dir: "flat" },
    { k: "ביטקוין (6/10 בבוקר)", v: "כ-$85,600", c: "−1.2%", dir: "down" },
    { k: "שקל/דולר (6/10)", v: "כ-3.06", c: "יציב", dir: "flat" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "FedWatch: החזקה ~82% · העלאה ~18%, הבאה 27-28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הבאה 21/10", dir: "flat" }
  ],
  changes: [
    { topic: "נאסד\"ק קומפוזיט (סגירה)", from: "27,190.86 (2/10)", to: "שיא חדש של 27,477.31 (5/10)" },
    { topic: "תשואת 10 שנים", from: "5.28% (2/10)", to: "5.34% (5/10) — שיא מאז 2002" },
    { topic: "ביטקוין", from: "כ-$84,690 (5/10 בבוקר)", to: "כ-$85,600 (6/10 בבוקר), נדחה בשלישית מ-$87,000" },
    { topic: "OpenAI", from: "הכנסה שנתית מחושבת חצתה 40 מיליארד דולר (דיווח 30/9)", to: "הכנסה שנתית מחושבת מתקרבת ל-70 מיליארד דולר; קרנות מאבו דאבי ובלאקרוק מצטרפות לסבב (29/9)" }
  ],
  ai: [
    { title: "הכנסות OpenAI מתקרבות ל-70 מיליארד דולר בשנה; קרנות מאבו דאבי ובלאקרוק מצטרפות לסבב הגיוס", body: "לפי Axios, ההכנסה השנתית המחושבת (annualized) של OpenAI התקרבה לכ-70 מיליארד דולר — צמיחה של יותר מ-70% מתחילת הרבעון השלישי, לעומת קצב של כ-40 מיליארד דולר שדיווחה בלומברג רק בחודש שעבר. ההכנסות מעסקים (B2B) צמחו ביותר מ-100% מאז יולי, וההכנסות מצרכנים ברבעון השלישי בלבד עברו את כל ההכנסות מצרכנים ב-2025. במקביל, OpenAI במו\"מ עם קרנות מאבו דאבי (MGX) ועם בלאקרוק לעגינת סבב גיוס של לפחות 30 מיליארד דולר לפי שווי של כ-1.4 טריליון דולר, לאחר שדחתה תוכניות להנפקה. משמעות: הצמיחה המהירה בהכנסות מזינה את מירוץ הגיוסים הפרטי של ענקיות ה-AI, אך האקסיוס מציינת שאין שקיפות מלאה על בסיס ההוצאות של החברה.", tickers: ["MSFT", "NVDA"], source: { name: "Axios / Yahoo Finance", url: "https://www.axios.com/2026/09/29/scoop-openais-annual-recurring-revenue-nears-70b", date: "29/9" } },
    { title: "מייקל בורי מחדד אזהרה: \"התשתית לבנייה של AI מתמוטטת\"", body: "המשקיע מייקל בורי (The Big Short) כתב בסאבסטאק שלו כי \"התשתית לבנייה של AI מתמוטטת. מחירי CDS זזים, הלוואות ואג\"ח נופלות או לא נסחרות\", והשווה את המצב לתנאים שקדמו למשבר הפיננסי של 2008. לדבריו, מחקר חדש הביא אותו להקדים את התרחיש שלפיו בועת ה-AI \"עלולה להתפוצץ מוקדם יותר מהצפוי\", וכי חלק מההימורים השליליים שלו הוסטו משורטים ישירים לאופציות put ארוכות-טווח. בעבר הצביע בורי גם על פערים בין לוחות הפחת שמציגה אנבידיה למחירי מכירה בשוק יד-שנייה בפועל. משמעות: קולות ספקנים בולטים ממשיכים להתחזק מול הראלי בשבבי ה-AI, גם ביום שבו אנבידיה קבעה שיא.", tickers: ["NVDA"], source: { name: "CNBC", url: "https://www.cnbc.com/2026/09/28/michael-burry-believes-the-ai-bubble-may-burst-sooner-than-he-first-believed.html", date: "28/9" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (27-28/10)", cut: 0, hold: 82, hike: 18 },
    polymarket: null,
    items: [
      { title: "היום: מאזן הסחר האמריקאי; השבוע עמוס בפרוטוקול הפד ודו\"חות", body: "מאזן הסחר האמריקאי לאוגוסט יתפרסם היום (שלישי). בהמשך השבוע: פרוטוקול ישיבת ה-FOMC מ-15-16/9 (רביעי, 21:00), תביעות אבטלה שבועיות ומסחר סיטונאי (חמישי), וסקר האמון הצרכני המקדמי של מישיגן לאוקטובר (שישי).", source: { name: "Newsquawk", url: "https://www.newsquawk.com/headlines/newsquawk-calendar-of-key-events---october-2026", date: "2-5/10" } },
      { title: "דו\"חות השבוע: קונסטליישן בראנדס, פפסיקו ודלתא איירליינס", body: "קונסטליישן בראנדס (STZ) מדווחת היום בערב (6/10). פפסיקו (PEP) מדווחת חמישי לפני הפתיחה (8/10, קונצנזוס זאקס: EPS כ-$2.29 ללא שינוי לעומת התקופה המקבילה, הכנסות כ-$24.9 מיליארד +3.9%). דלתא איירליינס (DAL) מדווחת שישי לפני הפתיחה (9/10, קונצנזוס זאקס: EPS כ-$1.96 +14.6%, הכנסות כ-$17.70 מיליארד +6.2%).", source: { name: "Yahoo Finance / Zacks", url: "https://finance.yahoo.com/news/delta-air-lines-pepsico-earnings-132758950.html", date: "5/10" } }
    ]
  },
  voices: [
    { name: "טום לי", role: "Fundstrat, מייסד ומנהל השקעות ראשי", stance: "שורי", he: "זה יכול להיות אחד הראליים הגדולים, ולדעתי זה נמשך גם לשנה הבאה, לאחד הראליים הגדולים בחיינו.", en: "could be one of the biggest rallies, and I think it continues next year to one of the biggest rallies of our lifetime.", date: "15/9", url: "https://finance.yahoo.com/markets/crypto/articles/tom-lee-says-q4-could-163456422.html", note: "התבסס על כך שהשוק לא הגיע לשיא הרווחים ושראלי הטכנולוגיה והמגניפיסנט-7 עדיין לא תמו." },
    { name: "אד יארדני", role: "Yardeni Research, נשיא", stance: "זהיר", he: "לאור העלייה האחרונה בתשואות האג\"ח, אנחנו מורידים את הערכת מכפיל הרווח העתידי של S&P 500 לסוף השנה מ-19.8 ל-18.6, מה שמוריד את יעד סוף השנה שלנו מ-8,400 ל-7,900... הסיכונים למיתון גברו בטווח של שלושה עד שישה חודשים הקרובים.", en: "Given the recent backup in bond yields, we are lowering our estimate for the forward P/E of the S&P 500 at year-end from 19.8 to 18.6, which lowers our year-end target from 8,400 to 7,900... the risks of a downturn have increased over the next three to six months.", date: "16/9", url: "https://seekingalpha.com/news/4643370-yardeni-cuts-sp-500-target-to-7900-on-rising-yields" },
    { name: "מישל בר", role: "חבר הדירקטוריון של הפדרל ריזרב", stance: "ניצי", he: "בתסריט הבסיס שלי, התאמות מדיניות נוספות ככל הנראה יידרשו כדי להבטיח שהאינפלציה תרד ליעד בקצב מתאים.", en: "In my base case, further policy adjustments are likely to be needed to ensure inflation comes down to target in a timely fashion.", date: "23/9", url: "https://www.cnbc.com/2026/09/23/market-sees-next-fed-hike-in-october-following-barr-comments-hot-inflation.html" },
    { name: "ג'ון וויליאמס", role: "נשיא הפד של ניו יורק", stance: "ניצי", he: "אין צורך במיידיות, ויש לנו זמן לאסוף מידע נוסף.", en: "There is no need for urgency, and we have time to gather more information.", date: "24/9", url: "https://www.cnbc.com/2026/09/24/feds-williams-another-rate-hike-by-year-end.html", note: "אמר זאת לצד הערכה שתיקון נוסף אחד כלפי מעלה בטווח הריבית עדיין 'סביר' עד סוף השנה." },
    { name: "פיליפ ג'פרסון", role: "סגן יו\"ר הפדרל ריזרב", stance: "ניצי", he: "אני רואה את הסיכונים לתחזית האינפלציה שלי מוטים כלפי מעלה, בגלל התפתחויות גיאופוליטיות אחרונות וביקוש מצרפי חזק מהצפוי.", en: "I view risks to my inflation forecast as tilted to the upside due to recent geopolitical developments and stronger-than-anticipated aggregate demand.", date: "1/10", url: "https://www.federalreserve.gov/newsevents/speech/jefferson20261001a.htm" },
    { name: "מייקל בורי", role: "Scion Asset Management, משקיע (The Big Short)", stance: "דובי", he: "התשתית לבנייה של AI מתמוטטת. מחירי CDS זזים, הלוואות ואג\"ח נופלות או לא נסחרות.", en: "The infrastructure for AI buildout is crumbling. CDS prices are moving out, loans and bonds are falling or not trading.", date: "28/9", url: "https://www.cnbc.com/2026/09/28/michael-burry-believes-the-ai-bubble-may-burst-sooner-than-he-first-believed.html" }
  ],
  israel: [
    { title: "המלחמה בין ישראל-ארה\"ב לאיראן נכנסת לחודשה השמיני; משא ומתן קטארי נתקע על סדר הצעדים", body: "איראן הציעה לפתוח מחדש את מיצרי הורמוז בתוך שבעה ימים בתמורה להסרת המצור האמריקאי על נמלי איראן. לפי גורם שעודכן בשיחות, הצדדים מסכימים על עיקרי הצעדים הנדרשים אך חלוקים על סדר הביצוע. יו\"ר הפרלמנט האיראני אמר שהמיצרים לא יפתחו עד שיתמלאו שבעה תנאים שנקבעו בהסכם ביניים ביוני, ושר ההגנה האמריקאי פיט הגסת' אמר שהמצור \"בלתי ניתן לפריצה\". משמעות: כל עיכוב בפתיחת המיצרים משמר תמיכה בתנודתיות מחירי הנפט.", source: { name: "Times of Israel", url: "https://timesofisrael.com/liveblog-october-04-2026", date: "4/10" } },
    { title: "ריבית בנק ישראל נותרת 3.25%; השקל נסחר סביב 3.06 לדולר", body: "אין שינוי בריבית בנק ישראל מאז ההחלטה האחרונה; ההחלטה הבאה ב-21/10. השקל נסחר הבוקר סביב 3.06 לדולר. משמעות: פער הריביות מול ארה\"ב (3.75-4.00%, עם סיכוי של כ-18% בלבד להעלאה נוספת באוקטובר לפי CME FedWatch) תלוי בהמשך בהתפתחויות באינפלציה המקומית ובסיכוני המלחמה באזור.", source: { name: "Globes", url: "https://www.globes.co.il/portal/instrument.aspx?instrumentid=10463", date: "6/10" } }
  ],
  sources: [
    { name: "Yahoo Finance: וול סטריט סוגרת בשיא, הנאסד\"ק והנבידיה בשיא", url: "https://finance.yahoo.com/markets/live/stock-market-today-monday-october-5-dow-sp-500-nasdaq-081220790.html" },
    { name: "Yahoo Finance: איך נסחרו המדדים האמריקאים ב-5/10", url: "https://finance.yahoo.com/markets/world-indices/articles/major-us-stock-indexes-fared-201520824.html" },
    { name: "CNBC: תשואת 10 שנים נוגעת בשיא מאז 2002", url: "https://www.cnbc.com/2026/10/05/treasury-yields-bonds-fed-rates.html" },
    { name: "CoinDesk: ביטקוין נדחה בשלישית מ-$87,000", url: "https://coindesk.com/markets/2026/10/06/bitcoin-keeps-getting-rejected-at-usd87-000-as-stocks-hover-near-records" },
    { name: "Axios: הכנסות OpenAI מתקרבות ל-70 מיליארד דולר", url: "https://www.axios.com/2026/09/29/scoop-openais-annual-recurring-revenue-nears-70b" },
    { name: "CNBC: מייקל בורי מחדד אזהרה על בועת ה-AI", url: "https://www.cnbc.com/2026/09/28/michael-burry-believes-the-ai-bubble-may-burst-sooner-than-he-first-believed.html" },
    { name: "Times of Israel: המלחמה בין ישראל-ארה\"ב לאיראן נכנסת לחודשה השמיני", url: "https://timesofisrael.com/liveblog-october-04-2026" },
    { name: "Newsquawk: לוח האירועים לאוקטובר 2026", url: "https://www.newsquawk.com/headlines/newsquawk-calendar-of-key-events---october-2026" },
    { name: "Yahoo Finance: פפסיקו ודלתא איירליינס מדווחות השבוע", url: "https://finance.yahoo.com/news/delta-air-lines-pepsico-earnings-132758950.html" },
    { name: "CNBC: מישל בר - ייתכן ויידרשו התאמות מדיניות נוספות", url: "https://www.cnbc.com/2026/09/23/market-sees-next-fed-hike-in-october-following-barr-comments-hot-inflation.html" },
    { name: "CNBC: ג'ון וויליאמס - אין צורך במיידיות", url: "https://www.cnbc.com/2026/09/24/feds-williams-another-rate-hike-by-year-end.html" },
    { name: "Federal Reserve: נאום סגן יו\"ר ג'פרסון", url: "https://www.federalreserve.gov/newsevents/speech/jefferson20261001a.htm" },
    { name: "Yahoo Finance: טום לי על ראלי הרבעון הרביעי", url: "https://finance.yahoo.com/markets/crypto/articles/tom-lee-says-q4-could-163456422.html" },
    { name: "Seeking Alpha: יארדני מוריד יעד S&P 500 ל-7,900", url: "https://seekingalpha.com/news/4643370-yardeni-cuts-sp-500-target-to-7900-on-rising-yields" }
  ]
};
