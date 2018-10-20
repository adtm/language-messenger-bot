import { callSendAPI, sendTypingAction } from '../senderService'
import { handleQuickReply } from './quickreplyHandler'
import AgentService from '../agentService'
import IntentHandler from './intentHandler'
import {
    CHOOSE_SCENARIO,
    CHOOSE_LANGUAGE,
    INTERVIEW_CHOISE,
    COFFEE_CHOISE,
} from '../consts/quick-replies.const'
import {
    INTERVIEW_AGENT,
    MAIN_AGENT,
    Agent,
    COFFEE_AGENT,
} from '../consts/agents.const'

const agentService = new AgentService()
const intentHandler = new IntentHandler()

export function handleMessage(sender_psid: String, received_message: any) {
    sendTypingAction(sender_psid)
    let response
    const { text } = received_message

    if (received_message.quick_reply) {
        console.log('payload stuff: ' + received_message.quick_reply.payload)

        if (received_message.quick_reply.payload === CHOOSE_LANGUAGE) {
            agentService.changeLanguage(text)
        }
        if (received_message.quick_reply.payload === CHOOSE_SCENARIO) {
            agentService.changeAgent(getAgentBasedOnScenario(text))
            return agentService
                .sendEvent()
                .then(answer => handleAgentResponse(answer, sender_psid))
        } else {
            response = handleQuickReply(received_message.quick_reply, text)
        }
    }

    agentService
        .interactWithAgent(text)
        .then(answer => handleAgentResponse(answer, sender_psid))
}

function handleAgentResponse(answer, sender_psid) {
    let response
    if (answer.isEndOfConversation) {
        //First response send original answers
        response = {
            text: answer.response,
        }
        return callSendAPI(sender_psid, response).on('response', () => {
            //Second one send a premade answer
            response = {
                text:
                    `You'have just completed the ${
                        agentService.getCurrentAgent().scenarioName
                    } scenario. ` +
                    `Say "I want to learn something else" if you want to learn another scenario`,
            }
            agentService.changeAgent(MAIN_AGENT)

            callSendAPI(sender_psid, response)
        })
    }

    if (answer.intent) {
        response = intentHandler.handleIntent(answer)
    }

    if (!response) {
        response = {
            text: answer.response,
        }
    }

    callSendAPI(sender_psid, response)
}

function getAgentBasedOnScenario(scenario: string): Agent {
    switch (scenario) {
        case INTERVIEW_CHOISE:
            return INTERVIEW_AGENT
        case COFFEE_CHOISE:
            return COFFEE_AGENT
        default:
            return MAIN_AGENT
    }
}
