import { useEffect, useState, useMemo } from "react";
import { cookie } from "../cookieconsent/types";

type props = {
    res: Response;
    index: number;
    cookie: cookie;
};

const VideoComponent = (props: props) => {
    const allowShow = useMemo<boolean>(
        () =>
            props.cookie.categories
                ? props.cookie.categories.includes("necessary")
                : false,
        [props.cookie]
    );
    const [URL, setURL] = useState<string>();
    const URLParts = useMemo<string[]>(
        () => [
            "https://www.youtube.com/embed/",
            "?playlist=",
            "&autoplay=1&loop=1",
        ],
        []
    );

    useEffect(() => {
        props.res
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
            })
            .catch((err) => console.error(err));
    }, [props.res, URLParts]);

    return allowShow ? (
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
    ) : (
        <div className="bg-white p-5 rounded">
            <p className="m-0 text-center">
                Please accept necessary cookies to view Video
            </p>
        </div>
    );
};

export default VideoComponent;
