import ImageComponent from "./contentComponents/ImageComponent";
import VideoComponent from "./contentComponents/VideoComponent";
import MDComponent from "./contentComponents/MDComponent";
import { cookie } from "./cookieconsent/types";

const contentInfoURL = "content/content-info.json";

const contentInfoOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

const contentOptions: RequestInit = {
    method: "GET",
};

// prettier-ignore
function getContentComponent(
    contentType: string
): (data: Response, index: number, cookie: cookie) => JSX.Element {
    switch (contentType) {
        case "image/gif":
        case "image/jpeg":
        case "image/png":
            return (data, index) => (
                <ImageComponent data={data} index={index} />
            );

        case "text/markdown":
        case "text/markdown; charset=UTF-8":
        case "text/markdown; charset=utf-8":
            return (data, index) => (
                <MDComponent data={data} index={index} />
            );

        case "application/json":
        case "application/json; charset=UTF-8":
        case "application/json; charset=utf-8":
            return (data, index, cookie) => (
                <VideoComponent data={data} index={index} cookie={cookie} />
            );

        default:
            throw new Error(`Content-Type ${contentType} unknown`);
    }
}

// // prettier-ignore
// const contentRenderers: Record<
//     string,
//     (data: Response, index: number, cookie: cookie) => JSX.Element
// > = {
//     "image/gif":
//         (data, index) => <ImageComponent data={data} index={index} />,
//     "image/jpeg":
//         (data, index) => <ImageComponent data={data} index={index} />,
//     "image/png":
//         (data, index) => <ImageComponent data={data} index={index} />,
//     "text/markdown":
//         (data, index) => <MDComponent data={data} index={index} />,
//     "text/markdown; charset=UTF-8":
//         (data, index) => <MDComponent data={data} index={index} />,
//     "text/markdown; charset=utf-8":
//         (data, index) => <MDComponent data={data} index={index} />,
//     "application/json":
//         (data, index, cookie) => <VideoComponent data={data} index={index} cookie={cookie} />,
//     "application/json; charset=UTF-8":
//         (data, index, cookie) => <VideoComponent data={data} index={index} cookie={cookie} />,
//     "application/json; charset=utf-8":
//         (data, index, cookie) => <VideoComponent data={data} index={index} cookie={cookie} />,
// };

// const validTypes: string[] = Object.keys(contentRenderers);

export default async function loadContentComponent(
    currentDay: Date,
    cookie: cookie
): Promise<JSX.Element> {
    const index = currentDay.getDate();

    // Fetching content info (urls)
    const contentInfoRes = await fetch(contentInfoURL, contentInfoOptions);
    const contentInfo: Record<string, string> = await contentInfoRes.json();

    if (!contentInfo[index.toString()])
        throw new Error(`Content URL for day ${index} not specified`);

    const contentURL =
        "content/" + index.toString() + "/" + contentInfo[index.toString()];

    // Fetching the actual content
    const contentData = await fetch(contentURL, contentOptions);
    const contentType = contentData.headers.get("Content-Type") as string;

    // Selecting the corrisponding component renderer from the above record
    // const renderContentComponent = contentRenderers[contentType];

    // Selecting the corrisponding component renderer
    const contentComponent = getContentComponent(contentType);

    return contentComponent(contentData, index, cookie);
}
