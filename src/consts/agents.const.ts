export interface Agent {
    name
    project_id
    secret
}

export const MAIN_AGENT: Agent = {
    name: 'Main Agent',
    project_id: process.env.MAIN_AGENT_PROJECT_ID,
    secret: JSON.parse(process.env.MAIN_AGENT_CREDENTIALS),
}
export const INTERVIEW_AGENT: Agent = {
    name: 'Interview Agent',
    project_id: process.env.INTERVIEW_AGENT_PROJECT_ID,
    secret: JSON.parse(process.env.INTERVIEW_AGENT_CREDENTIALS),
}
