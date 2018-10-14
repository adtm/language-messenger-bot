import { callSendAPI } from "../senderService";
import { handleQuickReply } from "./quickreplyHandler";
import AgentService from "../AgentService";
import IntentHandler from "./intentHandler";

export function handleMessage(sender_psid: String, received_message: any) {
  let response;
  const { text } = received_message;
  const agentService = new AgentService();
  const intentHandler = new IntentHandler();

  if (received_message.quick_reply) {

    response = handleQuickReply(received_message.quick_reply, text);
    callSendAPI(sender_psid, response);

  } else {

    agentService.interactWithAgent(text).then(answer => {
      if (answer.intent) {
        response = intentHandler.handleIntent(answer);
      }

      if (!response) {
        response = {
          text: answer.response
        }
      }

      callSendAPI(sender_psid, response);
    });

  }
}
