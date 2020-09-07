import { createRestaurantListTemplate, createFeatureTemplate } from '../templates/template-creator';
import restaurantSource from '../../data/restaurant-resource';
import { showSpinner, hideSpinner } from '../../utils/spinner-initiator';
import { showModal } from '../../utils/modal-initator';

const home = {
  async render() {
    showSpinner();
    return `
    <section class="hero">
      <h1 class="hero__title">Restaurants</h1>
      <p class="hero__subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
        debitis!
      </p>
      <div class="hero__buttons">
        <a href='#restaurant' class="btn btn-purple">Catalogue</a>
        <a href="#feature" class="btn btn_white">Features</a>
      </div>
    </section>
    
    <section id='feature' class="feature"></section>
    <section id='restaurant' class="restaurant">
        <h1 class="restaurant__title">Restaurant Catalogue</h1>
        <div class="restaurant__grid"></div>
    </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await restaurantSource.getRestaurantList();
      const featureContainer = document.getElementById('feature');
      featureContainer.innerHTML = createFeatureTemplate();

      const restaurantContainer = document.querySelector('.restaurant__grid');
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantListTemplate(restaurant);
      });
      hideSpinner();
    } catch (error) {
      hideSpinner();
      showModal();
    }
  },
};

export default home;
