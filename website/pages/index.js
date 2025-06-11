// פונקציה לשליחת בקשות לשרת (מובאת מהמודול utilities)
import { send } from "../utilities";
// קליטת כל האלמנטים מה־HTML עבור התחברות והרשמה
let submitlogin = document.getElementById("submitlogin");
let submitsignup = document.getElementById("submitsignup");
let signupbutton = document.getElementById("signupbutton");
let loginbutton = document.getElementById("loginbutton");
let signupconfirmpassword = document.getElementById("signupconfirmpassword");
let signuppassword = document.getElementById("signuppassword");
let signupusername = document.getElementById("signupusername");
let loginusername = document.getElementById("loginusername");
let loginpassword = document.getElementById("loginpassword");
// קליטת כפתורי 'למה לבחור בנו' ותיבת המידע
const whyusBtn = document.getElementById("whyus-btn");
const whyusOverlay = document.getElementById("whyus-overlay");
const whyusClose = document.getElementById("whyus-close");
const infoBtn = document.getElementById("infobutton");
const infoboxOverlay = document.getElementById("infobox-overlay");
const infoboxClose = document.getElementById("infobox-close");
// פתיחת פופאפ התחברות בלחיצה על כפתור
loginbutton.onclick = function () {
    const popup = document.getElementById("loginPopup");
    if (popup)
        popup.style.display = "flex";
};
// לחיצה על Confirm בלוגין – (חלק ישן שלא משתמש בפרטי הקלט הנכונים)
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
// פתיחת פופאפ הרשמה בלחיצה על כפתור
signupbutton.onclick = function () {
    const popup = document.getElementById("signupPopup");
    if (popup)
        popup.style.display = "flex";
};
// טיפול בהרשמה (חלק ישן לפני שליחת נתונים אמיתית לשרת)
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
// פונקציה שסוגרת פופאפ לפי id
function closePopup(event, popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}
// הפונקציה זמינה גם בקוד ה־HTML דרך window.closePopup
window.closePopup = closePopup;
// סגירת פופאפ כאשר לוחצים מחוץ אליו
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
// הטיפול האמיתי בהרשמה – שולח נתונים לשרת ובודק אם הסיסמאות תואמות
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
    localStorage.setItem("userId", userId); // שמירת מזהה משתמש
    location.href = "compare.html"; // מעבר לעמוד ההשוואה
};
// הטיפול האמיתי בהתחברות – שולח לשרת ובודק אם המשתמש קיים
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
// מאפשר לחיצה על Enter כדי לשלוח טופס התחברות
loginpassword.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitlogin.click();
    }
});
// גם בהרשמה – אפשרות ללחוץ Enter
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
// פתיחת וסגירת תיבת "למה לבחור בנו"
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
// פתיחת וסגירת תיבת מידע (info popup)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzREFBc0Q7QUFDdEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwQyxnREFBZ0Q7QUFDaEQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7QUFDOUUsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7QUFDaEYsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUM7QUFDaEYsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7QUFDOUUsSUFBSSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFxQixDQUFDO0FBQ2pHLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXFCLENBQUM7QUFDbkYsSUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBcUIsQ0FBQztBQUNuRixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBcUIsQ0FBQztBQUNqRixJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBcUIsQ0FBQztBQUVqRiwyQ0FBMkM7QUFDM0MsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXNCLENBQUM7QUFDM0UsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQW1CLENBQUM7QUFDaEYsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQXNCLENBQUM7QUFFL0UsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMs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