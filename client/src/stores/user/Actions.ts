import { publicPost } from "../../utilities/apiCaller";
import { USER_LOGIN, USER_REGISTER } from "./Types";

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