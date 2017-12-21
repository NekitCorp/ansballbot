using System;
using System.Threading.Tasks;
using AnsBallBot.Database;
using Telegram.Bot;

namespace AnsBallBot.TelegramModule
{
    public static class TelegramOperations
    {
        public static async Task SendRandomAnswer(this TelegramBotClient client, long chatId)
        {
            var random = new Random();
            var index = random.Next(StaticData.Answers.Count);

            await client.SendTextMessageAsync(chatId, StaticData.Answers[index]);
        }

        public static async Task SendInfametr(this TelegramBotClient client, long chatId)
        {
            var random = new Random();
            var result = random.Next(0, 101);

            if (result == 101)
                await client.SendTextMessageAsync(chatId, "Инфа - 146%");
            else
                await client.SendTextMessageAsync(chatId, "Инфа - " + result + "%");
        }

        public static async Task SendDatametr(this TelegramBotClient client, long chatId)
        {
            var random = new Random();
            var date = DateTime.Now;
            var result = random.Next(0, 3600);
            date = date.AddDays(result);

            await client.SendTextMessageAsync(chatId, date.ToString("D"));
        }
    }
}
