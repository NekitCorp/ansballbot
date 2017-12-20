using System.Threading.Tasks;
using AnsBallBot.Database.Entities;
using AnsBallBot.Database.Operations;
using NLog;
using Telegram.Bot;
using Telegram.Bot.Args;
using Telegram.Bot.Types.Enums;

namespace AnsBallBot.TelegramModule
{
    public static class TelegramHandler
    {
        private static readonly Logger Log = LogManager.GetCurrentClassLogger();
        private static readonly TelegramBotClient Bot = Program.Client;

        public static async void BotOnMessageReceived(object sender, MessageEventArgs messageEventArgs)
        {
            var message = messageEventArgs.Message;
            var chatState = await ChatStateOperations.GetOrCreateChatStateAsync(message.Chat.Id);

            if (message == null || message.Type != MessageType.TextMessage) return;

            switch (chatState.State)
            {
                case State.Empty:
                    break;
                case State.InfaState:
                    break;
                case State.WhenState:
                    break;
                default:
                    Log.Error($"Unknown chat state. ChatId: {message.Chat.Id}.");
                    break;
            }

            Log.Info($"{message.From.Id}({message.From.FirstName} chat:{message.Chat.Id}): {message.Text} ({message.Date})");
        }

        private static Task EmptyStateMessageHandler(string message, ChatState chatState)
        {
            switch (message)
            {
                case var m when m.StartsWith("/Infa"):
                    break;
            }
        }
    }
}
