import React, { useState } from 'react';
import Background from './Background';
import logo from "./img/moosbauer-logo.png";

const App = () => {
    return (
        <Background>
            <img className='logo' src={logo}></img>
        </Background>
    );
}

export default App;