import { Product, ProductCategory } from "../../intrefaces/productsInterface";

export const ACTION_STORE_PRODUCTS = "ACTION_STORE_PRODUCTS";
export const SELLECTE_PRODUCT = "SELLECTE_PRODUCT";
export const UNSELLECTE_PRODUCT = "UNSELLECTE_PRODUCT";

export interface ActionstoreProducts {
  type: typeof ACTION_STORE_PRODUCTS;
  payload: ProductCategory [] | [];
}

export interface ActionselectProduct {
  type: typeof SELLECTE_PRODUCT| typeof UNSELLECTE_PRODUCT;
  payload: Product ;
}
export type ProductsAction = ActionstoreProducts |ActionselectProduct;

// export type GlobalAction = UiAction;

export type ProductsState = Readonly<{
  products:ProductCategory [],
}>;


