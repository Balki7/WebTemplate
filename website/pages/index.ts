// פונקציה לשליחת בקשות לשרת (מובאת מהמודול utilities)
import { send } from "../utilities";

// קליטת כל האלמנטים מה־HTML עבור התחברות והרשמה
let submitlogin = document.getElementById("submitlogin") as HTMLButtonElement;
let submitsignup = document.getElementById("submitsignup") as HTMLButtonElement;
let signupbutton = document.getElementById("signupbutton") as HTMLButtonElement;
let loginbutton = document.getElementById("loginbutton") as HTMLButtonElement;
let signupconfirmpassword = document.getElementById("signupconfirmpassword") as HTMLInputElement;
let signuppassword = document.getElementById("signuppassword") as HTMLInputElement;
let signupusername = document.getElementById("signupusername") as HTMLInputElement;
let loginusername = document.getElementById("loginusername") as HTMLInputElement;
let loginpassword = document.getElementById("loginpassword") as HTMLInputElement;

// קליטת כפתורי 'למה לבחור בנו' ותיבת המידע
const whyusBtn = document.getElementById("whyus-btn") as HTMLButtonElement;
const whyusOverlay = document.getElementById("whyus-overlay") as HTMLDivElement;
const whyusClose = document.getElementById("whyus-close") as HTMLButtonElement;

const infoBtn = document.getElementById("infobutton") as HTMLButtonElement;
const infoboxOverlay = document.getElementById("infobox-overlay") as HTMLDivElement;
const infoboxClose = document.getElementById("infobox-close") as HTMLButtonElement;

// פתיחת פופאפ התחברות בלחיצה על כפתור
loginbutton.onclick = function () {
    const popup = document.getElementById("loginPopup");
    if (popup) popup.style.display = "flex";
};

// לחיצה על Confirm בלוגין – (חלק ישן שלא משתמש בפרטי הקלט הנכונים)
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

// פתיחת פופאפ הרשמה בלחיצה על כפתור
signupbutton.onclick = function () {
    const popup = document.getElementById("signupPopup");
    if (popup) popup.style.display = "flex";
};

// טיפול בהרשמה (חלק ישן לפני שליחת נתונים אמיתית לשרת)
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

// פונקציה שסוגרת פופאפ לפי id
function closePopup(event: MouseEvent, popupId: string): void {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}

// הפונקציה זמינה גם בקוד ה־HTML דרך window.closePopup
(window as any).closePopup = closePopup;

// סגירת פופאפ כאשר לוחצים מחוץ אליו
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

// הטיפול האמיתי בהרשמה – שולח נתונים לשרת ובודק אם הסיסמאות תואמות
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

    localStorage.setItem("userId", userId);  // שמירת מזהה משתמש
    location.href = "compare.html";         // מעבר לעמוד ההשוואה
};

// הטיפול האמיתי בהתחברות – שולח לשרת ובודק אם המשתמש קיים
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

// מאפשר לחיצה על Enter כדי לשלוח טופס התחברות
loginpassword.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        submitlogin.click();
    }
});

// גם בהרשמה – אפשרות ללחוץ Enter
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

// פתיחת וסגירת תיבת "למה לבחור בנו"
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

// פתיחת וסגירת תיבת מידע (info popup)
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
