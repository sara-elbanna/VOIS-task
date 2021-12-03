import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { GlobalState } from "../../redux/types";
import { Product } from "../../intrefaces/productsInterface";
import { getSelectedProducts } from "../../redux/selectors";
import './basket.css'
import { Button } from "@material-ui/core";
import { getPriceUnit } from "../../Utils";
import { useHistory } from "react-router-dom";


interface Screen3StateProps {
  selectedProducts:Product[]
}

interface Screen3Props extends Screen3StateProps {
}

function mapStateToProps(state: GlobalState): Screen3StateProps {
  return {
    selectedProducts: getSelectedProducts(state)
  }
}

function mergeProps(stateProps: Screen3StateProps): Screen3Props {
  return {
    ...stateProps,
  }
}

function BasketPage(props: Screen3Props): ReactElement {
  const history = useHistory();
  let selectedProducts = props.selectedProducts
  return (
    <div className="screen-3">
      <h2  className='header'>Basket</h2>
      <p data-testid='basketBackBtn' style={{paddingLeft:20, textDecoration:'underline', cursor:'pointer'}} onClick={()=> history.push("/products") }>{'<- Products'}</p>
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

export default connect(mapStateToProps, null, mergeProps)(BasketPage);
