import { preparedAssets } from "./assets";

// Только направления, для которых есть соответствующие реальные кадры.
// Фото домов и черновых работ нужны до добавления этих услуг в карточки.
export const services = [
  {
    id: "apartment-renovation",
    title: "Ремонт квартир",
    description: "Обновление комнат, кухни, санузла или всей квартиры.",
    image: preparedAssets.services.apartment,
    alt: "Комната на стадии отделки с окном, радиатором и стеной с графическим рисунком",
    icon: "Sofa",
  },
  {
    id: "finish-works",
    title: "Чистовая отделка",
    description: "Финишные покрытия, монтаж и аккуратные детали.",
    image: preparedAssets.services.finish,
    alt: "Стена с графическим рисунком, подвесами и чистовой отделкой",
    icon: "PanelsTopLeft",
  },
  {
    id: "specific-repairs",
    title: "Отдельные работы",
    description: "Точечные задачи без перестройки всего ремонта.",
    image: preparedAssets.services.specific,
    alt: "Чёрная душевая фурнитура и ниша со стеклянными полками",
    icon: "Wrench",
  },
] as const;
