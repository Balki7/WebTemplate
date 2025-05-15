import { send } from "../utilities";

let submitlogin = document.getElementById("submitlogin") as HTMLButtonElement;
let submitsignup = document.getElementById("submitsignup") as HTMLButtonElement;
let signupbutton = document.getElementById("signupbutton") as HTMLButtonElement;
let loginbutton = document.getElementById("loginbutton") as HTMLButtonElement;
let signupconfirmpassword = document.getElementById("signupconfirmpassword") as HTMLInputElement;
let signuppassword = document.getElementById("signuppassword") as HTMLInputElement;
let signupusername = document.getElementById("signupusername") as HTMLInputElement;
let loginpassword = document.getElementById("loginpassword") as HTMLInputElement;
let loginusername = document.getElementById("loginusername") as HTMLInputElement;


loginbutton.onclick = function () {
    const popup = document.getElementById("loginPopup");
    if (popup) popup.style.display = "flex";
};

// Handle login submission
submitlogin.onclick = async function () {
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    // Input validation
    const username = usernameInput?.value;
    const password = passwordInput?.value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    let userId = await send('login', [username, password]) as string | null;

    if (userId != null) {
        console.log("Login successful");
        localStorage.setItem('userId', userId);
        window.location.href = "/dashboard";
    } else {
        alert("Login failed");
    }

    const popup = document.getElementById("loginPopup");
    if (popup) popup.style.display = "none";
};

// Toggle signup popup visibility
signupbutton.onclick = function () {
    const popup = document.getElementById("signupPopup");
    if (popup) popup.style.display = "flex";
};

// Handle signup submission
submitsignup.onclick = async function () {
    const usernameInput = document.getElementById("signup-username") as HTMLInputElement;
    const passwordInput = document.getElementById("signup-password") as HTMLInputElement;
    const confirmInput = document.getElementById("signup-confirm-password") as HTMLInputElement;

    // Input validation
    const username = usernameInput?.value;
    const password = passwordInput?.value;
    const confirmPassword = confirmInput?.value;

    if (!username || !password || !confirmPassword) {
        alert("Please fill out all fields");
        return;
    }

    // Password validation
    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Call your C# registration API endpoint
        const response = await send('api/auth/register', [username, password]);


        // Handle different HTTP status codes
        if (!response.ok) {
            if (response.status === 409) {
                alert("Username already exists");
                return;
            }
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json() as AuthResponse;
        if (data.success) {
            console.log("Signup successful");
            alert("Account created successfully! Please login.");

            // Clear form and switch to login page
            usernameInput.value = "";
            passwordInput.value = "";
            confirmInput.value = "";

            // Close signup popup
            const signupPopup = document.getElementById("signupPopup");
            if (signupPopup) signupPopup.style.display = "none";

            // Open login popup
            const loginPopup = document.getElementById("loginPopup");
            if (loginPopup) loginPopup.style.display = "flex";
        } else {
            alert(data.message || "Signup failed");
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
    }
};

// Popup close functionality
function closePopup(event: MouseEvent, popupId: string): void {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}

(window as any).closePopup = closePopup;
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


    location.href = "index.html";
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

    location.href = "Compare.html";
};