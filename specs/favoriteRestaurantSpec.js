import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Favorite a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the add to favorite button when the restaurant has not been favorited yet', async () => {
    TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Add Restaurant to Favorite"]')).toBeTruthy();
  });

  it('should not show the remove from favorite button when the restaurant has not been favorited before', async () => {
    TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Remove Restaurant from Favorite"]')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurant.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    // Add restaurant with ID 1 to favorited restaurant list
    await FavoriteRestaurant.putRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    // Expect only one restaurant that has ID 1
    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a restaurant to favorited list when it has no id', async () => {
    TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
  });
});
