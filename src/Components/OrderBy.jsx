import React from "react";

function OrderBy(props){
    return (
        <div className="sort">
            <select value={props.selectedOrder} onChange={props.handleOrderBy}>
                <option value=''>select</option> 
                <option value='lowest'>Lowest to Highest</option>
                <option value='highest'>Highest to Lowest</option>
            </select>
        </div>
    ) 
}
export default OrderBy;