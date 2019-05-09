// Actions
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const RATE_PRODUCT = 'RATE_PRODUCT';
const SAVE_PRODUCT_RATING = 'SAVE_PRODUCT_RATING';

export const types = { 
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  RATE_PRODUCT,
  SAVE_PRODUCT_RATING,
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
export const fetchProducts = (page = 0) => ({ type: FETCH_REQUEST, payload: page });

export const rateProduct = (product, action) => ({ type: RATE_PRODUCT, payload: { product, action } });
