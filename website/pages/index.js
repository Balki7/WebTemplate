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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFzQixDQUFDO0FBQzlFLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0FBQ2hGLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFzQixDQUFDO0FBQ2hGLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFzQixDQUFDO0FBQzlFLElBQUkscUJBQXFCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBcUIsQ0FBQztBQUNqRyxJQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFxQixDQUFDO0FBQ25GLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXFCLENBQUM7QUFDbkYsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFDakYsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQXFCLENBQUM7QUFHakYsV0FBVyxDQUFDLE9BQU8sR0FBRztJQUNsQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELElBQUksS0FBSztRQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUM1QyxDQUFDLENBQUM7QUFFRixXQUFXLENBQUMsT0FBTyxHQUFHO0lBQ2xCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFxQixDQUFDO0lBQzlF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