import 'dotenv-flow/config';
import { TelegramBot } from './src/bot';

if (!process.env.BOT_TOKEN) {
    throw new Error('Environment variable `BOT_TOKEN` not provided');
}

const telegramBot = new TelegramBot(process.env.BOT_TOKEN);

telegramBot.launch();

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));
process.once('SIGHUP', () => telegramBot.stop('SIGHUP'));
