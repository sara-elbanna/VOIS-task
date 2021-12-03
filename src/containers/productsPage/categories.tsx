import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { Product, ProductCategory } from "../../intrefaces/productsInterface";
import { connect } from "react-redux";
import { getPriceUnit } from "../../Utils";
import { selectProduct, unSelectProduct } from "../../redux/products/productsActions";
import ProductItem from "./productItem";

interface CategoriesStateProps {
    category: ProductCategory;
}

interface CategoriesProps extends CategoriesStateProps {
    category: ProductCategory,
    // selectProduct: (product: Product) => void;
    // unSelectProduct: (product: Product) => void;
}

// function mapDispatchToProps(dispatch: Dispatch): CategoriesDispatchProps {
//     return {
//         selectProduct: (product: Product) => dispatch(selectProduct(product)),
//         unSelectProduct: (product: Product) => dispatch(unSelectProduct(product))

//     }
// }

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

export default connect(null, null,)(Categories);
