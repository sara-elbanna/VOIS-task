import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { GlobalState } from "../../redux/types";
import { ProductCategories, Product } from "../../intrefaces/productsInterface";
import { getProducts } from "../../redux/selectors";
import './Screen3.css'
import { Button } from "@material-ui/core";
import { getPriceUnit } from "../../Utils";
import { useHistory } from "react-router-dom";


interface Screen3StateProps {
  products: ProductCategories[];
}

interface Screen3DispatchProps {
}

interface Screen3Props extends Screen3StateProps {
}

function mapStateToProps(state: GlobalState): Screen3StateProps {
  return {
    products: getProducts(state)
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
  }
}

function mergeProps(stateProps: Screen3StateProps, dispatchProps: Screen3DispatchProps): Screen3Props {
  return {
    ...stateProps,
  }
}

function Screen3(props: Screen3Props): ReactElement {
  const history = useHistory();
  let selectedProducts: Product[] = []
  props.products.forEach((category: ProductCategories) => {
    category.products.forEach((p: Product) => {
      if (p.isSelected) selectedProducts.push(p)
    })
  })
  return (
    <div className="screen-3">
      <h2 className='header'>Basket</h2>
      <div className='container'>
        {selectedProducts.length == 0 && <h1>Empty list</h1>}
        {selectedProducts.length > 0 && <div>
          <h3>Overview</h3>
          {selectedProducts.map(product => {
            return <div className='product' key={product.name}>
              <p>{product.name}</p>
              <div className='price'>
                {product.price[0].amount} {getPriceUnit(product.price[0].billingFrequency)}
              </div>
            </div>
          })}
          <div className='order'>
            <Button onClick={() => history.push("/")}>Order</Button>
          </div>
        </div>}
      </div>
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Screen3);
