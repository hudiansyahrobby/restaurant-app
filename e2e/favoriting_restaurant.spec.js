const assert = require('assert');

Feature('favoriting restaurant');

Before((I) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', (I) => {
  I.seeElement('#favoriteRestaurant');

  I.see('Sorry, No restaurant to show', '.restaurant-item__not__found');
});

Scenario('favoriting one restaurant', async (I) => {
  I.see('Sorry, No restaurant to show', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name');

  const firstRestaurant = locate('.restaurant__name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const favoritedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('Adding review', async (I) => {
  I.amOnPage('/');
  const firstRestaurant = locate('.restaurant__name').first();
  I.click(firstRestaurant);

  I.seeElement('.restaurantDetail__addReview');

  const reviewContent = 'Sungguh indah sekali';
  I.fillField('name', 'Yoma');
  I.fillField('review', reviewContent);

  I.click('#submitReview');

  const latestReview = locate('.restaurantDetail__customerReview').last();

  const textlatestReview = await I.grabTextFrom(latestReview);

  assert.strictEqual(reviewContent, textlatestReview);
});
