import React, { useState } from 'react';
import bg from "./img/winter-landscape.jpg";

const Background = (props) => {
    return (
        <div
            className='background overflow-hidden'
            style={{backgroundImage: `url(${bg})`}}>
            <div className='container'>
                <div className='row row-cols-1 justify-content-center'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
 
export default Background;