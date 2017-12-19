using NLog;
using Telegram.Bot;
using Telegram.Bot.Args;

namespace AnsBallBot.TelegramModule
{
    public static class TelegramHandler
    {
        private static readonly Logger Log = LogManager.GetCurrentClassLogger();
        private static readonly TelegramBotClient Bot = Program.Client;

        public static async void BotOnMessageReceived(object sender, MessageEventArgs messageEventArgs)
        {
            
        }
    }
}
