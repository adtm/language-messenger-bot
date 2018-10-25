import AgentService from '../agentService'
import { MAIN_AGENT } from '../consts/agents.const'
import { CHOOSE_SCENARIO, CHOOSE_LANGUAGE } from '../consts/quick-replies.const'
import learningService from '../learningService'
import { callSendAPI, sendTypingAction } from '../senderService'
import IntentHandler from './intentHandler'
import { handleQuickReply } from './quickreplyHandler'
import { ENGLISH } from '../consts/language.const'
import { RESET } from '../consts/intent.const'

export function handleMessage(sender_psid: String, received_message: any) {
    sendTypingAction(sender_psid)
    let response
    const { text } = received_message

    if (received_message.quick_reply) {
        switch (received_message.quick_reply.payload) {
            case CHOOSE_LANGUAGE:
                AgentService.changeLanguage(text)
                break
            case CHOOSE_SCENARIO:
                AgentService.changeAgent(
                    AgentService.getAgentBasedOnScenario(text)
                )
                return AgentService.sendEvent().then(answer =>
                    handleAgentResponse(answer, sender_psid)
                )
            default:
                response = handleQuickReply(received_message.quick_reply, text)
                break
        }
    }

    if (text === 'Reset') {
        AgentService.changeAgent(MAIN_AGENT)
        AgentService.changeLanguage(ENGLISH)
        return AgentService.sendEvent().then(answer =>
            handleAgentResponse(answer, sender_psid)
        )
    }

    AgentService.interactWithAgent(text).then(answer =>
        handleAgentResponse(answer, sender_psid)
    )
}

function handleAgentResponse(answer, sender_psid) {
    let response

    if (answer.isEndOfConversation) {
        //First response send original answers
        response = {
            text: answer.response,
        }

        return callSendAPI(sender_psid, response).on('response', () => {
            const errorCount = learningService.getErrorCount()
            //Second one send a premade answer
            response = {
                text:
                    `You have just completed the "${AgentService.getCurrentAgent()
                        .scenarioName.toString()[0]
                        .toUpperCase() +
                        AgentService.getCurrentAgent()
                            .scenarioName.toString()
                            .slice(1)}" scenario!\n` +
                    `I didn't understand you ${errorCount} ${
                        errorCount == 1 ? 'time' : 'times'
                    }. \n` +
                    `Say "Hey" if you want to start again!`,
            }

            AgentService.changeAgent(MAIN_AGENT)
            AgentService.changeLanguage(ENGLISH)

            callSendAPI(sender_psid, response)
        })
    }

    if (answer.intent) {
        if (answer.intent === RESET) {
            AgentService.changeAgent(MAIN_AGENT)
        } else {
            response = IntentHandler.handleIntent(answer)
        }
    }

    if (!response) {
        response = {
            text: answer.response,
        }
    }

    callSendAPI(sender_psid, response)
}
