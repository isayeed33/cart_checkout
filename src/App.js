import React, { Component } from 'react';
import ItemList from './components/ItemList';
import CheckOut from './components/CheckOut';
import Modal from './components/Modal.js';
//import data from './data.json';

export default class App extends Component {

state = {
  products: [],
  cart: [],
  modalOpen: false,
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0
};

componentDidMount() {
  fetch('./data.json')
  .then(response => {
    return response.json();
  })
  .then(result => {
    this.setProducts(result);
  }
  )
}

setProducts = (result) => {
  let products = [];
  result.forEach(item => {
    const singleItem = { ...item };
    products = [...products, singleItem];
  });
  this.setState(() => {
    return { products };
  }, this.checkCartItems);
};

getItem = id => {
  const product = this.state.products.find(item => item.id === id);
  console.log('getItem', product);
  return product;
};

addToCart = id => {
  let tempProducts = [...this.state.products];
  console.log('tempProducts', tempProducts);
  const index = tempProducts.indexOf(this.getItem(id));
  console.log('index', index);
  const product = tempProducts[index];
  product.inCart = true;
  product.count = 1;
  const price = product.price;
  product.total = price;

  this.setState(() => {
    return {
      products: [...tempProducts],
      cart: [...this.state.cart, product]
    };
  }, this.addTotals);
};

increment = id => {
  let tempCart = [...this.state.cart];
  const selectedProduct = tempCart.find(item => {
    return item.id === id;
  });
  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
  product.count = product.count + 1;
  product.total = product.count * product.price;
  this.setState(() => {
    return {
      cart: [...tempCart]
    };
  }, this.addTotals);
};

decrement = id => {
  let tempCart = [...this.state.cart];
  const selectedProduct = tempCart.find(item => {
    return item.id === id;
  });
  const index = tempCart.indexOf(selectedProduct);
  const product = tempCart[index];
  product.count = product.count - 1;
  if (product.count === 0) {
    this.removeItem(id);
  } else {
    product.total = product.count * product.price;
    this.setState(() => {
      return { cart: [...tempCart] };
    }, this.addTotals);
  }
};

getTotals = () => {
  let subTotal = 0;
  this.state.cart.map((item) => (subTotal += item.total));
  const tempTax = subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  return {
    subTotal,
    tax,
    total
  };
};

addTotals = () => {
  const totals = this.getTotals();
  
  console.log('totals', totals); 
  this.setState(
    () => {
      return {
        cartSubTotal: totals.subTotal,
        cartTax: totals.tax,
        cartTotal: totals.total
      };
    },
    () => {
      // console.log(this.state);
    }
  );
};

removeItem = id => {
  let tempProducts = [...this.state.products];
  let tempCart = [...this.state.cart];
  const index = tempProducts.indexOf(this.getItem(id));
  let removedProduct = tempProducts[index];
  removedProduct.inCart = false;
  removedProduct.count = 0;
  removedProduct.total = 0;

  tempCart = tempCart.filter(item => {
    return item.id !== id;
  });
  this.setState(() => {
    return {
      cart: [...tempCart],
      products: [...tempProducts]
    };
  }, this.addTotals);
};

openModal = () => {
  this.setState(() => {
    return { modalOpen: true };
  });
};

closeModal = () => {
  this.setState(() => {
    return { modalOpen: false };
  });
};

  render() {
    return (
      <div>
        <ItemList 
          products={this.state.products}
          addToCart={this.addToCart}
          increment={this.increment}
          decrement={this.decrement}
          ></ItemList>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          
          <CheckOut 
          cartTotal={this.state.cartTotal}
          cartTax={this.state.cartTax}
          cartSubTotal={this.state.cartSubTotal}
          openModal={this.openModal}
          ></CheckOut>
          
          <Modal cartTotal={this.state.cartTotal}
                 modalOpen={this.state.modalOpen}
            ></Modal>
      </div>
    )
  }
}
