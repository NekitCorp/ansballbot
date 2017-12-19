using System;
using NLog;
using Telegram.Bot;

namespace AnsBallBot.TelegramModule
{
    public class TelegramClient
    {
        private static readonly Logger Log = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Запуск телеграм бота
        /// </summary>
        public static TelegramBotClient StartBot()
        {
            var client = new TelegramBotClient(Program.Configuration["TelegramBotToken"]);
            client.OnMessage += TelegramHandler.BotOnMessageReceived;
            client.OnMessageEdited += TelegramHandler.BotOnMessageReceived;
            client.StartReceiving();

            var me = client.GetMeAsync().Result;
            Console.Title = me.Username;
            Console.ForegroundColor = ConsoleColor.Green;
            Log.Info($"Бот {me.FirstName} запущен!");

            return client;
        }

        /// <summary>
        /// Остановка телеграм бота
        /// </summary>
        public static void StopBot(TelegramBotClient client)
        {
            Log.Info("Завершение работы...");
            client.StopReceiving();
        }
    }
}
