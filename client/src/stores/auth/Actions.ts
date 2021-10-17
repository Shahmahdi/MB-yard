import { publicPost } from "../../utilities/apiCaller";
import { CLEAR_ALL } from "../user/Types";

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (reqData: LoginProps) => {
  return publicPost(`/auth/login`, reqData)
    .then((response: any) => {
      console.log(response);
      return {
        status: response.data.status,
        userInfo: response.data.data,
        message: response.data.message
      };
    })
    .catch((error) => {
      console.log(error);
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
