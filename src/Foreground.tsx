import Window from "./Window";

type props = {
    modalShow: Function;
    currentDay: Date;
};

const Foreground = (props: props) => {
    function renderWindows() {
        const num = 24;
        const arr = new Array(num).fill(null);

        return arr.map((e, i) => {
            return (
                <Window
                    modalShow={props.modalShow}
                    key={i}
                    index={i + 1}
                    currentDay={props.currentDay}
                />
            );
        });
    }

    return (
        <div className="row row-cols-4 row-cols-sm-6 g-4">
            {renderWindows()}
        </div>
    );
};

export default Foreground;
