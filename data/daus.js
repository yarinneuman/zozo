/* Zozo — "Daus in the margins". Written by Daus's scheduled tasks (daus-daily-stocks, daus-sunday-ai-market).
Schema:
{
  updatedAt: ISO,
  notes: [{ ticker, date: "YYYY-MM-DD", verdict: "agree"|"split"|"wait", text: string (Hebrew, one or two sentences) }],
  column: { date: "YYYY-MM-DD", title: string, body: [string paragraphs] } | null   // weekly, written on Sundays
}
A note shows next to a signal card only while that ticker is in data/signals.js. Opinion, not advice. */
window.ZOZO = window.ZOZO || {};
ZOZO.daus = {
 "updatedAt": "2026-10-03T09:45:00+03:00",
 "notes": [
  {
   "ticker": "NTRS",
   "date": "2026-10-03",
   "verdict": "agree",
   "text": "הנגיעה החזיקה: סגירה ב-170.56$ ב-2/10, כ-1.2% מעל ממוצע 150 עם שיפוע עולה. P/E קדימה 13.2 מול 13.5 בסקטור. הדוחות ב-21/10."
  },
  {
   "ticker": "UNP",
   "date": "2026-10-03",
   "verdict": "split",
   "text": "הטכני נקי: נסחרה ב-2/10 כ-1.9% מעל ממוצע 150, בשיפוע עולה. הערך הוגן ולא זול (P/E קדימה 19.2), ומיזוג Norfolk Southern עוד ממתין לאישור STB."
  },
  {
   "ticker": "ROP",
   "date": "2026-10-03",
   "verdict": "split",
   "text": "זולה לעסק תוכנה (P/E קדימה 14.9), אבל המחיר 30% מתחת לשיא ומתחת לממוצע 200. יש גם מינוף של 3.1 והדוחות ב-22/10. העדשות חלוקות."
  },
  {
   "ticker": "EOG",
   "date": "2026-10-02",
   "verdict": "agree",
   "text": "שתי העדשות מסכימות: P/E של 10.7 (קדימה 9.4) ודיבידנד 2.9%, והמחיר 1.7% מעל ממוצע 150 עם שיפוע עולה. הסיכון המרכזי הוא מחיר הנפט."
  },
  {
   "ticker": "SCHW",
   "date": "2026-10-02",
   "verdict": "agree",
   "text": "P/E קדימה 12.6, מתחת לממוצע הסקטור, והמחיר מעל ממוצע 150 עם שיפוע עולה. מרווח הביטחון קטן יותר: ירידה של 10% בחודש, והמחיר מתחת לממוצע 20. רגישה להורדות ריבית."
  },
  {
   "ticker": "GOOGL",
   "date": "2026-10-02",
   "verdict": "split",
   "text": "זולה רק על הנייר: P/E נגרר 17 מחמיא, אבל P/E קדימה 22.6. הנגיעה בממוצע 150 לא החזיקה ב-1/10. להמתין."
  },
  {
   "ticker": "UNH",
   "date": "2026-10-02",
   "verdict": "wait",
   "text": "מתחת לממוצע 150, הדוחות ב-13/10 וחקירת DOJ פתוחה. כניסה לפני הדוחות היא הימור, לא כניסה לפי הכלל."
  }
 ],
 "column": null
};
