import React, { useState } from "react";

type props = {
    modalShow: Function,
    day: number,
    currentDay: number,
}

const Window = (props: props) => {
    const [shouldWiggle, setShouldWiggle] = useState(false);

    const triggerWiggle = () => {
        if (shouldWiggle) setShouldWiggle(false);
        setTimeout(() => setShouldWiggle(true), 0);
    };

    const handleClick = () => {
        
        if (props.currentDay === props.day) {
            props.modalShow(props.day)
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
