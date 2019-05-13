// Ducks! https://github.com/erikras/ducks-modular-redux

// Actions
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const RATE_PRODUCT = 'RATE_PRODUCT';
const SAVE_PRODUCT_RATING = 'SAVE_PRODUCT_RATING';
const SET_FILTER = 'SET_FILTER';
const SET_FILTER_SUCCESS = 'SET_FILTER_SUCCESS';

export const types = { 
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  RATE_PRODUCT,
  SAVE_PRODUCT_RATING,
  SET_FILTER,
  SET_FILTER_SUCCESS,
};

// Reducer
const INITIAL_STATE = {
  products: [],
  ratedProducts: {
    'like': [],
    'dislike': [],
  },
  loading: true,
  error: false,
}

export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case types.FETCH_SUCCESS:
      return {
        ...state,
        page: payload.page,
        products: [...state.products, ...payload.hits],
        loading: false,
      };
    case types.SET_FILTER_SUCCESS:
      return {
        ...state,
        page: payload.page,
        // When setting a new filter, we want to reset
        // the products we already had
        products: payload.hits,
        loading: false,
      };
    case types.FETCH_FAILURE: 
      return {
        ...state,
        loading: false,
        error: true,
      };
    case types.SAVE_PRODUCT_RATING:
      return {
        ...state,
        ratedProducts: {
          ...state.ratedProducts,
          [payload.action]: [...state.ratedProducts[payload.action], payload.product]
        }
      }
    default: return state;
  }
}

// Action Creators
export const fetchProducts = (page = 0, filter = '') => ({ type: FETCH_REQUEST, payload: { page, filter } });

export const setFilter = (filter = '') => ({ type: SET_FILTER, payload: { filter } });

export const rateProduct = (product, action) => ({ type: RATE_PRODUCT, payload: { product, action } });
