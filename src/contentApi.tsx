import ImageComponent from "./contentComponents/ImageComponent";
import VideoComponent from "./contentComponents/VideoComponent";
import MDComponent from "./contentComponents/MDComponent";

// Helper function to convert a blob to base64DataURL
// async function toDataURL(blob: Blob): Promise<string> {
//     return new Promise((resolve, _) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result as string);
//         reader.readAsDataURL(blob);
//       });
// }

const contentRenderers: Record<string, Function> = {
    "image/gif": (data: Response, index: number) => (
        <ImageComponent data={data} index={index} />
    ),
    "image/jpeg": (data: Response, index: number) => (
        <ImageComponent data={data} index={index} />
    ),
    "image/png": (data: Response, index: number) => (
        <ImageComponent data={data} index={index} />
    ),
    "application/json": (data: Response, index: number) => (
        <VideoComponent data={data} index={index} />
    ),
    "text/markdown": (data: Response, index: number) => (
        <MDComponent data={data} index={index} />
    ),
    "application/json; charset=UTF-8": (data: Response, index: number) => (
        <VideoComponent data={data} index={index} />
    ),
    "text/markdown; charset=UTF-8": (data: Response, index: number) => (
        <MDComponent data={data} index={index} />
    ),
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
    currentDay: Date
): Promise<JSX.Element> {
    // const index = currentDay.getDate();
    const index = 1;

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

    return renderContentComponent(contentData);
}
