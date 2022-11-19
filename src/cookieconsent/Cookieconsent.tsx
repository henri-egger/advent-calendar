import { useEffect } from "react";
import "vanilla-cookieconsent";
import options from "./cookieconsentOptions";
import { cookie } from "./types";

type props = {
    setCookie: React.Dispatch<React.SetStateAction<cookie>>;
};

export default function CookieConsent(props: props) {
    useEffect(() => {
        options.onAccept = (cookie: any) => {
            props.setCookie(cookie);
        };

        if (!document.getElementById("cc--main")) {
            (window as any).CookieConsentApi = window.initCookieConsent();
            (window as any).CookieConsentApi.run(options);
        }
    }, []);

    return null;
}
