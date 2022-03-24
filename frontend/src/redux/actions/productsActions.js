import { api } from "./config";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
} from "../constants/productsConstants";

export const listProduct = (itemsPerPage, pageNumber) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await api.get(
      `/api/products/?page=${pageNumber}&itemsPerPage=${itemsPerPage}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await api.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchAction = (search) => async (dispatch) => {
  dispatch({ type: PRODUCT_SEARCH_REQUEST });
  try {
    const { data } = await api.get(`/search/${search}`);
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload: error.message,
    });
  }
};

export const addproductAction =
  (
    name,
    brand,
    description,
    category,
    price,
    countInStock,
    rating,
    numReviews,
    image
  ) =>
  async (dispatch) => {
    try {
      const { data } = await api.post("/api/products/addproduct", {
        name,
        image,
        brand,
        description,
        category,
        price,
        countInStock,
        rating,
        numReviews,
      });
      dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADD_FAIL,
        payload: error.message,
      });
    }
  };
