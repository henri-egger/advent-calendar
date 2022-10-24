import { modalContent } from "./types";

async function toDataURL(data: Response): Promise<string> {
    const blob = await data.blob();
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
}

const parsingMethods: { [key: string]: Function } = {
    "image/gif":   async (data: Response): Promise<string> => toDataURL(data),
    "image/jpeg":  async (data: Response): Promise<string> => toDataURL(data),
    "image/png":   async (data: Response): Promise<string> => toDataURL(data),
    "text/plain":  async (data: Response): Promise<string> => data.text(),
    "text/html":   async (data: Response): Promise<string> => data.text(),
}

const validTypes: string[] = Object.keys(parsingMethods);

const contentInfoURL = "content/content-info.json";
const contentInfoOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}

const contentOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": validTypes.join(",")
    }
}

export default async function loadContent(index: number): Promise<modalContent> {
    const contentInfoRes = await fetch(contentInfoURL, contentInfoOptions);
    const contentInfo: { [key: string]: string } = await contentInfoRes.json();

    if (!contentInfo[index.toString()]) throw new Error(`Content URL for day ${index} not specified`);
    const contentURL = "content/" + index.toString() + "/" + contentInfo[index.toString()];
    
    const contentData = await fetch(contentURL, contentOptions);
    const contentType = contentData.headers.get("Content-Type") as string;
    
    const parsingMethod = parsingMethods[contentType];
    const dataString = await parsingMethod(contentData);
    
    return {
        content: dataString,
        type: contentType,
        index: index,
    }
}
