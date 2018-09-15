import { getPhrases, getScenarios } from "../phraseService";

export function handleQuickReply(payload: String, text: String) {

    switch (payload) {

        case 'learn_choose':
            if (text === "Scenarios") {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "list",
                            top_element_style: "compact",
                            elements: getScenarios().map(scenario => ({ ...scenario }))
                        }
                    }
                };
            } else if (text === "Popular Phrases") {
                return {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "list",
                            top_element_style: "compact",
                            elements: getPhrases()
                                .map(p => ({
                                    title: p.name,
                                    subtitle: p.area
                                }))
                                .slice(0, 4),
                            buttons: [
                                {
                                    title: "View More",
                                    type: "postback",
                                    payload: "payload"
                                }
                            ]
                        }
                    }
                };
            }
            break;
        case 'lang_choose':
            return {
                "text": "Choose what you want to learn!",
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "Scenarios",
                        "payload": "learn_choose" // <-- We choose by the payload in the if quick_reply
                    },
                    {
                        "content_type": "text",
                        "title": "Popular Phrases",
                        "payload": "learn_choose"
                    },
                ]
            }
            break;
        default:
        // me dunno
    }


}