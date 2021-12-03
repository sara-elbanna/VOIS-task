import { ACTION_SET_DARK_MODE, UiAction, UiState } from "./uiTypes";

const INITIAL_STATE: UiState = {
  darkMode: false,
};

export function uiStateReducer(state: UiState = INITIAL_STATE, action: UiAction): UiState {
  switch (action.type) {
    case ACTION_SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload
      };
    default:
      return state;
  }
}
