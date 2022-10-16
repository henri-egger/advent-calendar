import React, { useState } from 'react';
import bg from "./img/winter-landscape.jpg";

const Background = (props) => {
    return (
        <div
            className='background'
            style={{backgroundImage: `url(${bg})`}}>
            <div>
                {props.children}
            </div>
        </div>
    );
}
 
export default Background;