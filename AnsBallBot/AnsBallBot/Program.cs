using System;
using AnsBallBot.Helpers;
using AnsBallBot.TelegramModule;
using Microsoft.Extensions.Configuration;
using Telegram.Bot;

namespace AnsBallBot
{
    class Program
    {
        public static IConfigurationRoot Configuration;
        public static TelegramBotClient Client;

        static void Main()
        {
            Configuration = ConfigurationHelper.Config();
            Client = TelegramClient.StartBot();

            Console.ReadLine();

            TelegramClient.StopBot(Client);
        }
    }
}