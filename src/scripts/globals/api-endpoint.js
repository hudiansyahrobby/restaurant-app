import CONFIG from './config';

const API_ENDPOINT = {
  GET_RESTAURANT_LIST: `${CONFIG.BASE_URL}list`,
  GET_RESTAURANT_DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  POST_REVIEW: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
