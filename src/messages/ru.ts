import { Messages } from '../typings';

export const ruMessages: Messages = {
    start: (username = 'Незнакомец') => `👋 Привет, ${username}.`,
    help: `📙 Я шарик, который отвечает на вопросы. Задай мне любой вопрос и я дам тебе ответ на него. Также я могу измерить правдивость информации и предсказать дату события.
    
Список доступных команд:
/help - помощь
/when {событие} - предсказать дату события
/info {информация} - измерить правдивость информации`,
    answers: {
        positive: ['Бесспорно', 'Предрешено', 'Никаких сомнений', 'Определённо да', 'Можешь быть уверен в этом'],
        hesitantlyPositive: [
            'Мне кажется — «да»',
            'Вероятнее всего',
            'Хорошие перспективы',
            'Знаки говорят — «да»',
            'Да',
        ],
        nonCommittal: [
            'Пока не ясно, попробуй снова',
            'Спроси позже',
            'Лучше не рассказывать',
            'Сейчас нельзя предсказать',
            'Сконцентрируйся и спроси опять',
        ],
        negative: [
            'Даже не думай',
            'Мой ответ — «нет»',
            'По моим данным — «нет»',
            'Перспективы не очень хорошие',
            'Весьма сомнительно',
        ],
    },
    info: (info, percent) => `✅ Информация ${info} правдива на ${percent}%.`,
    when: (event, date) => `📅 Событие ${event ? event + ' ' : ''}произойдет ${date}.`,
};
