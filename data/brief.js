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
  updatedAt: "2026-11-01T08:20:00+02:00",
  edition: "יומי",
  headline: "ישראל מחכה לאישור הרשמי של תוצאות הבחירות לפני שהרצוג יתחיל להתייעץ עם ראשי הסיעות, והרשימה המשותפת מציעה תמיכה חוץ-קואליציונית באיזנקוט; הביטקוין נותר תחת לחץ בעקבות פריצת ביינאנס, <em>ושבוע עמוס ממתין לשווקים: בחירות הביניים בארה\"ב, דו\"חות אפל ו-AMD, ודוח התעסוקה החודשי</em>",
  thesis: "וול סטריט סגורה בסוף השבוע, יומיים אחרי יום המסחר הגרוע ביותר מאז יוני (שישי, 30/10), וההתמקדות עוברת לשבוע עמוס: בחירות הביניים לקונגרס האמריקאי ביום שלישי (3/11), דו\"חות אפל (2/11) ו-AMD (צפי ל-3/11, לא אושר רשמית), ודוח התעסוקה החודשי ביום שישי (6/11) - בלי ישיבת פד השבוע (הבאה רק ב-8-9/12). בישראל, הנשיא הרצוג הודיע כי יזמין את ראשי הסיעות להתייעצויות פורמליות רק בשבוע הקרוב, לאחר שיו\"ר ועדת הבחירות המרכזית יאשר את התוצאה הסופית הרשמית; הרשימה המשותפת (ח\"כ אחמד טיבי, יו\"ר יוסף ג'בארין) הציעה תמיכה חוץ-קואליציונית בממשלה בראשות גדי איזנקוט בלי להצטרף אליה בפועל, ונתניהו הגיב כי בכך הם \"מתוודים\" שהבלוק של איזנקוט מתכנן להרכיב איתם ממשלה. הביטקוין ממשיך להיסחר בלחץ בעקבות פריצת האבטחה הגדולה בהיסטוריית הקריפטו בביינאנס (כ-6.3 מיליארד דולר), וסגר את אוקטובר בירידה חודשית של כ-7.3%.",
  bottomLine: [
    "וול סטריט נותרה סגורה אחרי יום המסחר הגרוע ביותר מאז יוני: S&P 500 ירד 1.82% ל-7,580.07, דאו ג'ונס ירד 1.09% ל-51,770.31 ונאסד\"ק קומפוזיט צנח 2.86% ל-25,437.00 ביום שישי (30/10), בעקבות קריסות של כ-29% במניות אינטל ורדיט על תחזיות מאכזבות חרף הכאת תחזיות הרבעון; זהו גם החודש הגרוע ביותר לנאסד\"ק מאז מרץ 2025 (CNBC; Yahoo Finance, 30/10). משמעות: המסחר הבא הוא ביום שני (2/11), אז השוק האמריקאי נפתח לשבוע עמוס בנתונים ואירועים.",
    "בישראל, הרצוג יזמין את ראשי הסיעות להתייעצויות רק בשבוע הקרוב, אחרי אישור רשמי של התוצאה הסופית; הרשימה המשותפת (19 מנדטים) הודיעה שתציע תמיכה חוץ-קואליציונית לממשלה בראשות גדי איזנקוט - בלי להצטרף אליה בפועל - בתמורה למחויבויות קונקרטיות לאזרחים הערבים, ונתניהו הגיב שבכך יו\"ר הרשימה יוסף ג'בארין \"מתוודה\" שהבלוק של איזנקוט מתכנן להרכיב איתם ממשלה (Republic World, 28/10; JNS, אוקטובר 2026). משמעות: בלוק נתניהו (53) ובלוק איזנקוט (48) נותרים בלי רוב של 61, כך שהדרך בפועל להרכבת ממשלה עדיין תלויה בשאלה הרגישה של הסתמכות על תמיכה ערבית.",
    "הביטקוין נותר תחת לחץ בעקבות פריצת ביינאנס: לפי Investing.com, המטבע נסחר בכ-77,800$ ב-1/11, אחרי שסגר את אוקטובר בכ-77,558$ (ירידה חודשית של כ-7.3%) ושפל חודשי של כ-76,314$; קרנות ETF ספוט על ביטקוין רשמו פדיונות נטו של 643.3 מיליון דולר ב-30/10 (Investing.com, 30-31/10). משמעות: גם כשבוע וחצי אחרי הפריצה (כ-6.3 מיליארד דולר, שהתגלתה בלילה שבין 29-30/10), סנטימנט הסיכון בקריפטו נותר שברירי.",
    "שבוע עמוס בנתונים ממתין לשוק: בחירות הביניים לקונגרס האמריקאי ביום שלישי (3/11) - כל 435 מושבי הבית, 33-35 מושבי הסנאט ו-39 בחירות למושלים; אפל מדווחת לאחר נעילת המסחר ביום שני (2/11) עם תזוזה גלומה באופציות של כ-4.4% (לעומת ממוצע 10 שנים של כ-5%); AMD צפויה (לא אושר רשמית) לדווח ביום שלישי; מדדי ISM לתעשייה (2/11) ולשירותים (4/11); ודוח התעסוקה החודשי (Nonfarm Payrolls) לאוקטובר ביום שישי (6/11) (Apple Investor Relations; S&P Global, 26/10; BLS). משמעות: תגובת מניות הטכנולוגיה הגדולות ותוצאת הבחירות ינוותו את כיוון השוק בימים הקרובים, בלי ישיבת פד כדי לאזן.",
    "שוקי החיזוי לבחירות הביניים מצביעים על יתרון ברור לדמוקרטים בבית הנבחרים (כ-85-88% לפי Defirate/Polymarket), אך הסנאט נותר צמוד מאוד - תחזיות שונות נעות בין כ-48% ל-74% לזכות הדמוקרטים, תלוי בגורם המנבא (Defirate; Silver Bulletin; Kalshi, אוקטובר 2026). משמעות: חוסר הסכמה רחב בין המודלים לגבי הסנאט מעיד על רמת אי-ודאות גבוהה, שעשויה להגביר תנודתיות בליל הבחירות ולמחרת."
  ],
  snapshot: [
    { k: "S&P 500 (30/10, אחרון)", v: "7,580.07", c: "-1.82%", dir: "down" },
    { k: "דאו ג'ונס (30/10, אחרון)", v: "51,770.31", c: "-1.09%", dir: "down" },
    { k: "נאסד\"ק Composite (30/10, אחרון)", v: "25,437.00", c: "-2.86% · הגרוע מאז יוני", dir: "down" },
    { k: "ביטקוין (1/11)", v: "כ-77,800$", c: "אוקטובר: כ-7.3%-, בעקבות פריצת ביינאנס", dir: "down" },
    { k: "ריבית הפד", v: "3.75–4.00% (הוחזקה 28/10, 10-2)", c: "הישיבה הבאה: 8-9/12", dir: "flat" },
    { k: "ת\"א-35 (29/10, מסחר אחרון)", v: "+0.34%", c: "המסחר הבא בתל אביב מתחיל היום (1/11)", dir: "up" }
  ],
  changes: [
    { topic: "קואליציה בישראל", from: "ספירה מסתיימת; איזנקוט צפוי למנדט ראשון (30/10)", to: "מחכים לאישור רשמי של התוצאה; הרצוג יזמין את ראשי הסיעות להתייעצויות בשבוע הקרוב; הרשימה המשותפת מציעה תמיכה חוץ-קואליציונית באיזנקוט (1/11)" },
    { topic: "ביטקוין", from: "כ-76,400-78,000$ (29-30/10)", to: "כ-77,800$ (1/11), אחרי שאוקטובר נסגר במינוס כ-7.3%" }
  ],
  ai: [
    { title: "מיקרוסופט, אלפאבית ואמזון דיווחו השבוע תחת מעקב הדוק אחר היקפי ה-capex ב-AI; אפל בתור ביום שני", body: "מיקרוסופט ואלפאבית (28/10) ואמזון (29/10) פרסמו דו\"חות רבעוניים השבוע, במה שתואר מראש כמבחן לשאלה אם ההשקעה המשולבת (שהוערכה בכ-800 מיליארד דולר) של ענקיות הטכנולוגיה בתשתיות AI מצדיקה את עצמה; תחזיות ה-capex לשנת 2026 של החברות עלו באופן משמעותי במהלך השנה (S&P Global; Bloomberg/AIWeekly, 26/10). לא ניתן לאמת בריצה זו את התוצאות המדויקות ואת תגובת המניות בפועל של שלוש החברות - המקורות שנבדקו הציגו נתונים סותרים. מה שכן אומת: אינטל ורדיט, שדיווחו קודם בשבוע (29/10), קרסו כ-29% כל אחת ביום שישי (30/10) על תחזיות מאכזבות, חרף הכאת תחזיות הרבעון. אפל צפויה לדווח (רבעון רביעי, שנה פיסקלית 2026) ביום שני אחרי נעילת המסחר, עם תזוזה גלומה באופציות של כ-4.4% - מתחת לממוצע 10 השנים שלה של כ-5% (Apple Investor Relations/MacRumors; S&P Global, 26/10). משמעות: השבוע הבא (עם אפל ו-AMD) ימשיך לבחון את תיאבון המשקיעים לסיפור ה-AI אחרי השבוע התנודתי שהסתיים ביום שישי.", tickers: ["MSFT", "GOOGL", "AMZN", "AAPL"], source: { name: "S&P Global; Bloomberg/AIWeekly, 26/10", url: "https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/10/microsoft-and-alphabet-earnings-previews" } }
  ],
  macro: {
    fedwatch: { meeting: "דצמבר", cut: 0, hold: 16, hike: 84 },
    polymarket: null,
    items: [
      { title: "אין ישיבת פד השבוע; הבאה ב-8-9 בדצמבר, אחרי החזקת ריבית עם דיסנט ראשון של קוק", body: "לאחר החזקת הריבית על 3.75-4.00% ב-28/10 (בהצבעה 10-2, עם הדיסנטים הנגידה ליסה קוק ונגידת קליבלנד בת' האמק שדרשו העלאה של 25 נ\"ב - הדיסנט הראשון של קוק מאז הצטרפותה לפד ב-2022), אין ישיבת FOMC נוספת השבוע; הישיבה הבאה היא ב-8-9 בדצמבר, עם החלטה ב-9/12 בשעה 21:00 שעון ישראל (Reuters/Axios, 28/10; Fedratecalc/Mnimarkets). לפי הקריאה האחרונה שאומתה בריצת שישי (CME FedWatch, 28-30/10), הסיכוי להעלאה בדצמבר עמד על כ-82-85%; לא נמצאה קריאה טרייה יותר בריצה זו של היום. משמעות: בלי ישיבת פד או נתוני מאקרו גדולים השבוע, תשומת הלב עוברת לדו\"חות הטכנולוגיה ולבחירות הביניים.", source: { name: "Reuters (via Axios/WSAU); Fedratecalc, 28/10-1/11", url: "https://www.axios.com/2026/10/28/fed-warsh-interest-rates-cook" } }
    ]
  },
  voices: [
    { name: "קווין וורש", role: "יו\"ר הפדרל ריזרב", stance: "ניצי", he: "פוליטיקה לא מילאה תפקיד בהחלטה.", en: "Politics played no role in the decision.", date: "28/10", url: "https://wsau.com/2026/10/28/warsh-says-politics-played-no-role-in-feds-rate-decision-by-group-he-is-honored-to-lead/", note: "אמר זאת במסיבת העיתונאים שלאחר החלטת הריבית (הצבעה 10-2, עם הדיסנטים קוק והאמק); הוסיף גם: \"I just spent two days with my colleagues upstairs. I didn't hear an utterance about politics\" ותיאר את הדיונים הפנימיים כ\"heck of a family fight\" (Reuters)." },
    { name: "אד ירדני", role: "נשיא, Yardeni Research", stance: "זהיר", he: "המד אומר שיש בועה, אבל היא לא עומדת להתפוצץ.", en: "The meter says there's a bubble, but it's not about to burst.", date: "21/10", url: "https://www.roic.ai/news/yardenis-ai-bubble-meter-flashes-warning-not-crash-signal-10-21-2026", note: "לגבי מד בועת ה-AI החדש של Yardeni Research, שעומד על 83/100 בתנאי בועה ו-34/100 בטריגרים שעלולים לפוצץ אותה." },
    { name: "טום לי", role: "שותף מנהל, Fundstrat Global Advisors", stance: "שורי", he: "אני חושב שה-AI הוא בנייה תשתיתית חשובה יותר, אפשר לטעון, מהמובייל.", en: "I think AI is a more important infrastructure build arguably than mobile.", date: "23/10", url: "https://www.mitrade.com/insights/news/live-news/article-3-2188255-20261023", note: "אמר זאת ב-CNBC Closing Bell בהקשר למכירה במניות ה-AI; ציין שתשואות מתחת ל-5% מרמזות שהסייל-אוף מתקרב לסיומו." },
    { name: "ג'יימי דיימון", role: "מנכ\"ל, JPMorgan Chase", stance: "זהיר", he: "ה-AI עצמו, אני חושב, יוצר הרבה ערך. ולכן אני לא ממש מודאג מזה.", en: "AI itself, I think, creates a lot of value. And so I'm not really worried about it.", date: "אוקטובר 2026", url: "https://www.benzinga.com/node/62202607", note: "אמר זאת בראיון ל-Bloomberg TV, שבו גם ציין שהריבית עולה (\"Rates are going up\") על רקע \"הרבה ביקוש להון, הרבה מימון ממשלתי\" - בהתייחס לתחרות בין השקעות ה-AI לגיוס החוב הממשלתי." },
    { name: "אלכס פלה", role: "כלכלן ראשי בארה\"ב, מיזוהו סקיוריטיז", stance: "ניצי", he: "אי-ההעלאה באוקטובר היא הקריאה המדיניותית השגויה.", en: "Them not going in October is the wrong call from a policy point of view.", date: "סביב 20/10", url: "https://primexbt.com/news/economists-expect-fed-to-hold-in-october-and-raise-rates-in-december-the-pol/", note: "בתגובה לסקר רויטרס בין כלכלנים; צופה העלאה של 25 נ\"ב בדצמבר, עם סיכון גבוה יותר ל-50 נ\"ב מאשר לאי-שינוי." }
  ],
  israel: [
    { title: "הרצוג יזמין את ראשי הסיעות להתייעצויות בשבוע הקרוב, רק לאחר אישור רשמי של התוצאה; הרשימה המשותפת מתנה תמיכה באיזנקוט", body: "לפי Republic World (28/10), הנשיא יצחק הרצוג הודיע כי ההתייעצויות הפורמליות עם ראשי הסיעות יתחילו רק לאחר שיו\"ר ועדת הבחירות המרכזית יגיש את התוצאה הרשמית הסופית, וכי יזמין את נציגי הסיעות להתייעצויות \"בשבוע הקרוב\" לפני שיטיל את המנדט הראשון להרכבת ממשלה; קרא לראשי הסיעות להגיע \"עם ראש פתוח\". בלוק נתניהו עומד על 53 מנדטים ובלוק איזנקוט על 48, בלי רוב של 61 לאף צד. הרשימה המשותפת (19 מנדטים), לפי ח\"כ אחמד טיבי ויו\"רה יוסף ג'בארין, הודיעה שתציע תמיכה חוץ-קואליציונית לממשלה בראשות גדי איזנקוט - בלי להצטרף אליה בפועל - בתמורה למחויבויות קונקרטיות בנושאים שנוגעים לאזרחים הערבים; נתניהו הגיב שבכך ג'בארין \"מתוודה\" שהבלוק של איזנקוט מתכנן להרכיב איתם ממשלה (Republic World; JNS, אוקטובר 2026). משמעות: גם לאחר שתאושר התוצאה הרשמית, השאלה אם איזנקוט יהיה מוכן להסתמך על תמיכה ערבית חוץ-קואליציונית כדי לעבור את רף 61 תהיה מרכזית בהרכבת הממשלה הבאה - או בדרך לסבב בחירות נוסף.", source: { name: "Republic World; JNS, אוקטובר 2026", url: "https://www.republicworld.com/global-news/arrive-with-an-open-mind-israeli-president-herzog-urges-party-leaders-ahead-of-coalition-talks-2026-10-28-139882" } }
  ],
  sources: [
    { name: "CNBC: סיכום המסחר של יום שישי, 30/10", url: "https://www.cnbc.com/2026/10/30/billions-in-crypto-frozen-in-binance-hack-heres-what-happens-next-.html" },
    { name: "Yahoo Finance: וול סטריט הגרועה ביותר מאז יוני, 30/10", url: "https://finance.yahoo.com/markets/live/stock-market-today-friday-october-30-dow-sp-500-nasdaq-amazon-intel-ai-sell-off-191429143.html" },
    { name: "Republic World: הרצוג מזמין את ראשי הסיעות להתייעצויות, 28/10", url: "https://www.republicworld.com/global-news/arrive-with-an-open-mind-israeli-president-herzog-urges-party-leaders-ahead-of-coalition-talks-2026-10-28-139882" },
    { name: "JNS: הרשימה המשותפת מציעה תמיכה חוץ-קואליציונית בלי נתניהו", url: "https://www.jns.org/news/israel-news/arab-joint-list-says-will-offer-outside-support-for-coalition-without-netanyahu" },
    { name: "Investing.com: ביטקוין וסגירת אוקטובר", url: "https://investing.com" },
    { name: "Axios: הפד משאיר ריבית ללא שינוי, הנגידה קוק מצביעה נגד, 28/10", url: "https://www.axios.com/2026/10/28/fed-warsh-interest-rates-cook" },
    { name: "WSAU/Reuters: וורש אומר שפוליטיקה לא מילאה תפקיד בהחלטת הפד, 28/10", url: "https://wsau.com/2026/10/28/warsh-says-politics-played-no-role-in-feds-rate-decision-by-group-he-is-honored-to-lead/" },
    { name: "roic.ai: מד בועת ה-AI של ירדני, 21/10", url: "https://www.roic.ai/news/yardenis-ai-bubble-meter-flashes-warning-not-crash-signal-10-21-2026" },
    { name: "Mitrade: טום לי על ירידת התשואות והסייל-אוף ב-AI, 23/10", url: "https://www.mitrade.com/insights/news/live-news/article-3-2188255-20261023" },
    { name: "Benzinga: ג'יימי דיימון על AI והתחרות על הון", url: "https://www.benzinga.com/node/62202607" },
    { name: "PrimeXBT: סקר רויטרס - הפד ידלג על אוקטובר ויעלה בדצמבר", url: "https://primexbt.com/news/economists-expect-fed-to-hold-in-october-and-raise-rates-in-december-the-pol/" },
    { name: "S&P Global: תחזית הדו\"חות של מיקרוסופט ואלפאבית, 26/10", url: "https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/10/microsoft-and-alphabet-earnings-previews" },
    { name: "Defirate: שוקי חיזוי לבחירות הביניים - הבית והסנאט", url: "https://defirate.com/?p=7780" },
    { name: "Apple Investor Relations / MacRumors: תאריך דו\"ח אפל, 2/11", url: "https://www.macrumors.com/2026/10/06/apple-q4-2026-earnings-nov-2" }
  ]
};
