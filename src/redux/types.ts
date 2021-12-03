import { ProductsAction, ProductsState } from "./products/productsTypes";
import { UiAction, UiState } from "./UI/uiTypes";

export type GlobalAction = UiAction | ProductsAction;
export type GlobalState = Readonly<{
  uiState: UiState;
  productsState: ProductsState
}>;
