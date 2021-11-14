import { useDispatch, useSelector } from "react-redux";
// ---------------- paths (Data) --------------------
const TRIGGER_PRODUCTS = 'REDUX/KDS/KDS/TRIGGER_PRODUCTS';
const UPLOAD_PRODUCTS = 'REDUX/KDS/KDS/UPLOAD_PRODUCTS';
const UPDATE_TIMERS = 'REDUX/KDS/KDS/UPDATE_TIMERS';
const SWITCH_SCREEN = 'REDUX/KDS/KDS/SWITCH_SCREEN';
const RESET_TIMERS = 'REDUX/KDS/KDS/RESET_TIMERS';
const LOAD_ORDERS = 'REDUX/KDS/KDS/LOAD_ORDERS';
// ---------------- Timers -------------------
// ---------------- Actions (Data) ------------------
const loadOrders = () => ({
  type: LOAD_ORDERS
});
const triggerProducts = () => ({
  type: TRIGGER_PRODUCTS
});
const uploadProducts = (payload) => ({
  type: UPLOAD_PRODUCTS,
  payload
})
const updateTimers = (payload) => ({
  type: UPDATE_TIMERS,
  payload
})
const switchScreenOn = (payload) => ({
  type: SWITCH_SCREEN,
  payload
})
const resetTimers = () => ({
  type: RESET_TIMERS
})
const sendToKitchen = (payload) => ({
  type: SEND_TO_KITCHEN,
  payload
})
const sendToEnsamble = (payload) => ({
  type: SEND_TO_ENSAMBLE,
  payload
})
const sendToDelivery = (payload) => ({
  type: SEND_TO_DELIVERY,
  payload
})
// ----------------- REDUCERS ------------
const kdsMainServiceReducer = (state = [], action) => {
  switch (action.type) {
    case TRIGGER_PRODUCTS:
      return state;
    case UPLOAD_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};
const timersReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TIMERS:
      return action.payload
    case RESET_TIMERS:
      reset();
      return {}
    default:
      return state;
  }
}
const mainSwitchDefaultState = {
  kitchen: true,
  ensamble: false,
  recover: false,
}
const kdsMainSwitchReducer = (state = mainSwitchDefaultState, action) => {
  const newObj = {
    kitchen: false,
    ensamble: false,
    recover: false,
  }
  
  switch (action.type) {
    case SWITCH_SCREEN:
      newObj[action.payload] = true
      return newObj
    default:
      return state;
  }
}
let test = 0
// ---------------- Middlewares and Side Effects --------------
const fetchOrdersLengthMiddleware = (store) => (next) => (action) => {
  const evaluate = (value) => {
    const long = value.size
    if(store.getState().kdsMainServiceReducer) {
      test = store.getState().kdsMainServiceReducer.length
    } else { 
      test = 0
    }
    console.log(long, test)
    if (long > test) { 
      store.dispatch(triggerProducts())
    }
  };
  if (action.type === LOAD_ORDERS) {
    fetch('https://www.makitperu.com/getlastweeklength', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      cors: 'no-cors'
    }).then((response) => response.json())
      .then((json) => evaluate(json));
  }
  next(action);
};

const fetchOrdersMiddleware = (store) => (next) => (action) => {
  const parseInfoFunc = (array) => {
    const arrayToParse = [];
    array.forEach((e) => {
      e.order_detail = JSON.parse(e.order_detail);
      arrayToParse.push(e);
    });
    return arrayToParse;
  };
  if (action.type === TRIGGER_PRODUCTS) {
    console.log('trying to fetcch products')
    fetch('https://www.makitperu.com/getlastweekorders', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      cors: 'no-cors'
    }).then((response) => response.json())
      .then((json) => store.dispatch(uploadProducts(parseInfoFunc(json))));
  }
  next(action);
};

const sentToKitchenMiddleware = () => (next) => (action) => {
  if (action.type === SEND_TO_KITCHEN) {
    console.log('trying to fetcch products')
    fetch(`https://www.makitperu.com/sendToKitchen/${action.payload}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      cors: 'no-cors'
    })
  }
  next(action);
};

const sentToEnsambleMiddleware = () => (next) => (action) => {
  if (action.type === SEND_TO_ENSAMBLE) {
    console.log('trying to fetcch products')
    fetch(`https://www.makitperu.com/sendToEnsamble/${action.payload}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      cors: 'no-cors'
    })
  }
  next(action);
};

const sentToDeliveryMiddleware = () => (next) => (action) => {
  if (action.type === SEND_TO_DELIVERY) {
    console.log('trying to fetcch products')
    fetch(`https://www.makitperu.com/sendToDelivery/${action.payload}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      cors: 'no-cors'
    })
  }
  next(action);
};



// ---------------- Exports --------------
export {
  // ------ Reducers -------
  kdsMainServiceReducer,
  timersReducer,
  kdsMainSwitchReducer,
  // ------ Actions (Data) --------
  loadOrders,
  uploadProducts,
  switchScreenOn,
  updateTimers,
  resetTimers,
  sendToKitchen,
  sendToEnsamble,
  sendToDelivery,
  // ---- Middlewares -----
  fetchOrdersMiddleware,
  fetchOrdersLengthMiddleware,
  sentToKitchenMiddleware,
  sentToEnsambleMiddleware,
  sentToDeliveryMiddleware,
};
