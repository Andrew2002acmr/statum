export const site = {
  // TBD: final brand name and legal positioning are not approved yet.
  companyName: "СТАТУМ",
  brandCaption: "ремонт под контролем",
  // TBD: region must be confirmed by the client.
  regionLabel: "Регион работы уточняется",
  // TBD: phone is intentionally not copied from the generated JPG.
  phoneLabel: "Контакт после согласования",
  primaryCta: "Получить расчёт",
  secondaryCta: "Обсудить проект",
  nav: [
    { label: "Подход", href: "#about" },
    { label: "Преимущества", href: "#trust" },
    { label: "Услуги", href: "#services" },
    { label: "Работы", href: "#projects" },
    { label: "Заявка", href: "#lead-request" },
  ],
  hero: {
    eyebrow: "Ремонтные работы для квартир и домов",
    // TBD: final offer wording must be approved.
    title: "Ремонт под контролем",
    titleAccent: "без лишней суеты",
    description:
      "Помогаем пройти ремонт понятнее: фиксируем задачи, объясняем этапы и держим фокус на аккуратном результате.",
    imageLabel: "Заглушка интерьерного изображения для первого экрана",
    formTitle: "Заявка на расчёт",
    formDescription:
      "Форма пока работает как визуальная заготовка. Отправка будет подключена после выбора канала заявок.",
  },
  trustFeatures: [
    {
      icon: "ShieldCheck",
      title: "Контроль качества",
      text: "Проверяем ключевые этапы и фиксируем договорённости.",
    },
    {
      icon: "ClipboardCheck",
      title: "Понятный объём работ",
      text: "Помогаем заранее увидеть состав задач и порядок действий.",
    },
    {
      icon: "CalendarClock",
      title: "Сроки под наблюдением",
      text: "Планируем этапы без обещаний, которые не подтверждены.",
    },
    {
      icon: "MessagesSquare",
      title: "Связь по проекту",
      text: "Держим коммуникацию простой и предсказуемой.",
    },
  ],
} as const;
