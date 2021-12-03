import {Selector} from "react-redux";
import { Product, ProductCategory } from "../intrefaces/productsInterface";
import { getProductsList } from "./products/productsSelectors";
import {GlobalState} from "./types";

export const getDarkMode: Selector<GlobalState, boolean> = state => state.uiState.darkMode;
export const getProducts: Selector<GlobalState, ProductCategory []> = state => getProductsList(state.productsState);
export const getSelectedProducts: Selector<GlobalState, Product []> = state => {
    let selectedProducts: Product[] = []
    state.productsState.products.forEach((category: ProductCategory) => {
        category.products.forEach((p: Product) => {
          if (p.isSelected) selectedProducts.push(p)
        })
      })
    return selectedProducts
}