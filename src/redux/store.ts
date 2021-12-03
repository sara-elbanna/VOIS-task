import { GlobalAction, GlobalState } from "./types";
import { Store, createStore, combineReducers, applyMiddleware } from "redux";
import { uiStateReducer } from "./UI/uiReducer";
import thunk from 'redux-thunk';
import { productsStateReducer } from "./products/productsReducer";


export function createGlobalStore(): Store<GlobalState, GlobalAction> {
  const rootReducer = combineReducers({
    uiState: uiStateReducer,
    productsState:productsStateReducer
  });

  return createStore(rootReducer, applyMiddleware(thunk));
}
