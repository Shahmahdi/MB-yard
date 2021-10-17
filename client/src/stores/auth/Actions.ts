import { publicPost } from "../../utilities/apiCaller";
import { CLEAR_ALL } from "../user/Types";
import { SHOW_LOGIN_FORM } from "./Types";
interface LoginProps {
  email: string;
  password: string;
}

export const login = async (reqData: LoginProps) => {
  return publicPost(`/auth/login`, reqData)
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
          : "Fail to send login request, please try again later";
      return {
        status: "fail",
        message
      };
    });
};

export const logout =() => (dispatch: any) => {
  dispatch({ type: CLEAR_ALL });
}

export const showLoginForm = (value: boolean) => (dispatch: any) => {
  dispatch({ type: SHOW_LOGIN_FORM, payload: value });
}
