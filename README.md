# telemify

CLI tool to quickly send messages via Telegram messanger.

## Install

```bash
$ npm install -g telemify
```

## Setup

Before using tool, you need create configuration file. Use comand:

```bash
$ telemify setup --token=XXX --chat_id=XXX
```

This will create a configuration file in the folder `~/.config/telemify/config.json`.

```json
{
  "token": "TOKEN_OF_THE_BOT",
  "chat_id": "12345678"
}
```

## How to get bot token?

https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token

## How to get chat_id ?

You must send your bot any message and go to the https://api.telegram.org/bot{BOT_TOKEN}/getUpdates. After you should copy the ID from the from property `result[0].message.from.id`.

```json
{
  "ok": true,
  "result": [
    {
      "message": {
        "from": {
          "id": 111222333,
          ...
        },
        ...
      }
    }
  ]
}

```

## Usage

It's simply! Use command:

```bash
$ telemify "Hello, World!"
```

## License

MIT © [Archakov Dennis](https://github.com/Archakov06)
