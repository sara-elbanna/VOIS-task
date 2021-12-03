export const ACTION_SET_DARK_MODE = "ACTION_SET_DARK_MODE";


export interface ActionSetDarkMode {
  type: typeof ACTION_SET_DARK_MODE;
  payload: boolean;
}

export type UiAction = ActionSetDarkMode 
export type UiState = Readonly<{
  darkMode: boolean;
}>;

