import { Agent, MAIN_AGENT, INTERVIEW_AGENT, COFFEE_AGENT } from './consts/agents.const';
import { WELCOME_EVENT } from './consts/events.const';
import { INTERVIEW_CHOISE, COFFEE_CHOISE } from './consts/quick-replies.const';

//TODO: Convert to import - currently errors cause SessionClient() cannot accept strings;
const dialogflow = require('dialogflow')

interface Request {
    session: any
    queryInput
}

interface TextRequest extends Request {
    queryInput: {
        text: {
            text: string
            languageCode
        }
    }
}

interface EventRequest extends Request {
    queryInput: {
        event: {
            name: string
            languageCode
        }
    }
}

class AgentService {
    private projectId: string
    private sessionId: string
    private languageCode = 'en-US'
    private sessionPath
    private sessionClient: any
    private currentAgent: Agent = MAIN_AGENT

    //TODO: Stack sessions and use them later.
    //TODO: Handle multiple users
    constructor() {
        this.projectId = this.currentAgent.project_id
        this.sessionClient = new dialogflow.SessionsClient({
            keyFilename: this.currentAgent.secret,
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
        const request: TextRequest = {
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
            .then(responses => this.handleResponse(responses))
            .catch(err => {
                console.error('ERROR:', err)
            })
    }

    sendEvent(eventName = WELCOME_EVENT) {
        const request: EventRequest = {
            session: this.sessionPath,
            queryInput: {
                event: {
                    name: eventName,
                    languageCode: this.languageCode,
                },
            },
        }

        return this.sessionClient
            .detectIntent(request)
            .then(responses => this.handleResponse(responses))
            .catch(err => {
                console.error('ERROR:', err)
            })
    }

    changeAgent(agent: Agent) {
        this.currentAgent = agent
        this.projectId = this.currentAgent.project_id
        this.sessionClient = new dialogflow.SessionsClient({
            keyFilename: this.currentAgent.secret,
        })
        this.sessionId = Math.random()
            .toString(36)
            .substring(7)
        this.sessionPath = this.sessionClient.sessionPath(
            this.projectId,
            this.sessionId
        )
    }

    changeLanguage(language) {
        if (language.toLowerCase() === 'spanish') this.languageCode = 'es'
    }

    getCurrentAgent(): Agent {
        return this.currentAgent
    }

    private handleResponse(responses) {
        const result = responses[0].queryResult

        const isEndOfConversation = this.isEndOfConversation(result)

        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`)

            return {
                isEndOfConversation,
                intent: result.intent.displayName,
                parameters: result.parameters,
                response: result.fulfillmentText,
            }
        } else {
            console.log(`  No intent matched.`)

            return {
                response: result.fulfillmentText,
            }
        }
    }

    getAgentBasedOnScenario(scenario: string): Agent {
        switch (scenario) {
            case INTERVIEW_CHOISE:
                return INTERVIEW_AGENT
            case COFFEE_CHOISE:
                return COFFEE_AGENT
            default:
                return MAIN_AGENT
        }
    }



    private isEndOfConversation(result) {
        if (result.diagnosticInfo) {
            return !!result.diagnosticInfo.fields.end_conversation
        }

        return false
    }
}

export default new AgentService();