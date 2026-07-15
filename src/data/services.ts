// TBD: exact service list, scope and wording must be confirmed by the client.
export const services = [
  {
    id: "apartment-renovation",
    title: "Ремонт квартир",
    description:
      "Для задач в квартире: от обновления отдельных зон до комплексной подготовки помещения.",
    image: "service-apartment",
    imageAspectRatio: "4 / 3",
    alt: "TBD: пример ремонта квартиры",
    icon: "Sofa",
  },
  {
    id: "house-finishing",
    title: "Отделка домов",
    description:
      "Для частных домов, где важно заранее связать этапы отделки и последовательность работ.",
    image: "service-house",
    imageAspectRatio: "4 / 3",
    alt: "TBD: пример отделки дома",
    icon: "House",
  },
  {
    id: "rough-works",
    title: "Черновые работы",
    description:
      "Базовые подготовительные задачи, которые задают основу для следующих этапов ремонта.",
    image: "service-rough",
    imageAspectRatio: "4 / 3",
    alt: "TBD: пример черновых работ",
    icon: "PaintRoller",
  },
  {
    id: "finish-works",
    title: "Чистовая отделка",
    description:
      "Финальные отделочные работы, где особенно важны аккуратность и внимание к деталям.",
    image: "service-finish",
    imageAspectRatio: "4 / 3",
    alt: "TBD: пример чистовой отделки",
    icon: "PanelsTopLeft",
  },
  {
    id: "specific-repairs",
    title: "Отдельные работы",
    description:
      "Точечные задачи по ремонту, которые нужно встроить в общий план без лишней путаницы.",
    image: "service-specific",
    imageAspectRatio: "4 / 3",
    alt: "TBD: пример отдельной ремонтной работы",
    icon: "Wrench",
  },
] as const;
