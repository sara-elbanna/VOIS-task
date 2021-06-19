import { Product, ProductCategories } from "../intrefaces/productsInterface";

export const ACTION_SET_DARK_MODE = "ACTION_SET_DARK_MODE";
export const ACTION_STORE_PRODUCTS = "ACTION_STORE_PRODUCTS";
export const SELLECTE_PRODUCT = "SELLECTE_PRODUCT";
export const UNSELLECTE_PRODUCT = "UNSELLECTE_PRODUCT";

export interface ActionSetDarkMode {
  type: typeof ACTION_SET_DARK_MODE;
  payload: boolean;
}
export interface ActionstoreProducts {
  type: typeof ACTION_STORE_PRODUCTS;
  payload: ProductCategories [] | [];
}

export interface ActionselectProduct {
  type: typeof SELLECTE_PRODUCT| typeof UNSELLECTE_PRODUCT;
  payload: Product ;
}
export type UiAction = ActionSetDarkMode | ActionstoreProducts |ActionselectProduct;

export type GlobalAction = UiAction;

export type UiState = Readonly<{
  darkMode: boolean;
  products:ProductCategories [],
}>;

export type GlobalState = Readonly<{
  uiState: UiState;
}>;
