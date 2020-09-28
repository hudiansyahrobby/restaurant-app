class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurants;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    try {
      const restaurant = await this._favoriteRestaurant.getAllRestaurants();
      console.log(restaurant);
      this._displayRestaurants(restaurant);
    } catch (error) {
      console.log(error);
    }
  }

  _displayRestaurants(restaurant) {
    this._view.showFavoriteRestaurants(restaurant);
  }
}

export default FavoriteRestaurantShowPresenter;
