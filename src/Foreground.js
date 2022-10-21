import React, { useState } from 'react';
import Window from "./Window.js"

const Foreground = (props) => {

    function renderWindows() {
        const num = 24;
        const arr = new Array(num).fill(null);

        return (
            arr.map(
                (e, i) => <Window key={i} day={i + 1} />
            )
        );
    }

    return (
        <div className='row row-cols-6 g-4'>
            {renderWindows()}
        </div>
    );
}
 
export default Foreground;