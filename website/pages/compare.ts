import { send } from "../utilities";

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
};

selectcar2.onchange = function () {
    currentCar2 = selectcar2.value;
    updateComparison();
};

const compareButton = document.getElementById("comparebutton") as HTMLButtonElement;

compareButton.onclick = function () {
    compareValues("div3", "div4", true);
    compareValues("div5", "div6", false);
    compareValues("div7", "div8", false);
};

function compareValues(id1: string, id2: string, lowerIsBetter: boolean) {
    const el1 = document.getElementById(id1)!;
    const el2 = document.getElementById(id2)!;

    const val1 = parseValue(el1.textContent || "");
    const val2 = parseValue(el2.textContent || "");

    el1.style.color = "";
    el2.style.color = "";

    if (val1 === val2) {
        el1.style.color = "gray";
        el2.style.color = "gray";
    } else if ((val1 < val2) === lowerIsBetter) {
        el1.style.color = "green";
        el2.style.color = "red";
    } else {
        el1.style.color = "red";
        el2.style.color = "green";
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

async function loadAllCars() {
    const response = await send("getallcars", {});
    if (response && response.cars) {
        for (const car of response.cars) {
            // Avoid duplicates if already present
            if (!carData[car.name.toLowerCase()]) {
                const option1 = document.createElement("option");
                option1.value = car.name;
                option1.textContent = car.name;
                selectcar1.appendChild(option1);

                const option2 = document.createElement("option");
                option2.value = car.name;
                option2.textContent = car.name;
                selectcar2.appendChild(option2);
            }
            carData[car.name.toLowerCase()] = {
                model: car.model,
                price: car.price + "$",
                year: car.year.toString(),
                Horsepower: car.Horsepower
            };
        }
    }
}

loadAllCars();

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