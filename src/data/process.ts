// TBD: exact workflow, contract steps and service conditions must be approved.
export const processSteps = [
  {
    icon: "MessageCircle",
    title: "Обсуждение задачи",
    text: "Уточняем тип объекта, общий объём работ и ожидания от результата.",
  },
  {
    icon: "Ruler",
    title: "Осмотр или детали",
    text: "Собираем вводные по помещению, материалам и ограничениям проекта.",
  },
  {
    icon: "ClipboardList",
    title: "Подготовка предложения",
    text: "Формируем понятный состав работ без неподтверждённых сроков и цен.",
  },
  {
    icon: "Wrench",
    title: "Выполнение работ",
    text: "Двигаемся по согласованной последовательности и фиксируем важные этапы.",
  },
  {
    icon: "CircleCheck",
    title: "Приёмка результата",
    text: "Проверяем выполненное и отдельно отмечаем вопросы, которые требуют решения.",
  },
] as const;
