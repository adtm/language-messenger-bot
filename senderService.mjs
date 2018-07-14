import request from "request";
import dotenv from "dotenv";
dotenv.config();


const projectId = 'main-617b3';
const sessionId = 'quickstart-session-id';


import dialogflow from 'dialogflow';
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Sends response messages via the Send API
export function callSendAPI(sender_psid, response) {
  console.log(response)

  const dialogRequest = {
  session: sessionPath,
  queryInput: {
    text: {
      text: 'text',
      languageCode: 'en-US',
    },
  },
};

  sessionClient
  .detectIntent(dialogRequest)
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


  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}
