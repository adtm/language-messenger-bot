import { callSendAPI } from "../senderService";
import { getPhrases } from "../phraseService";
// Handles messages events
export function handleMessage(sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    console.log("text: " + received_message.text);
    switch (received_message.text) {
      case "England": {
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
      }
      default: {
        response = {
          text: `Where are you travelling? (Type: England)`
        };
      }
    }
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;

    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes"
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no"
                }
              ]
            }
          ]
        }
      }
    };
  }

  callSendAPI(sender_psid, response);
}
