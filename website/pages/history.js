import { send } from "../utilities";
window.onload = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId)
        return;
    const history = await send("getComparisonHistory", userId);
    // history is already a JS object/array here, so no parsing needed
    if (!history || history.length === 0) {
        console.log("No history data available");
        return;
    }
    const tbody = document.querySelector("#historyTable tbody");
    for (const entry of history) {
        console.log("Entry:", entry); // DEBUG: See the full entry
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
function colorClass(winner) {
    if (winner === "left")
        return "green";
    if (winner === "right")
        return "red";
    return "gray";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZCLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTNELGtFQUFrRTtJQUVsRSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3pDLE9BQU87SUFDWCxDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBRSxDQUFDO0lBRTdELEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBRSw0QkFBNEI7UUFFM0QsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdkMsR0FBRyxDQUFDLFNBQVMsR0FBRztZQUNaLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsS0FBSyxDQUFDLFdBQVc7WUFDakIsS0FBSyxDQUFDLFlBQVk7WUFDbEIsS0FBSyxDQUFDLGNBQWM7S0FDM0IsQ0FBQztRQUVFLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztBQUlMLENBQUMsQ0FBQztBQUVGLFNBQVMsVUFBVSxDQUFDLE1BQWM7SUFDOUIsSUFBSSxNQUFNLEtBQUssTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDO0lBQ3RDLElBQUksTUFBTSxLQUFLLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNyQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=