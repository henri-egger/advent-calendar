import { useEffect, useState } from "react";

type props = {
    modalShow: Function;
    index: number;
    currentDay: Date;
};

const Window = (props: props) => {
    const [shouldWiggle, setShouldWiggle] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
            props.currentDay.getDate() === day.getDate() &&
            props.currentDay.getMonth() === day.getMonth()
        ) {
            props.modalShow();
            setIsOpen(true);
        } else {
            triggerWiggle();
        }
    };

    // Opens all doors before current date if december
    useEffect(() => {
        setIsOpen(
            props.currentDay.getMonth() === 11
                ? props.index < props.currentDay.getDate()
                : false
        );
    }, [props]);

    return (
        <div className="col px-xl-4">
            <div
                className={`back-window ${
                    shouldWiggle && !isOpen ? "wiggle" : ""
                } rounded-1 bg-secondary cursor-pointer`}
                onClick={() => handleClick()}
            >
                <div
                    className={`window p-4 ${
                        isOpen ? "open" : ""
                    } text-center text-white rounded-1 bg-primary`}
                    onClick={() => handleClick()}
                >
                    <h3 className="m-0">{props.index}</h3>
                </div>
            </div>
        </div>
    );
};

export default Window;
