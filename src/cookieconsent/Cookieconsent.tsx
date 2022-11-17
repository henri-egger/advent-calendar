import { useEffect } from "react";
import options from "./cookieconsentOptions";
import "vanilla-cookieconsent";

export default function CookieConsent() {
    useEffect(() => {
        options.onAccept = (cookie: any) => {
            console.log("onAccept fired with: ", cookie);
        };

        if (!document.getElementById("cc--main")) {
            (window as any).CookieConsentApi = window.initCookieConsent();
            (window as any).CookieConsentApi.run(options);
        }
    }, []);

    return null;
}
