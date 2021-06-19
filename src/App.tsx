import React, { ReactElement } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Screen2 from './components/Screen2/Screen2';
import Screen3 from './components/Screen3/Screen3';
import Screen1 from './components/Screen1/Screen1';



function App():ReactElement {

  return (
  <Router>
      <div>
        <Switch>
          <Route path="/products" component={Screen2} />
          <Route path="/basket" component={Screen3} />
          <Route path="/" component={Screen1} />
        </Switch>
      </div>
    </Router> 
  );
}

export default (App);
