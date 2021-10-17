import { publicPost } from "../../utilities/apiCaller";

interface LoginProps {
  emailAddress: string;
  password: string;
}

export const login = async (reqData: LoginProps) => {
  return publicPost(`users`, reqData)
    .then((response) => {
      console.log(response);
      // return {
      //   status: response.data.status,
      //   message: response.data.message
      // };
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
