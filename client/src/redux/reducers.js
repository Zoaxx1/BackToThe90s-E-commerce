import * as constans from "./constans";

var initialState = {
  products: [],
  categories: [],
  relations: [],
  allRelations: [],
  relationsCategories: [],
  productByID: {},
  filterProducts: [],
  users: [],
  user: undefined,
  idResetPassword: undefined,
  reviews: [],
  allReviews: [],
  orders: [],
  ordersUser: [],
  cart: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //PRODUCTS--------------------------------
    case constans.GET_PRODUCTS:
    case constans.POST_PRODUCT:
    case constans.PUT_PRODUCT:
    case constans.DELETE_PRODUCT:
    case constans.PUT_QUANTITY_OF_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case constans.GET_PRODUCT_BY_ID:
      return {
        ...state,
        productByID: action.payload,
      };
    //CATEGORIES-----------------------------
    case constans.GET_CATEGORIES:
    case constans.POST_CATEGORY:
    case constans.PUT_CATEGORY:
    case constans.DELETE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    //RELATIONS-------------------------------
    case constans.GET_RELATIONS:
      return {
        ...state,
        allRelations: action.payload,
      }
    case constans.POST_RELATIONS:
    case constans.DELETE_RELATIONS:
    case constans.GET_RELATIONS_BY_ID:
      return {
        ...state,
        relations: action.payload,
      };
    case constans.GET_RELATIONS_CATEGORIES_BY_ID:
      return {
        ...state,
        relationsCategories: action.payload,
      };

    //SEARCH-------------------------------
    case constans.GET_SEARCH:
      return {
        ...state,
        filterProducts: action.payload,
      };

    //USERS--------------------------------
    case constans.POST_USER:
    case constans.DELETE_USER:
    case constans.PUT_USER:
    case constans.PUT_USER_PASSWORD:
    case constans.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    //CART---------------------------------
    case constans.POST_PRODUCT_TO_CART:
    case constans.DELETE_CART:
    case constans.GET_PRODUCTS_OF_CART:
      return {
        ...state,
        cart: action.payload,
      };

    //ORDER---------------------------------
    case constans.GET_ALL_ORDERS:
    case constans.GET_PRODUCTS_OF_USER:
    case constans.GET_ORDER_BY_ID:
    case constans.PUT_ORDER_BY_ID:
      return {
        ...state,
        orders: action.payload,
      };
    case constans.GET_ORDER_BY_USER_ID:
      return{
        ...state,
        ordersUser: action.payload
      }
    //VALIDATIONS--------------------------
    case constans.USER_LOGIN:
    case constans.GMAIL_VALIDATION:
      return {
        ...state,
        user: action.payload,
      };
    case constans.USER_LOGOUT:
      return {
        ...state,
        user: undefined,
      };

    //REVIEWS-----------------------------
    case constans.GET_REVIEW:
    case constans.POST_REVIEW:
    case constans.PUT_REVIEW:
    case constans.DELETE_REVIEW:
      return {
        ...state,
        reviews: action.payload
      };
    case constans.GET_ALL_REVIEWS:
      return {
        ...state,
        allReviews: action.payload
      }
    //RESET PASSWORD-----------------------
    case constans.GET_ID_FROM_ID:
      return {
        ...state,
        idResetPassword: action.payload
      }
    //DEFAULT------------------------------
    //POST_CLONE_CART
    default:
      return state;
  }
};
