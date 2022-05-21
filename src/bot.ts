import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { delay, random, randomItem } from './helpers';
import { getMessages } from './messages';
import { LanguageCode, Messages } from './typings';

export interface MyContext extends Context {
    messages: Messages;
}

export class TelegramBot {
    private readonly bot: Telegraf<MyContext>;

    constructor(token: string) {
        this.bot = new Telegraf<MyContext>(token);
        this.registerMiddlewares();
        this.registerHandlers();
    }

    public launch() {
        this.bot.launch().then(() => console.log(`Telegram bot ${this.bot.botInfo?.first_name} is running.`));
    }

    public stop(reason?: string) {
        console.log(`Telegram bot ${this.bot.botInfo?.first_name} stops...`);
        this.bot.stop(reason);
        console.log(`Telegram bot ${this.bot.botInfo?.first_name} stopped.`);
    }

    public update(update: Update) {
        return this.bot.handleUpdate(update);
    }

    private registerMiddlewares() {
        this.bot.use(async (ctx, next) => {
            console.log('[TELEGRAM_UPDATE]', JSON.stringify(ctx.update));
            await next();
        });
        this.bot.use(async (ctx, next) => {
            const languageCode = ctx.message?.from.language_code as LanguageCode;
            ctx.messages = getMessages(languageCode);
            return next();
        });
    }

    private registerHandlers() {
        this.bot.start((ctx) =>
            ctx.reply(ctx.messages.start(ctx.message.from.first_name || ctx.message.from.username)),
        );
        this.bot.help((ctx) => ctx.reply(ctx.messages.help));
        this.bot.command('info', (ctx) => ctx.reply(ctx.messages.info(random(0, 100))));
        this.bot.command('when', (ctx) => ctx.reply('TODO'));
        this.bot.on('text', async (ctx) => {
            await ctx.replyWithChatAction('typing');
            await delay(1500);
            return ctx.reply(
                randomItem([
                    ...ctx.messages.answers.positive,
                    ...ctx.messages.answers.hesitantlyPositive,
                    ...ctx.messages.answers.nonCommittal,
                    ...ctx.messages.answers.negative,
                ]),
            );
        });
        this.bot.on('sticker', (ctx) =>
            ctx.replyWithSticker('CAACAgIAAxkBAAPhYneTKx_dcDOYQbazLwhEKAsV8LgAAvsUAAKEPslLcnZGpyqRn64kBA'),
        );
    }
}

if (!process.env.BOT_TOKEN) {
    throw new Error('Environment variable `BOT_TOKEN` not provided');
}

export const telegramBot = new TelegramBot(process.env.BOT_TOKEN);
