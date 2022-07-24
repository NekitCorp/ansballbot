import 'dotenv-flow/config';
import { TelegramBot } from '../src/bot';
import { getEnv } from '../src/utils/helpers';

const token = getEnv('TG_BOT_TOKEN');
const telegramBot = new TelegramBot(token);

telegramBot.launch();

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));
process.once('SIGHUP', () => telegramBot.stop('SIGHUP'));
