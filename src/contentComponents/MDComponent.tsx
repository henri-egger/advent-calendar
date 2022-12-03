import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import sanitizer from "dompurify";

type props = {
    res: Response;
    index: number;
    customStyle: string;
};

const MDComponent = (props: props) => {
    const [sanitized, setSanitized] = useState<string>();

    // Parsing the markdown plain text to html and sanitize it
    useEffect(() => {
        props.res
            .clone()
            .text()
            .then((res) => {
                const html = marked.parse(res);
                setSanitized(sanitizer.sanitize(html));
            })
            .catch((err) => console.error(err));
    }, [props.res]);

    return (
        <>
            <style>{props.customStyle}</style>
            <div
                className="rounded md-container py-2"
                dangerouslySetInnerHTML={{ __html: sanitized as string }}
            ></div>
        </>
    );
};

export default MDComponent;
