import {
    CHOOSE_SCENARIO,
    COFFEE_CHOISE,
    CHOOSE_LANGUAGE,
} from '../consts/quick-replies.const'

class IntentHandler {
    constructor() { }

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
                        image_url: "https://mbtskoudsalg.com/images/coffee-icons-png-6.png"
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
                        image_url: "https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Spain.png"
                    },
                    {
                        content_type: 'text',
                        title: 'English',
                        payload: CHOOSE_LANGUAGE,
                        image_url: "https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_United_Kingdom.png"
                    },
                ],
            } // <-- We choose by the payload in the if quick_reply
        }
    }
}

export default new IntentHandler();