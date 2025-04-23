var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// DOM element references
var submitlogin = document.getElementById("submitlogin");
var submitsignup = document.getElementById("submitsignup");
var signupbutton = document.getElementById("signupbutton");
var loginbutton = document.getElementById("loginbutton");
// Toggle login popup visibility
loginbutton.onclick = function () {
    var popup = document.getElementById("loginPopup");
    if (popup)
        popup.style.display = "flex";
};
// Handle login submission
submitlogin.onclick = function () {
    return __awaiter(this, void 0, void 0, function () {
        var usernameInput, passwordInput, username, password, response, data, error_1, popup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usernameInput = document.getElementById("username");
                    passwordInput = document.getElementById("password");
                    username = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value;
                    password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
                    if (!username || !password) {
                        alert("Please enter both username and password");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/auth/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ username: username, password: password })
                        })];
                case 2:
                    response = _a.sent();
                    // Handle different HTTP status codes
                    if (!response.ok) {
                        if (response.status === 401) {
                            alert("Invalid username or password");
                            return [2 /*return*/];
                        }
                        throw new Error("Server returned ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
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
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Login error:", error_1);
                    alert("Login failed. Please try again.");
                    return [3 /*break*/, 5];
                case 5:
                    popup = document.getElementById("loginPopup");
                    if (popup)
                        popup.style.display = "none";
                    return [2 /*return*/];
            }
        });
    });
};
// Toggle signup popup visibility
signupbutton.onclick = function () {
    var popup = document.getElementById("signupPopup");
    if (popup)
        popup.style.display = "flex";
};
// Handle signup submission
submitsignup.onclick = function () {
    return __awaiter(this, void 0, void 0, function () {
        var usernameInput, passwordInput, confirmInput, username, password, confirmPassword, response, data, signupPopup, loginPopup, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usernameInput = document.getElementById("signup-username");
                    passwordInput = document.getElementById("signup-password");
                    confirmInput = document.getElementById("signup-confirm-password");
                    username = usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.value;
                    password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
                    confirmPassword = confirmInput === null || confirmInput === void 0 ? void 0 : confirmInput.value;
                    if (!username || !password || !confirmPassword) {
                        alert("Please fill out all fields");
                        return [2 /*return*/];
                    }
                    // Password validation
                    if (password.length < 8) {
                        alert("Password must be at least 8 characters long");
                        return [2 /*return*/];
                    }
                    if (password !== confirmPassword) {
                        alert("Passwords do not match!");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/auth/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({ username: username, password: password })
                        })];
                case 2:
                    response = _a.sent();
                    // Handle different HTTP status codes
                    if (!response.ok) {
                        if (response.status === 409) {
                            alert("Username already exists");
                            return [2 /*return*/];
                        }
                        throw new Error("Server returned ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.success) {
                        console.log("Signup successful");
                        alert("Account created successfully! Please login.");
                        // Clear form and switch to login page
                        usernameInput.value = "";
                        passwordInput.value = "";
                        confirmInput.value = "";
                        signupPopup = document.getElementById("signupPopup");
                        if (signupPopup)
                            signupPopup.style.display = "none";
                        loginPopup = document.getElementById("loginPopup");
                        if (loginPopup)
                            loginPopup.style.display = "flex";
                    }
                    else {
                        alert(data.message || "Signup failed");
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error("Signup error:", error_2);
                    alert("Signup failed. Please try again.");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
// Popup close functionality
function closePopup(event, popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = "none";
    }
}
window.closePopup = closePopup;
