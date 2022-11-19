import ImageComponent from "./contentComponents/ImageComponent";
import VideoComponent from "./contentComponents/VideoComponent";
import MDComponent from "./contentComponents/MDComponent";
import { cookie } from "./cookieconsent/types";

// Helper function to convert a blob to base64DataURL
// async function toDataURL(blob: Blob): Promise<string> {
//     return new Promise((resolve, _) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result as string);
//         reader.readAsDataURL(blob);
//       });
// }

// prettier-ignore
const contentRenderers: Record<
    string,
    (data: Response, index: number, cookie: cookie) => JSX.Element
> = {
    "image/gif":
        (data, index) => <ImageComponent data={data} index={index} />,
    "image/jpeg":
        (data, index) => <ImageComponent data={data} index={index} />,
    "image/png":
        (data, index) => <ImageComponent data={data} index={index} />,
    "text/markdown":
        (data, index) => <MDComponent data={data} index={index} />,
    "text/markdown; charset=UTF-8":
        (data, index) => <MDComponent data={data} index={index} />,
    "application/json": 
        (data, index, cookie) => <VideoComponent data={data} index={index} cookie={cookie} />,
    "application/json; charset=UTF-8": 
        (data, index, cookie) => <VideoComponent data={data} index={index} cookie={cookie} />,
};

const validTypes: string[] = Object.keys(contentRenderers);

const contentInfoURL = "content/content-info.json";
const contentInfoOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

const contentOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": validTypes.join(","),
    },
};

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
    const renderContentComponent = contentRenderers[contentType];

    return renderContentComponent(contentData, index, cookie);
}
