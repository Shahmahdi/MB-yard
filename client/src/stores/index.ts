import { combineReducers } from "redux";
import { AuthReducer } from "./auth/Reducer";
import { ProductReducer } from "./product/Reducer";
import { UserReducer } from "./user/Reducer";

export const RootReducer = combineReducers({
  authReducer: AuthReducer,
	userReducer: UserReducer,
  productReducer: ProductReducer
});