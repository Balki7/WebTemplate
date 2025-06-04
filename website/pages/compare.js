import { send } from "../utilities";
let logOutButton = document.getElementById("logOutButton");
logOutButton.onclick = async function () {
    localStorage.removeItem("userId");
    location.href = "index.html";
};
const selectcar1 = document.getElementById("selectcar1");
const selectcar2 = document.getElementById("selectcar2");
let currentCar1 = null;
let currentCar2 = null;
selectcar1.onchange = function () {
    currentCar1 = selectcar1.value;
    updateComparison();
};
selectcar2.onchange = function () {
    currentCar2 = selectcar2.value;
    updateComparison();
};
function updateComparison() {
    send("loadcar", {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVwQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBc0IsQ0FBQztBQUNoRixZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUs7SUFDeEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztBQUM5RSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztBQUM5RSxJQUFJLFdBQVcsR0FBa0IsSUFBSSxDQUFDO0FBQ3RDLElBQUksV0FBVyxHQUFrQixJQUFJLENBQUM7QUFFdEMsVUFBVSxDQUFDLFFBQVEsR0FBRztJQUNsQixXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUMvQixnQkFBZ0IsRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQUVGLFVBQVUsQ0FBQyxRQUFRLEdBQUc7SUFDbEIsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDL0IsZ0JBQWdCLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUM7QUFFRixTQUFTLGdCQUFnQjtJQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLEVBR2YsQ0FBQyxDQUFBO0FBRU4sQ0FBQyJ9