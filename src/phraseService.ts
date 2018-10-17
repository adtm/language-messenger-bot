export function getPhrases() {
    const phrases = [
        {
            name: 'Hello',
            area: 'General',
        },
        {
            name: 'How are you?',
            area: 'General',
        },
        {
            name: 'I would like...',
            area: 'General',
        },
        {
            name: 'I would like to go to...',
            area: 'Directions',
        },
        {
            name: "I don't understand.",
            area: 'General',
        },
    ]

    return phrases
}

export const getScenarios = () => [
    {
        title: 'Restaurant',
        subtitle: 'Learn to order dat pizza!',
    },
    {
        title: 'Job Interview',
        subtitle: 'Finally work at Facebook!',
    },
    {
        title: 'The date',
        subtitle: 'Get the woman you never could!',
    },
]
