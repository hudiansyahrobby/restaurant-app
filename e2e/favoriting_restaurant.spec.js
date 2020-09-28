const assert = require('assert');

Feature('favoriting restaurant');

Before((I) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', (I) => {
  I.seeElement('#query');

  I.see('Sorry, No restaurant to show', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async (I) => {
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

Scenario('searching restaurants', async (I) => {
  I.see('Sorry, No restaurant to show', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.seeElement('.restaurant__name');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    names.push(await I.grabTextFrom('.restaurantDetail__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurant = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleFavoritedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurant.length, visibleFavoritedRestaurant);

  matchingRestaurant.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.restaurant__name').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});
