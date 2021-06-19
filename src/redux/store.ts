import { GlobalAction, GlobalState } from "./types";
import { Store, createStore, combineReducers, applyMiddleware } from "redux";
import { uiStateReducer } from "./reducer";
import thunk from 'redux-thunk';


export function createGlobalStore(): Store<GlobalState, GlobalAction> {
  const rootReducer = combineReducers({
    uiState: uiStateReducer
  });

  return createStore(rootReducer, applyMiddleware(thunk));
}
