// מייבא את הפונקציה send מקובץ utilities
import { send } from "../utilities";

// כשהדף נטען
window.onload = async () => {
    const userId = localStorage.getItem("userId"); // לוקח את מזהה המשתמש מה-localStorage
    if (!userId) return; // אם אין משתמש מחובר, לא ממשיך

    const history = await send("getComparisonHistory", userId); // שולח בקשה לשרת לקבלת היסטוריית השוואות

    // אם אין היסטוריה בכלל, מציג הודעה בקונסול ולא ממשיך
    if (!history || history.length === 0) {
        console.log("No history data available");
        return;
    }

    const tbody = document.querySelector("#historyTable tbody")!; // בוחר את גוף הטבלה (tbody) שבה יוצגו הנתונים

    // עובר על כל פריט בהיסטוריה ומכניס שורה חדשה לטבלה
    for (const entry of history) {
        console.log("Entry:", entry);  // הדפסת הפריט בקונסול (לבדיקה/debugging)

        const row = document.createElement("tr"); // יצירת שורת טבלה חדשה
        const date = new Date(entry.Timestamp);  // המרת ה-Timestamp לתאריך רגיל

        // מילוי השורה עם תאים בהתאם לעמודות בטבלה
        row.innerHTML = `
            <td>${date.toLocaleString()}</td>  <!-- תאריך -->
            <td>${entry.LeftCarName}</td>       <!-- רכב שמאל -->
            <td>${entry.RightCarName}</td>      <!-- רכב ימין -->
            <td>${entry.WinningCarName}</td>    <!-- מנצח -->
        `;

        tbody.appendChild(row); // הוספת השורה לגוף הטבלה
    }
};

// פונקציה שמחזירה מחלקת צבע לפי מנצח (לא בשימוש כרגע, אבל יכולה לשמש לעיצוב עתידי)
function colorClass(winner: string): string {
    if (winner === "left") return "green";  // אם השמאלי ניצח - ירוק
    if (winner === "right") return "red";   // אם הימני ניצח - אדום
    return "gray";                            // תיקו - אפור
}
