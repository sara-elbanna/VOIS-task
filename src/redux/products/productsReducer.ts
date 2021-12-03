
import { cloneDeep } from 'lodash'
import { ProductCategory } from '../../intrefaces/productsInterface';
import { ACTION_STORE_PRODUCTS, ProductsAction, ProductsState, SELLECTE_PRODUCT, UNSELLECTE_PRODUCT } from "./productsTypes";

const INITIAL_STATE: ProductsState = {
  products: [],
};

export function productsStateReducer(state: ProductsState = INITIAL_STATE, action: ProductsAction): ProductsState {
  switch (action.type) {
    case ACTION_STORE_PRODUCTS:
      // console.log('reduu', action.payload)
      return {
        ...state,
        products: action.payload
      };
    case SELLECTE_PRODUCT: {
      let newState = cloneDeep(state)
      newState.products.forEach((category: ProductCategory) => {
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
      newState.products.forEach((category: ProductCategory) => {
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
