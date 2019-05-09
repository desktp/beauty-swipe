import { types } from '../ducks';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

function* fetchProducts(action) {
  try {
    const response = yield call(fetch, `https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products?page=${action.payload}`);
    const productsJson = yield response.json();
    yield put({ type: types.FETCH_SUCCESS, payload: productsJson });
  } catch (e) {
    yield put({ type: types.FETCH_FAILURE });
  }
}

function* rateProduct(action) {
  yield put({ type: types.SAVE_PRODUCT_RATING, payload: action.payload });
}

function* productsSaga() {
  yield takeLatest(types.FETCH_REQUEST, fetchProducts);
  yield takeEvery(types.RATE_PRODUCT, rateProduct);
}

export default productsSaga;