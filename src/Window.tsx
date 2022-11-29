import { useEffect, useState } from "react";

type props = {
    modalShow: Function;
    index: number;
    currentDay: Date;
};

const Window = (props: props) => {
    const [shouldWiggle, setShouldWiggle] = useState(false);
    const [shouldClick, setShouldClick] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Trigger for wiggle animation
    const triggerWiggle = () => {
        if (!isOpen) {
            setShouldWiggle(false);
            setTimeout(() => setShouldWiggle(true), 0);
        }
    };

    // Trigger for click animation
    const triggerClick = () => {
        setShouldClick(false);
        setTimeout(() => setShouldClick(true), 0);
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
            triggerClick();
            props.modalShow();
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
                //prettier-ignore
                className={`
                    window py-4 text-center text-white rounded cursor-pointer
                    ${isOpen ? " open " : " "}
                    ${shouldWiggle ? " wiggle " : " "}
                    ${shouldClick ? " click " : " "}
                `}
                onClick={() => handleClick()}
            >
                <h3 className="m-0">{props.index}</h3>
            </div>
        </div>
    );
};

export default Window;
