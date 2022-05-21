require('dotenv-flow').config();

import { telegramBot } from './src/bot';

telegramBot.launch();

// Enable graceful stop
process.once('SIGINT', () => telegramBot.stop('SIGINT'));
process.once('SIGTERM', () => telegramBot.stop('SIGTERM'));
process.once('SIGHUP', () => telegramBot.stop('SIGHUP'));
