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
                    await EmptyStateMessageHandlerAsync(message.Text, chatState);
                    break;
                case State.InfaState:
                    await ChatStateOperations.UpdateChatStateAsync(chatState, State.Empty);
                    await Bot.SendInfametr(chatState.ChatId);
                    break;
                case State.WhenState:
                    await ChatStateOperations.UpdateChatStateAsync(chatState, State.Empty);
                    await Bot.SendDatametr(chatState.ChatId);
                    break;
                default:
                    Log.Error($"Unknown chat state. ChatId: {message.Chat.Id}.");
                    break;
            }

            Log.Info($"{message.From.Id}({message.From.FirstName} chat:{message.Chat.Id}): {message.Text} ({message.Date})");
        }

        private static async Task EmptyStateMessageHandlerAsync(string message, ChatState chatState)
        {
            switch (message)
            {
                case var m when m.ToLower().StartsWith("/infa"):
                    await ChatStateOperations.UpdateChatStateAsync(chatState, State.InfaState);
                    await Bot.SendTextMessageAsync(chatState.ChatId, "Какую инфу ты хочешь измерить?");
                    break;
                case var m when m.ToLower().StartsWith("/when"):
                    await ChatStateOperations.UpdateChatStateAsync(chatState, State.WhenState);
                    await Bot.SendTextMessageAsync(chatState.ChatId, "Когда ...?");
                    break;
                case var m1 when m1.ToLower().StartsWith("/start"):
                case var m2 when m2.ToLower().StartsWith("/help"):
                    await Bot.SendTextMessageAsync(chatState.ChatId, "Какой вопрос тебя интересует?\n/Infa - инфаметр\n/When - датаметр");
                    break;
                default:
                    await Bot.SendRandomAnswer(chatState.ChatId);
                    break;
            }
        }
    }
}
