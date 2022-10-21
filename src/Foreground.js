import React, { useState } from 'react';
import Window from "./Window.js"

const Foreground = (props) => {

    function renderWindows() {
        const num = 24;
        const arr = new Array(num).fill(null);

        return (
            arr.map(
                (e, i) => <Window modalShow={props.modalShow} key={i} day={i + 1} />
            )
        );
    }

    return (
        <div className='row row-cols-4 row-cols-sm-6 g-4'>
            {renderWindows()}
        </div>
    );
}
 
export default Foreground;