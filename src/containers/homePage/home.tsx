import React, { ReactElement } from 'react';
import './home.css';

import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { getDarkMode } from '../../redux/selectors';
import { GlobalState } from '../../redux/types';
import DarkMode from '../darkmode/darkMode';
import { fetchProducts } from '../../redux/products/productsActions';

interface HomePageStateProps {
  darkMode: boolean;
}

interface HomePageDispatchProps {
  fetchProducts: () => void;
}

interface HomePageProps extends HomePageStateProps{
  fetchProducts:() => void
}

function mapStateToProps(state: GlobalState): HomePageStateProps {
  return {
    darkMode: getDarkMode(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  }
}

function mergeProps(stateProps: HomePageStateProps, dispatchProps: HomePageDispatchProps): HomePageProps {
  return {
    ...stateProps,
    ...dispatchProps
  }
}

function HomePage(props: HomePageProps):ReactElement {
  const history = useHistory();
  const onStartClick = ()=>{
    history.push("/products");
    props.fetchProducts()
  }
  return (
    <div className={`HomePage ${props.darkMode ? 'homePage--dark-mode' : ''}`}>
      <DarkMode />
      <div className="HomePage__start-button">
        <Button onClick={onStartClick}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomePage);
