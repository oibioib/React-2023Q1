const API = {
  URL: 'https://react-api-proxy.fly.dev',
  ENDPOINT: {
    PHOTOS: '/search/photos',
    SINGLE_PHOTO: '/photos',
  },
  DEFAULT_QUERY: 'cat',
  ERRORS: {
    NO_CONNECTION: 'No connection with server. Try again later.',
  },
  PARAMS: {
    PER_PAGE: 20,
    ORIENTATION: 'landscape',
  },
};

export default API;
