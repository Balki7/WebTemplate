console.log("hello");
let logOutButton = document.getElementById("logOutButton");
logOutButton.onclick = async function () {
    // await send("logOut", []);
    console.log("hello");
    localStorage.removeItem("userId");
    location.href = "index.html";
};
export {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVyQixJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztBQUVoRixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUs7SUFDeEIsNEJBQTRCO0lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUNqQyxDQUFDLENBQUMifQ==