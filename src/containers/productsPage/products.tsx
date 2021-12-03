import React, { ReactElement, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { GlobalState } from "../../redux/types";
import { ProductCategory as ProductCategory, Product } from "../../intrefaces/productsInterface";
import { getProducts } from "../../redux/selectors";
import ProductItem from "./productItem";
import './products.css'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { fetchProducts } from "../../redux/products/productsActions";
import Categories from "./categories";


interface Screen2StateProps {
  products: ProductCategory[];
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
    ...dispatchProps 
  }
}

function ProductsPage(props: Screen2Props): ReactElement {
  const history = useHistory();
  useEffect(() => {
    if (props.products.length == 0) {
      props.fetchProducts()
    }
  }, [])
  return (
    <div className="screen-2">
      <h2 className='header'>Products</h2>
      <p data-testid='productsBackBtn' style={{paddingLeft:20, textDecoration:'underline', cursor:'pointer'}} onClick={()=> history.push("/")}>{'<- Home'}</p>

      <div className='container'>
        {props.products.map((category: ProductCategory) => {
          return <Categories category={category}/>
        })}
        <div className='basket'>
          <Button data-testid='basketBtn' onClick={()=> history.push("/basket")}>Basket</Button>
        </div>
      </div>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProductsPage);
