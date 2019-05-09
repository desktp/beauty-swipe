import createSagaMiddleware from 'redux-saga'

import { createStore, applyMiddleware, compose } from 'redux'

import reducer from './ducks'
import productsSaga from './sagas'

let devToolsExtension = f => f;
if (process.env.BROWSER && window.__REDUX_DEVTOOLS_EXTENSION__) {
  devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  devToolsExtension,
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(productsSaga);

export default store;

