"use strict";
// Function to add car to favorites
const favoriteButtons = document.querySelectorAll('.favorite-btn');
favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const carId = button.closest('.car')?.getAttribute('data-id');
        if (carId) {
            addToFavorites(carId);
        }
    });
});
function addToFavorites(carId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Add the car to favorites if not already in
    if (!favorites.includes(carId)) {
        favorites.push(carId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`Car ${carId} added to favorites!`);
    }
    else {
        alert(`Car ${carId} is already in favorites.`);
    }
}
// Display favorite cars on favorites page
document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favorites-list');
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite cars yet.</p>';
    }
    else {
        favorites.forEach(carId => {
            const carDiv = document.createElement('div');
            carDiv.classList.add('car');
            carDiv.innerHTML = `<h3>Car ${carId}</h3><p>Speed: 200 km/h</p>`;
            favoritesList.appendChild(carDiv);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQ0FBbUM7QUFDbkMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBa0MsQ0FBQztBQUVwRyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQzdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlELElBQUksS0FBSyxFQUFFLENBQUM7WUFDUixjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTLGNBQWMsQ0FBQyxLQUFhO0lBQ2pDLElBQUksU0FBUyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUVoRiw2Q0FBNkM7SUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUM3QixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3RCxLQUFLLENBQUMsT0FBTyxLQUFLLHNCQUFzQixDQUFDLENBQUM7SUFDOUMsQ0FBQztTQUFNLENBQUM7UUFDSixLQUFLLENBQUMsT0FBTyxLQUFLLDJCQUEyQixDQUFDLENBQUM7SUFDbkQsQ0FBQztBQUNMLENBQUM7QUFFRCwwQ0FBMEM7QUFDMUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUMvQyxNQUFNLFNBQVMsR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDbEYsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBZ0IsQ0FBQztJQUUvRSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDekIsYUFBYSxDQUFDLFNBQVMsR0FBRyw4QkFBOEIsQ0FBQztJQUM3RCxDQUFDO1NBQU0sQ0FBQztRQUNKLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsU0FBUyxHQUFHLFdBQVcsS0FBSyw2QkFBNkIsQ0FBQztZQUNqRSxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=