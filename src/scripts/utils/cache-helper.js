import CONFIG from '../globals/config';
import API_ENDPOINT from '../globals/api-endpoint';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    const response = await caches.match(request);
    if (response) {
      return response;
    }

    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    if (request.url !== API_ENDPOINT.POST_REVIEW) {
      await this._addCache(request, response.clone());
    }
    return response;
  },

  async _addCache(request, response) {
    const cache = await this._openCache();
    cache.put(request, response);
  },
};

export default CacheHelper;
