import { ProductCategories } from "../intrefaces/productsInterface";
import { ACTION_STORE_PRODUCTS, ACTION_SET_DARK_MODE, GlobalAction, UiState, SELLECTE_PRODUCT, UNSELLECTE_PRODUCT } from "./types";

import { cloneDeep } from 'lodash'
const INITIAL_STATE: UiState = {
  darkMode: false,
  products: [],
};

export function uiStateReducer(state: UiState = INITIAL_STATE, action: GlobalAction): UiState {
  switch (action.type) {
    case ACTION_SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload
      };
    case ACTION_STORE_PRODUCTS:
      console.log('reduu', action.payload)
      return {
        ...state,
        products: action.payload
      };
    case SELLECTE_PRODUCT: {
      let newState = cloneDeep(state)
      newState.products.forEach((category: ProductCategories) => {
        let selectedProduct = category.products.find(p => p.name == action.payload.name)
        if (selectedProduct) {
          selectedProduct['isSelected'] = true
          return
        }
      })
      return newState
    }
    case UNSELLECTE_PRODUCT: {
      let newState = cloneDeep(state)
      newState.products.forEach((category: ProductCategories) => {
        let selectedProduct = category.products.find(p => p.name == action.payload.name)
        if (selectedProduct) {
          selectedProduct['isSelected'] = false
          return
        }
      })
      return newState
    }

    default:
      return state;
  }
}
