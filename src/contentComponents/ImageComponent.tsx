type props = {
    res: Response;
    index: number;
};

const ImageComponent = (props: props) => {
    return <img src={props.res.url} alt="Advent"></img>;
};

export default ImageComponent;
