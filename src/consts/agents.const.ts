export interface Agent {
    name
    project_id
    secret
}

export const MAIN_AGENT: Agent = {
    name: 'Main Agent',
    project_id: process.env.MAIN_AGENT_PROJECT_ID,
    secret: process.env.MAIN_AGENT_CREDENTIALS,
}
export const INTERVIEW_AGENT: Agent = {
    name: 'Interview Agent',
    project_id: process.env.INTERVIEW_AGENT_PROJECT_ID,
    secret: process.env.INTERVIEW_AGENT_CREDENTIALS,
}
export const COFFEE_AGENT: Agent = {
    name: 'Coffee Shop Agent',
    project_id: process.env.COFFEE_AGENT_PROJECT_ID,
    secret: process.env.COFFEE_AGENT_CREDENTIALS
}
