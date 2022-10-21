const options = {
    method: "GET",
    headers: {
        "Content-Type": "image/gif, text/html"
    }
}

export default async function loadContent(index) {
    const data = await fetch("content/1/moosbauer-logo.png");
    console.log(data)
    const json = await data.json();
}