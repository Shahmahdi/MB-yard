import { combineReducers } from "redux";
import { UserReducer } from "./user/Reducer";

export const RootReducer = combineReducers({
	userReducer: UserReducer
});