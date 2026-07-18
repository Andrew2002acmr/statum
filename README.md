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
LEAD_DELIVERY_MODE=
MOCK_LEAD_RESULT=
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are server secrets. They are used
only by the Astro Action that sends the lead to Telegram Bot API `sendMessage`.

`TURNSTILE_SITE_KEY` is public and renders the Turnstile widget.
`TURNSTILE_SECRET_KEY` is server-only and is used for Siteverify before Telegram
delivery.

For local manual checks without production Telegram credentials:

```bash
LEAD_DELIVERY_MODE=mock
MOCK_LEAD_RESULT=success
```

Supported `MOCK_LEAD_RESULT` values are `success`, `error`, and `timeout`.
Mock delivery is server-only and must not be used in production. In production,
set `LEAD_DELIVERY_MODE=telegram` and provide real Telegram and Turnstile
secrets through the deployment environment.

Manual mock smoke scenarios:

1. `LEAD_DELIVERY_MODE=mock` and `MOCK_LEAD_RESULT=success`: complete the
   estimate quiz, submit the inline form, confirm the success dialog, then close
   it and verify that the form and quiz answers are cleared.
2. `LEAD_DELIVERY_MODE=mock` and `MOCK_LEAD_RESULT=error`: submit a valid form,
   confirm the error dialog, verify that name, phone, comment and quiz answers
   remain available, then use retry.
3. `LEAD_DELIVERY_MODE=mock` and `MOCK_LEAD_RESULT=timeout`: submit a valid
   form and verify that the UI returns to a retryable error state instead of
   staying in loading.

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

The Hero and Estimate forms use the same `LeadForm`, Zod schema, Astro Action
and delivery transport. After completing the estimate quiz, the user stays in
`#estimate`: selected answers are shown as a summary next to the contact form,
and the request is sent only after explicit form submission.

The form keeps user-entered data on server errors and clears fields only after a
successful server result and closing the native success dialog. Telegram API
errors are shown to the user as a neutral message without exposing tokens, chat
id, API response or stack traces.

Phone validation currently assumes the Russian format `+7 (999) 123-45-67`.
The server normalizes accepted variants such as `89991234567` and
`+7 (999) 123-45-67` to the canonical value `+79991234567` before formatting
the Telegram message.

## Форматирование

```bash
npm run format
```

## Ограничения этапа 0

- Не реализованы секции лендинга.
- Не подключён реальный обработчик заявки.
- Канал доставки заявки: `TBD`.
- Изображения production-качества и тексты клиента должны быть подтверждены отдельно.
