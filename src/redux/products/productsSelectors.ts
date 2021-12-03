import {Selector} from "react-redux";
import { ProductCategory } from "../../intrefaces/productsInterface";
import { ProductsState } from "./productsTypes";

export const getProductsList: Selector<ProductsState, ProductCategory []> = productsState => productsState.products
