import { send } from "../utilities";
window.onload = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId)
        return;
    const history = await send("getComparisonHistory", userId);
    const tbody = document.querySelector("#historyTable tbody");
    for (const entry of history) {
        const row = document.createElement("tr");
        const date = new Date(entry.timestamp);
        const categories = JSON.parse(entry.categoriesJson);
        row.innerHTML = `
            <td>${date.toLocaleString()}</td>
            <td>${entry.leftCarName}</td>
            <td>${entry.rightCarName}</td>
            <td>${entry.winningCarName}</td>
            <td class="${colorClass(categories.price)}">Price</td>
            <td class="${colorClass(categories.year)}">Year</td>
            <td class="${colorClass(categories.horsepower)}">Horsepower</td>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpc3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ3ZCLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXBCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUUsQ0FBQztJQUU3RCxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzFCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxTQUFTLEdBQUc7a0JBQ04sSUFBSSxDQUFDLGNBQWMsRUFBRTtrQkFDckIsS0FBSyxDQUFDLFdBQVc7a0JBQ2pCLEtBQUssQ0FBQyxZQUFZO2tCQUNsQixLQUFLLENBQUMsY0FBYzt5QkFDYixVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzt5QkFDNUIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7eUJBQzNCLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1NBQ2pELENBQUM7UUFFRixLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixTQUFTLFVBQVUsQ0FBQyxNQUFjO0lBQzlCLElBQUksTUFBTSxLQUFLLE1BQU07UUFBRSxPQUFPLE9BQU8sQ0FBQztJQUN0QyxJQUFJLE1BQU0sS0FBSyxPQUFPO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDckMsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9