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
  updatedAt: "2026-10-19T08:15:00+03:00",
  edition: "יומי",
  headline: "וול סטריט נכנסת לשבוע המסחר אחרי המכה הקשה ביותר לנאסד\"ק מאז יוני, כשהנפט והביטקוין נסחרים יציבים על פני סוף השבוע ואג\"ח קורוויב מתאוששות חלקית; ת\"א 35 ננעל בעלייה שבועית של 2.3%, ושבוע עמוס בדרך - נטפליקס, טסלה, ריבית בנק ישראל ו<em>8 ימים לבחירות</em> בישראל",
  thesis: "אחרי השבוע הגרוע ביותר לנאסד\"ק מאז יוני (ירידה שבועית של כ-4.5% על רקע משבר האמון בחוב תשתיות ה-AI, שהתמקד בקורוויב), סוף השבוע עבר ביציבות יחסית: הנפט והביטקוין כמעט ללא שינוי משישי, ואג\"ח קורוויב התאוששו חלקית אחרי מנכ\"ל החברה מייקל אינטרייטור הגן על המודל העסקי במכתב לעובדים. בישראל, מדד ת\"א 35 ננעל בחמישי-שישי (16/10) בעלייה של 1.64% ל-4,224.67 נקודות (כ-2.3% שבועי) בהובלת מניות הביטוח, והבורסה נסגרת לסוף השבוע בלי מסחר ביום ראשון. השבוע הקרוב עמוס: נטפליקס מדווחת שלישי (20/10) וטסלה רביעי (21/10) - לאחר שטסלה כבר דיווחה על מסירות רבעון שלישי גבוהות מהתחזיות - בנק ישראל יכריע על הריבית ברביעי (21/10, 16:00), והבחירות לכנסת ה-26 הן בעוד 8 ימים (27/10), תשעה ימים לפני החלטת הריבית הבאה של הפד (27-28/10).",
  bottomLine: [
    "וול סטריט נכנסת לשבוע המסחר אחרי סגירה שלילית בשישי (16/10) שסיכמה את השבוע הגרוע ביותר לנאסד\"ק מאז יוני: S&P 500 -1.1% ל-7,659.44, נאסד\"ק קומפוזיט -2.14% ל-26,140.03 (כ-4.5%- שבועי); דאו ג'ונס -0.3% ל-52,002.41 אך סגר את השבוע בעלייה של כ-0.7% (ABC News/AP; 16/10). המסחר בארה\"ב נפתח היום ב-16:30 בישראל.",
    "קורוויב (CoreWeave): אג\"ח 2031 שנסחר בשישי-שישי קרוב ל-78 סנט לדולר התאושש חלקית בחמישי (15/10) לכ-82.8 סנט; מנכ\"ל קורוויב מייקל אינטרייטור כתב במכתב לעובדים שקיבל CNBC שהצבר ההזמנות של כ-104 מיליארד דולר \"תומך ביותר מכל התחייבויות החוב שלנו\", אחרי שהמניה צנחה כ-15% ב-14/10 וב-8.3% נוספים ב-15/10 לשפל מאז מאי 2025 (roic.ai/CNBC; 14-15/10).",
    "נפט וביטקוין נסחרים יציבים על פני סוף השבוע: WTI 101.41$ וברנט 109.69$ (18/10) - כמעט ללא שינוי מהסגירה של שישי; ביטקוין נסחר בכ-82,500$ (19/10, Bybit/APA) - עלייה מתונה מכ-81,300$ בשישי.",
    "בישראל: ת\"א 35 ננעל בחמישי-שישי (16/10) בעלייה של 1.64% ל-4,224.67 נקודות (כ-2.3% עלייה שבועית) בהובלת מניות הביטוח - איילון +4.1%, מנורה +3.7% (ביזפורטל; 16/10). בנק ישראל יכריע על הריבית ברביעי (21/10, 16:00; ריבית נוכחית 3.25%, אינפלציה 1.5%) - השוק נוטה להערכת ללא שינוי, אך הורדה נוספת עדיין על הפרק (funder.co.il).",
    "שבוע עמוס בדרך: נטפליקס מדווחת שלישי (20/10, קונצנזוס EPS כ-0.82$), טסלה מדווחת רביעי (21/10) אחרי שדיווחה כבר על 486,532 מסירות ברבעון השלישי - מעל קונצנזוס האנליסטים של 461,974 (driveteslacanada.ca). 8 ימים לבחירות לכנסת ה-26 (27/10) ו-9 ימים להחלטת הריבית של הפד (27-28/10; FedWatch 16/10: החזקה כ-85%, העלאה כ-15%)."
  ],
  snapshot: [
    { k: "S&P 500 (16/10)", v: "7,659.44", c: "-1.1%", dir: "down" },
    { k: "נאסד\"ק Composite (16/10)", v: "26,140.03", c: "-2.14%", dir: "down" },
    { k: "דאו ג'ונס (16/10)", v: "52,002.41", c: "-0.3%", dir: "down" },
    { k: "ת\"א 35 (16/10)", v: "4,224.67", c: "+1.64% (שבועי כ-2.3%)", dir: "up" },
    { k: "ביטקוין (19/10)", v: "כ-$82,500", c: "+כ-1.5% מסוף השבוע", dir: "up" },
    { k: "נפט WTI / ברנט (18/10)", v: "$101.41 / $109.69", c: "ללא שינוי מהותי משישי", dir: "flat" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "FedWatch (16/10): החזקה ~85% · העלאה ~15%, הבאה 27-28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "מאז 1/9; הבאה 21/10 16:00", dir: "flat" }
  ],
  changes: [
    { topic: "ימים לבחירות בישראל", from: "9 ימים (18/10)", to: "8 ימים (19/10)" },
    { topic: "ת\"א 35", from: "4,156.68 נק' (15/10)", to: "4,224.67 נק' (+1.64%, 16/10)" },
    { topic: "ביטקוין", from: "כ-$81,300 (16/10)", to: "כ-$82,500 (19/10)" }
  ],
  ai: [
    { title: "קורוויב: אג\"ח מתאוששות חלקית, מנכ\"ל מגן על המודל העסקי - \"הצבר תומך ביותר מכל התחייבויות החוב שלנו\"", body: "מניית קורוויב צנחה כ-15% ב-14/10 ונוספים 8.3% ב-15/10 לשפל תוך-יומי של 60.36$ - הנמוך ביותר מאז מאי 2025 - על רקע חששות ממימון החוב, בעוד תשואות האג\"ח שלה (2031-2032) נגעו בכ-15%. מנכ\"ל קורוויב מייקל אינטרייטור הגיב במכתב לעובדים שקיבל CNBC, בו כתב שהצבר ההזמנות של כ-104 מיליארד דולר \"תומך ביותר מכל התחייבויות החוב שלנו\", וטען שתקופות של חוסר הבנה בשוק הן נורמליות עבור חברת טכנולוגיה מסוג חדש; לדבריו, הטלטלה בהנפקות ובמימון של מתחרות משפיעה גם על הסיפור של קורוויב. הפרשן ג'ים קריימר תקף את המכתב כ\"לא מחובר למציאות\" של רגע משבר של ממש. עם זאת, האג\"ח לפדיון 2031 התאושש חלקית ב-15/10 לכ-82.8 סנט לדולר, אחרי שנסחר קרוב ל-78 סנט בשפל - סימן שהמשקיעים לא השתכנעו במלואם שהסערה מאחור. משמעות: קורוויב נותרת מקרה הבוחן המרכזי למימון בניית תשתיות ה-AI; ההתאוששות החלקית באג\"ח מרגיעה חלקית אך לא פותרת את חששות המימון.", tickers: ["NVDA"], source: { name: "roic.ai (CNBC)", url: "https://www.roic.ai/news/coreweave-ceo-blames-share-drop-on-market-acting-irrationally-10-14-2026", date: "14-15/10" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (27-28/10)", cut: 0, hold: 85, hike: 15 },
    polymarket: null,
    items: [
      { title: "וורש מבנגקוק: \"חוזק עולמי שלא הייתי מנבא לפני חצי שנה\"; FedWatch נותר ללא שינוי - החזקה כ-85%", body: "יו\"ר הפד קווין וורש השתתף בשיחה פומבית עם מנהלת קרן המטבע הבינלאומית קריסטלינה גיאורגייבה בכנס ה-IMF/הבנק העולמי בבנגקוק (16/10), בה נמנע מלאותת על כיוון החלטת הריבית הקרובה (27-28/10) ואמר לפי AP שהפד \"הבהיר מאוד שנספק יציבות מחירים\" לאחר העלאת הריבית בספטמבר. לפי AFP (Kuwait Times), וורש אמר: \"כמעט בכל מקום בעולם הכלכלה מראה חוסן שלא הייתי בטוח שהייתי מנבא לפני חמישה-שישה חודשים\". נכון ל-16/10 (Benzinga), CME FedWatch ממשיך לתמחר סיכוי של כ-15% בלבד להעלאת ריבית באוקטובר, לעומת כ-85% להחזקה - ללא שינוי מהותי מסוף השבוע שחלף. משמעות: הפד נכנס להחלטת 27-28/10 עם טון זהיר-אופטימי מצד יו\"רו, בלי איתות מחייב, כשהשוק ממשיך לתמחר החזקה כתוצאה הסבירה ביותר.", source: { name: "Kuwait Times (AFP) / AP via PBS NewsHour", url: "https://kuwaittimes.com/article/51720/world/feds-warsh-surprised-by-world-economys-resilience/", date: "16/10" } },
      { title: "נפט וגז יציבים על פני סוף השבוע; אין דיווחים על החרפה נוספת באיראן-רוסיה-אוקראינה", body: "לפי נתוני onevalor.com (18/10), חוזי WTI נסחרו ב-101.41$ לחבית וברנט ב-109.69$ - רמות דומות לסגירת שישי (16/10: WTI 101.41$, ברנט 109.86$), ללא תנועה מהותית על פני סוף השבוע. לא נמצאו בסיקור הזמין דיווחים על החרפה נוספת במתיחות איראן או רוסיה-אוקראינה מעבר למה שדיווח בשישי. משמעות: שוק האנרגיה נכנס לשבוע המסחר ברמה גבוהה היסטורית (קרוב ל-110$ בברנט) אך ללא זרז חדש מיידי.", source: { name: "onevalor.com", url: "https://www.onevalor.com/oil-gas-prices/", date: "18/10" } }
    ]
  },
  voices: [
    { name: "קווין וורש", role: "יו\"ר הפדרל ריזרב", stance: "ניטרלי", he: "כמעט בכל מקום בעולם הכלכלה מראה חוסן שלא הייתי בטוח שהייתי מנבא לפני חמישה-שישה חודשים.", en: "Almost everywhere in the global economy (is) showing resilience I'm not sure I would have predicted five or six months ago.", date: "16/10", url: "https://kuwaittimes.com/article/51720/world/feds-warsh-surprised-by-world-economys-resilience/", note: "בשיחה פומבית עם מנהלת ה-IMF קריסטלינה גיאורגייבה בכנס ה-IMF/הבנק העולמי בבנגקוק." },
    { name: "כריסטופר וולר", role: "נגיד בפדרל ריזרב", stance: "ניצי", he: "אם הנתונים הכלכליים יתפתחו כצפוי, אני מצפה להעלאות נוספות שיביאו את האינפלציה בחזרה ליעד של 2% שלנו בצורה מהירה יותר.", en: "If the economic data continue to come in as expected, I anticipate additional hikes to support a timelier return of inflation to our 2% goal.", date: "8/10", url: "https://www.dailysabah.com/business/finance/more-hikes-needed-to-lower-inflation-to-2-target-feds-waller/amp", note: "בכנס הפורום הכלכלי של איסטנבול." },
    { name: "רי דליו", role: "מייסד בריג'ווטר אסושייטס", stance: "דובי", he: "אנחנו בחלק של המחזור שהוא לפני הנקודה הזו אבל מתקרבים אליה. אני חושב שאנחנו קרובים לכך.", en: "We're in that part of the cycle that is before that, but approaching that. I think we're close to that.", date: "7/10", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html", note: "בכנס Forbes Global CEO בסינגפור; תיאר את ה-AI כ\"בועה קלאסית\" המתקרבת להתפוצצות." },
    { name: "דן אייבס", role: "אנליסט בכיר, Wedbush", stance: "שורי", he: "מכירת השבבים מוגזמת בהרבה.", en: "The semiconductor sell-off is way overdone.", date: "13/10", url: "https://stocktwits.com/news-articles/Markets/Equity/dan-ives-says-semiconductor-sell-off-is-way-overdone-nvda-mu-skhy-sndk-stocks/cZxBWE1RBoV", note: "בראיון ל-CNBC, לגבי הירידות במניות השבבים ו-AI; שמר על דירוג Outperform ומחיר מטרה 300$ לנבידיה." },
    { name: "ג'יימי דיימון", role: "מנכ\"ל JPMorgan Chase", stance: "זהיר", he: "גורמים כמו גירעונות פיסקליים גדולים, אינפלציה דביקה, מחירי נכסים גבוהים, ריביות עולות ותנאים גאופוליטיים ממשיכים לזוז מתחת לפני השטח.", en: "Forces like large fiscal deficits, sticky inflation, elevated asset prices, rising interest rates and geopolitical conditions continue to shift under the surface.", date: "13/10", url: "https://www.cityam.com/?p=2465267", note: "בשיחת הדו\"חות של JPMorgan לרבעון השלישי, שבה הרווח למניה הפתיע לרעה." },
    { name: "מייקל אינטרייטור", role: "מנכ\"ל CoreWeave", stance: "שורי", he: "[הצבר] תומך ביותר מכל התחייבויות החוב שלנו.", en: "[The backlog] more than supports all of our debt obligations.", date: "14/10", url: "https://www.roic.ai/news/coreweave-ceo-blames-share-drop-on-market-acting-irrationally-10-14-2026", note: "במכתב לעובדים שקיבל CNBC, בתגובה לצניחת המניה ולחששות ממימון החוב." }
  ],
  israel: [
    { title: "ת\"א 35 ננעל ב-4,224.67 נק' (+1.64%, שבועי +2.3%) בהובלת הביטוח; בנק ישראל יכריע על הריבית ב-21/10, הבחירות ב-27/10 - 8 ימים מהיום", body: "מדד ת\"א 35 ננעל בשישי (16/10, המסחר האחרון לפני סוף השבוע - בבורסה בתל אביב אין מסחר בימי שישי-שבת) בעלייה של 1.64% ל-4,224.67 נקודות, עם מחזור מסחר של כ-1.47 מיליארד שקל; מניות הביטוח הובילו את העליות - איילון +4.1% ומנורה +3.7%. בסיכום שבועי עלה המדד בכ-2.3% (ביזפורטל; 16/10). בנק ישראל יפרסם את החלטת הריבית הבאה ברביעי, 21/10, בשעה 16:00; הריבית הנוכחית עומדת על 3.25% מאז 1/9, והאינפלציה ב-12 החודשים האחרונים עומדת על 1.5% - מתחת לאמצע יעד האינפלציה. לאחר ארבע הורדות ריבית מתחילת השנה, ההערכות בשוק נוטות כעת להותיר את הריבית ללא שינוי, אך הורדה נוספת עדיין על הפרק (funder.co.il). הבחירות לכנסת ה-26 יתקיימו ב-27/10 - הראשונות במועדן החוקי מזה 38 שנה - 8 ימים מהיום; הסקר העדכני שנמצא (i24NEWS, 7/10) נתן לגוש הקואליציה 60 מנדטים, לגוש השינוי 48 ולמפלגות הערביות 12 - בלי שאף גוש חוצה את רף 61 המנדטים. משמעות: שבוע קריטי בישראל - החלטת ריבית יומיים לפני הבחירות, במירוץ שנותר צמוד לפי הסקר האחרון שנמצא.", source: { name: "בזפורטל / funder.co.il / i24NEWS", url: "https://www.bizportal.co.il/capitalmarket/news/article/20044905", date: "16/10 (עם נתונים מ-7-18/10)" } }
  ],
  sources: [
    { name: "ABC News/AP: סגירת וול סטריט, 16/10", url: "https://abcnews.com/Business/wireStory/major-us-stock-indexes-fared-friday-10162026-137331951" },
    { name: "roic.ai (CNBC): מנכ\"ל קורוויב על הצבר והחוב, 14/10", url: "https://www.roic.ai/news/coreweave-ceo-blames-share-drop-on-market-acting-irrationally-10-14-2026" },
    { name: "roic.ai: התאוששות אג\"ח קורוויב, 15/10", url: "https://www.roic.ai/news/coreweave-bonds-rebound-sharply-after-recent-selloff-10-15-2026" },
    { name: "onevalor.com: מחירי נפט וגז, 18/10", url: "https://www.onevalor.com/oil-gas-prices/" },
    { name: "APA: מחיר הביטקוין, 19/10", url: "https://en.apa.az/cryptocurrency/bitcoin-price-exceeds-82000-530798" },
    { name: "Kuwait Times (AFP): וורש על חוסן הכלכלה העולמית, 16/10", url: "https://kuwaittimes.com/article/51720/world/feds-warsh-surprised-by-world-economys-resilience/" },
    { name: "PBS NewsHour (AP): וורש על יציבות מחירים, 16/10", url: "https://www.pbs.org/newshour/amp/economy/fed-chair-warsh-says-price-stability-is-key-but-shies-away-from-signals-about-rates" },
    { name: "Benzinga: סיכויי העלאת ריבית הפד, 16/10", url: "https://www.benzinga.com/markets/prediction-markets/26/10/62408879/fed-rate-hike-odds-warsh-ai" },
    { name: "dailysabah.com: נגיד הפד וולר על העלאות נוספות, 8/10", url: "https://www.dailysabah.com/business/finance/more-hikes-needed-to-lower-inflation-to-2-target-feds-waller/amp" },
    { name: "Business Standard: ריי דליו על בועת ה-AI, 7/10", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html" },
    { name: "Stocktwits: דן אייבס על מכירת השבבים, 13/10", url: "https://stocktwits.com/news-articles/Markets/Equity/dan-ives-says-semiconductor-sell-off-is-way-overdone-nvda-mu-skhy-sndk-stocks/cZxBWE1RBoV" },
    { name: "CityAM: ג'יימי דיימון על הסיכונים \"מתחת לפני השטח\", 13/10", url: "https://www.cityam.com/?p=2465267" },
    { name: "בזפורטל: נעילת ת\"א 35, 16/10", url: "https://www.bizportal.co.il/capitalmarket/news/article/20044905" },
    { name: "funder.co.il: החלטת ריבית בנק ישראל 21/10", url: "https://funder.co.il/article/211282" },
    { name: "i24NEWS: סקר בחירות 2026, 7/10", url: "https://www.i24news.tv/he/news/israel-elections-2026/polls/artc-e0e93683" },
    { name: "driveteslacanada.ca: מסירות טסלה רבעון שלישי 2026", url: "https://driveteslacanada.ca/?p=124427" },
    { name: "Netflix IR / insiderfinance.io: תאריך דו\"ח רבעון שלישי", url: "https://www.insiderfinance.io/news/netflix-q3-2026-earnings-oct-20" },
    { name: "Tesla 8-K (SEC): תאריך דו\"ח רבעון שלישי 2026", url: "https://www.sec.gov/Archives/edgar/data/0001318605/000162828026064366/exhibit991111111.htm" }
  ]
};
