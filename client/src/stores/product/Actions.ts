import { publicGet } from "../../utilities/apiCaller";
import { GET_PRODUCT_LIST } from "./Types";

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

export const setProductList =(data: any) => (dispatch: any) => {
  dispatch({ type: GET_PRODUCT_LIST, payload: data });
}
