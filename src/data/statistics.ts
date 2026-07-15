// TBD: numeric company indicators must be confirmed by the client before display.
export const statistics = [
  {
    id: "experience",
    value: "—",
    label: "Опыт работы",
    description: "Значение будет добавлено после подтверждения.",
    status: "requires-client-confirmation",
  },
  {
    id: "completed-projects",
    value: "—",
    label: "Выполненные проекты",
    description: "Количество не переносится из сгенерированного JPG.",
    status: "requires-client-confirmation",
  },
  {
    id: "specialists",
    value: "—",
    label: "Специалисты",
    description: "Состав команды требует согласования.",
    status: "requires-client-confirmation",
  },
  {
    id: "quality-control",
    value: "—",
    label: "Контроль качества",
    description: "Формат проверки результата уточняется.",
    status: "requires-client-confirmation",
  },
] as const;
