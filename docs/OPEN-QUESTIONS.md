# OPEN-QUESTIONS

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
