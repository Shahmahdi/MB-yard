import {GET_PRODUCT_LIST } from "./Types";

const InitialState = {
  list: [],
  hasMore: false
};

export const ProductReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case GET_PRODUCT_LIST: {
      return {
        ...state,
        list: [
          ...state.list, 
          ...action.payload.list
      ],
        hasMore: action.payload.hasMore
      };
    }
    default:
      return state;
  }
};
