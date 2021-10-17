import { combineReducers } from "redux";
import { ProductReducer } from "./product/Reducer";
import { UserReducer } from "./user/Reducer";

export const RootReducer = combineReducers({
	userReducer: UserReducer,
  productReducer: ProductReducer
});