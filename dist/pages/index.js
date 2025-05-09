"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let submitlogin = document.getElementById("submitlogin");
let submitsignup = document.getElementById("submitsignup");
let signupbutton = document.getElementById("signupbutton");
let loginbutton = document.getElementById("loginbutton");
let signupconfirmpassword = document.getElementById("signupconfirmpassword");
let signuppassword = document.getElementById("signuppassword");
let signupusername = document.getElementById("signupusername");
let loginpassword = document.getElementById("loginpassword");
let loginusername = document.getElementById("loginusername");
loginbutton.onclick = function () {
    const popup = document.getElementById("loginPopup");
    if (popup)
        popup.style.display = "flex";
};
// Handle login submission
submitlogin.onclick = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        // Input validation
        const username = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value;
        const password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }
        try {
            // Call your C# authentication API endpoint
            // const response = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     },
            //     body: JSON.stringify({ username, password })
            // });
            const response = yield send('api/auth/login', [username, password]);
            // Handle different HTTP status codes
            if (!response.ok) {
                if (response.status === 401) {
                    alert("Invalid username or password");
                    return;
                }
                throw new Error(`Server returned ${response.status}`);
            }
            const data = yield response.json();
            if (data.success && data.token) {
                console.log("Login successful");
                // Store JWT auth token in local storage
                localStorage.setItem('authToken', data.token);
                // Redirect to dashboard or home page
                window.location.href = "/dashboard";
            }
            else {
                alert(data.message || "Login failed");
            }
        }
        catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
        const popup = document.getElementById("loginPopup");
        if (popup)
            popup.style.display = "none";
    });
};
// Toggle signup popup visibility
signupbutton.onclick = function () {
    const popup = document.getElementById("signupPopup");
    if (popup)
        popup.style.display = "flex";
};
// Handle signup submission
submitsignup.onclick = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const usernameInput = document.getElementById("signup-username");
        const passwordInput = document.getElementById("signup-password");
        const confirmInput = document.getElementById("signup-confirm-password");
        // Input validation
        const username = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value;
        const password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
        const confirmPassword = confirmInput === null || confirmInput === void 0 ? void 0 : confirmInput.value;
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
            const response = yield send('api/auth/register', [username, password]);
            // Handle different HTTP status codes
            if (!response.ok) {
                if (response.status === 409) {
                    alert("Username already exists");
                    return;
                }
                throw new Error(`Server returned ${response.status}`);
            }
            const data = yield response.json();
            if (data.success) {
                console.log("Signup successful");
                alert("Account created successfully! Please login.");
                // Clear form and switch to login page
                usernameInput.value = "";
                passwordInput.value = "";
                confirmInput.value = "";
                // Close signup popup
                const signupPopup = document.getElementById("signupPopup");
                if (signupPopup)
                    signupPopup.style.display = "none";
                // Open login popup
                const loginPopup = document.getElementById("loginPopup");
                if (loginPopup)
                    loginPopup.style.display = "flex";
            }
            else {
                alert(data.message || "Signup failed");
            }
        }
        catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        }
    });
};
// Popup close functionality
function closePopup(event, popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}
window.closePopup = closePopup;
submitsignup.onclick = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (signupconfirmpassword.value != signuppassword.value) {
            alert("Passwords do not match");
            return;
        }
        let userId = yield send("signUp", [
            signupusername.value,
            signuppassword.value,
        ]);
        if (userId == null) {
            alert("Username already exists");
            return;
        }
        localStorage.setItem("userId", userId);
        location.href = "index.html";
    });
};
submitlogin.onclick = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = yield send("logIn", [
            loginusername.value,
            loginpassword.value,
        ]);
        if (userId == null) {
            alert("Incorrect username or password");
            return;
        }
        localStorage.setItem("userId", userId);
        location.href = "Compare.html";
    });
};
