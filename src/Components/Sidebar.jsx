import React from "react";


function Sidebar(props){
    let sizes = props.products.reduce((acc,cv) => {
        acc= acc.concat(cv.availableSizes);
        return acc;
    },[]);
    
    // To make the unique size
    // set is an iterable so we used ... to spread array
    let uniqueSizes = [...new Set(sizes)];
    console.log(uniqueSizes);
    let {selectedSizes} = props;

    return (
        <aside className="flex-20 sidebar">
            <div className="flex wrap">
               {
                uniqueSizes.map((size) => (
                    <span 
                    key={size}
                    onClick={() => props.handleClick(size)}
                     className={`size ${selectedSizes.includes(size) ? 'active' :  '' }`}>{size}
                     </span>
                ))}   
            </div>
        </aside>
    )
}

export default Sidebar;