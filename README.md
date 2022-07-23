# 🎱 Magic 8 Ball Telegram Bot

https://t.me/ansballbot

## 👨‍💻 Development

```sh
# Install dependencies
npm i

# Copy and fill the file with environment variables
cp .env .env.local

# Start telegram bot
npm start
```

## 🤫 Environment variables

| Variable         | Description                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TG_BOT_TOKEN`   | Token you got from `BotFather` when you created your Bot.                                                                                                                              |
| `YC_OAUTH_TOKEN` | Get an OAuth token from Yandex.OAuth. To do this, go to the [link](https://oauth.yandex.com/authorize?response_type=token&client_id=1a6990aa636648e9b2ef855fa7bec2fb) and click Allow. |
| `YC_CLOUD_ID`    | Yandex Cloud ID.                                                                                                                                                                       |

## ☁️ Initialization Yandex Cloud

```sh
npm run init-yandex-cloud
```

## 📖 Initialization GitHub

Add environment variables from section "🤫 Environment variables" to `GitHub` -> `Project settings` -> `Secrets` -> `Actions`.

## 📱 Initialization Telegram

1. Create a bot using [BotFather](https://t.me/BotFather)
2. Call the `setWebHook` method in the Bot API via the following url `https://api.telegram.org/bot{my_bot_token}/setWebhook?url={url_to_send_updates_to}` where:
    - `my_bot_token` is the token you got from `BotFather` when you created your Bot
    - `url_to_send_updates_to` function `ans-ball-bot-function` invoke url
