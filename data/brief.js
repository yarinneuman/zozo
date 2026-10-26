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
  updatedAt: "2026-10-26T08:16:00+02:00",
  edition: "יומי",
  headline: "יום אחד לבחירות לכנסת ה-26 תחת איום נתניהו על איראן \"אל תבחנו אותנו\"; הנפט נסוג מהשיא בעקבות גישור קטארי וסירוב טראמפ לתקוף במוצ\"ש, <em>אך השוק נכנס לשבוע הרת-גורל</em> - החלטת הפד ברביעי ודו\"חות מיקרוסופט, אלפאבית ואמזון",
  thesis: "וול סטריט ננעלה בירידות ביום שישי (23/10), בלחץ עליית מחירי הנפט: דאו ג'ונס צנח 1.23% ל-52,215.16 נק', S&P 500 ירד 0.52% ל-7,623.68 נק' ונאסד\"ק קומפוזיט ירד 0.21% ל-25,955.34 נק', בעת שברנט זינק 3.1% ל-116.72$ לחבית - הגבוה ביותר מזה חודשים - על רקע חששות מתקיפה אמריקאית-ישראלית מחודשת באיראן. מאז, טראמפ הודיע במוצ\"ש (25/10) כי \"לא תהיה תקיפה היום\", ומשלחת גישור קטארית הגיעה לטהרן, מה שהרגיע את הנפט בפתיחת המסחר באסיה הבוקר; אך זה יום אחד בלבד לפני הבחירות לכנסת ה-26 (שלישי, 27/10), בעוד נתניהו מזהיר מניסיון איראני לשבש את ההצבעה, ולפנינו שבוע עמוס שיכלול גם את החלטת הפד (רביעי) ואת דו\"חות מיקרוסופט ואלפאבית (רביעי) ואמזון (חמישי).",
  bottomLine: [
    "יום אחד לבחירות לכנסת ה-26 (שלישי, 27/10): נתניהו הזהיר במוצ\"ש (25/10) כי איראן ושליחיה עלולים לנסות לשבש את ההצבעה, ואמר לטהרן \"אל תבחנו אותנו\"; גדי איזנקוט, בעצרת הסיום שלו בהאנגר 11 בנמל תל אביב (25/10), אמר כי \"נתניהו רוצה תיקו, אבל ישראל צריכה נוקאאוט\". הסקרים מאופלים מאז מוצ\"ש 23/10 (23:59), אך בשוק החיזוי Polymarket (סנאפשוט מ-25/10) איזנקוט מתומחר ב-52% סיכוי להיות ראש הממשלה אחרי ההצבעה, ומפלגת \"ישר!\" שלו ב-62% סיכוי לזכות במספר המנדטים הגדול ביותר, מול 39% לליכוד (Times of Israel; Ynet; Polymarket).",
    "הפד יכריע ברביעי (28/10, 20:00 בישראל): לפי DeFiRate (25/10), שוק החיזוי Kalshi מתמחר כ-93% סיכוי להחזקת הריבית על 3.75-4.00% וכ-7% סיכוי להעלאה - עלייה חדה מהסיכוי להחזקה שעמד על כ-83% בשבוע שעבר (20/10). הכלכלן מוחמד אל-אריאן אמר (כשבוע לפני ה-18/10) כי השוק מתמחר יותר מדי העלאות: \"אני לא חושב שנקבל שלוש\" עד ספטמבר 2027, והעריך שהסיכוי להעלאה באוקטובר נמוך מ-20%.",
    "הנפט נסוג בפתיחת המסחר באסיה הבוקר (26/10): ברנט ירד כ-1% לכ-115.5$ לחבית ו-WTI ירד כ-1.1% לכ-102.1$ (רויטרס, 26/10), אחרי שטראמפ הודיע במוצ\"ש \"לא תהיה תקיפה היום\" על איראן ומשלחת גישור קטארית הגיעה לטהרן בניסיון להרגיע את המתיחות - נסיגה קלה מהשיא של 116.72$ שנקבע ב-23/10, הגבוה ביותר מזה חודשים.",
    "הביטקוין בלחץ בסוף השבוע: המטבע צנח מתחת ל-80,000$ (CoinDesk, 24/10) על רקע חששות מהסלמה במזרח התיכון ופינוי אזרחים אמריקאים, ועמד על כ-80,481$ לפי CoinDesk (25/10, 18:09 לפי שעון ניו יורק) - ירידה מרמה של כ-81,700$ ביום שישי (23/10).",
    "שבוע דו\"חות מכריע לענקיות ה-AI: מיקרוסופט ואלפאבית ידווחו ברביעי (28/10) לאחר נעילת המסחר, ואמזון ביום חמישי (29/10) גם היא לאחר הנעילה. האנליסט דן איבס מוורבוש אמר (CNBC, 13/10) כי המכירה האחרונה במניות ה-AI \"מוגזמת מאוד\" וכינה אותה הזדמנות \"לקנות את המנצחות\", בעוד ליז אן סונדרס מצ'רלס שוואב הזהירה בסקירתה החודשית כי התבוננות ברמת המדדים בלבד \"מעריכה בחסר\" את העוצמה שבה נפגעו מניות רבות בשנה האחרונה. משמעות: הדו\"חות יגיעו יום בודד בלבד אחרי הבחירות בישראל והחלטת הפד - שבוע עמוס בסיכוני כותרות."
  ],
  snapshot: [
    { k: "S&P 500 (23/10)", v: "7,623.68", c: "-0.52%", dir: "down" },
    { k: "דאו ג'ונס (23/10)", v: "52,215.16", c: "-1.23%", dir: "down" },
    { k: "נאסד\"ק Composite (23/10)", v: "25,955.34", c: "-0.21%", dir: "down" },
    { k: "ברנט (26/10, אסיה)", v: "כ-115.5$", c: "-1%, נסיגה מהשיא של 116.72$ (23/10)", dir: "down" },
    { k: "ביטקוין (25/10, CoinDesk)", v: "כ-80,481$", c: "ירד מכ-81,700$ ב-23/10", dir: "down" },
    { k: "ריבית הפד", v: "3.75–4.00%", c: "Kalshi (25/10): החזקה כ-93%, הכרעה 28/10", dir: "flat" },
    { k: "ריבית בנק ישראל", v: "3.25%", c: "הוחזקה ב-21/10, שבוע לפני הבחירות", dir: "flat" }
  ],
  changes: [
    { topic: "ימים לבחירות בישראל", from: "יומיים (25/10)", to: "יום אחד (26/10) - נתניהו מזהיר מפני שיבוש איראני" },
    { topic: "Kalshi - סיכוי להחזקת הריבית באוקטובר", from: "כ-83% (20/10, FedWatch)", to: "כ-93% (25/10, DeFiRate/Kalshi)" },
    { topic: "ברנט", from: "116.72$, שיא של חודשים (23/10)", to: "כ-115.5$ (26/10) - נסיגה קלה בעקבות גישור קטארי וסירוב טראמפ לתקוף" }
  ],
  ai: [
    { title: "שבוע דו\"חות ה-AI הגדול: מיקרוסופט ואלפאבית ברביעי, אמזון בחמישי", body: "מיקרוסופט תדווח על הרבעון הראשון של שנת הפיסקלית 2027 ביום רביעי (28/10) לאחר נעילת המסחר, לפי הודעתה הרשמית. אלפאבית (גוגל) תדווח על הרבעון השלישי של 2026 גם היא ברביעי אחרי נעילת המסחר, עם שיחת משקיעים בשעה 16:30 לפי שעון מזרח ארה\"ב; אמזון תדווח יום לאחר מכן, חמישי (29/10), גם היא אחרי הנעילה, עם שיחה בשעה 17:00. שלוש החברות ייבחנו בעיקר על קצב ההשקעות בתשתיות AI (capex) והתשואה עליהן. באותו הקשר, האנליסט דן איבס מוורבוש אמר בראיון ל-CNBC (13/10) שהמכירה האחרונה במניות ה-AI/זיכרון \"מוגזמת מאוד\" וכינה את הרגע הזדמנות \"לקנות את המנצחות\" - בהן ציין את מיקרוסופט, אנבידיה, פלנטיר ו-CrowdStrike. משמעות: הדו\"חות יגיעו יום בודד בלבד אחרי החלטת הפד והבחירות בישראל - שבוע עמוס בסיכוני כותרות לשוק.", tickers: ["MSFT", "GOOGL", "AMZN", "NVDA"], source: { name: "Microsoft (הודעה רשמית); Benzinga - דן איבס, 13/10", url: "https://www.benzinga.com/node/62340990" } }
  ],
  macro: {
    fedwatch: { meeting: "אוקטובר (27-28/10)", cut: 0, hold: 93, hike: 7 },
    polymarket: { cut: 0, hold: 93, hike: 6.5, url: "https://defirate.com/odds/fed-decision/" },
    items: [
      { title: "יו\"ר הפד וורש: פיתוח ה-AI \"יהיה מאוד מטלטל\" (very bumpy), בלי לחשוף רמז לקראת ההחלטה", body: "יו\"ר הפדרל ריזרב קווין וורש אמר באירועי קרן המטבע והבנק העולמי בבנגקוק (16/10) שעליית ההוצאות על AI היא בבחינת \"זעזוע\" שעל קובעי המדיניות להכיר בו, וכי הדרך עשויה להיות \"מאוד מטלטל\" (very bumpy) גם אם ה-AI צפוי בסופו של דבר להגדיל את התפוקה. הוא נמנע מלתת רמז לקראת החלטת 27-28/10, ואמר שאינו \"קובע מסקנות מראש\" לגבי ישיבות עתידיות. לדברי Bloomberg, דבריו לא שינו את הערכת השוק שהפד יחזיק את הריבית בסוף החודש, בעוד גולדמן זאקס מצפה להעלאה שנייה ואחרונה בדצמבר.", source: { name: "Axios; CNBC; Bloomberg, 16/10", url: "https://www.axios.com/2026/10/16/warsh-federal-reserve-interest-rates" } },
      { title: "אל-אריאן: השוק מתמחר יותר מדי העלאות ריבית", body: "מוחמד אל-אריאן, היועץ הכלכלי הראשי של אליאנץ, אמר בראיון ל-CNBC שהשוק מתמחר כשתיים וחצי העלאות ריבית עד אמצע 2027 ושלוש עד ספטמבר 2027 - תמחור שלדעתו מוגזם, לאור חולשה בחלקים הרגישים לריבית במשק ודאגות גוברות סביב מסחר ה-AI. הוא העריך שהסיכוי להעלאה בהחלטת אוקטובר (27-28/10) נמוך מ-20%.", source: { name: "Stocktwits/TradingView, כ-18/10", url: "https://stocktwits.com/news-articles/markets/equity/el-erian-warns-markets-pricing-too-many-fed-rate-hikes/cZxNWUIRBtF" } }
    ]
  },
  voices: [
    { name: "מוחמד אל-אריאן", role: "יועץ כלכלי ראשי, אליאנץ", stance: "דובי", he: "אני לא חושב שנקבל שלוש.", en: "I don't think we're going to get three.", date: "כ-18/10", url: "https://stocktwits.com/news-articles/markets/equity/el-erian-warns-markets-pricing-too-many-fed-rate-hikes/cZxNWUIRBtF", note: "בתגובה לתמחור השוק של כשתיים וחצי העלאות עד אמצע 2027 ושלוש עד ספטמבר; הסיכוי להעלאה באוקטובר, לדעתו, נמוך מ-20%." },
    { name: "קאתי וד", role: "מייסדת ומנכ\"לית, ARK Invest", stance: "שורי", he: "העובדה שאנשים מפוחדים משמעה שאנחנו לא בבועה.", en: "The fact people are afraid means we are not in a bubble.", date: "16/10", url: "https://247wallst.com/investing/2026/10/19/were-still-in-the-parking-lot-cathie-wood-says-ai-isnt-a-bubble-heres-the-case-against-her/", note: "בכנס בסיאול; הוסיפה שלדעתה השוק \"עדיין בחניון לפני שנכנסנו למשחק הבייסבול\"." },
    { name: "ליז אן סונדרס", role: "אסטרטגית השקעות ראשית, Charles Schwab", stance: "זהיר", he: "מי שמתבונן רק ב-S&P 500 או בנאסד\"ק ברמת המדדים, בעצם מעריך בחסר כמה כאב חוו הרבה מניות בודדות בשנה האחרונה.", en: "If you only watched the S&P 500 or the NASDAQ at the index levels, you would actually underestimate how painful this year has been for many individual stocks.", date: "אוקטובר (סקירה חודשית)", url: "https://www.schwab.com/learn/story/market-snapshot", note: "ציינה שחלקם של המניות הנסחרות מעל הממוצעים הנעים ל-50 ול-200 יום צלל בחדות ב-S&P 500, בנאסד\"ק וברוסל 2000." },
    { name: "אד ירדני", role: "נשיא, Yardeni Research", stance: "זהיר", he: "המד אומר שיש בועה, אבל היא לא עומדת להתפוצץ.", en: "The meter says there's a bubble, but it's not about to burst.", date: "21/10", url: "https://www.roic.ai/news/yardenis-ai-bubble-meter-flashes-warning-not-crash-signal-10-21-2026", note: "מד בועת ה-AI שלו עומד על 83/100 ומד טריגרים לקריסה על 34/100 (נמוך); לפי החברה, רק 9% ממקרים דומים בעבר הובילו לשוק דובי בתוך שנתיים." },
    { name: "אמיר ירון", role: "נגיד בנק ישראל", stance: "ניטרלי", he: "זה הופך את שימור מרחב תמרון תקציבי הולם לחשוב אף יותר.", en: "it all the more important to preserve adequate fiscal policy space.", date: "21/10", url: "https://www.timesofisrael.com/central-bank-holds-rates-days-before-election-warns-next-government-on-fiscal-choices/", note: "בהודעה על החזקת הריבית על 3.25%, שבוע לפני הבחירות; ציין שהפרמיה הגיאופוליטית של ישראל נותרה דומה לרמות שלפני 7/10/23, אך השקל נחלש." },
    { name: "דן איבס", role: "אנליסט טכנולוגיה בכיר, Wedbush", stance: "שורי", he: "זה שוק עצבני בסך הכול... אני חושב שזה מוגזם מאוד.", en: "It's a jittery overall market... I think it's way overdone.", date: "13/10", url: "https://www.benzinga.com/node/62340990", note: "לגבי המכירה במניות הזיכרון וה-AI; כינה את הרגע \"הזדמנות לקנות את המנצחות\" וציין מיקרוסופט, אנבידיה, פלנטיר ו-CrowdStrike." }
  ],
  israel: [
    { title: "יום אחד לבחירות: נתניהו מזהיר מאיראן, איזנקוט דורש \"נוקאאוט\"", body: "הבחירות לכנסת ה-26 יתקיימו ביום שלישי, 27/10. נתניהו הזהיר במוצ\"ש (25/10), בהודעת וידאו, כי איראן ושליחיה עלולים לנסות לתקוף ולשבש את ההצבעה, ואמר לטהרן \"אל תבחנו אותנו\" - אזהרה שספג עליה ביקורת מיו\"ר האופוזיציה יאיר לפיד, שטען כי נתניהו מנסה לדחות את הבחירות; נתניהו גם דחה כ\"שטויות\" דיווח של ערוץ 12 על חיכוך עם הרמטכ\"ל איל זמיר בנוגע להנחיה מלחמתית חדשה. מנגד, גדי איזנקוט ערך את עצרת הסיום של מפלגתו \"ישר!\" בהאנגר 11 בנמל תל אביב (25/10), ואמר כי \"נתניהו רוצה תיקו, אבל ישראל צריכה נוקאאוט\"; הסלוגן בעצרת היה \"נתניהו צריך ללכת הביתה\". צה\"ל הודיע על סגר כללי על הפלסטינים בגדה המערבית ליום הבחירות. הסקרים מאופלים מאז מוצ\"ש 23/10 (23:59) ועד לסגירת הקלפיות (22:00 ב-27/10), אך בשוק החיזוי Polymarket (סנאפשוט מ-25/10) איזנקוט מתומחר ב-52% סיכוי להיות ראש הממשלה הבא, ובשוק נפרד על המפלגה הגדולה ביותר - \"ישר!\" מתומחרת ב-62% מול 39% לליכוד. משמעות: עם האיפול בתוקף, שוקי החיזוי - ולא סקרים - הם המדד הפומבי הקרוב ביותר למצב המירוץ בערב הבחירות.", source: { name: "Times of Israel; Ynetnews; Haaretz; Al Jazeera; Polymarket, 25-26/10", url: "https://www.timesofisrael.com/liveblog_entry/netanyahu-claims-iran-may-try-to-disrupt-election-warns-dont-test-us/" } },
    { title: "בנק ישראל החזיק את הריבית על 3.25% שבוע לפני הבחירות", body: "בנק ישראל הודיע ב-21/10 כי הוועדה המוניטרית מחזיקה את הריבית על 3.25%, בהתאם לתחזית כל 15 הכלכלנים שסקרה רויטרס, ולאחר שלושה הורדות רצופות. האינפלציה השנתית עלתה בספטמבר ל-1.6%, בתוך טווח היעד של 1%-3%, ותחזית הצמיחה של הבנק לשנת 2026 הועלתה ל-5.6%. הנגיד אמיר ירון אמר שההחזקה היא הצעד האחראי לאור שלוש ההורדות הרצופות וסיכונים גלובליים ומקומיים שונים, ודחה את הטענה שההחלטה נועדה להימנע מהשפעה על ההצבעה ביום שלישי, בהדגישו שהיא מבוססת על שיקולים כלכליים בלבד. הבנק ציין בהודעתו כי \"רמת חוסר הוודאות נותרה גבוהה לאור המתיחות הגיאופוליטית\", אך \"הפרמיה הגיאופוליטית של ישראל נותרה ברמות הדומות לאלו שלפני ה-7 באוקטובר 2023\", בעת שהשקל נחלש. משמעות: בנק ישראל נמנע מהלכה שתיתפס כהתערבות בסמוך לבחירות, ומשאיר את ההחלטה הבאה לאחר שינוי השלטון האפשרי.", source: { name: "בנק ישראל (הודעה רשמית); Times of Israel, 21/10", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/21-10-26ben/" } }
  ],
  sources: [
    { name: "Kiplinger: דאו צונח 652 נקודות על רקע עליית הנפט ותשואות האג\"ח, 23/10", url: "https://www.kiplinger.com/investing/stocks/dow-drops-652-points-as-oil-treasury-yields-rise-stock-market-today" },
    { name: "BBNTimes: דאו ג'ונס נופל ל-52,215.16 נק', 23/10", url: "https://bbntimes.com/global-economy/dow-jones-today-djia-falls-to-52-215-16-as-american-express-slides-and-oil-prices-jump" },
    { name: "Investing.com/Reuters: מניות אסיה בפתיחה מהוססת, ברנט נסוג משיא של חצי שנה, 26/10", url: "https://www.investing.com/news/stock-market-news/asian-shares-make-cautious-start-brent-eases-from-sixmonth-high-4971334" },
    { name: "Al Jazeera: טראמפ - לא תהיה תקיפה באיראן היום, מגשרים קטארים בטהרן, 25/10", url: "https://www.aljazeera.com/news/liveblog/2026/10/25/iran-war-live-trump-hints-at-possible-sunday-iran-attack-or-deal-reached" },
    { name: "CoinDesk: הביטקוין נופל מתחת ל-80,000$ על רקע פינוי אזרחים מהמזרח התיכון, 24/10", url: "https://www.coindesk.com/markets/2026/10/24/crypto-under-weekend-pressure-bitcoin-slides-below-usd80-000-on-u-s-middle-east-evacuations" },
    { name: "CoinDesk: מחיר הביטקוין, 25/10", url: "https://www.coindesk.com/price/bitcoin" },
    { name: "DeFiRate: סנאפשוט שוק החיזוי להחלטת הפד, 25/10", url: "https://defirate.com/odds/fed-decision/" },
    { name: "Axios: וורש משדר יציבות בפד חרף עליית האינפלציה, 16/10", url: "https://www.axios.com/2026/10/16/warsh-federal-reserve-interest-rates" },
    { name: "Stocktwits/TradingView: אל-אריאן מזהיר שהשוק מתמחר יותר מדי העלאות ריבית, כ-18/10", url: "https://stocktwits.com/news-articles/markets/equity/el-erian-warns-markets-pricing-too-many-fed-rate-hikes/cZxNWUIRBtF" },
    { name: "247wallst: קאתי וד - אנחנו עדיין בחניון, ה-AI לא בבועה, 19/10", url: "https://247wallst.com/investing/2026/10/19/were-still-in-the-parking-lot-cathie-wood-says-ai-isnt-a-bubble-heres-the-case-against-her/" },
    { name: "Charles Schwab: Market Snapshot - ליז אן סונדרס, אוקטובר", url: "https://www.schwab.com/learn/story/market-snapshot" },
    { name: "roic.ai: מד בועת ה-AI של ירדני מאותת אזהרה, לא קריסה, 21/10", url: "https://www.roic.ai/news/yardenis-ai-bubble-meter-flashes-warning-not-crash-signal-10-21-2026" },
    { name: "Benzinga: דן איבס - המכירה במניות ה-AI מוגזמת, 13/10", url: "https://www.benzinga.com/node/62340990" },
    { name: "בנק ישראל: הודעת הריבית, 21/10", url: "https://www.boi.org.il/en/communication-and-publications/press-releases/21-10-26ben/" },
    { name: "Times of Israel: הבנק המרכזי מחזיק את הריבית שבוע לפני הבחירות, 21/10", url: "https://www.timesofisrael.com/central-bank-holds-rates-days-before-election-warns-next-government-on-fiscal-choices/" },
    { name: "Times of Israel: נתניהו - איראן עלולה לשבש את הבחירות, אל תבחנו אותנו, 25/10", url: "https://www.timesofisrael.com/liveblog_entry/netanyahu-claims-iran-may-try-to-disrupt-election-warns-dont-test-us/" },
    { name: "Ynetnews: הבחירות נכנסות ל-24 השעות האחרונות, 25-26/10", url: "https://www.ynetnews.com/article/rjztupnngx" }
  ]
};
