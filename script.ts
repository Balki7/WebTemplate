// Function to add car to favorites
const favoriteButtons = document.querySelectorAll('.favorite-btn') as NodeListOf<HTMLButtonElement>;

favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const carId = button.closest('.car')?.getAttribute('data-id');
        if (carId) {
            addToFavorites(carId);
        }
    });
});

function addToFavorites(carId: string): void {
    let favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Add the car to favorites if not already in
    if (!favorites.includes(carId)) {
        favorites.push(carId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`Car ${carId} added to favorites!`);
    } else {
        alert(`Car ${carId} is already in favorites.`);
    }
}

// Display favorite cars on favorites page
document.addEventListener('DOMContentLoaded', () => {
    const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favorites-list') as HTMLElement;

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite cars yet.</p>';
    } else {
        favorites.forEach(carId => {
            const carDiv = document.createElement('div');
            carDiv.classList.add('car');
            carDiv.innerHTML = `<h3>Car ${carId}</h3><p>Speed: 200 km/h</p>`;
            favoritesList.appendChild(carDiv);
        });
    }
});

