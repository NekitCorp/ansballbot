import { TelegramBot } from './src/bot';
import { ICloudEvent, ICloudResponse, ICloudServiceData } from './src/typings';
import { getEnv } from './src/utils/helpers';

const token = getEnv('TG_BOT_TOKEN');
const telegramBot = new TelegramBot(token);

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
