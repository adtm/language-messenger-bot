import { callSendAPI } from "../senderService";
import { handleQuickReply } from "./quickreplyHandler";

//TODO: Convert to import - currently errors cause SessionClient() cannot accept strings;
const dialogflow = require('dialogflow');

export function handleMessage(sender_psid: String, received_message: any) {
  let response;
  const { text } = received_message;

  if (received_message.quick_reply) {

    response = handleQuickReply(received_message.quick_reply, text);
    callSendAPI(sender_psid, response);

  } else {

    const projectId = process.env.GOOGLE_PROJECT_ID;
    const sessionId = 'quickstart-session-id';
    const languageCode = 'en-US';

    const sessionClient = new dialogflow.SessionsClient(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: languageCode,
        },
      },
    };

    sessionClient
      .detectIntent(request)
      .then(responses => {
        const result = responses[0].queryResult;
        response = {
          text: result.fulfillmentText
        }
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);

          //TODO: Need to actually implement such kind of intent cause now it won't work
          if (result.intent === `lang_choose`) {
            response =
              {
                "text": "Choose a learning language! (to start again type: Start)",
                "quick_replies": [
                  {
                    "content_type": "text",
                    "title": "Russian",
                    "payload": "lang_choose",
                    "image_url": "http://icons.iconarchive.com/icons/custom-icon-design/2014-world-cup-flags/128/Russia-icon.png"
                  },
                  {
                    "content_type": "text",
                    "title": "French",
                    "payload": "lang_choose",
                    "image_url": "http://icons.iconarchive.com/icons/custom-icon-design/round-world-flags/128/France-icon.png"
                  },
                ]
              }
          }
        } else {
          console.log(`  No intent matched.`);
        }
      })
      .catch(err => {
        console.error('ERROR:', err);

        response = {
          text: "Something went wrong, man"
        }
      }).finally(() => {
        callSendAPI(sender_psid, response);
      })

  }
}
