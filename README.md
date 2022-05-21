# Magic 8 Ball Telegram Bot

https://t.me/ansballbot

## Development

```sh
# Install dependencies
yarn

# Copy and fill the file with environment variables
cp .env .env.local

# Start telegram bot
yarn start
```

## Initialization Yandex Cloud

1. Create folder in [Yandex Cloud console](https://console.cloud.yandex.ru/cloud)
    - Name: `ans-ball-bot`
2. Create service account
    - Name: `ans-ball-bot-sa`
    - Role: `editor`
3. Create `Cloud Function`
    - Name: `ans-ball-bot-function`
4. Make function `ans-ball-bot-function` public

## Initialization GitHub

Добавить `Actions secrets`:

| Secret               | Description                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BOT_TOKEN`          | Token you got from `BotFather` when you created your Bot.                                                                                                                              |
| `CLOUD_FUNCTION_ID`  | `price-checker-bot-function` function ID.                                                                                                                                              |
| `OAUTH_TOKEN`        | Get an OAuth token from Yandex.OAuth. To do this, go to the [link](https://oauth.yandex.com/authorize?response_type=token&client_id=1a6990aa636648e9b2ef855fa7bec2fb) and click Allow. |
| `SERVICE_ACCOUNT_ID` | `price-checker-bot-sa` service account ID.                                                                                                                                             |

### Initialization Telegram

1. Create a bot using [BotFather](https://t.me/BotFather)
2. Call the `setWebHook` method in the Bot API via the following url `https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}` where:
    - `my_bot_token` is the token you got from `BotFather` when you created your Bot
    - `url_to_send_updates_to` function `price-checker-bot-function` call link
