import React, { useState } from "react";
import Background from "./Background";
import logo from "./img/moosbauer-logo.png";
import Foreground from "./Foreground";

const App = () => {
    return (
        <Background>
            <img className="col-6 col-md-4 col-lg-3 py-4" src={logo} alt="logo"></img>
            <div className="col">
                <Foreground />
            </div>
        </Background>
    );
};

export default App;
