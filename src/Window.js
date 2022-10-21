import React, { useState } from "react";
import loadContent from "./contentApi";

const Window = (props) => {
    const [shouldWiggle, setShouldWiggle] = useState(false);

    const triggerWiggle = () => {
        if (shouldWiggle) setShouldWiggle(false);
        setTimeout(() => setShouldWiggle(true), 0);
    };

    const handleClick = () => {
        const currentDay = new Date().getDate();

        if (/*currentDay === props.day*/ true) {
            loadContent(props.day)
                .then((res) => props.modalShow(res))
                .catch((err) => console.error(err));
        } else {
            triggerWiggle();
        }
    };

    return (
        <div className="col">
            <div
                className={`window p-4 ${shouldWiggle ? "wiggle" : ""}`}
                onClick={() => handleClick()}
            >
                <h3>{props.day}</h3>
            </div>
        </div>
    );
};

export default Window;
