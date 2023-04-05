import React from "react";
import Products from "./Products";


function Data(props){
    return(
        <div className="wrapper flex space-between">
             <Products data={props.products} 
                selectedSizes={props.selectedSizes} 
                handleAddToCart ={props.handleAddToCart}
             />
        </div>    
    )
}

export default Data;

 