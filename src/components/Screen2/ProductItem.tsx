import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { Product } from "../../intrefaces/productsInterface";
import { selectProduct, unSelectProduct } from "../../redux/actions";
import { connect } from "react-redux";
import { getPriceUnit } from "../../Utils";

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
    console.log('ProductItem props', props.product)
    const onSelectProduct = (isSelceted: boolean) => {
        if( isSelceted ) props.selectProduct(props.product)
        else props.unSelectProduct(props.product)
    }
    return <div className='product-item'>
        <input type='checkbox' data-testid ="product-checkbox" checked={props.product.isSelected == true} onChange={(e) => onSelectProduct(e.target.checked)}/>
        <div className='product-info'>
            <p>{props.product.name}</p>
            <p>{props.product.description}</p>
            <h1>{props.product.price[0].amount} {getPriceUnit(props.product.price[0].billingFrequency)}</h1>
        </div>
    </div>
}

export default connect(null, mapDispatchToProps,)(ProductItem);
