import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Favorite a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  afterEach(async () => {
    (await FavoriteRestaurant.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurant.deleteRestaurant(restaurant.id);
    });
  });

  it('should show the add to favorite button when the restaurant has not been favorited yet', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    const favoriteButton = document.querySelector('[aria-label="Add Restaurant to Favorite"]');
    expect(favoriteButton).toBeTruthy();
  });

  it('should not show the remove from favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });
    const unFavoriteButton = document.querySelector(
      '[aria-label="Remove Restaurant from Favorite"]',
    );
    expect(unFavoriteButton).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    const favoriteButton = document.querySelector('#favoriteButton');

    favoriteButton.dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurant.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    // Add restaurant with ID 1 to favorited restaurant list
    await FavoriteRestaurant.putRestaurant({ id: 1 });

    const favoriteButton = document.querySelector('#favoriteButton');

    favoriteButton.dispatchEvent(new Event('click'));

    // Expect only one restaurant that has ID 1
    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a restaurant to favorited list when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});

    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
  });
});
