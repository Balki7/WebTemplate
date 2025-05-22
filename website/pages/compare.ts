import { send } from "../utilities";

let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;
logOutButton.onclick = async function (): Promise<void> {
    localStorage.removeItem("userId");
    location.href = "index.html";
};
