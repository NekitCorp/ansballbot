import { Messages } from '../typings';

export const enMessages: Messages = {
    start: (username = 'Stranger') => `👋 Hello, ${username}.`,
    help: `📙 I am a ball that answers questions. Ask me any question and I will give you the answer to it. I can also measure the veracity of information and predict the date of an event.
    
List of available commands:
/help - help
/when {event} - predict the date of the event
/info {information} - measure the veracity of information`,
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
    info: (info, percent) => `✅ ${info} information is ${percent}% true.`,
    when: (event, date) => `📅 ${event ? event + ' ' : ''}event will occur on ${date}.`,
};
