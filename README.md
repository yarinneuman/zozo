# Zozo

אפליקציית שוק ההון של ירין — תדריך שוק, איתותי MA150, מצב חריג (SPY + Fear & Greed), סקטורים ותעודות סל, ביצועי איתותים, רשימת מעקב, לוח אירועים, תיק וירטואלי ומילון.

## הרצה
```
powershell -ExecutionPolicy Bypass -File serve.ps1
```
ואז לפתוח http://localhost:5173 (בלי Node או Python — שרת PowerShell קטן).

## איך זה עובד
- `index.html` + `assets/` — אתר סטטי (HTML/CSS/JS נקי, בלי build).
- `data/*.js` — כל הנתונים. נכתבים ע"י הסקיל **zozo-refresh** של Claude ("עדכן את זוזו"), שמריץ את הלוגיקה של market-intel-brief, ma150-daily-screen ו-spy-fear-greed-alert.
- `tools/zozo-data.ps1` — נתוני מחיר יומיים מ-Yahoo: `-Mode spy | screen | prices | etf`.
- `tools/market.mjs` — (Node) כל מניות ארה"ב: `data/movers.js` (תנועות חזקות) ו-`data/universe.js` (הנתונים של סורק המניות, כ-2,500 מניות מעל מיליארד דולר).
- `tools/build-artifact.ps1` — בונה את `dist/zozo.html` לעמוד ב-Claude; הקוד והנתונים מתפרסמים לידו כקבצים נפרדים (`dist/files.json`).
- PWA: `manifest.json` + `sw.js` + `assets/icons/` — אפשר להתקין את האתר כאפליקציה כשהוא מתארח ב-HTTPS.
- `tools/sp500.txt/.tsv` — רשימת מניות S&P 500 (מוויקיפדיה).
- רשימת מעקב ותיק וירטואלי נשמרים ב-localStorage של הדפדפן.

## העלאה לאינטרנט
התיקייה כולה סטטית — אפשר לגרור אותה ל-Netlify Drop או להעלות ל-GitHub Pages / Vercel כמו שהיא.

## שלב הבא (שיתופי)
Supabase: התחברות, רשימות ותיקים בענן, הרשמה להתראות, תגובות על איתותים.

> המידע אינו ייעוץ השקעות.
