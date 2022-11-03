import Window from "./Window";
import { shuffleArray } from "./util";
import { useState } from "react";

type props = {
    modalShow: Function;
    currentDay: Date;
};

const Foreground = (props: props) => {
    const [windows, setWindows] = useState<JSX.Element[]>(renderWindows());

    function renderWindows() {
        const num = 24;
        const arr = new Array(num).fill(null);

        return shuffleArray(
            arr.map((e, i) => (
                <Window
                    modalShow={props.modalShow}
                    key={i}
                    index={i + 1}
                    currentDay={props.currentDay}
                />
            ))
        );
    }

    return <div className="row row-cols-4 row-cols-sm-6 g-4">{windows}</div>;
};

export default Foreground;
