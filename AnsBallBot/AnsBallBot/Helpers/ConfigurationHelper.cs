using System.IO;
using Microsoft.Extensions.Configuration;

namespace AnsBallBot.Helpers
{
    public static class ConfigurationHelper
    {
        /// <summary>
        /// Получение настроек из appsettings.json
        /// </summary>
        public static IConfigurationRoot Config()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            return builder.Build();
        }
    }
}
