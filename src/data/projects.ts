import { preparedAssets } from "./assets";

// Фотографии реальные. Названия описывают видимый фрагмент, а не название,
// адрес или полный объём отдельного объекта: эти сведения остаются TBD.
export const projects = [
  {
    id: "accent-wall",
    title: "Акцентная стена",
    category: "Деталь отделки",
    image: preparedAssets.projects.accentWall,
    alt: "Реечная акцентная стена со светлой вставкой и двумя бра",
  },
  {
    id: "wood-shower",
    title: "Душевая с плиткой под дерево",
    category: "Санузел",
    image: preparedAssets.projects.woodShower,
    alt: "Душевая с плиткой под дерево, стеклянной перегородкой и скамьёй",
  },
  {
    id: "grey-bathroom",
    title: "Ванная с серой плиткой",
    category: "Санузел",
    image: preparedAssets.projects.greyBathroom,
    alt: "Ванная комната с серой плиткой, белой ванной и деревянной тумбой",
  },
  {
    id: "turquoise-corridor",
    title: "Коридор с панелями",
    category: "Чистовая отделка",
    image: preparedAssets.projects.turquoiseCorridor,
    alt: "Бирюзовый коридор с белыми панелями и дверями",
  },
  {
    id: "graphic-wall",
    title: "Декоративная стена",
    category: "Чистовая отделка",
    image: preparedAssets.projects.graphicWall,
    alt: "Отделка стены с графическим рисунком и чёрными подвесами",
  },
] as const;
