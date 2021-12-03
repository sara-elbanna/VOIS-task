import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { createGlobalStore } from "./redux/store";
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ProductItem from './containers/productsPage/productItem';
import { Price, Product, ProductCategory } from './intrefaces/productsInterface';

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductsPage from './containers/productsPage/products';
import BasketPage from './containers/basketPage/basket';
import { SELLECTE_PRODUCT } from './redux/products/productsTypes';
import { selectProduct } from './redux/products/productsActions';
import Categories from './containers/productsPage/categories';
import PriceComponent from './containers/productsPage/priceComponent';


Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Home Page", () => {
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
  afterEach(cleanup)
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
    expect(container.firstChild?.firstChild).not.toHaveClass("homePage--dark-mode");

    fireEvent.click(darkModeLabel);
    expect(container.firstChild?.firstChild).toHaveClass("homePage--dark-mode");
  })

  it("clicking the dark mode switch twice, removes the dark mode class again", () => {
    const darkModeLabel = getByText(/dark mode/i);

    fireEvent.click(darkModeLabel);
    expect(container.firstChild?.firstChild).toHaveClass("homePage--dark-mode");

    fireEvent.click(darkModeLabel);
    expect(container.firstChild?.firstChild).not.toHaveClass("homePage--dark-mode");
  })

  it("navigate to products screen when clicking on start button", async () => {
    const startButton = getByText(/start/i);
    expect(startButton).toBeInTheDocument()
    userEvent.click(startButton)
    expect(getByText(/Products/i)).toBeInTheDocument()
  })
})

describe('Products Page', () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    render(<Provider store={createGlobalStore()}>
      <ProductsPage />
    </Provider>)
  });
  afterEach(cleanup)


  it("is rendered initially with a title products", () => {
    const title = screen.getByText(/Products/i);
    expect(title).toBeInTheDocument();
  })
  it("is rendered initially with a basket button", () => {
    const btn = screen.getByTestId(/basketBtn/i);
    expect(btn).toBeInTheDocument();
  })

  it("is rendered initially with a back button", () => {
    const btn = screen.getByTestId(/productsBackBtn/i);
    expect(btn).toBeInTheDocument();
  })
})

describe('Categories component', () => {
  let category: ProductCategory = {
    name: 'category name',
    products: [
      {
        "isSelected": false,
        "name": "Product-4",
        "description": "product description text",
        "price": [
          {
            "amount": "7.99",
            "billingFrequency": "ONCE",
            "periodStart": 1
          }
        ]
      }
    ]
  }
  beforeEach(() => {
    render(<Provider store={createGlobalStore()}>
      <Categories category={category} />
    </Provider>)
  });
  afterEach(cleanup)


  it("is rendered with category title", () => {
    const title = screen.getByText(/category name/i);
    expect(title).toBeInTheDocument();
  })
})

describe('Product item component', () => {
  let product: Product = {
    "isSelected": false,
    "name": "Product-4",
    "description": "product description text",
    "price": [
      {
        "amount": "7.99",
        "billingFrequency": "ONCE",
        "periodStart": 1
      }
    ]
  }
  beforeEach(() => {
    render(<Provider store={createGlobalStore()}>
      <ProductItem product={product} />
    </Provider>)
  });
  it("render product name", () => {
    const name = screen.getByText(/Product-4/i);
    expect(name).toBeInTheDocument();
  })
  it("render product description", () => {
    const desc = screen.getByText(/product description text/i);
    expect(desc).toBeInTheDocument();
  })

  it("render product price", () => {
    const price = screen.getByText('7.99 $/ one time');
    expect(price).toBeInTheDocument();
  })

  it("create an action to select product after select any product", () => {
    const checkbox: any = screen.getByTestId('product-checkbox-Product-4')
    expect(checkbox).toHaveProperty('checked', false)
    fireEvent.click(checkbox)

    const expectedAction = {
      type: SELLECTE_PRODUCT,
      payload: product
    }
    expect(selectProduct(product)).toEqual(expectedAction)
  })
})

describe('Price component', () => {
  let price: Price[] = [
      {
        "amount": "10.00",
        "billingFrequency": "MONTHLY",
        "periodStart": 1
      },
      {
        "amount": "19.99",
        "billingFrequency": "MONTHLY",
        "periodStart": 12
      }
    ]
  
  beforeEach(() => {
    render(<Provider store={createGlobalStore()}>
      <PriceComponent priceArray={price} />
    </Provider>)
  });
  afterEach(cleanup)


  it("is rendered with the correct price", () => {
    const price = screen.getByText('10.00 $/ month');
    expect(price).toBeInTheDocument();
  })
  it("is rendered with the correct price description", () => {
    const priceDesc = screen.getByText('From 12 month 19.99 $/ month');
    expect(priceDesc).toBeInTheDocument();
  })
})

describe('Basket Page', () => {
  beforeEach(() => {
    render(<Provider store={createGlobalStore()}>
      <BasketPage />
    </Provider>)
  });
  afterEach(cleanup)


  it("is rendered initially with a title basket", () => {
    const title = screen.getByText(/Basket/i);
    expect(title).toBeInTheDocument();
  })
  it("is rendered initially with a products button", () => {
    const btn = screen.getByTestId(/basketBackBtn/i);
    expect(btn).toBeInTheDocument();
  })


})

