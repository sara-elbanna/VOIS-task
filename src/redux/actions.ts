import { Product, ProductCategories } from "../intrefaces/productsInterface";
import { ACTION_SET_DARK_MODE, ActionSetDarkMode, ACTION_STORE_PRODUCTS, ActionstoreProducts, ActionselectProduct, SELLECTE_PRODUCT, UNSELLECTE_PRODUCT } from "./types";

export function setDarkMode(darkMode: boolean): ActionSetDarkMode {
  return {
    type: ACTION_SET_DARK_MODE,
    payload: darkMode
  };
}

export const fetchProducts = (): any => {
  return ((dispatch: any) => {
    return fetch('/data.json').then(res => res.json())
      .then(res => {
        console.log('resss',res)
        dispatch(storeProducts(res.productCategories));
      })
  });
};


const storeProducts = (products: ProductCategories[]): ActionstoreProducts => {
  return {
    type: ACTION_STORE_PRODUCTS,
    payload: products
  }
};

export const selectProduct = (product: Product): ActionselectProduct => {
  return {
    type: SELLECTE_PRODUCT,
    payload: product
  }
};

export const unSelectProduct = (product: Product): ActionselectProduct => {
  return {
    type: UNSELLECTE_PRODUCT,
    payload: product
  }
};

