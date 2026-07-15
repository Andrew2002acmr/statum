export interface EstimateQuizOption {
  value: string;
  label: string;
  description?: string;
}

export interface EstimateQuizQuestion {
  id: string;
  title: string;
  description: string;
  type: "single";
  required: boolean;
  options: EstimateQuizOption[];
}

export const estimateQuizContent = {
  eyebrow: "Предварительный расчёт",
  title: "Уточните параметры ремонта",
  description:
    "Пять коротких вопросов помогут подготовить основу для будущей оценки. Стоимость и условия появятся только после согласования методики расчёта.",
  visualLabel: "Место для будущего изображения с материалами расчёта",
  finalTitle: "Параметры сохранены",
  finalMessage:
    "Оставьте контакты на следующем этапе, чтобы получить предварительную оценку. Сейчас данные не отправляются на сервер.",
} as const;

// TBD: questions and options are temporary until the client confirms the final estimate flow.
export const estimateQuizQuestions: EstimateQuizQuestion[] = [
  {
    id: "object-type",
    title: "Тип объекта",
    description: "Выберите, где планируются работы.",
    type: "single",
    required: true,
    options: [
      {
        value: "apartment",
        label: "Квартира",
        description: "Отдельная квартира или часть квартиры.",
      },
      {
        value: "house",
        label: "Дом",
        description: "Частный дом или жилое помещение в доме.",
      },
      {
        value: "room",
        label: "Отдельная комната",
        description: "Одна зона без ремонта всего объекта.",
      },
      {
        value: "not-sure",
        label: "Нужно уточнить",
        description: "Параметры лучше обсудить перед оценкой.",
      },
    ],
  },
  {
    id: "work-type",
    title: "Тип требуемых работ",
    description: "Отметьте ближайшее направление ремонта.",
    type: "single",
    required: true,
    options: [
      {
        value: "full-renovation",
        label: "Комплексный ремонт",
        description: "Нужна последовательная работа по нескольким зонам.",
      },
      {
        value: "rough",
        label: "Черновые работы",
        description: "Подготовка основания и базовые инженерные задачи.",
      },
      {
        value: "finishing",
        label: "Чистовая отделка",
        description: "Финишные покрытия, монтаж и аккуратная доводка.",
      },
      {
        value: "specific",
        label: "Отдельные работы",
        description: "Точечные задачи внутри общего плана ремонта.",
      },
    ],
  },
  {
    id: "area",
    title: "Примерная площадь",
    description: "Можно выбрать диапазон, если точных замеров пока нет.",
    type: "single",
    required: true,
    options: [
      {
        value: "up-to-40",
        label: "До 40 м²",
      },
      {
        value: "40-70",
        label: "40–70 м²",
      },
      {
        value: "70-100",
        label: "70–100 м²",
      },
      {
        value: "over-100",
        label: "Больше 100 м²",
      },
      {
        value: "not-sure",
        label: "Пока не знаю",
      },
    ],
  },
  {
    id: "condition",
    title: "Текущее состояние помещения",
    description: "Это поможет понять, с какого этапа может начаться работа.",
    type: "single",
    required: true,
    options: [
      {
        value: "new-build",
        label: "Новостройка",
        description: "Помещение без завершённой отделки.",
      },
      {
        value: "lived-in",
        label: "Жилое помещение",
        description: "Ремонт нужен в уже используемом объекте.",
      },
      {
        value: "rough-ready",
        label: "Есть черновая база",
        description: "Часть подготовительных работ уже выполнена.",
      },
      {
        value: "needs-inspection",
        label: "Нужен осмотр",
        description: "Состояние лучше уточнить по месту или по фото.",
      },
    ],
  },
  {
    id: "start-time",
    title: "Когда планируется начало работ",
    description: "Выберите ориентир без привязки к точным срокам.",
    type: "single",
    required: true,
    options: [
      {
        value: "soon",
        label: "В ближайшее время",
      },
      {
        value: "month",
        label: "В течение месяца",
      },
      {
        value: "quarter",
        label: "В ближайшие месяцы",
      },
      {
        value: "later",
        label: "Позже",
      },
      {
        value: "not-sure",
        label: "Пока не решил",
      },
    ],
  },
];
