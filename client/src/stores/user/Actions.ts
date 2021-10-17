import { privateDelete, privateGet, privatePost, publicPost } from "../../utilities/apiCaller";
import { UPDATE_WISH_LIST, USER_LOGIN, USER_REGISTER } from "./Types";

export const signup = async (reqData: any) => {
  return publicPost(`users`, reqData)
    .then((response: any) => {
      return {
        status: response.data.status,
        userInfo: response.data.data,
        message: response.data.message
      };
    })
    .catch((error) => {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Fail to send signup request, please try again later";
      return {
        status: "fail",
        message
      };
    });
};

export const setUserInfo =(data: any) => (dispatch: any) => {
  dispatch({ type: USER_REGISTER, payload: data });
}

export const setUserLoginInfo =(data: any) => (dispatch: any) => {
  dispatch({ type: USER_LOGIN, payload: data });
}

export const getWishlist = (token: string) => {
  return privateGet(`wishlist`, token)
    .then((response: any) => {
      return {
        status: "success",
        wishlist: response.data.data,
        totalAmount: response.data.totalAmount,
        message: response.data.message
      };
    })
    .catch((error) => {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Fail to fetch wish list, please try again later";
      return {
        status: "fail",
        message
      };
    });
}

export const addItemIntoWishlist = (token: string, productId: string) => {
  return privatePost(`wishlist`, {productId}, token)
    .then((response: any) => {
      return {
        status: "success",
        message: response.data.message
      };
    })
    .catch((error) => {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Fail to add item into wishlist, please try again later";
      return {
        status: "fail",
        message
      };
    });
};

export const removeItemIntoWishlist = (token: string, productId: string) => {
  return privateDelete(`wishlist/${productId}`, token)
    .then((response: any) => {
      return {
        status: "success",
        message: response.data.message
      };
    })
    .catch((error) => {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Fail to remove item from wishlist, please try again later";
      return {
        status: "fail",
        message
      };
    });
};

export const updateUserWishlist =(data: any) => (dispatch: any) => {
  dispatch({ type: UPDATE_WISH_LIST, payload: data });
}