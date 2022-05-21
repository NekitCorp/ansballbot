import { Messages } from '../typings';

export const enMessages: Messages = {
    start: (username = 'Stranger') => `👋 Hello, ${username}.`,
    help: '📙',
    answers: {
        positive: ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes — definitely', 'You may rely on it'],
        hesitantlyPositive: ['As I see it, yes', 'Most likely', 'Outlook good', 'Signs point to yes', 'Yes'],
        nonCommittal: [
            'Reply hazy, try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
        ],
        negative: ['Don’t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'],
    },
    info: (percent) => `✅ The information is ${percent}% true`,
};
