import { send } from "../utilities";
async function saveComparisonToHistory(winner: string, categories: Record<string, string>) {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    

    await send("saveComparison", {
        userId,
        leftCar: currentCar1,
        rightCar: currentCar2,
        winner,
        categoriesJson: JSON.stringify(categories),
    });
}




const selectcar1 = document.getElementById("selectcar1") as HTMLSelectElement;
const selectcar2 = document.getElementById("selectcar2") as HTMLSelectElement;

const div1 = document.getElementById("div1")!;
const div2 = document.getElementById("div2")!;
const div3 = document.getElementById("div3")!;
const div4 = document.getElementById("div4")!;
const div5 = document.getElementById("div5")!;
const div6 = document.getElementById("div6")!;
const div7 = document.getElementById("div7")!;
const div8 = document.getElementById("div8")!;

let currentCar1 = selectcar1.value;
let currentCar2 = selectcar2.value;

const carData: Record<string, { model: string; price: string; year: string; Horsepower: string }> = {
    lamborgini: {
        model: "Aventador",
        price: "2,500,000$",
        year: "2023",
        Horsepower: "770"
    },
    cadilac: {
        model: "ATS-V",
        price: "85,000$",
        year: "2022",
        Horsepower: "564"
    },
    kia: {
        model: "Sportage",
        price: "30,000$",
        year: "2021",
        Horsepower: "150"
    },
    mizubishi: {
        model: "Outlander",
        price: "28,000$",
        year: "2022",
        Horsepower: "210"
    }
};

function updateComparison() {
    [div1, div2, div3, div4, div5, div6, div7, div8].forEach(div => {
        div.style.color = "";
    });

    const car1 = carData[currentCar1.toLowerCase()];
    const car2 = carData[currentCar2.toLowerCase()];

    if (car1) {
        div1.textContent = car1.model;
        div3.textContent = car1.price;
        div5.textContent = car1.year;
        div7.textContent = car1.Horsepower;
    }

    if (car2) {
        div2.textContent = car2.model;
        div4.textContent = car2.price;
        div6.textContent = car2.year;
        div8.textContent = car2.Horsepower;
    }
}

selectcar1.onchange = function () {
    currentCar1 = selectcar1.value;
    updateComparison();
    resetAllCompareStyles()
};

selectcar2.onchange = function () {
    currentCar2 = selectcar2.value;
    updateComparison();
    resetAllCompareStyles()
};

const compareButton = document.getElementById("comparebutton") as HTMLButtonElement;

compareButton.onclick = function () {
    const categoryResults: Record<string, string> = {};

    const results = [
        ["div3", "div4", true, "price"],
        ["div5", "div6", false, "year"],
        ["div7", "div8", false, "horsepower"]
    ];

    for (const [id1, id2, lowerIsBetter, label] of results) {
        const outcome = compareValues(id1 as string, id2 as string, lowerIsBetter as boolean);
        categoryResults[label as string] = outcome;
    }

    // Determine the winner
    let winner: string = "tie";
    const score = { [currentCar1]: 0, [currentCar2]: 0 };
    for (const result of Object.values(categoryResults)) {
        if (result === "left") score[currentCar1]++;
        else if (result === "right") score[currentCar2]++;
    }
    if (score[currentCar1] > score[currentCar2]) winner = currentCar1;
    else if (score[currentCar2] > score[currentCar1]) winner = currentCar2;

    saveComparisonToHistory(winner, categoryResults);
};


function resetAllCompareStyles() {
    document.querySelectorAll(".winner, .equal, .compared").forEach(el => {
        el.classList.remove("winner", "equal", "compared");
        (el as HTMLElement).style.color = ""; // Also clear any manual red coloring
    });
}

function compareValues(id1: string, id2: string, lowerIsBetter: boolean): "left" | "right" | "equal" {
    const el1 = document.getElementById(id1)!;
    const el2 = document.getElementById(id2)!;

    const val1 = parseValue(el1.textContent || "");
    const val2 = parseValue(el2.textContent || "");

    el1.classList.remove("winner", "equal");
    el2.classList.remove("winner", "equal");

    el1.classList.add("compared");
    el2.classList.add("compared");

    if (val1 === val2) {
        el1.classList.add("equal");
        el2.classList.add("equal");
        return "equal";
    } else if ((val1 < val2) === lowerIsBetter) {
        el1.classList.add("winner");
        el2.style.color = "red";
        return "left";
    } else {
        el2.classList.add("winner");
        el1.style.color = "red";
        return "right";
    }
}




function parseValue(text: string): number {
    const cleaned = text.replace(/[^\d.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}


const addCarButton = document.getElementById("addCarButton")!;
const popup = document.getElementById("carPopup")!;
const closePopupButton = document.getElementById("closePopupButton")!;
const submitCarButton = document.getElementById("submitCarButton")!;

addCarButton.onclick = () => popup.classList.remove("hidden");
closePopupButton.onclick = () => popup.classList.add("hidden");

submitCarButton.onclick = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("You need to be logged in.");
        return;
    }

    const name = (document.getElementById("inputCarName") as HTMLInputElement).value.trim();
    const model = (document.getElementById("inputModel") as HTMLInputElement).value.trim();
    const price = parseInt((document.getElementById("inputPrice") as HTMLInputElement).value);
    const year = parseInt((document.getElementById("inputYear") as HTMLInputElement).value);
    const Horsepower = (document.getElementById("inputHorsepower") as HTMLInputElement).value.trim();

    if (!name || !model || !Horsepower || isNaN(price) || isNaN(year)) {
        alert("Fill in all fields correctly.");
        return;
    }

    const response = await send("addcar", {
        userId,
        name,
        model,
        price,
        year,
        Horsepower,
    });

    if (response.success) {
        const option1 = document.createElement("option");
        option1.value = name;
        option1.textContent = name;
        selectcar1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = name;
        option2.textContent = name;
        selectcar2.appendChild(option2);

        carData[name.toLowerCase()] = { model, price: price + "$", year: year.toString(), Horsepower };
        popup.classList.add("hidden");
    } else {
        alert("Failed to add car.");
    }
};
let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;
logOutButton.onclick = async function (): Promise<void> {
    localStorage.removeItem("userId");
    location.href = "index.html";
};
window.onload = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const response = await send("getcars", { userId });
    if (!response?.cars) return;

    for (const car of response.cars) {
        const name = car.name;
        carData[name.toLowerCase()] = {
            model: car.model,
            price: car.price + "$",
            year: car.year.toString(),
            Horsepower: car.Horsepower
        };

        const option1 = document.createElement("option");
        option1.value = name;
        option1.textContent = name;
        selectcar1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = name;
        option2.textContent = name;
        selectcar2.appendChild(option2);
    }
};
async function showWelcomeUser() {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const response = await send("getusername", userId);
    if (response && response.username) {
        const welcomeDiv = document.getElementById("welcomeUser");
        if (welcomeDiv) {
            welcomeDiv.textContent = `Welcome ${response.username}!`;
        }
    }
}

showWelcomeUser();