// Actions
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

export const types = { 
  FETCH_REQUEST,
  FETCH_FAILURE,
  FETCH_SUCCESS,
};

// Reducer
const INITIAL_STATE = {
  products: [],
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
    default: return state;
  }
}

// Action Creators
export const fetchProducts = () => ({ type: FETCH_REQUEST });
