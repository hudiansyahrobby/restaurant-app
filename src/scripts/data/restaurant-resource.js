import axios from 'axios';

import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import { hideSpinner } from '../utils/spinner-initiator';
import { showModal } from '../utils/modal-initator';

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

  static async postRestaurantReview(reviewData) {
    const formattedData = JSON.stringify(reviewData);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
    };

    try {
      await axios.post(API_ENDPOINT.POST_REVIEW, formattedData, config);
      window.location.reload(true);
    } catch (error) {
      hideSpinner();
      showModal();
    }
  }
}

export default restaurantSource;
