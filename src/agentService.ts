import { Agent, MAIN_AGENT, INTERVIEW_AGENT } from './consts/agents.const'

//TODO: Convert to import - currently errors cause SessionClient() cannot accept strings;
const dialogflow = require('dialogflow')

export default class AgentService {
    private projectId: string
    private sessionId: string
    private languageCode = 'en-US'
    private sessionPath
    private sessionClient: any

    //TODO: Stack sessions and use them later.
    //TODO: Handle multiple users
    constructor(agent: Agent = INTERVIEW_AGENT) {
        this.projectId = agent.project_id
        this.sessionClient = new dialogflow.SessionsClient({
            keyFilename: agent.secret,
        })
        this.sessionId = Math.random()
            .toString(36)
            .substring(7)
        this.sessionPath = this.sessionClient.sessionPath(
            this.projectId,
            this.sessionId
        )
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
        }

        return this.sessionClient
            .detectIntent(request)
            .then(responses => {
                const result = responses[0].queryResult
                const isEndOfConversation = this.isEndOfConversation(result)

                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`)

                    return {
                        isEndOfConversation,
                        intent: result.intent.displayName,
                        response: result.fulfillmentText,
                    }
                } else {
                    console.log(`  No intent matched.`)

                    return {
                        response: result.fulfillmentText,
                    }
                }
            })
            .catch(err => {
                console.error('ERROR:', err)
            })
    }

    changeAgent(agent: Agent) {
        this.projectId = agent.project_id
        this.sessionClient = new dialogflow.SessionsClient({
            keyFilename: agent.secret,
        })
        this.sessionId = Math.random()
            .toString(36)
            .substring(7)
        this.sessionPath = this.sessionClient.sessionPath(
            this.projectId,
            this.sessionId
        )
    }

    private isEndOfConversation(result) {
        if (result.diagnosticInfo) {
            console.log('end of converstaion object')
            console.log(result.diagnosticInfo.fields.end_conversation)
            return !!result.diagnosticInfo.fields.end_conversation
        }

        return false
    }
}
