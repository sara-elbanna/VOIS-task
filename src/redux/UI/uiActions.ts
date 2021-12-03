import { ActionSetDarkMode, ACTION_SET_DARK_MODE } from "./uiTypes";

export function setDarkMode(darkMode: boolean): ActionSetDarkMode {
  return {
    type: ACTION_SET_DARK_MODE,
    payload: darkMode
  };
}

