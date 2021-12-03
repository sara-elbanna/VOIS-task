import React, { ReactElement } from "react";
import { Product, ProductCategory } from "../../intrefaces/productsInterface";
import ProductItem from "./productItem";

interface CategoriesStateProps {
    category: ProductCategory;
}

interface CategoriesProps extends CategoriesStateProps {
    category: ProductCategory,
}


function Categories(props: CategoriesProps): ReactElement {
    return <div className='category' key={props.category.name}>
        <h2>{props.category.name}</h2>
        <div className='products'>
            {props.category.products.map((product: Product) => {
                return <ProductItem product={product} key={product.name} />
            })}
        </div>
    </div>
}

export default Categories;
