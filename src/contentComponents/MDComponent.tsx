import { useEffect, useState } from "react";
import { marked } from "marked";
import { sanitize } from "dompurify";

type props = {
    data: Response;
    index: number;
};

const MDComponent = (props: props) => {
    const [sanitized, setSanitized] = useState<string>();

    // Parsing the markdown plain text to html and sanitize it
    useEffect(() => {
        props.data
            .clone()
            .text()
            .then((res) => {
                const html = marked.parse(res);
                setSanitized(sanitize(html));
            })
            .catch((err) => console.error(err));
    }, [props.data]);

    return (
        <div dangerouslySetInnerHTML={{ __html: sanitized as string }}></div>
    );
};

export default MDComponent;
