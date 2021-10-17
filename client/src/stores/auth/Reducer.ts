import { SHOW_LOGIN_FORM } from "./Types";

const InitialState = {
  showLoginForm: false
};

export const AuthReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case SHOW_LOGIN_FORM: {
      return {
        ...state,
        showLoginForm: action.payload
      };
    }
    default:
      return state;
  }
};
