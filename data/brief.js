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
  updatedAt: "2026-10-21T08:20:00+03:00",
  edition: "יומי",
  headline: "נטפליקס מכה בתחזיות הרבעון אך המניה נופלת כ-5%-6% על תחזית רבעון רביעי חלשה; וול סטריט בכל זאת ננעלת בעלייה בהובלת הדאו על רקע נפט יורד; <em>הערב מדווחות טסלה ו-IBM</em>, ובישראל בנק ישראל מכריע על הריבית ב-16:00 - 6 ימים לפני הבחירות",
  thesis: "נטפליקס דיווחה אתמול (20/10) על רבעון שלישי חזק מהצפי - רווח למניה של 0.87$ (לעומת 0.59$ בשנה שעברה) ושיעור רווחיות תפעולית של 34.6% - אך המניה נפלה בכל זאת כ-5%-6%, אחרי שהחברה הציגה תחזית הכנסות לרבעון הרביעי (13.4 מיליארד דולר) מתחת לקונצנזוס, גזרה את תחזית הכנסות הפרסום לשנת 2026 וחתכה את תחזית שיעור הרווחיות לרבעון הרביעי ביותר מ-8 נקודות אחוז, בין היתר בשל פיטורים שהוכרזו לאחרונה. מדדי וול סטריט בכל זאת ננעלו בעלייה - דאו ג'ונס קפץ 1.02%, S&P 500 עלה 0.28% ונאסד\"ק קומפוזיט נותר כמעט ללא שינוי - בהובלת דוחות חיוביים ונפילת מחירי הנפט, שקיזזו המשך לחץ על מניות ה-AI. היום (21/10) מדווחות טסלה ו-IBM אחרי הנעילה, ובישראל בנק ישראל יכריע על הריבית ב-16:00 - יומיים לפני שהמירוץ לבחירות (27/10) מגיע לסופו, עם סקרים שממשיכים להצביע על מירוץ צמוד.",
  bottomLine: [
    "וול סטריט ננעלה בשלישי (20/10) בעלייה: דאו ג'ונס קפץ 1.02% ל-52,495.88 נק', S&P 500 עלה 0.28% ל-7,712.57 נק' וראסל 2000 זינק 1.65% ל-2,773.42 נק', בעוד נאסד\"ק קומפוזיט נסגר כמעט ללא שינוי (-0.02%) ב-26,424.82 נק'. דוחות חיוביים ונפילת מחירי הנפט הניעו את העלייה, וקיזזו המשך לחץ שנרשם לאחרונה על מניות הקשורות ל-AI (CNBC; 20/10).",
    "נטפליקס הכתה את התחזיות ברבעון השלישי: הכנסות עלו 12% לעומת התקופה המקבילה (בהתאם לתחזית החברה עצמה), רווח תפעולי הגיע ל-4.5 מיליארד דולר (עלייה של 37%) ושיעור הרווחיות התפעולית טיפס ל-34.6% לעומת 28.2% לפני שנה; הרווח למניה (מדולל) הגיע ל-0.87$ לעומת 0.59$ ברבעון המקביל - מעל קונצנזוס האנליסטים שעמד על כ-0.82$ (הודעת רווחים רשמית של נטפליקס, הגשת 8-K ל-SEC; 20/10). עם זאת, המניה נפלה כ-5%-6% אחרי הדיווח: החברה הציגה תחזית הכנסות לרבעון הרביעי של 13.4 מיליארד דולר - מתחת לקונצנזוס של כ-13.52 מיליארד - גזרה את תחזית הכנסות הפרסום לשנת 2026 לכ-2.7 מיליארד דולר (מכ-3 מיליארד), והציגה תחזית לשיעור רווחיות תפעולית של 26% ברבעון הרביעי - נפילה של למעלה מ-8 נקודות אחוז, חלקה (כ-1.2 נקודות אחוז) על רקע פיטורים שהוכרזו לאחרונה בחברה (כ-800 עובדים לפי דיווחי רויטרס מוקדמים יותר החודש). משמעות: גם הכאה ברורה בתחזיות לא הספיקה כשההכוונה קדימה מרמזת על האטה בקצב הצמיחה.",
    "היום (21/10) אחרי נעילת המסחר מדווחות טסלה ו-IBM. טסלה כבר דיווחה על 486,532 מסירות ברבעון השלישי - מעל קונצנזוס האנליסטים (461,974) - והקונצנזוס להכנסות הרבעון עומד על כ-27.6 מיליארד דולר ול-EPS של כ-0.26$ (GAAP).",
    "הפד: כלי FedWatch של CME ממשיך לתמחר רוב גדול להחזקת הריבית בהחלטה הקרובה (27-28/10) - כ-83%-85% סיכוי להחזקה לעומת כ-15%-17% סיכוי להעלאה - ללא שינוי מהותי מהשבוע שעבר (Yardeni Research; השבוע). ריי דליו אמר בכנס Forbes Global CEO בסינגפור (7/10) כי ה-AI הוא \"בועה קלאסית\" המתקרבת לנקודת שבר, על רקע המימון הממונף הנדרש לבניית תשתיות הבינה המלאכותית.",
    "בישראל: בנק ישראל יכריע היום (21/10, 16:00) על הריבית - זו ההחלטה השביעית שלו ב-2026, והריבית הנוכחית עומדת על 3.25% מאז הורדה ב-1/9, עם אינפלציה שנתית של 1.5%-1.6%. שוקי החיזוי (Polymarket, נכון לאמצע החודש) מתמחרים כ-75%-77% סיכוי להחזקה לעומת כ-22% סיכוי להורדה נוספת. הבחירות לכנסת ה-26 בעוד 6 ימים (27/10): סקרים מה-18-19/10 ממשיכים להצביע על מירוץ צמוד - סקר כאן חדשות (18/10) נתן למפלגת ישר! בהנהגת גדי איזנקוט 23 מנדטים לעומת 21 לליכוד; סקר חדשות 12 (19/10) נתן לגוש הנגדי לנתניהו 55 מנדטים לעומת 51 לגוש נתניהו; סקר חדשות 13 (19/10) נתן לגושים 51 מול 50; וממוצע הסקרים של אתר סרוגים (נכון ל-19/10) נתן לליכוד 22 מנדטים ולישר! 21, עם גוש ימין של 55 מול גוש מרכז-שמאל של 48 ומפלגות ערביות עם 13 - בלי שאף גוש עובר את רף 61 המנדטים."
  ],
  snapshot: [
    { k: "S&P 500 (20/10)", v: "7,712.57", c: "+0.28%", dir: "up" },
    { k: "דאו ג'ונס (20/10)", v: "52,495.88", c: "+1.02%", dir: "up" },
    { k: "נאסד\"ק Composite (20/10)", v: "26,424.82", c: "-0.02%", dir: "flat" },
    { k: "ראסל 2000 (20/10)", v: "2,773.42", c: "+1.65%", dir: "up" },
    { k: "נטפליקס (אחרי הדוחות, 20-21/10)", v: "ירידה אחרי הדוחות", c: "כ--5% עד -6%, חרף הכאת התחזיות", dir: "down" },
    { k: "ת\"א 35 (20/10, קריאת ביניים 13:04)", v: "כ-4,211.51", c: "+0.14% (קריאת ביניים, לא נעילה מאומתת)", dir: "flat" },
    { k: "ביטקוין (20/10)", v: "כ-$81,400–83,000 (תנודתי)", c: "לחץ על רקע מתיחות במזרח התיכון ועלויות נפט", dir: "down" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "FedWatch (השבוע): החזקה ~83-85% · העלאה ~15-17%, הבאה 27-28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "מאז 1/9; החלטה היום 21/10 16:00, שוקי חיזוי ~75-77% להחזקה", dir: "flat" }
  ],
  changes: [
    { topic: "ימים לבחירות בישראל", from: "7 ימים (20/10)", to: "6 ימים (21/10)" },
    { topic: "S&P 500", from: "7,690.73 נק' (+0.4%, 19/10)", to: "7,712.57 נק' (+0.28%, 20/10)" },
    { topic: "נטפליקס", from: "קונצנזוס לפני הדוחות: EPS כ-0.82$ (לפני 20/10)", to: "דיווח בפועל: EPS 0.87$, אך המניה נפלה כ-5%-6% על תחזית חלשה (20-21/10)" }
  ],
  ai: [],
  macro: {
    fedwatch: { meeting: "אוקטובר (27-28/10)", cut: 0, hold: 84, hike: 16 },
    polymarket: { cut: 0, hold: 87, hike: 12, url: "https://defirate.com/odds/fed-decision/" },
    items: [
      { title: "FedWatch ממשיך לתמחר החזקה ברוב גדול באוקטובר; דליו מזהיר מ\"בועת AI קלאסית\"", body: "כלי FedWatch של CME ממשיך לתמחר נכון לשבוע זה סיכוי של כ-83%-85% להחזקת הריבית בהחלטת 27-28/10, לצד כ-15%-17% סיכוי להעלאה - תמונה דומה לזו שתומחרה בשבוע שעבר, לפי Yardeni Research. בנפרד, ריי דליו אמר בכנס Forbes Global CEO בסינגפור (7/10) שה-AI הוא \"בועה קלאסית\" המתקרבת לנקודת שבר, וקשר זאת לכמות החוב העצומה שמגויסת למימון תשתיות הבינה המלאכותית ולעליית הריבית. משמעות: תמחור השוק להחלטת הפד נשאר יחסית יציב, אך קולות בכירים בשוק ממשיכים להזהיר ממימון ממונף מדי בסקטור ה-AI.", source: { name: "Yardeni Research / Business Standard (Ray Dalio, Forbes Global CEO Conference)", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html", date: "7-20/10" } }
    ]
  },
  voices: [
    { name: "קווין וורש", role: "יו\"ר הפדרל ריזרב", stance: "ניטרלי", he: "אני לא קובע מראש תוצאות של ישיבות.", en: "I don't prejudge meetings.", date: "16/10", url: "https://tradingeconomics.com/united-states/interest-rate/news/592678", note: "בשיחה פומבית בכנס ה-IMF/הבנק העולמי בבנגקוק, כשנמנע מלאותת על כיוון החלטת הריבית הקרובה." },
    { name: "בת' האמאק", role: "נגידת הפדרל ריזרב של קליבלנד", stance: "ניצי", he: "המדיניות הנוכחית אינה מרסנת מספיק.", en: "Current policy is not restrictive enough.", date: "11/10", url: "https://www.roic.ai/news/feds-hammack-calls-for-more-tightening-warns-inflation-risk-becoming-entrenched-10-12-2026", note: "בדיווח ה-Wall Street Journal; האמאק קוראת לפד לפעול בצעדים קטנים ותכופים יותר, ונמנית עם החברים הניציים בוועדה המוניטרית." },
    { name: "ריי דליו", role: "מייסד Bridgewater Associates", stance: "דובי", he: "אנחנו בחלק של המחזור שהוא לפני זה אבל מתקרב לזה.", en: "We're in the part of the cycle that is before that but approaching that.", date: "7/10", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html", note: "בכנס Forbes Global CEO בסינגפור, כשתיאר את ה-AI כ\"בועה קלאסית\" המתקרבת לנקודת שבר על רקע חוב ממונף ועליית ריבית." },
    { name: "גדי איזנקוט", role: "יו\"ר מפלגת ישר, מתמודד על ראשות הממשלה", stance: "ניטרלי", he: "שיבוא לדיבייט בכל ערוץ שירצה, בכל פורמט שירצה. הוא יקבע את החוקים, את המקום, ובכל יום נזכיר לתקשורת הישראלית את זה.", en: "Let him come to a debate on whatever channel he wants, in whatever format he wants. He will set the rules, the place, and every day we will remind the Israeli media about it.", date: "לקראת 7/10", url: "https://www.i24news.tv/en/news/israel-election-s-2026/artc-gadi-eisenkot-challenges-netanyahu-to-televised-debate-ahead-of-israel-election", note: "בכנס מפלגתי ברמת גן, באתגר שהפנה לנתניהו לדיבייט טלוויזיה לפני הבחירות ב-27/10." }
  ],
  israel: [
    { title: "בנק ישראל מכריע על הריבית היום ב-16:00; הבחירות בעוד 6 ימים, סקרים ממשיכים להצביע על מירוץ צמוד מאוד", body: "בנק ישראל יפרסם היום, רביעי 21/10 בשעה 16:00, את החלטת הריבית השביעית שלו ב-2026. הריבית הנוכחית עומדת על 3.25% מאז הורדה של 0.25 נקודת אחוז ב-1/9, והאינפלציה השנתית עומדת על 1.5%-1.6% - מתחת לאמצע יעד האינפלציה. שוקי החיזוי (Polymarket, נכון לאמצע אוקטובר) מתמחרים כ-75%-77% סיכוי להחזקת הריבית וכ-22% סיכוי להורדה נוספת; קרבת הבחירות נחשבת לגורם נוסף שעשוי לדחוף את הוועדה המוניטרית להחזיק. קריאת ביניים של מדד ת\"א 35 ב-20/10 (13:04) עמדה על כ-4,211.51 נק', עלייה של כ-0.14% מהנעילה הקודמת (4,205.72 נק', 19/10) - נתון זה הוא קריאת ביניים של הבורסה לניירות ערך ולא נעילה מאומתת. הבחירות לכנסת ה-26 (27/10, בעוד 6 ימים) ממשיכות להיות צמודות מאוד: סקר כאן חדשות שפורסם ב-18/10 נתן למפלגת ישר! בהנהגת גדי איזנקוט 23 מנדטים לעומת 21 לליכוד; סקר חדשות 12 מה-19/10 נתן לגוש הנגדי לנתניהו (בהנהגת איזנקוט) 55 מנדטים לעומת 51 לגוש נתניהו; סקר חדשות 13 מאותו יום נתן לגושים 51 מול 50; וממוצע הסקרים של אתר סרוגים, נכון ל-19/10, נתן לליכוד 22 מנדטים ולישר! 21, עם גוש ימין בגודל 55 מנדטים מול גוש מרכז-שמאל בגודל 48 ומפלגות ערביות עם 13 מנדטים - בלי שאף גוש עובר את רף 61 המנדטים הדרוש להרכבת קואליציה. משמעות: שבוע קריטי בישראל - החלטת ריבית בצל קרבת הבחירות, במירוץ שהסקרים מראים כצמוד באופן עקבי, עם פערים של מנדט או שניים בין הגושים שתלויים בסוקר.", source: { name: "Polymarket / Kan News / Channel 12 / Channel 13 / Srugim poll average", url: "https://www.srugim.co.il/elections/elections2026", date: "7-19/10" } }
  ],
  sources: [
    { name: "Netflix: הודעת רווחים רשמית לרבעון השלישי 2026 (הגשת 8-K ל-SEC), 20/10", url: "https://www.sec.gov/Archives/edgar/data/0001065280/000106528026000290/ex991_q326.htm" },
    { name: "fxstreet: נטפליקס נופלת כ-5% חרף הכאת התחזיות, 20/10", url: "https://www.fxstreet.com/news/netflix-shares-slide-5-despite-q3-earnings-beat-202610202019" },
    { name: "tradingkey: למה נטפליקס נפלה כ-6% חרף הכאת התחזיות", url: "https://www.tradingkey.com/analysis/stocks/us-stocks/262227807-why-netflix-shares-fell-beating-earnings-expectations-tradingkey" },
    { name: "roic.ai (Reuters): נטפליקס מתכננת לקצץ כ-800 משרות, 14/10", url: "https://www.roic.ai/news/netflix-to-cut-800-jobs-as-growth-concerns-weigh-on-shares-10-14-2026" },
    { name: "CNBC: סיכום יום המסחר בוול סטריט, 20/10", url: "https://www.cnbc.com/2026/10/19/stock-market-today-live-updates.html" },
    { name: "econcurrents: סיכום נעילת השוק האמריקאי, 20/10", url: "https://econcurrents.substack.com/p/20-october-2026-market-close-and" },
    { name: "Business Standard: ריי דליו על \"בועת AI קלאסית\", כנס Forbes Global CEO בסינגפור, 7/10", url: "https://www.business-standard.com/world-news/ai-a-classic-bubble-that-is-nearing-bursting-point-warns-ray-dalio-126100700284_1.html" },
    { name: "invezz: סיכויי החזקת הפד עולים ל-85% אחרי דברי וורש, 16/10", url: "https://invezz.com/news/2026/10/16/fed-rate-hold-odds-jump-to-85-even-as-warsh-offers-no-clues-on-policy-path/" },
    { name: "Trading Economics: וורש בבנגקוק מחזק סיכויי החזקה באוקטובר, 16/10", url: "https://tradingeconomics.com/united-states/interest-rate/news/592678" },
    { name: "roic.ai (WSJ): נגידת הפד האמאק קוראת להעלאות נוספות, 11-12/10", url: "https://www.roic.ai/news/feds-hammack-calls-for-more-tightening-warns-inflation-risk-becoming-entrenched-10-12-2026" },
    { name: "Yahoo Finance: מחירי ביטקוין ואת'ריום, 20/10 - נפט עולה על רקע מתיחות במזרח התיכון", url: "https://finance.yahoo.com/personal-finance/investing/article/bitcoin-and-ethereum-prices-today-tuesday-october-20-2026-crypto-prices-slide-and-oil-costs-soar-as-mid-east-attacks-persist-114152288.html" },
    { name: "TASE: נתוני מדד ת\"א 35, קריאת ביניים 20/10", url: "https://market.tase.co.il/en/market_data/index/142/major_data" },
    { name: "PredScope (Polymarket): סיכויי החלטת בנק ישראל באוקטובר", url: "https://predscope.com/event/bank-of-israel-decision-in-october" },
    { name: "כאן חדשות: סקר מנדטים, 18/10", url: "https://www.zman.co.il/live/734411/" },
    { name: "Srugim: ממוצע סקרי בחירות 2026, נכון ל-19/10", url: "https://www.srugim.co.il/elections/elections2026" },
    { name: "Haaretz: סקרי בחירות 2026, 19/10", url: "https://www.haaretz.co.il/news/elections/2026-10-19/ty-article/.premium/000001a1-553d-d9ef-afab-fd7d3deb0000" },
    { name: "i24NEWS: איזנקוט מזמין את נתניהו לדיבייט", url: "https://www.i24news.tv/en/news/israel-election-s-2026/artc-gadi-eisenkot-challenges-netanyahu-to-televised-debate-ahead-of-israel-election" }
  ]
};
