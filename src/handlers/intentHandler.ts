import {
    CHOOSE_SCENARIO,
    COFFEE_CHOISE,
    CHOOSE_LANGUAGE,
} from '../consts/quick-replies.const'

export default class IntentHandler {
    constructor() {}

    handleIntent(payload) {
        let response

        if (payload.intent === CHOOSE_SCENARIO) {
            response = {
                text: payload.response,
                quick_replies: [
                    {
                        content_type: 'text',
                        title: COFFEE_CHOISE,
                        payload: CHOOSE_SCENARIO,
                    },
                ],
            }

            return response
        } else if (payload.intent === CHOOSE_LANGUAGE) {
            return {
                text: payload.response,
                quick_replies: [
                    {
                        content_type: 'text',
                        title: 'Spanish',
                        payload: CHOOSE_LANGUAGE,
                    },
                    {
                        content_type: 'text',
                        title: 'English',
                        payload: CHOOSE_LANGUAGE,
                    },
                ],
            } // <-- We choose by the payload in the if quick_reply
        }
    }
}
