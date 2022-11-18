import dayjs from 'dayjs';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { getMessages } from './messages';
import { LanguageCode, Messages } from './typings';
import { delay, random, randomDate, randomItem } from './utils/helpers';

// Loading dayjs locales
import 'dayjs/locale/en';
import 'dayjs/locale/ru';

export interface MyContext extends Context {
    messages: Messages;
    code: LanguageCode;
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
            console.log(JSON.stringify({ message: 'Telegram update', level: 'INFO', data: ctx.update }));
            await next();
        });
        this.bot.use(async (ctx, next) => {
            const languageCode = ctx.message?.from.language_code as LanguageCode;
            ctx.code = languageCode;
            ctx.messages = getMessages(languageCode);
            return next();
        });
    }

    private registerHandlers() {
        this.bot.start((ctx) =>
            ctx.reply(ctx.messages.start(ctx.message.from.first_name || ctx.message.from.username)),
        );
        this.bot.help((ctx) => ctx.reply(ctx.messages.help));
        this.bot.command('info', (ctx) =>
            ctx.reply(ctx.messages.info(ctx.message.text.replace('/info', '').trim(), random(0, 100))),
        );
        this.bot.command('when', (ctx) =>
            ctx.reply(
                ctx.messages.when(
                    ctx.message.text.replace('/when', '').trim(),
                    dayjs(randomDate(dayjs().toDate(), dayjs().add(10, 'years').toDate()))
                        .locale(ctx.code)
                        .format('DD MMMM YYYY'),
                ),
            ),
        );
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
