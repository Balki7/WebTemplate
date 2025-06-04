import { send } from "../utilities";

let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;
logOutButton.onclick = async function (): Promise<void> {
    localStorage.removeItem("userId");
    location.href = "index.html";
};

const selectcar1 = document.getElementById("selectcar1") as HTMLSelectElement;
const selectcar2 = document.getElementById("selectcar2") as HTMLSelectElement;
let currentCar1: string | null = null;
let currentCar2: string | null = null;

selectcar1.onchange = function () {
    currentCar1 = selectcar1.value;
    updateComparison();
};

selectcar2.onchange = function () {
    currentCar2 = selectcar2.value;
    updateComparison();
};

function updateComparison() {
    send("loadcar", {
        

    })

}
