import FavoriteRestaurant from '../../data/favorite-restaurant';
import { createRestaurantListTemplate } from '../templates/template-creator';
import { showSpinner, hideSpinner } from '../../utils/spinner-initiator';
import { showModal } from '../../utils/modal-initator';

const Favorite = {
  async render() {
    showSpinner();

    return `
    <section id='restaurant' class="restaurant favoriteRestaurant">
        <h1 class="restaurant__title">Your Favorite Restaurants</h1>
        <div class="restaurant__grid"></div>
    </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurant.getAllRestaurants();
      const restaurantsContainer = document.querySelector('.restaurant__grid');
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantListTemplate(restaurant);
      });
      hideSpinner();
    } catch (error) {
      hideSpinner();
      showModal();
    }
  },
};

export default Favorite;
