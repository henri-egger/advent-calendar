type props = {
    data: Response;
    index: number;
};

const ImageComponent = (props: props) => {
    return <img src={props.data.url}></img>;
};

export default ImageComponent;
