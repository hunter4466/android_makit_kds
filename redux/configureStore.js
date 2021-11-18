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
  fetchOrdersLengthMiddleware,
  updateTimersMiddleware,
  sentToKitchenMiddleware,
  sentToEnsambleMiddleware,
  sentToDeliveryMiddleware,
} from './kds/kds';

const reducer = combineReducers({
  // ------------ Reducers -----
  kdsMainServiceReducer,
  timersReducer,
  kdsMainSwitchReducer,
});

const composedEnhancer = compose(
  // ------------ Middlewares -----
  applyMiddleware(fetchOrdersLengthMiddleware),
  applyMiddleware(fetchOrdersMiddleware),
  applyMiddleware(updateTimersMiddleware),
  applyMiddleware(sentToKitchenMiddleware),
  applyMiddleware(sentToEnsambleMiddleware),
  applyMiddleware(sentToDeliveryMiddleware),
  // ------------- Logger --------------
  // applyMiddleware(logger)
);

const store = createStore(
  reducer,
  undefined,
  composedEnhancer,
);

export default store;
