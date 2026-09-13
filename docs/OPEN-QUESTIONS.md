# OPEN-QUESTIONS

## 2026-09-13 — production-настройки после запуска VPS

- Для рабочей отправки заявок нужны `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TURNSTILE_SITE_KEY` и `TURNSTILE_SECRET_KEY`; сейчас они не настроены, поэтому форма не считается введённой в production. `[Материалы]` `[Предположение/TBD]`
- `npm audit --omit=dev` обнаружил критические исправления Astro, доступные в `7.3.2`, а также уязвимости транзитивных зависимостей. Обновление версии требует отдельной проверки совместимости и повторного деплоя. `[Материалы]` `[Рекомендация]`
- Технический домен `lasetirihe.beget.app` используется для первого запуска. Финальный домен и его DNS-записи остаются `TBD`. `[Материалы]` `[Предположение/TBD]`

## 2026-09-13 — визуальное решение Benefits

- Визуальное направление блока «Почему выбирают нас» закрыто: пользователь предоставил и поручил интегрировать панорамную интерьерную визуализацию с проектной схемой. `[Бриф]`
- Если позднее появится право использовать документальные кадры конкретного объекта, потребуется отдельное подтверждение их происхождения и согласие на замену текущей маркированной визуализации. `[Предположение/TBD]` `[Рекомендация]`

## 2026-09-09 — изображение блока процесса утверждено

- Вопрос о визуальном направлении блока «Пять понятных шагов» закрыт: пользователь выбрал концепцию аккуратно организованного объекта и поручил интеграцию. `[Бриф]`
- Вопрос о вертикальной плотности блока закрыт следующей обратной связью: избыточное пространство сверху и снизу убрано, сохранена только короткая межсекционная пауза. `[Бриф]` `[Рекомендация]`
- Подтверждение связи визуализации с реальным объектом не требуется, поскольку она явно маркируется и не используется в документальном портфолио. `[Рекомендация]`
- Точные формулировки этапов и договорные условия процесса по-прежнему требуют бизнес-подтверждения; текущий текст не содержит сроков, цен или гарантий. `[Предположение/TBD]`

## 2026-09-09 — визуальные решения закрыты

- Выбор Hero закрыт: пользователь указал `design/Hero.png` и поручил подключить его на первом экране. `[Бриф]`
- Выбор изображения для блока «Ремонт как понятная система» закрыт: подключена утверждённая кухня-гостиная. `[Бриф]`
- Оба кадра остаются рекламными интерьерными визуализациями, а не доказательством конкретных выполненных работ; их маркировка в интерфейсе обязательна. `[Рекомендация]`

## 2026-09-08 — пересмотр концепции, premium pilot

Предпочтение пользователя определено: первая версия A «Графит и дуб» — hero-a-graphite-living-v1.png. Расположение текста и мобильное кадрирование предстоит решить в следующей задаче. Документальная ретушь санузла не прошла контроль сохранности объекта и не считается готовой. Маркировка будущих Hero как интерьерных визуализаций обязательна. [Бриф] [Материалы] [Предположение/TBD]

Результаты, происхождение и проверка: [premium-pilot/README.md](../design/premium-pilot/README.md).

## 2026-09-08 — после интеграции изображений

- Интеграция подготовленных файлов завершена. Открытыми остаются только связь кадров с объектами, точные подписи и объём работ: текущие карточки сознательно не называют их отдельными проектами. `[Материалы]` `[Предположение/TBD]`
- Для полного визуального покрытия нужны реальные съёмки команды, замера, черновой стадии и приёмки. Пока эти смысловые блоки не следует усиливать генеративными изображениями. `[Материалы]` `[Рекомендация]`

## 2026-09-08 — после подготовки фотографий

- Вопрос о подготовке выбранного реального Hero и основного портфолио закрыт следующей командой пользователя: выполнена обычная обработка, [результаты и манифест](../design/image-manifest.md) готовы. Интеграция в код ещё не поручена. `[Бриф]` `[Материалы]`
- Остаются связь кадров с объектами, точные подписи и объём работ; пять карточек не объявлять пятью самостоятельными объектами. Нужна настоящая съёмка команды, замера, черновых работ и приёмки. `[Предположение/TBD]`
- Использовать ли нишу со следами на дне как дополнительный документальный кадр либо сначала переснять её после уборки? Следы не ретушировались. Это вопрос для следующего этапа, не блокировка выполненной подготовки. `[Рекомендация]`

## 2026-09-08 — вопросы после аудита изображений

Полная карта и рекомендации: [design/image-audit.md](../design/image-audit.md). Это список для следующего этапа, не запрос немедленного ответа. `[Рекомендация]`

1. Какие серии фотографий относятся к одним и тем же объектам и какие работы на них выполнены Statum? Подписи, даты сдачи, площадь и объём работ — `TBD`; число файлов не равно числу проектов. `[Предположение/TBD]`
2. Принять ли предложенный реальный Hero `design/img/IMG_20220801_164013.jpg` и пять основных кадров портфолио из отчёта? Сейчас это рекомендация без замены в коде. `[Рекомендация]` `[Предположение/TBD]`
3. Как получен текущий `hero-main.png`, отличающийся обстановкой от реального исходника? Каково происхождение `hero-banner.png` и `img-2.png`? Их роль как фотографий работ не подтверждена; допускается только отдельно обозначенная декоративная подача. `[Материалы]` `[Предположение/TBD]`
4. Можно ли переснять завершённую комнату, санузлы без рабочих предметов/отражения фотографа, реального мастера, замер, черновой этап и приёмку? Эти сюжеты перечислены в плане съёмки. `[Рекомендация]` `[Предположение/TBD]`
5. Подтверждены ли отделка домов, коммерческие помещения, бесплатный выезд, работа по договору и гарантия 2 года из текущего интерфейса? В этом аудите новые факты не утверждались. Текущий бриф подтверждает компанию Statum и ремонт/отделку квартир. `[Бриф]` `[Материалы]` `[Предположение/TBD]`
6. До получения фактов и отзывов сократить ли публичные Statistics/Reviews и повторяющиеся блоки доверия? Рекомендация — заменить пустые доказательства реальными работами. `[Рекомендация]` `[Предположение/TBD]`

Телефон в Header и выбор Telegram уже зафиксированы более поздними записями `DECISIONS.md`; исторические вопросы ниже не отменяют эти решения. Реальные фото теперь предоставлены, вопрос об их полном отсутствии закрыт текущим брифом. `[Материалы]` `[Бриф]`

## Stage 7 - Telegram delivery and personal data blockers

### Critical before production launch

1. Has the production Telegram bot been created and who owns it? Current value: `TBD`. `[Assumption/TBD]`
2. Should leads be delivered to a private chat or a group? Current value: `TBD`. `[Assumption/TBD]`
3. What is the production `TELEGRAM_CHAT_ID`? Current value: `TBD`; it must be stored only as a server secret. `[Assumption/TBD]`
4. Who receives and processes Telegram leads? Current value: `TBD`. `[Assumption/TBD]`
5. What exact consent text should be displayed near the form? Current value: `TBD`. `[Assumption/TBD]`
6. Where is the approved privacy policy page or document? Current value: `TBD`; production launch is blocked until it exists. `[Assumption/TBD]`
7. Which production domain should be registered in Cloudflare Turnstile? Current value: `TBD`. `[Assumption/TBD]`
8. What are the production `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TURNSTILE_SITE_KEY`, and `TURNSTILE_SECRET_KEY` values? Current value: `TBD`; values must never be committed. `[Assumption/TBD]`
9. Is the Russian phone format `+7 (999) 123-45-67` correct for the production audience and region? Current value: `TBD`; it is used as the current implementation assumption. `[Assumption/TBD]`
10. Should the completed estimate quiz form remain the primary post-quiz contact scenario, or should another contact pattern be approved later? Current value: `TBD`. `[Assumption/TBD]`

### Can be clarified later

1. Should nginx `limit_req` be added in deployment in addition to the in-memory Node limiter? Current value: `TBD`. `[Technical recommendation]`
2. Should lead messages include extra metadata such as campaign source after analytics is approved? Current value: `TBD`. `[Assumption/TBD]`

## Stage 6 - reviews, final CTA, and footer blockers

### Critical before production launch

1. Are there real client testimonials approved for publication? Current value: `TBD`; Stage 6 shows placeholders only. `[Assumption/TBD]`
2. Which client names, project labels, ratings, or review metadata may be displayed? Current value: `TBD`. `[Assumption/TBD]`
3. Which phone, email, messengers, region, and working hours should appear in the header/footer? Current value: `TBD`. `[Assumption/TBD]`
4. What legal entity, requisites, privacy policy, and personal data consent text should be used? Current value: `TBD`. `[Assumption/TBD]`
5. Which request delivery channel should be connected: email, Telegram, CRM, webhook, or another system? Current value: `TBD`. `[Assumption/TBD]`
6. Is there an approved SVG logo and production imagery for footer/header and bottom sections? Current value: `TBD`. `[Assumption/TBD]`

### Can be clarified later

1. Should reviews remain a static grid or become a CSS Scroll Snap carousel after real testimonials appear? Current value: `TBD`. `[Technical recommendation]` `[Assumption/TBD]`
2. Should the final CTA point to the quiz, a future contact form, or a modal after form integration is complete? Current value: `TBD`; Stage 6 links to `#estimate`. `[Technical recommendation]` `[Assumption/TBD]`

## Stage 5 - estimate quiz questions

### Critical before connecting the quiz to lead submission

1. What exact estimate formula or decision rules should be used? Current value: `TBD`. `[Assumption/TBD]`
2. Which quiz questions and answer options are approved by the client? Current value: `TBD`; current implementation uses temporary neutral questions. `[Assumption/TBD]`
3. How should quiz answers be attached to the final request: email, Telegram, CRM, webhook, or another channel? Current value: `TBD`. `[Assumption/TBD]`
4. Which contact fields and consent text must appear before sending quiz answers? Current value: `TBD`. `[Assumption/TBD]`
5. Should the user see an estimated range, a callback promise, or only a request confirmation after real integration? Current value: `TBD`. `[Assumption/TBD]`

### Can be clarified later

1. Should the quiz be shortened, reordered, or split into visual steps with images after real content appears? Current value: `TBD`. `[Assumption/TBD]`
2. Should quiz answers persist between page visits? Current value: `TBD`; Stage 5 intentionally does not use `localStorage`. `[Technical recommendation]` `[Assumption/TBD]`

## Легенда источников

- `[Макет]` - непосредственно видно в `design/statum-design.jpg`.
- `[Материалы]` - найдено среди существующих файлов проекта.
- `[Рекомендация]` - техническая, UX или дизайн-рекомендация.
- `[Предположение/TBD]` - предположение, требуется согласование с клиентом.
- `[Бриф]` - указано в исходной задаче.

## Критично до начала разработки

1. Какое финальное название бренда? Текущее значение: `TBD`. В макете указано "СТАТУМ". `[Макет]` `[Предположение/TBD]`
2. Кто именно оказывает услугу: частный мастер, бригада, команда или компания? Текущее значение: `TBD`. `[Бриф]` `[Макет]` `[Предположение/TBD]`
3. Какое позиционирование выбрать: частный специалист, ремонтная бригада, сервис ремонта под ключ или другое? Текущее значение: `TBD`. `[Предположение/TBD]`
4. Какой регион обслуживания показывать на лендинге? Текущее значение: `TBD`. `[Предположение/TBD]`
5. Какие телефон, email, мессенджеры и часы работы использовать? Текущее значение: `TBD`. `[Предположение/TBD]`
6. Нужно ли показывать адрес в футере? Текущее значение: `TBD`. `[Предположение/TBD]`
7. Куда отправлять заявки: email, CRM, Telegram, webhook или другая система? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
8. Какие поля должны быть в форме, кроме имени и телефона? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
9. Реально ли обещание "свяжемся в течение 15 минут"? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
10. Какой текст согласия на обработку персональных данных и политики конфиденциальности использовать? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
11. Какие услуги точно показывать? Текущее значение: `TBD`. Макет показывает ремонт квартир, отделку домов, черновые работы, чистовую отделку, дизайн-проект. `[Макет]` `[Предположение/TBD]`
12. Какие promises подтверждены: гарантия, сроки, контроль качества, прозрачная смета, отсутствие скрытых работ? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
13. Реальны ли цифры "10+ лет", "500+ проектов", "100%", "5 лет"? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
14. Есть ли реальные фото работ и описания проектов? Текущее значение: `TBD`. `[Материалы]` `[Предположение/TBD]`
15. Можно ли использовать `hero-banner.png` и `img-2.png` в production или это только референсы? Текущее значение: `TBD`. `[Материалы]` `[Предположение/TBD]`
16. Есть ли реальные отзывы клиентов с разрешением на публикацию имен, городов и текстов? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
17. Нужно ли показывать цены или диапазоны цен? Текущее значение: `TBD`. `[Предположение/TBD]`
18. Какой основной CTA утвердить: "Получить расчет", "Рассчитать стоимость", "Обсудить проект" или другой? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
19. Какой домен и хостинг планируются? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
20. Есть ли логотип в чистом векторном формате? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`

## Можно уточнить позже

1. Финальный порядок секций после редакторской сборки. Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
2. Тональность текста: премиальная, практичная, дружелюбная, экспертная или более прямая. Текущее значение: `TBD`. `[Предположение/TBD]`
3. Формат отзывов: карусель, статичные карточки или временно убрать блок. Текущее значение: `TBD`. `[Макет]` `[Рекомендация]`
4. Нужен ли лайтбокс или отдельные страницы проектов для портфолио? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
5. Нужен ли FAQ-блок? Текущее значение: `TBD`. `[Рекомендация]`
6. Нужна ли логика калькулятора или достаточно формы заявки? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
7. Какую аналитику подключать и как называть события? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
8. Какие SEO-запросы приоритетны? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
9. Какие соцсети показывать в футере? Текущее значение: `TBD`. `[Макет]` `[Предположение/TBD]`
10. Какую финальную иконку выбрать для каждого пункта преимуществ, услуг и процесса? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
11. Нужны ли анимации и какие ограничения по ним? Текущее значение: `TBD`. `[Рекомендация]` `[Предположение/TBD]`
12. Нужна ли мультиязычность? Текущее значение: `TBD`. `[Предположение/TBD]`
13. Нужны ли статьи/блог или только одностраничный лендинг? Текущее значение: `TBD`. `[Предположение/TBD]`
