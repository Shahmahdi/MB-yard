import { FETCHED_PRODUCT_LIST, FETCHING_PRODUCT_FAILED, FETCHING_PRODUCT_LIST } from "./Types";

const InitialState = {
  fetchingList: false,
  list: [],
  fetchingFailed: false,
  fetchingFailedMessage: "",
  hasMore: false
};

export const ProductReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case FETCHING_PRODUCT_LIST: {
      return {
        ...state,
        fetchingList: true,
        list: [],
        hasMore: false,
        fetchingFailed: false,
        fetchingFailedMessage: "",
      };
    }
    case FETCHED_PRODUCT_LIST: {
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        hasMore: action.payload.hasMore,
        fetchingList: false
      };
    }
    case FETCHING_PRODUCT_FAILED: {
      return {
        ...state,
        list: [],
        hasMore: false,
        fetchingList: false,
        fetchingFailed: true,
        fetchingFailedMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
