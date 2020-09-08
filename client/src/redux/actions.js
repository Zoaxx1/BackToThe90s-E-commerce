import * as constans from "./constans";
import axios from "axios";

const url = "http://localhost:3001/";

const instance = axios.create({
  withCredentials: true,
  baseURL: url,
});

// ------------------------------------------------------------------------------------
// ---------------------------PRODUCTS-------------------------------------------------
// -----------------------------------------------------------------------------------
export const getProducts = () => {
  return (dispatch) => {
    instance.get("products").then((res) => {
      if (res.status === 200) {
        return dispatch({ type: constans.GET_PRODUCTS, payload: res.data });
      }
    });
  };
};

export const getProductById = (id) => {
  return function (dispatch) {
    instance.get("products/" + id).then((payload) => {
      dispatch({ type: constans.GET_PRODUCT_BY_ID, payload: payload.data });
    });
  };
};

export const postProduct = (value) => {
  return function (dispatch) {
    instance.post("products/", value).then((res) => {
      dispatch({ type: constans.POST_PRODUCT, payload: res.data });
    });
  };
};

export const putProduct = (id, value) => {
  return function (dispatch) {
    instance.put("products/" + id, value).then((payload) => {
      dispatch({ type: constans.POST_PRODUCT, payload: payload });
    });
  };
};

export const deleteProduct = (id) => {
  return function (dispatch) {
    instance.delete("products/" + id).then((res) => {
      dispatch({ type: constans.DELETE_PRODUCT, payload: res.data });
    });
  };
};

export const putQuantityOfProduct = (id, value) => {
  return function (dispatch) {
    instance.put("products/" + id + "/quantity", value).then((payload) => {
      dispatch({ type: constans.PUT_QUANTITY_OF_PRODUCT, payload: payload });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------CATEGORIES-----------------------------------------------
// ------------------------------------------------------------------------------------

export const getCategories = () => {
  return (dispatch) => {
    instance.get("products/category").then((res) => {
      if (res.status == 200) {
        return dispatch({ type: constans.GET_CATEGORIES, payload: res.data });
      }
    });
  };
};

export const postCategories = (value) => {
  return function (dispatch) {
    instance.post("products/category", value).then((payload) => {
      dispatch({ type: constans.POST_CATEGORY, payload: payload });
    });
  };
};

export const putCategories = (id, value) => {
  return function (dispatch) {
    instance.put("products/category/" + id, value).then((payload) => {
      dispatch({ type: constans.PUT_CATEGORY, payload: payload });
    });
  };
};

export const deleteCategories = (id) => {
  return function (dispatch) {
    instance.delete("products/category/" + id).then((payload) => {
      dispatch({ type: constans.DELETE_CATEGORY, payload: payload });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------RELATIONS------------------------------------------------
// ------------------------------------------------------------------------------------

export const postRelations = (idProduct, idCategory, value) => {
  return function (dispatch) {
    instance
      .post("products/" + idProduct + "/category" + idCategory, value)
      .then((payload) => {
        dispatch({ type: constans.POST_RELATIONS, payload: payload });
      });
  };
};

export const deleteRelations = (idProduct, idCategory, value) => {
  return function (dispatch) {
    instance
      .delete("products/" + idProduct + "/category" + idCategory, value)
      .then((payload) => {
        dispatch({ type: constans.DELETE_RELATIONS, payload: payload });
      });
  };
};

export const getRelations = () => {
  return function (dispatch) {
    instance.get("relations").then((payload) => {
      dispatch({ type: constans.GET_RELATIONS, payload: payload.data });
    });
  };
};

export const getRelationsById = (idCat) => {
  return function (dispatch) {
    instance.get("relations/" + idCat).then((payload) => {
      dispatch({ type: constans.GET_RELATIONS_BY_ID, payload: payload.data });
    });
  };
};

export const getRelationsCategoriesById = (idProd) => {
  return function (dispatch) {
    instance.get("relations/product/" + idProd).then((payload) => {
      dispatch({
        type: constans.GET_RELATIONS_CATEGORIES_BY_ID,
        payload: payload.data,
      });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------SEARCH---------------------------------------------------
// ------------------------------------------------------------------------------------

export const getSearch = (query) => {
  return function (dispatch) {
    instance.get("search" + query).then((payload) => {
      dispatch({ type: constans.GET_SEARCH, payload: payload.data });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------USER-----------------------------------------------------
// ------------------------------------------------------------------------------------
export const getUsers = () => {
  return function (dispatch) {
    instance.get("auth/users").then((payload) => {
      dispatch({ type: constans.GET_USERS, payload: payload.data });
    });
  };
};

export const postUser = (value) => {
  return function (dispatch) {
    instance.post("auth/register", value).then((payload) => {
      if (typeof payload.data !== "string") {
        alert("el usuario se creo");
        dispatch({ type: constans.POST_USER, payload: payload.data });
      } else alert("el usuario ya esta en uso");
    });
  };
};

export const putUser = (id, value) => {
  return function (dispatch) {
    instance.put("auth/" + id, value).then((payload) => {
      dispatch({ type: constans.PUT_USER, payload: payload });
    });
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    instance.delete("auth/" + id).then((payload) => {
      dispatch({ type: constans.DELETE_USER, payload: payload });
    });
  };
};

//      GET EMAIL TO RESET PASSWORD
export const getIdFromEmail = (value) => {
  return function (dispatch) {
    instance.post('auth/passwordReset', value).then((payload) => {
      dispatch({ type: constans.GET_ID_FROM_ID, payload: payload.data })
    })
  }
}

//      RESET DE PASSWORD
export const putPasswordUser = (id, value) => {
  return function (dispatch) {
    instance.put(`/auth/${id}/passwordReset`, value).then((payload) => {
      dispatch({ type: constans.PUT_USER_PASSWORD, payload: payload });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------CART-----------------------------------------------------
// ------------------------------------------------------------------------------------

export const postProductToCart = (id, value) => {
  return function (dispatch) {
    instance.post("users/" + id + "/cart", value).then((payload) => {
      dispatch({ type: constans.POST_PRODUCT_TO_CART, payload: payload });
    });
  };
};

export const getProductsOfCart = (id) => {
  return (dispatch) => {
    instance.get("users/" + id + "/cart").then((res) => {
      if (res.status == 200) {
        return dispatch({
          type: constans.GET_PRODUCTS_OF_CART,
          payload: res.data,
        });
      }
    });
  };
};

export const getProductsOfUser = (id) => {
  return (dispatch) => {
    instance.get("users/" + id + "/orders").then((res) => {
      if (res.status == 200) {
        return dispatch({
          type: constans.GET_PRODUCTS_OF_USER,
          payload: res.data,
        });
      }
    });
  };
};

export const cleanCart = (id) => {
  return function (dispatch) {
    instance.delete("users/" + id + "/cart").then((payload) => {
      dispatch({ type: constans.DELETE_CART, payload: payload });
    });
  };
};

export const buyCart = (id) => {
  return function (dispatch) {
    instance.put("users/" + id + "/buy").then((payload) => {
      dispatch({ type: constans.DELETE_CART, payload: payload });
    });
  };
}

export const putQuantityOfOrder = (id, value) => {
  return function (dispatch) {
    instance.put("users/" + id + "/cart", value).then((payload) => {
      dispatch({ type: constans.PUT_QUANTITY_OF_ORDER, payload: payload });
    });
  };
};

export const postCloneCart = (value) => {
  return function (dispatch) {
    instance.post("users/migrate", value).then((payload) => {
      dispatch({ type: constans.POST_CLONE_CART, payload: payload });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------ORDERS---------------------------------------------------
// ------------------------------------------------------------------------------------

export const getAllOrders = () => {
  return (dispatch) => {
    instance.get("/orders").then((res) => {
      if (res.status === 200) {
        return dispatch({ type: constans.GET_ALL_ORDERS, payload: res.data });
      }
    });
  };
};

export const getOrderById = (id) => {
  return (dispatch) => {
    instance.get("/orders/" + id).then((res) => {
      if (res.status == 200) {
        return dispatch({ type: constans.GET_ORDER_BY_ID, payload: res.data });
      }
    });
  };
};

export const putOrderById = (id, value) => {
  return function (dispatch) {
    instance.put("orders/" + id, value).then((payload) => {
      dispatch({ type: constans.PUT_ORDER_BY_ID, payload: payload });
    });
  };
};

export const getOrderByUserId = (id) => {
  return function(dispatch){
    instance.get("orders/user/" + id).then(payload => {
      dispatch({type: constans.GET_ORDER_BY_USER_ID, payload: payload.data})
    })
  }
}

// ------------------------------------------------------------------------------------
// ---------------------------AUTENTICACION--------------------------------------------
// ------------------------------------------------------------------------------------

export const userLogin = (value) => {
  return function (dispatch) {
    try {
      instance.post("auth/login", value).then((payload) => {
        dispatch({ type: constans.USER_LOGIN, payload: payload.data });
      });
    } catch (err) { console.log(err) }
  };
};

export const userLoginGet = () => {
  return function (dispatch) {
    instance.get("auth/me").then((payload) => {
      dispatch({ type: constans.USER_LOGIN, payload: payload.data });
    });
  };
};

export const userLogout = () => {
  return function (dispatch) {
    instance.get("auth/logout").then((payload) => {
      dispatch({ type: constans.USER_LOGOUT, payload: undefined });
    });
  };
};

export const userPromote = (id) => {
  return function (dispatch) {
    instance.put("auth/promote/" + id).then((payload) => {
      dispatch({ type: constans.USER_PROMOTE, payload: payload });
    });
  };
};

// ------------------------------------------------------------------------------------
// ---------------------------REVIEW---------------------------------------------------
// ------------------------------------------------------------------------------------

export const postReview = (id, value) => {
  return function (dispatch) {
    instance.post("product/" + id + "/reviews", value).then((payload) => {
      dispatch({ type: constans.POST_REVIEW, payload: payload.data });
    });
  };
};

export const putReview = (id, idReview, value) => {
  return function (dispatch) {
    instance
      .put("product/" + id + "/review/" + idReview, value)
      .then((payload) => {
        dispatch({ type: constans.PUT_REVIEW, payload: payload.data });
      });
  };
};

export const getReview = (id) => {
  return function (dispatch) {
    instance.get("product/" + id + "/review").then((payload) => {
      dispatch({ type: constans.GET_REVIEW, payload: payload.data });
    });
  };
};

export const deleteReview = (id, idReview) => {
  return function (dispatch) {
    instance.delete("product/" + id + "/review/" + idReview).then((payload) => {
      dispatch({ type: constans.DELETE_REVIEW, payload: payload.data });
    });
  };
};

export const getAllReviews = () => {
  return function (dispatch) {
    instance.get("product/reviews").then(payload => {
      dispatch({ type: constans.GET_ALL_REVIEWS, payload: payload.data })
    })
  }
}

// ------------------------------------------------------------------------------------
// --------------------------- GOOGLE VALIDATION --------------------------------------
// ------------------------------------------------------------------------------------

export const gmailValidation = (value) => {
  return function (dispatch) {
    instance.post("auth/login/google", value).then(payload => {
      console.log(value)
      dispatch({ type: constans.GMAIL_VALIDATION, payload: payload.data })
    })
  }
}

// ------------------------------------------------------------------------------------
// --------------------------- USER CHECKOUT --------------------------------------
// ------------------------------------------------------------------------------------

export const postSendEmail = (value) => {
  return function (dispatch) {
    instance.post("send-email", value)
  }
} 