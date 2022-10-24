import { useState } from "react";

type props = {
    modalShow: Function;
    index: number;
    currentDay: Date;
};

const Window = (props: props) => {
    const [shouldWiggle, setShouldWiggle] = useState(false);

    const triggerWiggle = () => {
        if (shouldWiggle) setShouldWiggle(false);
        setTimeout(() => setShouldWiggle(true), 0);
    };

    const day = new Date(2022, 11, props.index);
    const handleClick = () => {
        if (
            props.currentDay.getDate() === day.getDate() &&
            props.currentDay.getMonth() === day.getMonth()
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
