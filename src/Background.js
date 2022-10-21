import React, { useState } from 'react';
import bg from "./img/winter-landscape.jpg";

const Background = (props) => {
    return (
        <div
            className='background overflow-hidden'
            style={{backgroundImage: `url(${bg})`}}>
            <div className='container'>
                {props.children}
            </div>
        </div>
    );
}
 
export default Background;