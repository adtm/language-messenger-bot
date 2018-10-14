import { SCENARIO } from "../consts/intent.const";
import { CHOOSE_SCENARIO } from "../consts/quick-replies.const";

export default class IntentHandler {

    constructor() { }

    handleIntent(payload) {
        let response;

        if (payload.intent === SCENARIO) {
            response =
                {
                    "text": payload.response,
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Restaurant booking",
                            "payload": CHOOSE_SCENARIO
                        },
                        {
                            "content_type": "text",
                            "title": "Interview",
                            "payload": CHOOSE_SCENARIO
                        },
                    ]
                }

            return response;
        }
    }
}