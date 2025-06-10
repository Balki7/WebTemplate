import { send } from "../utilities";

window.onload = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const history = await send("getComparisonHistory", userId);
    const tbody = document.querySelector("#historyTable tbody")!;

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

function colorClass(winner: string): string {
    if (winner === "left") return "green";
    if (winner === "right") return "red";
    return "gray";
}