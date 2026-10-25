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
  updatedAt: "2026-10-25T08:20:00+02:00",
  edition: "יומי",
  headline: "יומיים לבחירות לכנסת ה-26 תחת איפול סקרים; שבוע גדול בדרך - החלטת הפד ברביעי (28/10) ודו\"חות מיקרוסופט, אלפאבית ואמזון, <em>בעת שהנפט נותר קרוב לשיא של חודשים</em> על רקע ההתלקחות המחודשת בין ארה\"ב/ישראל לאיראן",
  thesis: "וול סטריט ננעלה בירידות ביום שישי (23/10), בשבוע שני ברציפות של הפסדים ב-S&P 500: דאו ג'ונס צנח 1.23% ל-52,215.16 נק', S&P 500 ירד 0.52% ל-7,623.68 נק' ונאסד\"ק קומפוזיט ירד 0.21% ל-25,955.34 נק', בלחץ חוזי ברנט שזינקו 3.1% ל-116.72$ לחבית - הרמה הגבוהה ביותר מזה חודשים - על רקע ההתלקחות המחודשת בעימות ארה\"ב/ישראל-איראן. כעת, יומיים לפני הבחירות לכנסת ה-26 (שלישי, 27/10) ובעוד הסקרים מאופלים מאז מוצ\"ש (23/10, 23:59), נפתח שבוע עמוס באירועים: ישיבת הפד (27-28/10) תוכרז ברביעי בשעה 20:00 בישראל, ומיד אחריה ידווחו מיקרוסופט ואלפאבית, ואמזון למחרת - כולן ברקע לדיון הנמשך על תמחור-יתר בבועת ה-AI.",
  bottomLine: [
    "וול סטריט ננעלה בירידות ביום שישי (23/10), שבוע שני ברציפות של הפסדים ב-S&P 500: דאו ג'ונס -1.23% ל-52,215.16, S&P 500 -0.52% ל-7,623.68, נאסד\"ק -0.21% ל-25,955.34, בלחץ חוזי ברנט שזינקו 3.1% ל-116.72$ לחבית - הגבוה ביותר מזה חודשים (CNBC; Korea Times/AP; 23-24/10).",
    "יומיים לבחירות לכנסת ה-26 (27/10): הסקרים מאופלים מאז מוצ\"ש (23/10, 23:59) ועד לסגירת הקלפיות (22:00 ב-27/10), בהתאם לחוק איסור פרסום סקרים לפני בחירות (ישראל היום; 20/10). הסקרים האחרונים שפורסמו לפני האיפול (23/10 - הארץ, מעריב, חדשות 12) נתנו יתרון זהיר לגוש בראשות גדי איזנקוט (\"ישר!\") על הליכוד, בעוד סקר חריג של ערוץ 14 הראה מגמה הפוכה; באף אחד מהסקרים המרכזיים אף גוש לא עבר את רף 61 המנדטים.",
    "הפד: ה-FOMC יכריע ברביעי (28/10, 20:00 בישראל). כלי FedWatch של CME תומחר ב-20/10 (רויטרס/Kitco) בכ-83% סיכוי להחזקת הריבית על 3.75-4.00% וכ-17% להעלאה; בשוקי החיזוי Polymarket/Kalshi (סנאפשוט מ-18/10, DeFiRate) הסיכוי המשוקלל להעלאה עמד על כ-14%. נגידת קליבלנד בת האמאק אמרה ב-15/10 (באירוע גולדמן זאקס) כי אם תתפתח בציבור \"מנטליות אינפלציונית\", הפד \"יצטרך לפעול אף יותר\" ממה שתוכנן - קריאה ניצית בפתח שבוע ההחלטה.",
    "שבוע דו\"חות מכריע לענקיות ה-AI: מיקרוסופט ואלפאבית ידווחו ברביעי (28/10) לאחר נעילת המסחר, ואמזון ביום חמישי (29/10) גם היא לאחר הנעילה - שלושתן ייבחנו בעיקר על קצב ההשקעות בתשתיות AI (capex) והתשואה עליהן, בעת שהדיון על תמחור-יתר בסקטור נמשך (הודעת מיקרוסופט הרשמית; 7/10).",
    "הנפט ממשיך להיות הסיפור הגיאופוליטי המרכזי בכניסה לשבוע: ברנט ננעל ב-23/10 על 116.72$ (+3.1%), הגבוה ביותר מזה חודשים, על רקע דיווחים (לא מאומתים באופן עצמאי משני הצדדים) על תקיפות מכליות נוספות במצרי הורמוז בימים שקדמו (CBS News; CNBC; 21-23/10). משמעות: פרמיית הסיכון הגיאופוליטי נותרה גבוהה בכניסה לשבוע עמוס בבחירות, בהחלטת פד ובדו\"חות מגה-קאפ."
  ],
  snapshot: [
    { k: "S&P 500 (23/10)", v: "7,623.68", c: "-0.52%", dir: "down" },
    { k: "דאו ג'ונס (23/10)", v: "52,215.16", c: "-1.23%", dir: "down" },
    { k: "נאסד\"ק Composite (23/10)", v: "25,955.34", c: "-0.21%", dir: "down" },
    { k: "ברנט (23/10)", v: "116.72$", c: "+3.1%, הגבוה ביותר מזה חודשים", dir: "up" },
    { k: "ביטקוין (23/10, Fortune)", v: "כ-$81,546", c: "ללא שינוי מהותי מסוף השבוע", dir: "flat" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "FedWatch (20/10): החזקה כ-83%, הבאה 27-28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הוחזקה ב-21/10", dir: "flat" }
  ],
  changes: [
    { topic: "ימים לבחירות בישראל", from: "3 ימים (24/10)", to: "2 ימים (25/10) - הסקרים מאופלים מאז 23/10 23:59" },
    { topic: "FedWatch - סיכוי להעלאה באוקטובר", from: "כ-20% (19/10, Forbes)", to: "כ-17% (20/10, רויטרס/Kitco)" }
  ],
  ai: [
    { title: "שבוע דו\"חות מכריע: מיקרוסופט ואלפאבית ברביעי, אמזון בחמישי - הזרקור על השקעות ה-AI", body: "מיקרוסופט תדווח על הרבעון הראשון של שנת הפיסקלית 2027 ביום רביעי (28/10) לאחר נעילת המסחר בניו יורק, עם שיחת משקיעים בשעה 17:30 לפי שעון מזרח ארה\"ב (לפנות בוקר חמישי בישראל) - לפי הודעתה הרשמית מ-7/10. אלפאבית (גוגל) צפויה לדווח על הרבעון השלישי של 2026 גם היא ברביעי אחרי נעילת המסחר, ואמזון תדווח יום לאחר מכן, חמישי (29/10), גם היא אחרי הנעילה. שלוש החברות, יחד עם מטא שדיווחה בשבוע שעבר, הן מהשחקניות המרכזיות בסיפור ה-AI, וההשקעות שלהן בתשתיות (capex) ייבחנו בקפידה בעת שהדיון על תמחור-יתר בסקטור נמשך. משמעות: הדו\"חות יגיעו יום בודד בלבד לאחר החלטת הפד והבחירות בישראל - שבוע עמוס בסיכוני כותרות לשוק.", tickers: ["MSFT", "GOOGL", "AMZN"], source: { name: "Microsoft (הודעה רשמית)", url: "https://news.microsoft.com/source/?p=25114", date: "7/10" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (27-28/10)", cut: 0, hold: 83, hike: 17 },
    polymarket: { cut: 0, hold: 86, hike: 14, url: "https://defirate.com/odds/fed-decision/snapshot/2026-10-18T0648/" },
    items: [
      { title: "נגידת קליבלנד בת האמאק: הפד \"יצטרך לפעול אף יותר\" אם תתפתח מנטליות אינפלציונית", body: "בת האמאק, נגידת הפדרל ריזרב של קליבלנד, אמרה באירוע של גולדמן זאקס בניו יורק (15/10) כי מה שמדאיג אותה הוא תרחיש שבו תתפתח בציבור \"מנטליות אינפלציונית\" - ואם זה יקרה, הפד \"יצטרך לפעול אף יותר\" ממה שתוכנן. היא לא נתנה רמז מפורש לכיוון הצבעתה בהחלטת 27-28/10, אך חזרה על קריאתה הקבועה (מה-12/10, בכנס NABE) להעדיף \"התאמות קטנות יותר\" שמתבצעות \"במהירות יחסית\" על פני דחייה שמסתכמת בתיקון גדול יותר בהמשך. משמעות: קול ניצי בולט בפד בפתח שבוע ההחלטה, לצד שאר חברי הוועדה שנותרים מפוצלים.", source: { name: "Reuters/Kitco", url: "https://www.kitco.com/news/off-the-wire/2026-10-15/feds-hammack-warns-inflation-expectations-deterioration-could-require", date: "15/10" } },
      { title: "FedWatch: הסיכוי להעלאה באוקטובר ממשיך לשקוע; שוקי החיזוי אף נמוכים ממנו", body: "כלי FedWatch של CME תומחר ב-20/10 (לפי רויטרס/Kitco) בכ-83% סיכוי להחזקת הריבית בטווח 3.75-4.00% בהחלטת 27-28/10, וכ-17% סיכוי להעלאה - ירידה מהקריאה של 19/10 (Forbes) שעמדה על 80%/20%. בשוקי החיזוי Polymarket ו-Kalshi, לפי סנאפשוט של DeFiRate מ-18/10, הסיכוי המשוקלל להעלאה עמד על כ-14% בלבד, נמוך מהקריאה של CME. במקביל, התמחור להעלאה בדצמבר נותר גבוה משמעותית (סביב 84-90% בהערכות שונות) - מה שמצביע על כך שהשוק ממשיך לצפות שהפד ידלג על אוקטובר אך יעלה בדצמבר.", source: { name: "Reuters/Kitco; DeFiRate", url: "https://defirate.com/odds/fed-decision/snapshot/2026-10-18T0648/", date: "18-20/10" } }
    ]
  },
  voices: [
    { name: "בת האמאק", role: "נגידת הפדרל ריזרב של קליבלנד", stance: "ניצי", he: "מה שמדאיג אותי הוא אם תתפתח מנטליות אינפלציונית.", en: "What I worry about is, if you get this inflationary mindset.", date: "15/10", url: "https://www.kitco.com/news/off-the-wire/2026-10-15/feds-hammack-warns-inflation-expectations-deterioration-could-require", note: "באירוע גולדמן זאקס; המשך דיבריה: הפד יצטרך לפעול אף יותר ממה שתוכנן אם זה יקרה." },
    { name: "אד ירדני", role: "נשיא, Yardeni Research", stance: "זהיר", he: "המד אומר שיש בועה, אבל היא לא עומדת להתפוצץ.", en: "The meter says there's a bubble, but it's not about to burst.", date: "21/10", url: "https://www.roic.ai/news/yardenis-ai-bubble-meter-flashes-warning-not-crash-signal-10-21-2026", note: "לגבי \"מד בועת ה-AI\" החדש של החברה, שעומד על 83 מתוך 100." },
    { name: "אלכס פלה", role: "כלכלן ראשי בארה\"ב, מיזוהו סקיוריטיז", stance: "ניצי", he: "אי-ההעלאה באוקטובר היא הקריאה המדיניותית השגויה.", en: "Them not going in October is the wrong call from a policy point of view.", date: "20/10", url: "https://www.kitco.com/news/off-the-wire/2026-10-20/fed-skip-october-raise-rates-again-december-nearly-all-economists-say", note: "בתגובה לסקר רויטרס בין כלכלנים; הוא מצפה להעלאה של 25 נ\"ב בדצמבר." },
    { name: "ריק רידר", role: "סמנכ\"ל השקעות אג\"ח, בלאקרוק", stance: "ניטרלי", he: "ההעלאה האחרונה נושכת חזק במקומות מסוימים, אך בקושי נוגעת באחרים.", en: "The recent hike is biting hard in some places while barely touching others.", date: "15/10", url: "https://www.blackrock.com/", note: "ב-CIO Perspective, על ההשפעה הבלתי-אחידה של מדיניות הפד על חלקי המשק." },
    { name: "סוזן קולינס", role: "נגידת הפדרל ריזרב של בוסטון", stance: "ניטרלי", he: "ההערכה שלי לגבי הצורך בפעולת מדיניות נוספת, ולתזמון המתאים, תלויה באופן מהותי באופן שבו כלל הנתונים הנכנסים מעצב את התחזית שלי.", en: "My view of the need for further policy action, and the appropriate timing, will depend importantly on how the totality of incoming data shapes my outlook.", date: "13/10", url: "https://www.kitco.com/news/off-the-wire/2026-10-13/feds-collins-sees-another-rate-hike-table-end-2026", note: "תוך שהשאירה פתוחה אפשרות להעלאת ריבית נוספת עד סוף 2026." },
    { name: "ריי דליו", role: "מייסד בריג'ווטר אסושייטס", stance: "דובי", he: "אנחנו בחלק של המחזור שהוא לפני הנקודה הזו אבל מתקרבים אליה. אני חושב שאנחנו קרובים לכך.", en: "We're in the part of the cycle that is before that but approaching that. I think we're close to that.", date: "7/10", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html", note: "בכנס Forbes Global CEO בסינגפור; תיאר את בועת ה-AI כ\"בועה קלאסית\" המתקרבת לנקודת שבר." }
  ],
  israel: [
    { title: "יומיים לבחירות לכנסת ה-26: הסקרים מאופלים מאז מוצ\"ש; המירוץ נותר צמוד", body: "הבחירות לכנסת ה-26 יתקיימו ביום שלישי, 27/10. איפול פרסום הסקרים נכנס לתוקף במוצאי שבת (23/10, 23:59) וימשך עד לסגירת הקלפיות בשעה 22:00 ביום הבחירות, בהתאם לחוק איסור פרסום סקרי בחירות בימים הסמוכים למועד ההצבעה; ועדת הבחירות המרכזית הזהירה כי ההגבלה חלה גם על רשתות חברתיות ופנייה ישירה למצביעים (ישראל היום; 20/10). הסקרים האחרונים שהתפרסמו לפני תחילת האיפול (23/10) - בהארץ, במעריב ובחדשות 12 - נתנו יתרון זהיר לגוש בראשות גדי איזנקוט (\"ישר!\") על הליכוד בראשות בנימין נתניהו, מבלי שאף גוש עובר את רף 61 המנדטים הדרוש לרוב; סקר חריג של ערוץ 14 (Next Data), לעומת זאת, הראה יתרון לגוש הימין-קואליציה. בנק ישראל, שהחזיק את הריבית על 3.25% ב-21/10, ציין בין נימוקיו את החשש מהיחלשות השקל ומהסיכון הגיאופוליטי, ימים ספורים לפני ההצבעה. משמעות: עם האיפול בתוקף, אין כעת מידע חדש ומאומת על מגמות המצביעים עד להצבעה עצמה ביום שלישי בלילה.", source: { name: "ישראל היום / הארץ / מעריב / חדשות 12", url: "https://www.israelhayom.com/2026/10/20/israel-warns-of-illegal-election-polls-ahead-of-vote/", date: "20-23/10" } }
  ],
  sources: [
    { name: "CNBC: שוק המניות היום, 23/10 - נעילה בירידות על רקע עליית מחירי הנפט", url: "https://www.cnbc.com/2026/10/22/stock-market-today-live-update.html" },
    { name: "Korea Times/AP: וול סטריט בירידה בלחץ עליית מחירי הנפט, 23-24/10", url: "https://www.koreatimes.co.kr/amp/world/20261024/wall-street-mostly-loses-ground-under-pressure-from-rising-oil-prices" },
    { name: "CNBC: ברנט חוצה את ה-116$, שיא של חודשים, 23/10", url: "https://www.cnbc.com/2026/10/23/oil-price-brent-wti-iran-war-saudi-arabia.html" },
    { name: "CBS News: עימות ארה\"ב-איראן, עדכונים חיים על מצרי הורמוז ומחירי הנפט", url: "https://www.cbsnews.com/live-updates/iran-war-us-strait-of-hormuz-oil-gas-price-strikes/" },
    { name: "Fortune: מחיר הביטקוין, 23/10", url: "https://fortune.com/article/price-of-bitcoin-10-23-2026/" },
    { name: "Kitco/Reuters: נגידת קליבלנד בת האמאק מזהירה מהתפתחות מנטליות אינפלציונית, 15/10", url: "https://www.kitco.com/news/off-the-wire/2026-10-15/feds-hammack-warns-inflation-expectations-deterioration-could-require" },
    { name: "Kitco/Reuters: הפד ידלג על אוקטובר אך יעלה בדצמבר, לפי סקר כלכלנים, 20/10", url: "https://www.kitco.com/news/off-the-wire/2026-10-20/fed-skip-october-raise-rates-again-december-nearly-all-economists-say" },
    { name: "DeFiRate: סנאפשוט שוקי חיזוי להחלטת הפד, 18/10", url: "https://defirate.com/odds/fed-decision/snapshot/2026-10-18T0648/" },
    { name: "Kitco: נגידת בוסטון קולינס רואה העלאת ריבית נוספת אפשרית עד סוף 2026, 13/10", url: "https://www.kitco.com/news/off-the-wire/2026-10-13/feds-collins-sees-another-rate-hike-table-end-2026" },
    { name: "roic.ai: מד בועת ה-AI של ירדני מאותת אזהרה, לא קריסה, 21/10", url: "https://www.roic.ai/news/yardenis-ai-bubble-meter-flashes-warning-not-crash-signal-10-21-2026" },
    { name: "Business Standard: ריי דליו - בועת AI קלאסית המתקרבת לנקודת שבר, 7/10", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html" },
    { name: "Israel Hayom: ישראל מזהירה מפני סקרי בחירות בלתי חוקיים לפני ההצבעה, 20/10", url: "https://www.israelhayom.com/2026/10/20/israel-warns-of-illegal-election-polls-ahead-of-vote/" },
    { name: "Microsoft: הודעה רשמית על מועד דיווח הרבעון, 7/10", url: "https://news.microsoft.com/source/?p=25114" }
  ]
};
