import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { RootReducer } from "./stores";

const initialState = {} as any;

const middleware = [thunk];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  RootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
  )
);