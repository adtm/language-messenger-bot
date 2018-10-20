const defaultPath = `${__dirname}/credentials`
export interface Agent {
    name
    project_id
    secret
}

export const MAIN_AGENT: Agent = {
    name: 'Main Agent',
    project_id: process.env.MAIN_AGENT_PROJECT_ID,
    secret: defaultPath + '/main-agent-credentials.json',
}
export const INTERVIEW_AGENT: Agent = {
    name: 'Interview Agent',
    project_id: process.env.INTERVIEW_AGENT_PROJECT_ID,
    secret: defaultPath + '/interview-agent-credentials.json',
}
export const COFFEE_AGENT: Agent = {
    name: 'Coffee Shop Agent',
    project_id: process.env.COFFEE_AGENT_PROJECT_ID,
    secret: defaultPath + '/coffee-agent-credentials.json',
}
