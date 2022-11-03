import { useEffect, useState, useMemo } from "react";

type props = {
    data: Response;
    index: number;
};

const VideoComponent = (props: props) => {
    const [URL, setURL] = useState<string>();
    const URLParts = useMemo<string[]>(
        () => [
            "https://www.youtube.com/embed/",
            "?playlist=",
            "&autoplay=1&loop=1",
        ],
        []
    );
    // const URLRegex = useMemo(
    //     () =>
    //         // eslint-disable-next-line no-useless-escape
    //         /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    //     []
    // );

    useEffect(() => {
        props.data
            .clone()
            .json()
            .then((res) => {
                setURL(
                    URLParts[0] +
                        res.videoId +
                        URLParts[1] +
                        res.videoId +
                        URLParts[2]
                );

                // const matchArr = res.match(URLRegex);
                // if (!matchArr) throw new Error("No URL specified");
                // setURL(matchArr[0]);
            })
            .catch((err) => console.error(err));
    }, [props.data, URLParts]);

    return (
        <div className="iframe-container">
            <iframe
                width=""
                height=""
                src={URL}
                title="Advent calendar video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="iframe-video"
            ></iframe>
        </div>
    );
};

export default VideoComponent;
