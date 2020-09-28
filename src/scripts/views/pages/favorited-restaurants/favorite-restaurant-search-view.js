import { createRestaurantListTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
       <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Favorite Restaurant</h2>
            <div id="restaurant" class="restaurant">
                        
            </div>
       </div>
      
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantListTemplate(restaurant)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.querySelector('#restaurant').innerHTML = html;

    document.querySelector('#restaurant').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<h2 class="restaurant-item__not__found restaurants__not__found">Sorry, No restaurant to show</h2>';
  }
}

export default FavoriteRestaurantSearchView;