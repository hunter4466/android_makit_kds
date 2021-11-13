import {
  createStore, compose, combineReducers, applyMiddleware
} from 'redux';
// import logger from 'redux-logger';
// ----------- IMPORTS -----------
import {
  // --- Reducers --
  kdsMainServiceReducer,
  timersReducer,
  kdsMainSwitchReducer,
  // --- Middlewares --
  fetchOrdersMiddleware,
  fetchOrdersLengthMiddleware
} from './kds/kds';

const reducer = combineReducers({
  // ------------ Reducers -----
  kdsMainServiceReducer,
  timersReducer,
  kdsMainSwitchReducer
});

const composedEnhancer = compose(
  // ------------ Middlewares -----
  applyMiddleware(fetchOrdersLengthMiddleware),
  applyMiddleware(fetchOrdersMiddleware),
  // ------------- Logger --------------
 // applyMiddleware(logger)
);

const store = createStore(
  reducer,
  undefined,
  composedEnhancer
);

export default store;
