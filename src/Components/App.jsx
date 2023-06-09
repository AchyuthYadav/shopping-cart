import React from "react";
import Sidebar from "./Sidebar";
import Cart from "./Cart";
import Product from "./Products";
import Data from "./Data";
import {products} from "../Data/data.json";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedSizes: [],
      cartItems: [],
    };
  }

  //Local storage
  componentDidMount(){
    if(localStorage.carts){
      this.setState({cartItems:JSON.parse(localStorage.carts) || []})
    }
    window.addEventListener("beforeunload", this.handleUpdateLocalStorage)
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    localStorage.setItem("carts",JSON.stringify(this.state.cartItems))
  }

 //Cart 
  handleAddToCart= (p)=> {
     let isPresent =
      this.state.cartItems.findIndex((product) =>      product.id === p.id) !== -1;

      if(isPresent){
        this.incrementQuantity(p.id)
      }else{

      this.setState(prevState => ({
      cartItems: prevState.cartItems.concat({...p, quantity:1}),
    }),this.handleUpdateLocalStorage)
  }
  }

  incrementQuantity= (id)=> {
    this.setState(prevState => {
        let updatedCartItems = prevState.cartItems.map( (p) => {
          if(p.id === id){
            return{
              ...p,
              quantity:  p.quantity + 1,
            };
          }
          return p;
        });
        return {
        cartItems: updatedCartItems,
        }
    })
  };

  decrementQuantity = (id) => {
    this.setState((prevState) => {
        let updatedCartItems = prevState.cartItems.map( (p) => {
          if(p.id === id){
            return {
              ...p,
              quantity:  p.quantity - 1,
            }
          }
          return p;
        })
        return{
          cartItems: updatedCartItems,
        }
    })
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
        let updatedCartItems = prevState.cartItems.filter((p) =>  {
          return p.id !== id;
        })
        return{
          cartItems: updatedCartItems,
        }
    })
  };

  //Handle click of size
  handleClick = (size) => {
    if (this.state.selectedSizes.includes(size)) {
      this.setState((prevState)=>({
        selectedSizes: prevState.selectedSizes.filter((s) => s !== size),}));
    }else {
      this.setState((prevState) => ({
        selectedSizes: prevState.selectedSizes.concat(size),
      }));
    }
  } 

  render (){
    return(
      <div className="wrapper flex space-between">
        <Sidebar 
        products={products} 
        selectedSizes={this.state.selectedSizes} 
        handleClick={this.handleClick}
        />

        <Data 
        products={products} 
        selectedSizes={this.state.selectedSizes} 
        handleAddToCart={this.handleAddToCart}
        /> 
        
        <Cart cartItems={this.state.cartItems}
        incrementQuantity={this.incrementQuantity}
        decrementQuantity={this.decrementQuantity}
        deleteItem={this.deleteItem}
        />
      </div>
    )}
}

export default App;
