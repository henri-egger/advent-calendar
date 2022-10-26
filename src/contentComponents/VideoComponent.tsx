import { useEffect, useState, useMemo } from "react";

type props = {
    data: Response;
    index: number;
};

const VideoComponent = (props: props) => {
    const [URL, setURL] = useState<string>();
    const URLRegex = useMemo(
        () =>
            // eslint-disable-next-line no-useless-escape
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        []
    );

    useEffect(() => {
        props.data
            .clone()
            .text()
            .then((res) => {
                const matchArr = res.match(URLRegex);
                if (!matchArr) throw new Error("No URL specified");
                setURL(matchArr[0]);
            })
            .catch((err) => console.error(err));
    }, [props.data, URLRegex]);

    return (
        <iframe
            width="887"
            height="499"
            src={URL}
            title="Advent calendar video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
};

export default VideoComponent;
