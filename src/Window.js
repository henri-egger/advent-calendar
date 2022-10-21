import React, { useState } from 'react';

const Window = (props) => {
    return (
        <div className='col'>
            <div className='window p-4'>
                {props.day}
            </div>
        </div>
    );
}
 
export default Window;