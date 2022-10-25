import { useState } from "react";

type props = {
    modalShow: Function;
    index: number;
    currentDay: Date;
};

const Window = (props: props) => {
    const [shouldWiggle, setShouldWiggle] = useState(false);
    	
    // Trigger for wiggle animation
    const triggerWiggle = () => {
        if (shouldWiggle) setShouldWiggle(false);
        setTimeout(() => setShouldWiggle(true), 0);
    };

    // Creating a new date with current year, month december and day equal to index of window,
    // then compairing day and month of current day and the day of the index
    const december = 11;
    const day = new Date(new Date().getFullYear(), december, props.index);
    const handleClick = () => {
        if (
            // props.currentDay.getDate() === day.getDate() &&
            // props.currentDay.getMonth() === day.getMonth()
            true // For testing
        ) {
            props.modalShow();
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
                <h3>{props.index}</h3>
            </div>
        </div>
    );
};

export default Window;
