import React, { useState } from 'react';

const Window = (props) => {
    return (
        <div className='col'>
            <div className='window p-4'>
                <h3>{props.day}</h3>
            </div>
        </div>
    );
}
 
export default Window;