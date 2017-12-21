using System;
using System.Threading.Tasks;
using AnsBallBot.Database.Entities;
using Microsoft.EntityFrameworkCore;
using NLog;

namespace AnsBallBot.Database.Operations
{
    public static class ChatStateOperations
    {
        private static readonly Logger Log = LogManager.GetCurrentClassLogger();

        public static async Task<ChatState> GetOrCreateChatStateAsync(long chatId)
        {
            using (var db = new ApplicationContext())
            {
                var chatState = await db.ChatStates.FirstOrDefaultAsync(_ => _.ChatId == chatId);

                return chatState ?? await CreateChatStateAsync(chatId);
            }
        }

        public static async Task<ChatState> CreateChatStateAsync(long chatId, State state = State.Empty)
        {
            using (var db = new ApplicationContext())
            {
                var chatState = new ChatState
                {
                    ChatId = chatId,
                    State = state,
                    LastUpdate = DateTime.Now
                };

                var entity = db.ChatStates.Add(chatState).Entity;
                var count = await db.SaveChangesAsync();

                Log.Info($"ChatState успешно создан, count: {count}, id: {entity.Id}");

                return entity;
            }
        }

        public static async Task<ChatState> UpdateChatStateAsync(ChatState chatState, State newChatState)
        {
            using (var db = new ApplicationContext())
            {
                chatState.State = newChatState;
                db.ChatStates.Update(chatState);
                var count = await db.SaveChangesAsync();

                Log.Info($"ChatState успешно обновлен, count: {count}, id: {chatState.Id}, newState: {chatState.State}");

                return chatState;
            }
        }
    }
}
