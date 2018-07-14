import { callSendAPI } from "../senderService";
import { getPhrases } from "../phraseService";
// Handles messages events
export function handleMessage(sender_psid, received_message) {
  let response;
  const { text } = received_message;

  if (received_message.quick_reply) {
    const { payload } = received_message.quick_reply;

    switch (payload) {
      case 'learn_choose':
        console.log(payload)
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
        break;
      case 'lang_choose':
        response = {
          "text": "Choose what you want to learn!",
          "quick_replies":[
            {
              "content_type":"text",
              "title":"Scenarios",
              "payload":"learn_choose" // <-- We choose by the payload in the if quick_reply
            },
            {
              "content_type":"text",
              "title":"Popular Phrases",
              "payload":"learn_choose"
            },
          ]
        }
        break;
      default:
        // me dunno
    }
  } else {

    // Default response if there doesn't exist a quick response, for now
    response = {
      "text": "Choose a learning language! (to start again type: Start)",
      "quick_replies":[
        {
          "content_type":"text",
          "title":"Russian",
          "payload":"lang_choose",
          "image_url":"http://icons.iconarchive.com/icons/custom-icon-design/2014-world-cup-flags/128/Russia-icon.png"
        },
        {
          "content_type":"text",
          "title":"French",
          "payload":"lang_choose",
          "image_url":"http://icons.iconarchive.com/icons/custom-icon-design/round-world-flags/128/France-icon.png"
        },
      ]
    }
  }
  callSendAPI(sender_psid, response);
}
