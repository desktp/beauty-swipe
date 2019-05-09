import { types } from '../ducks';
import { call, put, takeLatest } from 'redux-saga/effects'

function* fetchProducts() {
  try {
    const response = yield call(fetch, 'https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products');
    const productsJson = yield response.json();
    yield put({ type: types.FETCH_SUCCESS, payload: productsJson });
  } catch (e) {
    yield put({ type: types.FETCH_FAILURE });
  }
}

function* productsSaga() {
  yield takeLatest(types.FETCH_REQUEST, fetchProducts);
}

export default productsSaga;