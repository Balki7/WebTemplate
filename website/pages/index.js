import { send } from "../utilities";
let submitlogin = document.getElementById("submitlogin");
let submitsignup = document.getElementById("submitsignup");
let signupbutton = document.getElementById("signupbutton");
let loginbutton = document.getElementById("loginbutton");
let signupconfirmpassword = document.getElementById("signupconfirmpassword");
let signuppassword = document.getElementById("signuppassword");
let signupusername = document.getElementById("signupusername");
let loginusername = document.getElementById("loginusername");
let loginpassword = document.getElementById("loginpassword");
const whyusBtn = document.getElementById("whyus-btn");
const whyusOverlay = document.getElementById("whyus-overlay");
const whyusClose = document.getElementById("whyus-close");
const infoBtn = document.getElementById("infobutton");
const infoboxOverlay = document.getElementById("infobox-overlay");
const infoboxClose = document.getElementById("infobox-close");
loginbutton.onclick = function () {
    const popup = document.getElementById("loginPopup");
    if (popup)
        popup.style.display = "flex";
};
submitlogin.onclick = function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput?.value;
    const password = passwordInput?.value;
    console.log("Login Username:", username);
    console.log("Login Password:", password);
    const popup = document.getElementById("loginPopup");
    if (popup)
        popup.style.display = "none";
};
signupbutton.onclick = function () {
    const popup = document.getElementById("signupPopup");
    if (popup)
        popup.style.display = "flex";
};
submitsignup.onclick = function () {
    const usernameInput = document.getElementById("signup-username");
    const passwordInput = document.getElementById("signup-password");
    const confirmInput = document.getElementById("signup-confirm-password");
    const username = usernameInput?.value;
    const password = passwordInput?.value;
    const confirmPassword = confirmInput?.value;
    console.log("Signup Username:", username);
    console.log("Signup Password:", password);
    console.log("Confirm Password:", confirmPassword);
    const popup = document.getElementById("signupPopup");
    if (popup)
        popup.style.display = "none";
};
function closePopup(event, popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}
window.closePopup = closePopup;
window.onclick = function (event) {
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
    ]);
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
    ]);
    if (userId == null) {
        alert("Incorrect username or password");
        return;
    }
    localStorage.setItem("userId", userId);
    location.href = "compare.html";
};
loginpassword.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitlogin.click();
    }
});
signuppassword.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitsignup.click();
    }
});
signupconfirmpassword.addEventListener("keydown", function (event) {
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
whyusClose.addEventListener("click", (e) => {
    e.stopPropagation();
    whyusOverlay.classList.remove("show");
});
infoBtn.addEventListener('click', () => {
    infoboxOverlay.classList.add('show');
});
infoboxOverlay.addEventListener('click', () => {
    infoboxOverlay.classList.remove('show');
});
infoboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    infoboxOverlay.classList.remove('show');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFzQixDQUFDO0FBQzlFLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0FBQ2hGLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0FBQ2hGLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFzQixDQUFDO0FBQzlFLElBQUkscUJBQXFCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBcUIsQ0FBQztBQUNqRyxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFxQixDQUFDO0FBQ25GLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXFCLENBQUM7QUFDbkYsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFDakYsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFFakYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFDM0UsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQW1CLENBQUM7QUFDaEYsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7QUFFL0UsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQXNCLENBQUM7QUFDM0UsTUFBTSxjQUFjLEdB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