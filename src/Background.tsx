import React, { useState } from 'react';
import bg from "./img/winter-landscape.jpg";

type props = {
    children: JSX.Element[]
}

const Background = (props: props) => {
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