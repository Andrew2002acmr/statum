# IMPLEMENTATION-MAP

## Stage 7 implementation note

- Lead submission path: `LeadForm -> Astro Action submitLead -> Zod validation -> honeypot -> Turnstile siteverify -> in-memory rate limit -> message formatter -> Telegram Bot API sendMessage`. `[Brief]` `[Technical recommendation]`
- `src/components/forms/LeadForm.astro` is the single reusable contact form. Stage 7 places it in the Hero form slot (`#lead-request`) and keeps other CTA links pointed to that primary form. `[Technical recommendation]`
- Server orchestration lives in `src/actions/index.ts`; validation and quiz parsing live in `src/lib/server/lead-schema.ts`; message formatting lives in `src/lib/server/lead-message.ts`; Telegram transport lives in `src/lib/server/telegram.ts`; Turnstile verification lives in `src/lib/server/turnstile.ts`; rate limiting lives in `src/lib/server/rate-limit.ts`. `[Technical recommendation]`
- Estimate quiz answers remain user-controlled hidden payloads, so the server validates question ids and option values against `src/data/estimate-quiz.ts` before adding human-readable labels to the Telegram message. `[Technical recommendation]`
- The home page is no longer prerendered because the lead form now depends on Astro Actions and server-side validation. `[Technical recommendation]`
- Automated tests use `NODE_ENV=test` and a test-only transport seam; real Telegram delivery is not exercised without local production credentials. `[Technical recommendation]`

## Stage 6 implementation note

- Section order now ends with `EstimateQuiz -> Reviews -> FinalCta -> Footer`. `[Brief]` `[Reference]`
- `src/components/sections/Reviews.astro` renders review placeholders from `src/data/reviews.ts`; placeholder cards do not use `blockquote`, author, rating, or fictional client data. `[Technical recommendation]` `[Assumption/TBD]`
- `src/components/sections/FinalCta.astro` renders the final CTA with `id="contact"` and links to `#estimate`, because request delivery and contact form integration remain TBD. `[Technical recommendation]` `[Assumption/TBD]`
- `src/components/layout/Footer.astro` uses shared navigation from `src/data/site.ts` and displays non-interactive contact/legal placeholders instead of fake phone, email, social, legal, or policy links. `[Technical recommendation]` `[Assumption/TBD]`
- Completion criteria for this stage: `#reviews`, `#contact`, and `footer` are present; all internal links target existing ids; placeholder reviews do not include fictional authors or ratings; Playwright confirms no console/page errors or horizontal overflow at the required viewports. `[Technical recommendation]`

## Stage 5 implementation note

- Section order now includes `EstimateQuiz` after `Statistics`: `Benefits -> Projects -> Statistics -> EstimateQuiz`. `[Brief]` `[Reference]`
- `src/components/sections/EstimateQuiz.astro` renders the estimate section, semantic quiz form, progress indicator, final non-submit state, and a decorative image placeholder. `[Technical recommendation]`
- `src/components/ui/QuizOption.astro` renders repeated radio options so the form keeps native labels and keyboard behavior. `[Technical recommendation]`
- `src/data/estimate-quiz.ts` stores temporary questions and options. These values are not approved business facts and remain TBD until the client confirms the estimate flow. `[Assumption/TBD]`
- `src/scripts/estimate-quiz.ts` progressively enhances the form into a five-step quiz with preserved radio answers, back/next navigation, progress updates, and hidden serialized answers for future form integration. No data is sent to the server at this stage. `[Technical recommendation]` `[Assumption/TBD]`
- Completion criteria for this stage: section `#estimate` is present, all five questions are reachable, required answers gate the next step, back navigation preserves choices, final state does not show a price, and Playwright confirms no console/page errors or horizontal overflow at the required viewports. `[Technical recommendation]`

## Назначение

Практическая карта будущей реализации лендинга. Документ фиксирует, как требования из `SPEC.md`, ограничения из `TECH-STACK.md` и выводы из `DESIGN-AUDIT.md` будут разложены на код, компоненты, данные и проверки.

Источник: `[Рекомендация]`, `[Макет]`, `[Материалы]`, `[Предположение/TBD]`.

## Порядок секций и Astro-компоненты

| Порядок | Секция                                   | Будущий компонент                                   | Статус контента                       | Источник                                      |
| ------- | ---------------------------------------- | --------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| 1       | Header / навигация                       | `src/components/layout/Header.astro`                | Навигация и контакты `TBD`            | `[Макет]` `[Предположение/TBD]`               |
| 2       | Hero с основным CTA и формой/мини-формой | `src/components/sections/Hero.astro`                | Оффер, контакты и form delivery `TBD` | `[Макет]` `[Бриф]` `[Предположение/TBD]`      |
| 3       | Полоса преимуществ                       | `src/components/sections/TrustFeatures.astro`       | Значения и формулировки `TBD`         | `[Макет]` `[Предположение/TBD]`               |
| 4       | Позиционирование / порядок в ремонте     | `src/components/sections/AboutSystemSection.astro`  | Тексты `TBD`                          | `[Макет]` `[Предположение/TBD]`               |
| 5       | Процесс работ                            | `src/components/sections/ProcessSection.astro`      | Шаги требуют подтверждения            | `[Макет]` `[Предположение/TBD]`               |
| 6       | Услуги                                   | `src/components/sections/ServicesSection.astro`     | Список услуг `TBD`                    | `[Макет]` `[Предположение/TBD]`               |
| 7       | Почему выбирают                          | `src/components/sections/BenefitsSection.astro`     | Claims требуют подтверждения          | `[Макет]` `[Предположение/TBD]`               |
| 8       | Работы / проекты                         | `src/components/sections/ProjectsSection.astro`     | Изображения и описания `TBD`          | `[Макет]` `[Материалы]` `[Предположение/TBD]` |
| 9       | Цифры / статистика                       | `src/components/sections/StatsSection.astro`        | Не выводить без подтверждения         | `[Макет]` `[Предположение/TBD]`               |
| 10      | Расчёт стоимости / CTA                   | `src/components/sections/EstimateSection.astro`     | Вопросы калькулятора `TBD`            | `[Макет]` `[Предположение/TBD]`               |
| 11      | Вторичный имиджевый CTA                  | `src/components/sections/StressFreeSection.astro`   | Тексты `TBD`                          | `[Макет]` `[Предположение/TBD]`               |
| 12      | Отзывы                                   | `src/components/sections/TestimonialsSection.astro` | Не выводить fake-отзывы               | `[Макет]` `[Предположение/TBD]`               |
| 13      | Финальный CTA                            | `src/components/sections/FinalCtaSection.astro`     | Текст и действие `TBD`                | `[Макет]` `[Предположение/TBD]`               |
| 14      | Footer                                   | `src/components/sections/SiteFooter.astro`          | Контакты, юрданные, ссылки `TBD`      | `[Макет]` `[Предположение/TBD]`               |

## Общие UI-компоненты

- `Container.astro` - ограничение ширины и горизонтальные поля страницы. `[Рекомендация]`
- `Button.astro` - единая кнопка/ссылка для CTA, вариантов primary/secondary/ghost. `[Макет]` `[Рекомендация]`
- `ImagePlaceholder.astro` - временный слот изображения с фиксированным aspect-ratio. `[Рекомендация]`
- `IconBadge.astro` - будущая обертка под Lucide-иконки в карточках и преимуществах. `[Рекомендация]`
- `SectionHeading.astro` - повторяемая структура заголовка и подзаголовка секций. `[Рекомендация]`
- `LeadForm.astro` - форма заявки с Astro Actions и Zod, без fake-success до выбора доставки. `[Бриф]` `[Рекомендация]`

## Данные для `src/data`

- `navigation.ts` - пункты меню, якоря, доступность ссылок. `[Рекомендация]`
- `services.ts` - услуги, краткие описания, иконки, placeholder-изображения. `[Макет]` `[Предположение/TBD]`
- `process.ts` - этапы ремонта. `[Макет]` `[Предположение/TBD]`
- `benefits.ts` - преимущества и proof-points. `[Макет]` `[Предположение/TBD]`
- `projects.ts` - карточки работ, изображения, alt-тексты. `[Макет]` `[Материалы]` `[Предположение/TBD]`
- `testimonials.ts` - отзывы только после подтверждения. `[Предположение/TBD]`
- `site.ts` - бренд, контакты, регион, юридические данные, соцсети. `[Предположение/TBD]`
- `assets.ts` - соответствие image id из `ASSET-MANIFEST.md` фактическим файлам. `[Рекомендация]`

Неподтверждённые значения хранить как `TBD` в документации и не показывать как реальные факты в production UI. `[Рекомендация]`

## Предполагаемая структура директорий

```text
src/
  actions/
  components/
    sections/
    ui/
  data/
  layouts/
  pages/
  scripts/
  styles/
public/
  images/
    placeholders/
tests/
  e2e/
docs/
```

## Интерактивные элементы

- Мобильное меню: обычный TypeScript в `src/scripts/mobile-menu.ts`; управление `aria-expanded`, закрытие по Escape и клику по ссылке. `[Рекомендация]`
- Модальное окно заявки: обычный TypeScript, focus trap и закрытие по Escape. `[Рекомендация]`
- Простые карусели работ/отзывов: CSS Scroll Snap плюс TypeScript только для кнопок/индикаторов. `[Рекомендация]`
- Форма заявки: Astro Actions + Zod, honeypot, будущий Turnstile, состояния loading/error; success только после реальной доставки. `[Бриф]` `[Рекомендация]`

## Границы клиентского JavaScript

- Клиентский JS не отвечает за основной контент, SEO или валидацию безопасности. `[Рекомендация]`
- JS допускается для меню, модалок, scroll-snap controls, улучшения UX формы. `[Рекомендация]`
- Без React/Preact/Vue, Redux, UI-библиотек, тяжёлых анимаций и slider-библиотек без отдельного согласования. `[Рекомендация]`

## Форма и серверная обработка

- UI формы может быть реализован до выбора канала доставки. `[Рекомендация]`
- Серверная схема: Zod. `[Рекомендация]`
- Доставка заявки: `TBD` - email, Telegram или CRM. `[Предположение/TBD]`
- До утверждения доставки форма должна показывать корректные ошибки и не должна имитировать успешную отправку в production. `[Рекомендация]`
- Node adapter настраивается заранее, потому что Astro Actions остаются предпочтительным способом обработки формы внутри приложения. `[Рекомендация]`

## Этапы реализации и критерии

| Этап | Результат                                                      | Проверка                                                              | Зависимости                |
| ---- | -------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------- |
| 0    | Технический Astro-скелет, docs map, asset manifest, QA scripts | `check`, `lint`, `format:check`, `build`, `test:e2e` проходят         | Текущая задача             |
| 1    | Design tokens, layout, базовые UI-компоненты                   | Нет горизонтального overflow на контрольных viewport                  | Этап 0                     |
| 2    | Header, hero, первый путь к форме                              | CTA доступен с клавиатуры, тексты не fake                             | Этап 1, критичный контент  |
| 3    | Контентные секции услуг/процесса/преимуществ                   | Неподтверждённые claims не выводятся как факты                        | Этапы 1-2                  |
| 4    | Проекты, изображения, отзывы                                   | Работают placeholders или подтверждённые assets, alt-тексты заполнены | Этап 3, assets             |
| 5    | Форма и Astro Action                                           | Zod errors, honeypot, no fake success                                 | Этап 2, канал заявки `TBD` |
| 6    | Responsive/browser QA и полировка                              | Скриншоты 1440x900, 1024x768, 768x1024, 390x844                       | Этапы 2-5                  |
| 7    | Docker/nginx/GitHub Actions                                    | CI воспроизводит проверки                                             | Этапы 0-6                  |

## Зависимости между решениями

- Реальные контакты, регион, юридические тексты и канал заявки нужны до production-формы и footer. `[Предположение/TBD]`
- Подтверждённые изображения нужны до финальной визуальной QA и Astro Image/Picture. `[Предположение/TBD]`
- Lucide используется для интерфейсных иконок; текущие извлечённые SVG не становятся системной библиотекой. `[Материалы]` `[Рекомендация]`
- Implementation map обновляется только при существенном изменении структуры, компонентов, ассетов или допущений. `[Рекомендация]`
