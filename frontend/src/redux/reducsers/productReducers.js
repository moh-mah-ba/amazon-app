import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
} from "../constants/productsConstants";

export const productReducer = (
  state = {
    loading: true,
    products: [],
    allProducts: [],
    currentPage: [],
    currentItemsPerPage: [],
    totalPages: [],
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        currentItemsPerPage: action.payload.currentItemsPerPage,
        totalPages: action.payload.totalPages,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchProductReducer = (
  state = { products: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true };
    case PRODUCT_SEARCH_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addProductReducer = (state = {newProduct: {} , loading: true} , action) => {
  switch (action.type) {
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, newProduct: action.payload };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
