import {Selector} from "react-redux";
import { Product, ProductCategories } from "../intrefaces/productsInterface";
import {GlobalState} from "./types";

export const getDarkMode: Selector<GlobalState, boolean> = state => state.uiState.darkMode;
export const getProducts: Selector<GlobalState, ProductCategories []> = state => state.uiState.products;
