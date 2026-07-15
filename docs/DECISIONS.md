# DECISIONS

## 2026-07-15 - Estimate quiz without price calculation

- Decision: Stage 5 adds a five-step estimate quiz as progressive enhancement with vanilla TypeScript. It collects temporary parameters but does not calculate price, request contacts, call Astro Actions, or send data to a server. `[Technical recommendation]` `[Assumption/TBD]`
- Reason: pricing formula, lead delivery channel, contact fields, and legal consent text are still TBD, so showing a fake cost or success state would mislead users. `[Technical recommendation]` `[Assumption/TBD]`
- Implementation: content lives in `src/data/estimate-quiz.ts`, UI in `src/components/sections/EstimateQuiz.astro`, repeated radio option markup in `src/components/ui/QuizOption.astro`, and client behavior in `src/scripts/estimate-quiz.ts`. `[Technical recommendation]`
- Follow-up: integrate collected answers with the real contact form after the client confirms delivery channel, validation requirements, consent copy, and price-estimation rules. `[Assumption/TBD]`

## 2026-07-14 - Выбор Astro как основы лендинга

Статус: принято.

Решение:

- Использовать Astro как основу проекта. `[Рекомендация]`
- Использовать TypeScript в strict-режиме. `[Рекомендация]`
- Секции страницы реализовывать через Astro Components. `[Рекомендация]`
- Простую клиентскую интерактивность реализовывать обычным TypeScript без отдельного frontend-фреймворка. `[Рекомендация]`

Причины:

- Лендингу важны быстрая загрузка, SEO, простая структура и минимальный клиентский JavaScript. `[Рекомендация]`
- Astro хорошо подходит для статических и контентных страниц с островками интерактивности. `[Рекомендация]`
- Для текущих задач достаточно мобильного меню, модальных окон, формы и простых UI-сценариев; React/Preact/Vue избыточны без отдельной функциональной причины. `[Рекомендация]`
- Astro Actions позволяют оставить обработку формы внутри Astro-приложения, если будет выбран такой путь доставки заявки. `[Предположение/TBD]`

Следствия:

- Технические ограничения зафиксированы в [TECH-STACK.md](TECH-STACK.md). `[Рекомендация]`
- Next.js, отдельное React-приложение, Express, NestJS, базы данных и готовые UI-библиотеки не добавлять без отдельного согласования. `[Рекомендация]`
- Если форма будет обрабатываться внутри Astro-приложения, потребуется Astro Node adapter. `[Предположение/TBD]`

## 2026-07-14 - Техническая инициализация этапа 0

Статус: принято.

Решение:

- Использовать `npm` как package manager проекта. `[Рекомендация]`
- Инициализировать Astro-проект непосредственно в корне репозитория без вложенной папки приложения. `[Бриф]`
- Настроить `output: "server"` и официальный `@astrojs/node` adapter в standalone-режиме. `[Рекомендация]`
- Для контентной главной страницы использовать `export const prerender = true`, чтобы оставить её предварительно сгенерированной до появления серверной формы. `[Рекомендация]`
- Подключить Tailwind CSS через `@tailwindcss/vite`, так как актуальный `@astrojs/tailwind` несовместим с установленным Astro 7. `[Материалы]` `[Рекомендация]`
- Создать базовую структуру `src/layouts`, `src/pages`, `src/styles`, `src/components/ui`, `src/data`, `public/images/placeholders`, `tests/e2e`. `[Рекомендация]`

Причины:

- `npm` соответствует задаче этапа 0 и создаёт воспроизводимый `package-lock.json`. `[Бриф]`
- Node adapter нужен заранее, если форма заявки будет обрабатываться через Astro Actions внутри приложения. `[Рекомендация]` `[Предположение/TBD]`
- Пререндер главной страницы уменьшает серверную нагрузку для статического контента и не мешает будущим серверным действиям формы. `[Рекомендация]`
- Подключение Tailwind через Vite сохраняет утверждённый стек без установки несовместимого integration-пакета. `[Рекомендация]`

Следствия:

- Реальная доставка заявки остаётся `TBD`; до её выбора нельзя имитировать успешную отправку в production. `[Предположение/TBD]` `[Рекомендация]`
- Секции лендинга не реализуются на этапе 0; текущая страница является техническим smoke-screen. `[Бриф]`

## 2026-07-15 - Header без sticky-поведения на этапе 1

Статус: принято.

Решение:

- Реализовать шапку как обычный верхний `header`, без sticky/fixed поведения. `[Рекомендация]`
- Мобильное меню реализовать на обычном TypeScript без frontend-фреймворка. `[Рекомендация]`

Причины:

- Sticky-поведение не подтверждено в исходных требованиях и не является необходимым для первого визуального этапа. `[Предположение/TBD]`
- Обычный header проще проверить на отсутствие перекрытий и горизонтального overflow на контрольных viewport. `[Рекомендация]`

Следствия:

- При необходимости sticky можно добавить отдельным решением после проверки полного лендинга и CTA-пути. `[Предположение/TBD]`
