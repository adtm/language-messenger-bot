import { callSendAPI } from '../senderService'
import { handleQuickReply } from './quickreplyHandler'
import AgentService from '../agentService'
import IntentHandler from './intentHandler'
import {
    CHOOSE_SCENARIO,
    INTERVIEW_CHOISE,
} from '../consts/quick-replies.const'
import { INTERVIEW_AGENT, MAIN_AGENT, Agent } from '../consts/agents.const'

const agentService = new AgentService()

export function handleMessage(sender_psid: String, received_message: any) {
    let response
    const { text } = received_message
    const intentHandler = new IntentHandler()

    if (received_message.quick_reply) {
        if (received_message.quick_reply.payload === CHOOSE_SCENARIO) {
            agentService.changeAgent(getAgentBasedOnScenario(text))
        } else {
            response = handleQuickReply(received_message.quick_reply, text)
        }
        callSendAPI(sender_psid, response)
    }

    agentService.interactWithAgent(text).then(answer => {
        if (answer.isEndOfConversation) agentService.changeAgent(MAIN_AGENT)

        if (answer.intent) {
            response = intentHandler.handleIntent(answer)
        }

        if (!response) {
            response = {
                text: answer.response,
            }
        }

        callSendAPI(sender_psid, response)
    })
}

function getAgentBasedOnScenario(scenario: string): Agent {
    switch (scenario) {
        case INTERVIEW_CHOISE:
            return INTERVIEW_AGENT
        default:
            return MAIN_AGENT
    }
}
