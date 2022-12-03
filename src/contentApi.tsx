import ImageComponent from "./contentComponents/ImageComponent";
import VideoComponent from "./contentComponents/VideoComponent";
import MDComponent from "./contentComponents/MDComponent";
import { cookie } from "./cookieconsent/types";
import React from "react";

const contentInfoURL = "content/content-info.json";

type contentInfo = Record<
    string,
    string | { contentURL: string; customStyleURL: string }
>;

const contentInfoOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

const contentOptions: RequestInit = {
    method: "GET",
};

const customStyleOptions: RequestInit = {
    method: "GET",
    headers: {
        "Content-Type": "text/css",
    },
};

// prettier-ignore
function getContentComponent(
    contentType: string
): (data: Response, index: number, cookie: cookie, customStyle: string) => JSX.Element {
    switch (contentType) {
        case "image/gif":
        case "image/jpeg":
        case "image/png":
            return (data, index, cookie, customStyle) => (
                <ImageComponent res={data} index={index} />
            );

        case "text/markdown":
        case "text/markdown; charset=UTF-8":
        case "text/markdown; charset=utf-8":
        case "text/markdown;charset=UTF-8":
        case "text/markdown;charset=utf-8":
            return (data, index, cookie, customStyle) => (
                <MDComponent res={data} index={index} customStyle={customStyle} />
            );

        case "application/json":
        case "application/json; charset=UTF-8":
        case "application/json; charset=utf-8":
        case "application/json;charset=UTF-8":
        case "application/json;charset=utf-8":
            return (data, index, cookie, customStyle) => (
                <VideoComponent res={data} index={index} cookie={cookie} />
            );

        default:
            throw new Error(`Content-Type ${contentType} unknown`);
    }
}

export default async function loadContentComponent(
    currentDay: Date,
    cookie: cookie
): Promise<JSX.Element> {
    const index = currentDay.getDate();

    // Fetching content info (urls)
    const contentInfoRes = await fetch(contentInfoURL, contentInfoOptions);
    const contentInfo: contentInfo = await contentInfoRes.json();

    if (!contentInfo[index.toString()])
        throw new Error(`Content URL for day ${index} not specified`);

    // Extracting URLs
    let contentURL: string | null = null;
    let customStyleURL: string | null = null;

    if (typeof contentInfo[index.toString()] === "string") {
        contentURL =
            "content/" + index.toString() + "/" + contentInfo[index.toString()];
    } else {
        contentURL =
            "content/" +
            index.toString() +
            "/" +
            (contentInfo[index.toString()] as any).contentURL;
        customStyleURL =
            "content/" +
            index.toString() +
            "/" +
            (contentInfo[index.toString()] as any).customStyleURL;
    }

    // Fetching the actual content (in parallel if customStyle)
    let contentRes: Response | null = null;
    let customStyle: string | null = null;

    if (!customStyleURL) {
        contentRes = await fetch(contentURL, contentOptions);
    } else {
        [contentRes, customStyle] = await Promise.all([
            fetch(contentURL, contentOptions),
            fetch(customStyleURL, customStyleOptions).then((res) => res.text()),
        ]);
    }

    // Selecting the corrisponding component renderer
    const contentType = contentRes.headers.get("Content-Type") as string;
    const contentComponent = getContentComponent(contentType);

    return contentComponent(contentRes, index, cookie, customStyle ?? "");
}
