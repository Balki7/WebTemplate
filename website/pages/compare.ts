// Assuming you have these selects and divs already in your HTML:
const selectcar1 = document.getElementById("selectcar1") as HTMLSelectElement;
const selectcar2 = document.getElementById("selectcar2") as HTMLSelectElement;

const div1 = document.getElementById("div1") as HTMLDivElement;
const div2 = document.getElementById("div2") as HTMLDivElement;
const div3 = document.getElementById("div3") as HTMLDivElement;
const div4 = document.getElementById("div4") as HTMLDivElement;
const div5 = document.getElementById("div5") as HTMLDivElement;
const div6 = document.getElementById("div6") as HTMLDivElement;
const div7 = document.getElementById("div7") as HTMLDivElement;
const div8 = document.getElementById("div8") as HTMLDivElement;

const addCarButton = document.getElementById("addCarButton") as HTMLButtonElement; // Your + button

const popup = document.getElementById("addCarPopup") as HTMLDivElement;
const inputName = document.getElementById("inputName") as HTMLInputElement;
const inputModel = document.getElementById("inputModel") as HTMLInputElement;
const inputPrice = document.getElementById("inputPrice") as HTMLInputElement;
const inputYear = document.getElementById("inputYear") as HTMLInputElement;
const inputEngine = document.getElementById("inputEngine") as HTMLInputElement;
const addCarSubmit = document.getElementById("addCarSubmit") as HTMLButtonElement;
const addCarCancel = document.getElementById("addCarCancel") as HTMLButtonElement;

let currentCar1 = selectcar1.value;
let currentCar2 = selectcar2.value;

interface Car {
    id: string;
    model: string;
    price: number;
    year: number;
    engine: string;
}

// Store cars locally for quick lookup:
let carsMap: Record<string, Car> = {};

// Load car data for a car id from server:
async function loadCarData(carName: string): Promise<Car | null> {
    try {
        const response = await fetch("/loadcar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: carName }),
        });
        if (!response.ok) return null;
        const car: Car = await response.json();
        carsMap[carName] = car; // cache
        return car;
    } catch {
        return null;
    }
}

async function updateComparison() {
    // Load data for car1
    let car1 = carsMap[currentCar1] || await loadCarData(currentCar1);
    if (!car1) {
        // fallback if no data
        div1.textContent = div3.textContent = div5.textContent = div7.textContent = "N/A";
    } else {
        div1.textContent = car1.model;
        div3.textContent = car1.price.toString();
        div5.textContent = car1.year.toString();
        div7.textContent = car1.engine;
    }

    // Load data for car2
    let car2 = carsMap[currentCar2] || await loadCarData(currentCar2);
    if (!car2) {
        div2.textContent = div4.textContent = div6.textContent = div8.textContent = "N/A";
    } else {
        div2.textContent = car2.model;
        div4.textContent = car2.price.toString();
        div6.textContent = car2.year.toString();
        div8.textContent = car2.engine;
    }
}

selectcar1.onchange = () => {
    currentCar1 = selectcar1.value;
    updateComparison();
};

selectcar2.onchange = () => {
    currentCar2 = selectcar2.value;
    updateComparison();
};

addCarButton.onclick = () => {
    popup.style.display = "block";
};

addCarCancel.onclick = () => {
    popup.style.display = "none";
};

addCarSubmit.onclick = async () => {
    // Basic validation
    if (
        !inputName.value.trim() ||
        !inputModel.value.trim() ||
        !inputPrice.value ||
        !inputYear.value ||
        !inputEngine.value.trim()
    ) {
        alert("Please fill all fields");
        return;
    }

    const newCar: Car = {
        id: inputName.value.trim(),
        model: inputModel.value.trim(),
        price: parseInt(inputPrice.value),
        year: parseInt(inputYear.value),
        engine: inputEngine.value.trim(),
    };

    // Send to server
    try {
        const response = await fetch("/addcar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar),
        });
        if (!response.ok) throw new Error("Failed to add car");

        // Update selects with new car
        const option1 = new Option(newCar.id, newCar.id);
        const option2 = new Option(newCar.id, newCar.id);
        selectcar1.add(option1);
        selectcar2.add(option2);

        // Cache car locally
        carsMap[newCar.id] = newCar;

        // Optionally select the newly added car on both selects
        selectcar1.value = newCar.id;
        selectcar2.value = newCar.id;
        currentCar1 = currentCar2 = newCar.id;

        updateComparison();

        // Clear inputs and hide popup
        inputName.value = "";
        inputModel.value = "";
        inputPrice.value = "";
        inputYear.value = "";
        inputEngine.value = "";
        popup.style.display = "none";

    } catch (e) {
        alert("Error adding car: " + (e instanceof Error ? e.message : ""));
    }
};

// Initial load
updateComparison();