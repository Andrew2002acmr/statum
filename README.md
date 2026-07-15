# Statum

Техническая основа коммерческого лендинга для специалистов по ремонту. На текущем этапе реализован только Astro-скелет проекта; секции лендинга и production-контент не сверстаны.

## Требования

- Node.js 22.x или совместимая LTS-версия.
- npm 10.x.

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Локальный адрес по умолчанию: `http://localhost:4321`.

## Проверки

```bash
npm run check
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

## Environment variables

Create a local `.env` file when testing real integrations. Do not commit `.env`
or production secrets.

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are server secrets. They are used
only by the Astro Action that sends the lead to Telegram Bot API `sendMessage`.

`TURNSTILE_SITE_KEY` is public and renders the Turnstile widget.
`TURNSTILE_SECRET_KEY` is server-only and is used for Siteverify before Telegram
delivery.

## Telegram setup

1. Create a Telegram bot through BotFather.
2. Add the bot to the private chat or group that should receive leads.
3. Put the bot token into `TELEGRAM_BOT_TOKEN`.
4. Put the target chat or group id into `TELEGRAM_CHAT_ID`.
5. Run the app locally and submit one test lead.
6. Confirm that the message arrives in the target chat.

The app does not use Telegram updates, webhook, long polling, bot commands or a
Mini App.

## Turnstile setup

1. Create a Cloudflare Turnstile site for the production domain.
2. Put the site key into `TURNSTILE_SITE_KEY`.
3. Put the secret key into `TURNSTILE_SECRET_KEY`.
4. Submit a test lead and confirm that invalid Turnstile tokens are rejected.

Automated Playwright tests use a `NODE_ENV=test` seam and do not require
production Telegram or Turnstile credentials.

## Lead delivery

Lead flow:

```text
LeadForm -> Astro Action submitLead -> Zod validation -> honeypot ->
Turnstile Siteverify -> rate limit -> Telegram message -> sendMessage
```

The form keeps user-entered data on server errors and clears fields only after a
successful server result. Telegram API errors are shown to the user as a neutral
message without exposing tokens, chat id, API response or stack traces.

## Форматирование

```bash
npm run format
```

## Ограничения этапа 0

- Не реализованы секции лендинга.
- Не подключён реальный обработчик заявки.
- Канал доставки заявки: `TBD`.
- Изображения production-качества и тексты клиента должны быть подтверждены отдельно.
