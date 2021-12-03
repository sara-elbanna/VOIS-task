import React, { ReactElement } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductsPage from './containers/productsPage/products';
import BasketPage from './containers/basketPage/basket';
import HomePage from './containers/homePage/home';



function App():ReactElement {

  return (
  <Router>
      <div>
        <Switch>
          <Route path="/products" component={ProductsPage} />
          <Route path="/basket" component={BasketPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router> 
  );
}

export default (App);
