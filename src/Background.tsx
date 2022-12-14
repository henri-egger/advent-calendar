type props = {
    children: JSX.Element[];
};

const Background = (props: props) => {
    return (
        <div className="background fixed-top overflow-auto">
            <div className="container">
                <div className="row row-cols-1 justify-content-center">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Background;
