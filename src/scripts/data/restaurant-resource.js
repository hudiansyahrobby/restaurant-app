import axios from 'axios';

import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class restaurantSource {
  static async getRestaurantList() {
    const _restaurantList = await axios.get(API_ENDPOINT.GET_RESTAURANT_LIST);
    const restaurantList = _restaurantList.data.restaurants;
    return restaurantList;
  }

  static async getRestaurantDetail(id) {
    const _restaurantDetail = await axios.get(API_ENDPOINT.GET_RESTAURANT_DETAIL(id));
    const restaurantDetail = _restaurantDetail.data.restaurant;
    return restaurantDetail;
  }

  static async postRestaurantReview(name, review) {
    const data = {
      id: 'adwafawfa',
      name,
      review,
    };

    const jsonData = JSON.stringify(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
    };

    try {
      const postReview = await axios.post(
        'dicoding-restaurant-api.el.r.appspot.com/review',
        jsonData,
        config,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default restaurantSource;
