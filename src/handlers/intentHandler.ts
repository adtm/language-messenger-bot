import { SCENARIO } from "../consts/intent.const";
import { CHOOSE_SCENARIO, INTERVIEW_CHOISE, RESTAURANT_BOOKING } from "../consts/quick-replies.const";

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
                            "title": RESTAURANT_BOOKING,
                            "payload": CHOOSE_SCENARIO
                        },
                        {
                            "content_type": "text",
                            "title": INTERVIEW_CHOISE,
                            "payload": CHOOSE_SCENARIO
                        },
                    ]
                }

            return response;
        }
    }
}