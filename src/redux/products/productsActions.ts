import { fetchProductsApi } from "../../api/productsApi";
import { Product, ProductCategory } from "../../intrefaces/productsInterface";
import { ActionselectProduct, ActionstoreProducts, ACTION_STORE_PRODUCTS, SELLECTE_PRODUCT, UNSELLECTE_PRODUCT } from "./productsTypes";

export const fetchProducts = (): any => {
    return ((dispatch: any) => {
      return fetchProductsApi()
      .then(res => res.json()).catch(e=>{console.log('error',e)})
        .then(res => {
          dispatch(storeProducts(res.productCategories));
        })
        .catch(e=>{
          console.log('error', e)
        })
    });
  };
  
  
  const storeProducts = (products: ProductCategory[]): ActionstoreProducts => {
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
  
  