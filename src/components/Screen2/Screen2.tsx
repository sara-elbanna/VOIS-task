import React, { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { GlobalState } from "../../redux/types";
import { ProductCategories, Product } from "../../intrefaces/productsInterface";
import { getProducts } from "../../redux/selectors";
import { fetchProducts } from "../../redux/actions";
import ProductItem from "./ProductItem";
import './Screen2.css'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";


interface Screen2StateProps {
  products: ProductCategories[];
}

interface Screen2DispatchProps {
  fetchProducts: () => void;
}

interface Screen2Props extends Screen2StateProps {
  fetchProducts: () => void;
}

function mapStateToProps(state: GlobalState): Screen2StateProps {
  return {
    products: getProducts(state)
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  }
}

function mergeProps(stateProps: Screen2StateProps, dispatchProps: Screen2DispatchProps): Screen2Props {
  return {
    ...stateProps,
    fetchProducts: (): void => { return dispatchProps.fetchProducts() }
  }
}

function Screen2(props: Screen2Props): ReactElement {
  const history = useHistory();
  useEffect(() => {
    if (props.products.length == 0) {
      props.fetchProducts()
    }
  }, [])
  return (
    <div className="screen-2">
      <h2 className='header'>Products</h2>
      <div className='container'>
        {props.products.map((category: ProductCategories) => {
          return <div className='category' key={category.name}>
            <h2>{category.name}</h2>
            <div className='products'>
              {category.products.map((product: Product) => {
                return <ProductItem product={product} key={product.name} />
              })}
            </div>
          </div>
        })}
        <div className='basket'>
          <Button onClick={()=> history.push("/basket")}>Basket</Button>
        </div>
      </div>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Screen2);
