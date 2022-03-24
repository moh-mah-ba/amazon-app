import {api} from "./config";
import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConsants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await api.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
