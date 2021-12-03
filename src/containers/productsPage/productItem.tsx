import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { Product } from "../../intrefaces/productsInterface";
import { connect } from "react-redux";
import { selectProduct, unSelectProduct } from "../../redux/products/productsActions";
import PriceComponent from "./priceComponent";

interface ProductItemStateProps {
    product: Product;
}
interface ProductItemDispatchProps {
    selectProduct: (product: Product) => void;
    unSelectProduct: (product: Product) => void;

}
interface ProductItemProps extends ProductItemStateProps {
    product: Product,
    selectProduct: (product: Product) => void;
    unSelectProduct: (product: Product) => void;
}

function mapDispatchToProps(dispatch: Dispatch): ProductItemDispatchProps {
    return {
        selectProduct: (product: Product) => dispatch(selectProduct(product)),
        unSelectProduct: (product: Product) => dispatch(unSelectProduct(product))
    }
}

function ProductItem(props: ProductItemProps): ReactElement {
    const onSelectProduct = (isSelceted: boolean) => {
        if( isSelceted ) props.selectProduct(props.product)
        else props.unSelectProduct(props.product)
    }
    return <div className='product-item'>
        <input type='checkbox' data-testid ={"product-checkbox-"+props.product.name} checked={props.product.isSelected == true} onChange={(e) => onSelectProduct(e.target.checked)}/>
        <div className='product-info'>
            <p>{props.product.name}</p>
            <p>{props.product.description}</p>
            <PriceComponent priceArray={props.product.price}/>
            
        </div>
    </div>
}

export default connect(null, mapDispatchToProps,)(ProductItem);
