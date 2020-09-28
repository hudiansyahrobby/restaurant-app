import CONFIG from '../../globals/config';

const createRatingTemplate = (rating) => {
  const roundedRating = [...Array(Math.round(rating)).keys()];
  // Change rating to Stars
  let stars = '';
  for (let index = 0; index < 5; index++) {
    if (index < roundedRating.length) {
      stars += '<i class="fas fa-star purple-star"></i>';
    } else {
      stars += '<i class="fas fa-star grey-star"></i>';
    }
  }

  return stars;
};

const createFeatureTemplate = () => `

        <h1 class="feature__title">Features</h1>
        <div class="feature__grid">
          <div class="feature__card">
              <i class="fas fa-utensils feature__icon" aria-label="Restaurant Icon"></i>
              <h2 class="feature__name">Find Your Restaurant</h2>
              <p class="feature__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, illo, ullam magni officia iste dolorem doloremque rerum facilis nobis quis deleniti, fugiat veniam inventore facere possimus odio consequuntur deserunt ad.</p>
          </div>

          <div class="feature__card">
            <i class="fas fa-users feature__icon" aria-label="People Icon"></i>
            <h2 class="feature__name">Eat with Your Friends</h2>
            <p class="feature__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, illo, ullam magni officia iste dolorem doloremque rerum facilis nobis quis deleniti, fugiat veniam inventore facere possimus odio consequuntur deserunt ad.</p>
          </div>

        <div class="feature__card">
          <i class="fas fa-globe-asia feature__icon" aria-label="Web Icon"></i>
          <h2 class="feature__name">Best Restaurant Website</h2>
          <p class="feature__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, illo, ullam magni officia iste dolorem doloremque rerum facilis nobis quis deleniti, fugiat veniam inventore facere possimus odio consequuntur deserunt ad.</p>
      </div>

      <div class="feature__card">
        <i class="fas fa-tags feature__icon" aria-label="tags icon"></i>
        <h2 class="feature__name">Find Cheapeast Restaurant</h2>
        <p class="feature__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, illo, ullam magni officia iste dolorem doloremque rerum facilis nobis quis deleniti, fugiat veniam inventore facere possimus odio consequuntur deserunt ad.</p>
    </div>
        </div>
`;
const createRestaurantListTemplate = (restaurant) =>
  `
    <div class="restaurant__card restaurant-item">
    <img
      crossorigin="anonymous"
      data-sizes="(max-width: 600px) 480px, 800px"
      data-src="${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}"
      data-srcset="${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId} 480w, ${
    CONFIG.BASE_IMAGE_URL
  }/medium/${restaurant.pictureId}" alt="${restaurant.name}" class="lazyload restaurant__image" />

          <div class="restaurant__data">
            <h2><a class="restaurant__name" href='#/detail/${restaurant.id}'>${
    restaurant.name || '-'
  }</a></h2>
            <h2 class="restaurant__city">${restaurant.city}</h2 >
            <h3 class="restaurant__rating" aria-label='${Math.round(
              restaurant.rating,
            )} stars restaurant'>${
    restaurant.rating && createRatingTemplate(restaurant.rating)
  }</h3>
            <p class="restaurant__description">${
              restaurant.description && restaurant.description.substring(0, 250)
            } ...</p>
          </div>
      </div>
      `;

const createRestaurantDetailTemplate = (restaurant) => {
  const getCategories = () => {
    let categoryList = '';
    restaurant.categories.forEach((category) => {
      categoryList += `<span class="restaurantDetail__category">${category.name}</span>`;
    });

    return categoryList;
  };

  const getFoods = (foods) => {
    let foodList = '';
    foods.forEach((food) => {
      foodList += `<li>${food.name}</li>`;
    });
    return foodList;
  };

  const getDrinks = (drinks) => {
    let drinkList = '';
    drinks.forEach((drink) => {
      drinkList += `<li>${drink.name}</li>`;
    });
    return drinkList;
  };

  const getReviews = (reviews) => {
    let reviewsList = '';
    reviews.forEach((review) => {
      reviewsList += `<div class="restaurantDetail__review">
            <div class="restaurantDetail__person">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="restaurantDetail__reviewContent">
              <h4 class="restaurantDetail__customer">${review.name}</h4>
              <p class="restaurantDetail__customerReview">${review.review}</p>
              <p class="restaurantDetail__dateReview">
              <i class="fas fa-calendar-alt"></i> <span>${review.date}</span></p>
            </div>
          </div>`;
    });
    return reviewsList;
  };

  return `
  <div class="restaurantDetail">
    <div class="restaurantDetail__header">
      <div class="restaurantDetail__image">
      <img
      src="${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId}"
      srcset="${CONFIG.BASE_IMAGE_URL}/small/${restaurant.pictureId} 480w, ${
    CONFIG.BASE_IMAGE_URL
  }/medium/${restaurant.pictureId}"
      sizes="(max-width: 600px) 480px, 800px"
      alt="${restaurant.name}"
      
    />

        <div class="restaurantDetail__city">${restaurant.city}</div>
      </div>
      <div class="restaurantDetail__sideContent">
        <div class="restaurantDetail__name">${restaurant.name}</div>
        <div class="restaurantDetail__categories">${getCategories()}</div>
        <div class="restaurantDetail__address"><i class="fas fa-map-marker-alt"></i>${
          restaurant.address
        }</div>
        <div class="restaurantDetail__rating">${
          restaurant.rating && createRatingTemplate(restaurant.rating)
        }</div>
        <div id="favoriteButtonContainer"></div>
      </div>
    </div>

    <div class="restaurantDetail__mainContent">
      <h2 class="restaurantDetail__title">About Restaurant</h2>
      <div class="restaurantDetail__description">${restaurant.description}</div>

        <div class="restaurantDetail__menu">
          <div class="accordion">
            <div class="accodion__menu" id='foodsMenu'>
              <i class="fas fa-pizza-slice"></i>
              <p>Food</p>
              <div class="restaurantDetail__menus" id='foods'>
                <ul class="restaurantDetail__menu" >
                  ${getFoods(restaurant.menus.foods)}
                </ul>
              </div>
            </div>

            <div class="accodion__menu" id='drinksMenu'>
              <i class="fas fa-glass-cheers"></i>
              <p>Drink</p>
              <div class="restaurantDetail__menus" id='drinks'>
                <ul class="restaurantDetail__menu" >
                  ${getDrinks(restaurant.menus.drinks)}
                </ul>
              </div>
            </div>
        </div>
      </div>

      <h3 class="restaurantDetail__title">What The Customers Say?</h3>

      <div class="restaurantDetail__reviews">
        ${getReviews(restaurant.consumerReviews)}
      </div>

      
      <h4 class='restaurantDetail__title'>Post your Review</h4>
        <div class="restaurantDetail__addReview">
          <label for="name">Name : </label>
          <input type="text" name="name" id="name" placeholder="Enter Your Name"></input>
          <label for="review">Review : </label>
          <textarea name="review" id="review" placeholder="Add Your Review"></textarea>
          <button type="submit" id='submitReview' class="btn btn-purple">Send <i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
  </div>
`;
};

const createFavoriteRestaurantButtonTemplate = () => `
  <button aria-label="Add Restaurant to Favorite" id="favoriteButton" class="btn">
    <span>Add To Favorite</span>
    <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnfavoriteRestaurantButtonTemplate = () => `
  <button aria-label="Remove Restaurant from Favorite" id="favoriteButton" class="btn">
    <span>Remove from Favorite</span>
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantListTemplate,
  createFeatureTemplate,
  createRestaurantDetailTemplate,
  createFavoriteRestaurantButtonTemplate,
  createUnfavoriteRestaurantButtonTemplate,
};
