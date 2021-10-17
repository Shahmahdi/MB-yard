import { USER_REGISTER } from "./Types";

const InitialState = {
  user: {},
};

export const UserReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case USER_REGISTER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
