import UrlParser from '../../routes/url-parser';
import restaurantSource from '../../data/restaurant-resource';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import { showSpinner, hideSpinner } from '../../utils/spinner-initiator';
import { showModal } from '../../utils/modal-initator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    showSpinner();
    try {
      const restaurant = await restaurantSource.getRestaurantDetail(url.id);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      FavoriteButtonPresenter.init({
        favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          rating: restaurant.rating,
          pictureId: restaurant.pictureId,
        },
      });

      hideSpinner();

      // Add Review Handler
      const onSubmitReviewHandler = async (event) => {
        event.preventDefault();
        const inputName = document.getElementById('name').value;
        const inputReview = document.getElementById('review').value;
        if (inputName === '' || inputReview === '') {
          alert('Please Enter your name and your review');
        } else {
          showSpinner();

          const reviewData = {
            id: url.id,
            name: inputName,
            review: inputReview,
          };
          await restaurantSource.postRestaurantReview(reviewData);
        }
      };
      const submitButton = document.getElementById('submitReview');
      submitButton.addEventListener('click', onSubmitReviewHandler);
    } catch (error) {
      hideSpinner();
      showModal();
      console.log(error);
    }
  },
};

export default Detail;
