import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { createGlobalStore } from "./redux/store";
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SELLECTE_PRODUCT } from './redux/types';
import { selectProduct } from './redux/actions';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ProductItem from './components/Screen2/ProductItem';
import { Product } from './intrefaces/productsInterface';

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("The first screen", () => {
  let container: HTMLElement, getByText: any;
  const history = createMemoryHistory()

  beforeEach(() => {
    jest.useFakeTimers(),
      ({ container, getByText } = render(
        <Provider store={createGlobalStore()}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      ))
  });

  it("is rendered initially with a start button", () => {
    const startButton = getByText(/start/i);
    expect(startButton).toBeInTheDocument();
  })


  it("is rendered initially with a dark mode label", () => {
    const darkModeLabel = getByText(/dark mode/i);

    expect(darkModeLabel).toBeInTheDocument();
  })

  it("after a click on the dark mode switch, the dark mode class is set", () => {
    const darkModeLabel = getByText(/dark mode/i);
    expect(container.firstChild?.firstChild).not.toHaveClass("Screen1--dark-mode");

    fireEvent.click(darkModeLabel);
    expect(container.firstChild?.firstChild).toHaveClass("Screen1--dark-mode");
  })

  it("clicking the dark mode switch twice, removes the dark mode class again", () => {
    const darkModeLabel = getByText(/dark mode/i);

    fireEvent.click(darkModeLabel);
    expect(container.firstChild?.firstChild).toHaveClass("Screen1--dark-mode");

    fireEvent.click(darkModeLabel);
    expect(container.firstChild?.firstChild).not.toHaveClass("Screen1--dark-mode");
  })

  it("navigate to products screen when clicking on start button", async () => {
    const startButton = getByText(/start/i);
    expect(startButton).toBeInTheDocument()
    userEvent.click(startButton)
    expect(getByText(/Products/i)).toBeInTheDocument()
  })
})

describe('Second screen', () => {
  let container: HTMLElement, getByText: any;
  const history = createMemoryHistory()

  beforeEach(() => {
    ({ container, getByText } = render(
      <Provider store={createGlobalStore()}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    ))
  });

  afterEach(cleanup)

  it("create an action to select product after select any product", async () => {
    let product: Product = {
      "isSelected": false,
      "name": "Product 4",
      "description": "",
      "price": [
        {
          "amount": "7.99",
          "billingFrequency": "ONCE",
          "periodStart": 1
        }
      ]
    }
    let productItemRender = render(<Provider store={createGlobalStore()}>
      <ProductItem product={product} />
    </Provider>)
    const checkbox: any = productItemRender.getByTestId('product-checkbox')
    expect(checkbox).toHaveProperty('checked', false)
    fireEvent.click(checkbox)

    const expectedAction = {
      type: SELLECTE_PRODUCT,
      payload: product
    }
    expect(selectProduct(product)).toEqual(expectedAction)
  })

})



