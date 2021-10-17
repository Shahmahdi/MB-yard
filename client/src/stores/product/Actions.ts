import { publicGet } from "../../utilities/apiCaller";
import { FETCHED_PRODUCT_LIST, FETCHING_PRODUCT_FAILED, FETCHING_PRODUCT_LIST } from "./Types";

export const getProductList = async (limit: number, skip: number) => {
  return publicGet(`product?limit=${limit}&skip=${skip}`)
    .then((response: any) => {
      return {
        status: response.data.status,
        products: response.data.data,
        hasMore: response.data.hasMore,
        message: response.data.message
      };
    })
    .catch((error) => {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Fail to fetch product list, please try again later";
      return {
        status: "fail",
        message
      };
    });
};

export const getProductListByName = async (name: string) => {
  return publicGet(`product/search?name=${name}`)
    .then((response: any) => {
      console.log(`response: `, response)
      return {
        status: response.data.status,
        products: response.data.data,
        message: response.data.message
      };
    })
    .catch((error) => {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Fail to fetch product list, please try again later";
      return {
        status: "fail",
        message
      };
    });
};

export const setProductList =(data: any) => (dispatch: any) => {
  dispatch({ type: FETCHED_PRODUCT_LIST, payload: data });
}

export const fetchingProductList =() => (dispatch: any) => {
  dispatch({ type: FETCHING_PRODUCT_LIST });
}

export const fetchingFailedProductList = (message: string) => (dispatch: any) => {
  dispatch({ type: FETCHING_PRODUCT_FAILED, payload: message });
}

