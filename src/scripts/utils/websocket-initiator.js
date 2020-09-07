import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log(message);
    const restaurant = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      name: `${restaurant.name} is the Trending Restaurant`,
      options: {
        body: restaurant.overview,
        image: `${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}`,
      },
    });
  },
};

export default WebSocketInitiator;
