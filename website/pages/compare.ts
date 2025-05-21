import { send } from "../utilities";

console.log("hello");

let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;

logOutButton.onclick = async function (): Promise<void> {
    // await send("logOut", []);
    console.log("hello");
    localStorage.removeItem("userId");
    location.href = "index.html";
};
