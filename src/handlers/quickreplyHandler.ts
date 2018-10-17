import { getPhrases, getScenarios } from '../phraseService'
import {
    CHOOSE_METHOD,
    CHOOSE_LANGUAGE,
    CHOOSE_SCENARIO,
} from '../consts/quick-replies.const'

//Payload can be intent name
export function handleQuickReply(payload: String, text: String) {
    switch (payload) {
        case CHOOSE_METHOD:
            if (text === 'Scenarios') {
                return {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'list',
                            top_element_style: 'compact',
                            elements: getScenarios().map(scenario => ({
                                ...scenario,
                            })),
                        },
                    },
                }
            } else if (text === 'Popular Phrases') {
                return {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'list',
                            top_element_style: 'compact',
                            elements: getPhrases()
                                .map(p => ({
                                    title: p.name,
                                    subtitle: p.area,
                                }))
                                .slice(0, 4),
                            buttons: [
                                {
                                    title: 'View More',
                                    type: 'postback',
                                    payload: 'payload',
                                },
                            ],
                        },
                    },
                }
            }
            break
        case CHOOSE_LANGUAGE:
            return {
                text: 'Choose what you want to learn!',
                quick_replies: [
                    {
                        content_type: 'text',
                        title: 'Scenarios',
                        payload: 'learn_choose', // <-- We choose by the payload in the if quick_reply
                    },
                    {
                        content_type: 'text',
                        title: 'Popular Phrases',
                        payload: 'learn_choose',
                    },
                ],
            }
            break

        //TODO: implement mechanism which changes the
        case CHOOSE_SCENARIO:
            return {
                text: 'Choose what you want to learn!',
                quick_replies: [
                    {
                        content_type: 'text',
                        title: 'Scenarios',
                        payload: 'learn_choose', // <-- We choose by the payload in the if quick_reply
                    },
                    {
                        content_type: 'text',
                        title: 'Popular Phrases',
                        payload: 'learn_choose',
                    },
                ],
            }
            break
        default:
        // me dunno
    }
}
