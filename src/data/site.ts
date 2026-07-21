export const site = {
  // TBD: final brand name and legal positioning are not approved yet.
  companyName: "СТАТУМ",
  brandCaption: "ремонт под контролем",
  // Confirmed contact supplied for the production landing.
  phoneLabel: "+7 (995) 129-27-50",
  phoneHref: "tel:+79951292750",
  primaryCta: "Получить расчёт",
  secondaryCta: "Обсудить проект",
  nav: [
    { label: "Подход", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Работы", href: "#projects" },
    { label: "Оценка", href: "#estimate" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакт", href: "#contact" },
  ],
  hero: {
    eyebrow: "Ремонтные работы для квартир и домов",
    title: "Ремонт под",
    titleContinuation: "контролем —",
    titleAccent: "без стресса и переделок",
    description:
      "Выполняем ремонт квартир, домов и коммерческих помещений. Бесплатно выезжаем на объект, проводим замер и составляем смету.",
    primaryCta: "Рассчитать стоимость",
    secondaryCta: "Посмотреть работы",
    proof: [
      "Бесплатный выезд и замер",
      "Работа по договору",
      "Гарантия 2 года",
    ],
    formTitle: "Бесплатный выезд и расчёт",
    formDescription:
      "Оставьте контакты — свяжемся, уточним задачу и договоримся об удобном времени.",
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
