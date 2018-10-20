import AgentService from '../agentService';
import { MAIN_AGENT } from '../consts/agents.const';
import { CHOOSE_SCENARIO, CHOOSE_LANGUAGE } from '../consts/quick-replies.const';
import learningService from '../learningService';
import { callSendAPI, sendTypingAction } from '../senderService';
import IntentHandler from './intentHandler';
import { handleQuickReply } from './quickreplyHandler';


export function handleMessage(sender_psid: String, received_message: any) {
    sendTypingAction(sender_psid);

    let response
    const { text } = received_message

    if (received_message.quick_reply) {
        console.log('payload stuff: ' + received_message.quick_reply.payload)

        if (received_message.quick_reply.payload === CHOOSE_LANGUAGE) {
            AgentService.changeLanguage(text)
        }
        if (received_message.quick_reply.payload === CHOOSE_SCENARIO) {
            AgentService.changeAgent(AgentService.getAgentBasedOnScenario(text));
            return AgentService.sendEvent().then(answer => handleAgentResponse(answer, sender_psid));
        } else {
            response = handleQuickReply(received_message.quick_reply, text)
        }
    }

    AgentService.interactWithAgent(text).then(answer => handleAgentResponse(answer, sender_psid));
}

function handleAgentResponse(answer, sender_psid) {
    let response;

    if (answer.isEndOfConversation) {
        learningService.resetErrorCount();
        //First response send original answers
        response = {
            text: answer.response,
        }

        return callSendAPI(sender_psid, response).on('response', () => {
            //Second one send a premade answer
            response = {
                text: `You'have just completed the ${AgentService.getCurrentAgent().scenarioName} scenario. ` +
                    `You made ${learningService.getErrorCount()} errors. ` +
                    `Say "I want to learn something else" if you want to learn another scenario`
            }

            AgentService.changeAgent(MAIN_AGENT);

            callSendAPI(sender_psid, response)
        })
    }

    if (answer.intent) {
        response = IntentHandler.handleIntent(answer);
    }

    if (!response) {
        response = {
            text: answer.response,
        }
    }

    callSendAPI(sender_psid, response)
}


