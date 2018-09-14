import { callSendAPI } from "../senderService";
import { getPhrases, getScenarios } from "../phraseService";
const dialogflow = require('dialogflow');

// Handles messages events
export function handleMessage(sender_psid: String, received_message: any) {
  let response;
  const { text } = received_message;

  if (received_message.quick_reply) {
    const { payload } = received_message.quick_reply;

    switch (payload) {
      case 'learn_choose':
        if (text === "Scenarios") {
          response = {
            attachment: {
              type: "template",
              payload: {
                template_type: "list",
                top_element_style: "compact",
                elements: getScenarios().map(scenario => ({ ...scenario }))
              }
            }
          };
        } else if (text === "Popular Phrases") {
          response = {
            attachment: {
              type: "template",
              payload: {
                template_type: "list",
                top_element_style: "compact",
                elements: getPhrases()
                  .map(p => ({
                    title: p.name,
                    subtitle: p.area
                  }))
                  .slice(0, 4),
                buttons: [
                  {
                    title: "View More",
                    type: "postback",
                    payload: "payload"
                  }
                ]
              }
            }
          };
        }
        break;
      case 'lang_choose':
        response = {
          "text": "Choose what you want to learn!",
          "quick_replies": [
            {
              "content_type": "text",
              "title": "Scenarios",
              "payload": "learn_choose" // <-- We choose by the payload in the if quick_reply
            },
            {
              "content_type": "text",
              "title": "Popular Phrases",
              "payload": "learn_choose"
            },
          ]
        }
        break;
      default:
      // me dunno
    }
  } else {
    //TODO: Connect user with dialogflow
    // You can find your project ID in your Dialogflow agent settings
    const projectId = 'small-talk-ffdd8'; //https://dialogflow.com/docs/agents#settings
    const sessionId = 'quickstart-session-id';
    const query = 'hello';
    const languageCode = 'en-US';

    const sessionClient = new dialogflow.SessionsClient();

    // Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    // Send request and log result
    sessionClient
      .detectIntent(request)
      .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      })
      .catch(err => {
        console.error('ERROR:', err);
      });

    // Default response if there doesn't exist a quick response, for now
    response = {
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
  callSendAPI(sender_psid, response);
}
