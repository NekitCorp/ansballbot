import { TelegramBot } from './src/bot';
import { ICloudEvent, ICloudResponse, ICloudServiceData } from './src/typings';

if (!process.env.BOT_TOKEN) {
    throw new Error('Environment variable `BOT_TOKEN` not provided');
}

const telegramBot = new TelegramBot(process.env.BOT_TOKEN);

/**
 * Handler for Yandex Cloud Function
 */
module.exports.handler = async function (event: ICloudEvent, context: ICloudServiceData): Promise<ICloudResponse> {
    const message = event.body && JSON.parse(event.body);

    await telegramBot.update(message);

    return {
        statusCode: 200,
        body: '',
    };
};
