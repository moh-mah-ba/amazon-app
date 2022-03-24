import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productReducer,
  searchProductReducer, 
  addProductReducer,
} from "./reducsers/productReducers";
import { cartReducer } from "./reducsers/cartReducers";
import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducsers/userReducers";

const initialState = {
  userSigninReducer: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cartReducer: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  },
};

const reducer = combineReducers({
  productReducer: productReducer,
  productDetailsReducer: productDetailsReducer,
  cartReducer: cartReducer,
  userSigninReducer: userSigninReducer,
  userRegisterReducer: userRegisterReducer,
  searchProductReducer: searchProductReducer,
  addProductReducer: addProductReducer,
});

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  reducer,
  initialState,
  enhancer(applyMiddleware(thunk))
);

export default store;
