type props = {
    data: Response;
    index: number;
};

const ImageComponent = (props: props) => {
    return <img src={props.data.url} alt="Advent"></img>;
};

export default ImageComponent;
