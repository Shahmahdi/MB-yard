import { USER_REGISTER, USER_LOGIN, CLEAR_ALL } from "./Types";

const InitialState = {
  user: {},
  token: ""
};

export const UserReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case USER_REGISTER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        token: action.payload.token,
        user: {
          name: action.payload.name,
          email: action.payload.email
        }
      }
    }
    case CLEAR_ALL: {
      return {
        ...InitialState
      }
    }
    default:
      return state;
  }
};
