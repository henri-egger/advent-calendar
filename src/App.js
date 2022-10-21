import React, { useState } from "react";
import Background from "./Background";
import logo from "./img/moosbauer-logo.png";
import Foreground from "./Foreground";

const App = () => {
    return (
        <Background>
            <div className="row justify-content-center py-3">
                <img className="col-6 col-md-4 col-lg-3" src={logo} alt="logo"></img>
            </div>
            <div className="row justify-content-center">
                <Foreground />
            </div>
        </Background>
    );
};

export default App;
