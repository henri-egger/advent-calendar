export default {
    autorun: true,
    current_lang: "en",
    page_scripts: true,

    gui_options: {
        consent_modal: {
            layout: "cloud", // box/cloud/bar
            position: "bottom center", // bottom/middle/top + left/right/center
            transition: "slide", // zoom/slide
            swap_buttons: false, // enable to invert buttons
        },
        settings_modal: {
            layout: "box", // box/bar
            // position: 'left',           // left/right
            transition: "slide", // zoom/slide
        },
    },

    // onFirstAction: function (user_preferences, cookie) {
    //     // callback triggered only once
    // },

    onAccept: (cookie: any) => {},

    // onChange: function (cookie: any, changed_preferences: any) {
    // },

    languages: {
        en: {
            consent_modal: {
                title: "I use cookies",
                description:
                    'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only upon approval. <a aria-label="Cookie policy" target="_blank" class="cc-link" href="https://www.moosbauer.com/de/f/cookies">Read more</a>',
                primary_btn: {
                    text: "Accept",
                    role: "accept_all", // 'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: "Settings",
                    role: "settings", // 'settings' or 'accept_necessary'
                },
            },
            settings_modal: {
                title: "Cookie preferences",
                save_settings_btn: "Save settings",
                accept_all_btn: "Accept all",
                reject_all_btn: "Reject all", // optional, [v.2.5.0 +]
                cookie_table_headers: [
                    { col1: "Name" },
                    { col2: "Domain" },
                    { col3: "Expiration" },
                    { col4: "Type" },
                ],
                blocks: [
                    {
                        title: "Cookie usage",
                        description:
                            "We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.",
                    },
                    {
                        title: "Strictly necessary cookies",
                        description:
                            "These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.",
                        toggle: {
                            value: "necessary",
                            enabled: true,
                            readonly: true,
                        },
                        cookie_table: [
                            {
                                col1: "VISITOR_INFO1_LIVE",
                                col2: "youtube.com",
                                col3: "6 months",
                                col4: "Permanent cookie",
                            },
                            {
                                col1: "YSC",
                                col2: "youtube.com",
                                col3: "/",
                                col4: "Session cookie",
                            },
                        ],
                    },
                    {
                        title: "Analytics cookies",
                        description:
                            "These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you.",
                        toggle: {
                            value: "analytics",
                            enabled: false,
                            readonly: false,
                        },
                        cookie_table: [
                            {
                                col1: "_pk_id.2.1fff",
                                col2: "/",
                                col3: "6 months",
                                col4: "Permanent cookie",
                            },
                            {
                                col1: "_pk_ses.2.1fff",
                                col2: "/",
                                col3: "30 minutes",
                                col4: "Permanent cookie",
                            },
                        ],
                    },
                    {
                        title: "More information",
                        description:
                            'For any question in relation to our policy on cookies and your choices, please <a class="cc-link" target="_blank" href="https://www.moosbauer.com/de">contact me</a>.',
                    },
                ],
            },
        },
    },
};
