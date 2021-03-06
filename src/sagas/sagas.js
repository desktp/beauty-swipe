import { types } from '../ducks';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

function* fetchProducts(action) {
  try {
    const page = action.payload.page || 0;
    const response = yield call(fetch, `https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products?page=${page}&subcategory=${action.payload.filter}`);
    const productsJson = yield response.json();
    const type = action.type === types.FETCH_REQUEST ? types.FETCH_SUCCESS : types.SET_FILTER_SUCCESS;
    yield put({ type, payload: productsJson });
  } catch (e) {
    yield put({ type: types.FETCH_FAILURE });
  }
}

function* rateProduct(action) {
  yield put({ type: types.SAVE_PRODUCT_RATING, payload: action.payload });
}

function* productsSaga() {
  yield takeLatest(types.FETCH_REQUEST, fetchProducts);
  yield takeLatest(types.SET_FILTER, fetchProducts);
  yield takeEvery(types.RATE_PRODUCT, rateProduct);
}

export default productsSaga;