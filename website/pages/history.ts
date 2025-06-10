import { send } from "../utilities";

window.onload = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const history = await send("getComparisonHistory", userId);

    // history is already a JS object/array here, so no parsing needed

    if (!history || history.length === 0) {
        console.log("No history data available");
        return;
    }

    const tbody = document.querySelector("#historyTable tbody")!;

    for (const entry of history) {
        console.log("Entry:", entry);  // DEBUG: See the full entry

        const row = document.createElement("tr");
        const date = new Date(entry.Timestamp);  

        row.innerHTML = `
      <td>${date.toLocaleString()}</td>
      <td>${entry.LeftCarName}</td>       
      <td>${entry.RightCarName}</td>    
      <td>${entry.WinningCarName}</td>   
    `;

        tbody.appendChild(row);
    }



};

function colorClass(winner: string): string {
    if (winner === "left") return "green";
    if (winner === "right") return "red";
    return "gray";
}