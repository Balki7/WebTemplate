import { send } from "../utilities";

let submitlogin = document.getElementById("submitlogin") as HTMLButtonElement;
let submitsignup = document.getElementById("submitsignup") as HTMLButtonElement;
let signupbutton = document.getElementById("signupbutton") as HTMLButtonElement;
let loginbutton = document.getElementById("loginbutton") as HTMLButtonElement;
let signupconfirmpassword = document.getElementById("signupconfirmpassword") as HTMLInputElement;
let signuppassword = document.getElementById("signuppassword") as HTMLInputElement;
let signupusername = document.getElementById("signupusername") as HTMLInputElement;
let loginusername = document.getElementById("loginusername") as HTMLInputElement;
let loginpassword = document.getElementById("loginpassword") as HTMLInputElement;

const whyusBtn = document.getElementById("whyus-btn") as HTMLButtonElement;
const whyusOverlay = document.getElementById("whyus-overlay") as HTMLDivElement;
const whyusClose = document.getElementById("whyus-close") as HTMLButtonElement;

const infoBtn = document.getElementById("infobutton") as HTMLButtonElement;
const infoboxOverlay = document.getElementById("infobox-overlay") as HTMLDivElement;
const infoboxClose = document.getElementById("infobox-close") as HTMLButtonElement;


loginbutton.onclick = function () {
    const popup = document.getElementById("loginPopup");
    if (popup) popup.style.display = "flex";
};

submitlogin.onclick = function () {
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    const username = usernameInput?.value;
    const password = passwordInput?.value;

    console.log("Login Username:", username);
    console.log("Login Password:", password);

    const popup = document.getElementById("loginPopup");
    if (popup) popup.style.display = "none";
};

signupbutton.onclick = function () {
    const popup = document.getElementById("signupPopup");
    if (popup) popup.style.display = "flex";
};

submitsignup.onclick = function () {
    const usernameInput = document.getElementById("signup-username") as HTMLInputElement;
    const passwordInput = document.getElementById("signup-password") as HTMLInputElement;
    const confirmInput = document.getElementById("signup-confirm-password") as HTMLInputElement;

    const username = usernameInput?.value;
    const password = passwordInput?.value;
    const confirmPassword = confirmInput?.value;

    console.log("Signup Username:", username);
    console.log("Signup Password:", password);
    console.log("Confirm Password:", confirmPassword);

    const popup = document.getElementById("signupPopup");
    if (popup) popup.style.display = "none";
};

function closePopup(event: MouseEvent, popupId: string): void {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}

(window as any).closePopup = closePopup;

window.onclick = function (event: MouseEvent) {
    const loginPopup = document.getElementById("loginPopup");
    const signupPopup = document.getElementById("signupPopup");

    if (loginPopup && event.target === loginPopup) {
        closePopup(event, "loginPopup");
    }
    if (signupPopup && event.target === signupPopup) {
        closePopup(event, "signupPopup");
    }
};

submitsignup.onclick = async function () {
    if (signupconfirmpassword.value != signuppassword.value) {
        alert("Passwords do not match");
        return;
    }

    let userId = await send("signUp", [
        signupusername.value,
        signuppassword.value,
    ]) as string | null;

    if (userId == null) {
        alert("Username already exists");
        return;
    }

    localStorage.setItem("userId", userId);


    location.href = "compare.html";
};

submitlogin.onclick = async function () {
    let userId = await send("logIn", [
        loginusername.value,
        loginpassword.value,
    ]) as string | null;

    if (userId == null) {
        alert("Incorrect username or password");
        return;
    }

    localStorage.setItem("userId", userId);

    location.href = "compare.html";
};

loginpassword.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        submitlogin.click();
    }
});

signuppassword.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        submitsignup.click();
    }
});

signupconfirmpassword.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        submitsignup.click();
    }
});


whyusBtn.addEventListener("click", () => {
  whyusOverlay.classList.add("show");
});

whyusOverlay.addEventListener("click", () => {
  whyusOverlay.classList.remove("show");
});

whyusClose.addEventListener("click", (e: MouseEvent) => {
  e.stopPropagation();
  whyusOverlay.classList.remove("show");
});



infoBtn.addEventListener('click', () => {
  infoboxOverlay.classList.add('show');
});

infoboxOverlay.addEventListener('click', () => {
  infoboxOverlay.classList.remove('show');
});

infoboxClose.addEventListener('click', (e: MouseEvent) => {
  e.stopPropagation();
  infoboxOverlay.classList.remove('show');
}); 