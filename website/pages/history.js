// מייבא את הפונקציה send מקובץ utilities
import { send } from "../utilities";
// כשהדף נטען
window.onload = async () => {
    const userId = localStorage.getItem("userId"); // לוקח את מזהה המשתמש מה-localStorage
    if (!userId)
        return; // אם אין משתמש מחובר, לא ממשיך
    const history = await send("getComparisonHistory", userId); // שולח בקשה לשרת לקבלת היסטוריית השוואות
    // אם אין היסטוריה בכלל, מציג הודעה בקונסול ולא ממשיך
    if (!history || history.length === 0) {
        console.log("No history data available");
        return;
    }
    const tbody = document.querySelector("#historyTable tbody"); // בוחר את גוף הטבלה (tbody) שבה יוצגו הנתונים
    // עובר על כל פריט בהיסטוריה ומכניס שורה חדשה לטבלה
    for (const entry of history) {
        console.log("Entry:", entry); // הדפסת הפריט בקונסול (לבדיקה/debugging)
        const row = document.createElement("tr"); // יצירת שורת טבלה חדשה
        const date = new Date(entry.Timestamp); // המרת ה-Timestamp לתאריך רגיל
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
function colorClass(winner) {
    if (winner === "left")
        return "green"; // אם השמאלי ניצח - ירוק
    if (winner === "right")
        return "red"; // אם הימני ניצח - אדום
    return "gray"; // תיקו - אפור
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFcEMsYUFBYTtBQUNiLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdkIsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztJQUNyRixJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sQ0FBQywrQkFBK0I7SUFFcEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUM7SUFFckcscURBQXFEO0lBQ3JELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMsT0FBTztJQUNYLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFFLENBQUMsQ0FBQyw4Q0FBOEM7SUFFNUcsbURBQW1EO0lBQ25ELEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBRSx5Q0FBeUM7UUFFeEUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUNqRSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRSwrQkFBK0I7UUFFeEUsMENBQTBDO1FBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUc7a0JBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRTtrQkFDckIsS0FBSyxDQUFDLFdBQVc7a0JBQ2pCLEtBQUssQ0FBQyxZQUFZO2tCQUNsQixLQUFLLENBQUMsY0FBYztTQUM3QixDQUFDO1FBRUYsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHlCQUF5QjtJQUNyRCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsbUZBQW1GO0FBQ25GLFNBQVMsVUFBVSxDQUFDLE1BQWM7SUFDOUIsSUFBSSxNQUFNLEtBQUssTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLENBQUUsd0JBQXdCO0lBQ2hFLElBQUksTUFBTSxLQUFLLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQyxDQUFHLHVCQUF1QjtJQUMvRCxPQUFPLE1BQU0sQ0FBQyxDQUE0QixjQUFjO0FBQzVELENBQUMifQ==