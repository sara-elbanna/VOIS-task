import React, { ReactElement } from 'react';
import './Screen1.css';

import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { getDarkMode } from '../../redux/selectors';
import { GlobalState } from '../../redux/types';
import { fetchProducts } from '../../redux/actions';
import DarkMode from '../darkmode/DarkMode';

interface Screen1StateProps {
  darkMode: boolean;
}

interface Screen1DispatchProps {
  fetchProducts: () => void;
}

interface Screen1Props extends Screen1StateProps{
  fetchProducts:() => void
}

function mapStateToProps(state: GlobalState): Screen1StateProps {
  return {
    darkMode: getDarkMode(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  }
}

function mergeProps(stateProps: Screen1StateProps, dispatchProps: Screen1DispatchProps): Screen1Props {
  return {
    ...stateProps,
    fetchProducts:():void =>{return dispatchProps.fetchProducts()}
  }
}

function Screen1(props: Screen1Props):ReactElement {
  const history = useHistory();
  const onStartClick = ()=>{
    history.push("/products");
    props.fetchProducts()
  }
  return (
    <div className={`Screen1 ${props.darkMode ? 'Screen1--dark-mode' : ''}`}>
      <DarkMode />
      <div className="Screen1__start-button">
        <Button onClick={onStartClick}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Screen1);
