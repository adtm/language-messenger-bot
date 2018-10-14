import { AnyTxtRecord } from "dns";

//TODO: Convert to import - currently errors cause SessionClient() cannot accept strings;
const dialogflow = require('dialogflow');

export default class AgentService {

    private projectId = process.env.GOOGLE_PROJECT_ID;
    private sessionId = 'quickstart-session-id';
    private languageCode = 'en-US';
    private sessionPath;

    private sessionClient = new dialogflow.SessionsClient(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    constructor() {
        this.sessionPath = this.sessionClient.sessionPath(this.projectId, this.sessionId);
    }

    interactWithAgent(requestText) {
        const request = {
            session: this.sessionPath,
            queryInput: {
                text: {
                    text: requestText,
                    languageCode: this.languageCode,
                },
            },
        };

        return this.sessionClient
            .detectIntent(request)
            .then(responses => {
                const result = responses[0].queryResult;

                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);

                    return {
                        intent: result.intent.displayName,
                        response: result.fulfillmentText
                    }
                } else {
                    console.log(`  No intent matched.`);

                    return {
                        response: result.fulfillmentText
                    }

                }
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }
}