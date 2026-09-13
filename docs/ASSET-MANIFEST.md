# ASSET-MANIFEST

## 2026-09-13 — визуализация Benefits

| ID                         | Section  | Production file                                                                | Ratio      | Status                                          | Source                         |
| -------------------------- | -------- | ------------------------------------------------------------------------------ | ---------- | ----------------------------------------------- | ------------------------------ |
| `benefits-project-control` | Benefits | `src/assets/images/generated/benefits/benefits-project-control.png`           | `1915:821` | integrated; user-provided interior visualization | `[Бриф]` `[Материалы]`         |

Визуализация маркируется в интерфейсе и не считается документальной фотографией выполненного объекта. `[Бриф]` `[Рекомендация]`

## 2026-09-09 — выбранные визуализации

| ID                         | Section | Production file                                                        | Ratio      | Status                              | Source                         |
| -------------------------- | ------- | ---------------------------------------------------------------------- | ---------- | ----------------------------------- | ------------------------------ |
| `hero-approved`            | Hero    | `src/assets/images/hero/hero-approved.png`                             | `1671:941` | integrated; desktop                 | `[Бриф]` `[Материалы]`         |
| `hero-approved-mobile`     | Hero    | `src/assets/images/hero/hero-approved-mobile.webp`                     | `4:3`      | integrated; mobile crop             | `[Материалы]` `[Рекомендация]` |
| `about-real-renovation`    | About   | `src/assets/images/generated/about-real-renovation.webp`               | `4:3`      | integrated; generated visualization | `[Бриф]` `[Материалы]`         |
| `process-organized`        | Process | `src/assets/images/generated/process-organized-renovation.webp`        | `21:9`     | integrated; generated visualization | `[Бриф]` `[Материалы]`         |
| `process-organized-mobile` | Process | `src/assets/images/generated/process-organized-renovation-mobile.webp` | `4:3`      | integrated; mobile crop             | `[Материалы]` `[Рекомендация]` |

`design/Hero.png` и исходная 4K-генерация процесса сохранены без изменений. Генеративные сцены маркируются в интерфейсе как интерьерные визуализации и не считаются документальными фотографиями выполненных объектов. `[Бриф]` `[Рекомендация]`

## 2026-09-08 — подготовленные реальные фотографии

Подготовлены 32 WebP из 10 исходников в `src/assets/images/prepared/`: Hero desktop/mobile, пять карточек портфолио 3:4, услуги, детали, рабочая стадия, декоративные CTA и полные версии. Подробный реестр: [design/image-manifest.md](../design/image-manifest.md). Все результаты получены обычной обработкой; генерация не применялась. Статус: **integrated through Astro image pipeline**. `[Бриф]` `[Материалы]`

Hero подключает отдельные desktop/mobile кропы с `fetchpriority="high"`; секции ниже Hero используют lazy loading и адаптивные AVIF/WebP-варианты. Старые `public/images/placeholders/*` не являются путями новых ассетов; текущий `hero-main.png` больше не является изображением первого экрана. `[Материалы]` `[Рекомендация]`

Ниже сохранён исторический реестр прежних подключённых файлов и заглушек. Старые `public/images/placeholders/*` не являются путями новых ассетов и не используются текущими секциями. `[Материалы]` `[Рекомендация]`

## Stage 5 additions

| ID                   | Section      | Purpose                                           | Proposed file                               | Ratio | Desktop/mobile notes                                                                               | Alt/decorative                                        | Status      |
| -------------------- | ------------ | ------------------------------------------------- | ------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----------- |
| estimate-quiz-visual | EstimateQuiz | Visual support for the preliminary estimate block | `public/images/estimate/estimate-quiz.webp` | 4:3   | Desktop: placed beside the quiz card. Mobile: shown after the section heading and before the quiz. | decorative until a real informative image is approved | placeholder |

## Stage 4 additions

Source: `[Макет]`, `[Предположение/TBD]`, `[Рекомендация]`.

| ID           | Section | Purpose                                      | Proposed file                                | Ratio | Desktop / mobile                                          | Alt                                   | Status      | Source                          |
| ------------ | ------- | -------------------------------------------- | -------------------------------------------- | ----- | --------------------------------------------------------- | ------------------------------------- | ----------- | ------------------------------- |
| `project-04` | Работы  | Placeholder карточки отделки санузла         | `public/images/placeholders/project-04.webp` | `4:3` | Desktop: карточка в сетке; mobile: одна карточка в строке | `TBD: пример отделки санузла`         | placeholder | `[Макет]` `[Предположение/TBD]` |
| `project-05` | Работы  | Placeholder карточки внутренней отделки дома | `public/images/placeholders/project-05.webp` | `4:3` | Desktop: карточка в сетке; mobile: одна карточка в строке | `TBD: пример внутренней отделки дома` | placeholder | `[Макет]` `[Предположение/TBD]` |

Реестр будущих изображений лендинга. Изображения не извлекаются из `design/statum-design.jpg`; на первом этапе используются заменяемые локальные заглушки с корректными пропорциями.

Источник: `[Макет]`, `[Материалы]`, `[Рекомендация]`, `[Предположение/TBD]`.

| ID                  | Секция           | Назначение                                      | Предполагаемый файл                                 | Ratio               | Desktop / mobile                                                                                                   | Alt                                 | Статус      | Источник                                |
| ------------------- | ---------------- | ----------------------------------------------- | --------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ----------- | --------------------------------------- |
| `hero-main`         | Hero             | Утверждённая интерьерная ТВ-зона первого экрана | `src/assets/images/hero/hero-main.png`              | `1672:941` (`16:9`) | Desktop: full-width медиаслой с центральной ТВ-зоной; tablet/mobile: отдельная область изображения перед контентом | decorative, `alt=""`                | available   | `[Материалы]` `[Бриф]` `[Рекомендация]` |
| `about-system`      | Позиционирование | Иллюстрация аккуратного результата ремонта      | `public/images/placeholders/about-system.webp`      | `4:3`               | Desktop: рядом с текстом; mobile: над/под текстом                                                                  | `TBD: пример выполненного ремонта`  | placeholder | `[Макет]`                               |
| `service-apartment` | Услуги           | Карточка ремонта квартир                        | `public/images/placeholders/service-apartment.webp` | `16:11`             | Единая высота карточек, object-fit cover                                                                           | `TBD: ремонт квартиры`              | placeholder | `[Макет]`                               |
| `service-house`     | Услуги           | Карточка отделки домов                          | `public/images/placeholders/service-house.webp`     | `16:11`             | Единая высота карточек, object-fit cover                                                                           | `TBD: отделка дома`                 | placeholder | `[Макет]`                               |
| `service-rough`     | Услуги           | Карточка черновых работ                         | `public/images/placeholders/service-rough.webp`     | `16:11`             | Единая высота карточек, object-fit cover                                                                           | `TBD: черновые работы`              | placeholder | `[Макет]`                               |
| `service-finish`    | Услуги           | Карточка чистовой отделки                       | `public/images/placeholders/service-finish.webp`    | `16:11`             | Единая высота карточек, object-fit cover                                                                           | `TBD: чистовая отделка`             | placeholder | `[Макет]`                               |
| `service-design`    | Услуги           | Карточка дизайн-проекта                         | `public/images/placeholders/service-design.webp`    | `16:11`             | Можно заменить схемой/рендером после подтверждения                                                                 | `TBD: дизайн-проект интерьера`      | placeholder | `[Макет]`                               |
| `service-specific`  | Услуги           | Карточка отдельных ремонтных работ              | `public/images/placeholders/service-specific.webp`  | `16:11`             | Единая высота карточек, object-fit cover                                                                           | `TBD: отдельные ремонтные работы`   | placeholder | `[Макет]` `[Предположение/TBD]`         |
| `project-01`        | Работы           | Пример проекта в галерее                        | `public/images/placeholders/project-01.webp`        | `16:10`             | Desktop: горизонтальная сетка; mobile: scroll-snap/stack                                                           | `TBD: выполненный проект ремонта`   | placeholder | `[Макет]`                               |
| `project-02`        | Работы           | Пример проекта в галерее                        | `public/images/placeholders/project-02.webp`        | `16:10`             | Desktop: горизонтальная сетка; mobile: scroll-snap/stack                                                           | `TBD: выполненный проект ремонта`   | placeholder | `[Макет]`                               |
| `project-03`        | Работы           | Пример проекта в галерее                        | `public/images/placeholders/project-03.webp`        | `16:10`             | Desktop: горизонтальная сетка; mobile: scroll-snap/stack                                                           | `TBD: выполненный проект ремонта`   | placeholder | `[Макет]`                               |
| `estimate-visual`   | Расчёт стоимости | Изображение с калькулятором/планом              | `public/images/placeholders/estimate-visual.webp`   | `4:3`               | Desktop: рядом с CTA; mobile: может скрываться, если мешает форме                                                  | `TBD: расчёт стоимости ремонта`     | placeholder | `[Макет]`                               |
| `stress-free`       | Имиджевый CTA    | Тёмный интерьерный баннер                       | `public/images/placeholders/stress-free.webp`       | `16:9`              | Desktop: фон CTA; mobile: затемнение и читаемый текст                                                              | decorative или `TBD`                | placeholder | `[Макет]`                               |
| `logo`              | Header/Footer    | Логотип бренда                                  | `public/images/logo.svg`                            | vector              | Не использовать bitmap из JPG; нужен исходник SVG                                                                  | `СТАТУМ` после подтверждения бренда | TBD         | `[Макет]` `[Предположение/TBD]`         |
| `favicon`           | Meta             | Иконка сайта                                    | `public/favicon.svg`                                | vector              | Нужен простой знак после подтверждения логотипа                                                                    | decorative                          | TBD         | `[Предположение/TBD]`                   |

## Доступные материалы

- `src/assets/images/hero/hero-main.png` - утверждённое изображение Hero, `1672x941`, PNG, 1 808 922 bytes; Astro генерирует responsive AVIF/WebP варианты. `[Материалы]` `[Бриф]` `[Рекомендация]`
- `design/statum-design.jpg` - общий JPG-референс макета, не источник production-изображений. `[Материалы]`
- `design/hero-banner.png` - интерьер 1280x575, ratio `2.226`; может быть временным визуальным ориентиром, но требует подтверждения прав и качества. `[Материалы]` `[Предположение/TBD]`
- `design/img-2.png` - интерьер 1535x1024, ratio `1.499`; может быть временным визуальным ориентиром, но требует подтверждения прав и качества. `[Материалы]` `[Предположение/TBD]`
- `design/icons/icon-1.svg` - `icon-4.svg` содержат embedded raster/base64 и не подходят как production-иконки. `[Материалы]` `[Рекомендация]`
- `design/icons/icon-5.svg` - `icon-7.svg` чистые SVG, но стиль не должен смешиваться с Lucide без отдельного решения. `[Материалы]` `[Рекомендация]`

## Правила замены

- Контент не должен зависеть от точных размеров временных изображений. `[Рекомендация]`
- Для каждого изображения указывать width/height или aspect-ratio, чтобы исключить скачки макета. `[Рекомендация]`
- После появления оригиналов подключить Astro Image/Picture и обновить manifest. `[Рекомендация]`
