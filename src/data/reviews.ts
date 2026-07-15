export type ReviewStatus = "placeholder" | "confirmed";

export interface Review {
  id: string;
  text: string;
  author: string | null;
  project: string | null;
  rating: number | null;
  status: ReviewStatus;
}

export const reviewsContent = {
  eyebrow: "Отзывы",
  title: "Реальные отзывы появятся после согласования",
  description:
    "Блок подготовлен под будущие подтверждённые отзывы. Имена, оценки и цитаты из JPG не переносятся как факты.",
} as const;

// TBD: replace placeholders only with approved client testimonials.
export const reviews: Review[] = [
  {
    id: "review-placeholder-01",
    text: "Отзыв будет добавлен после согласования с клиентом.",
    author: null,
    project: null,
    rating: null,
    status: "placeholder",
  },
  {
    id: "review-placeholder-02",
    text: "Отзыв будет добавлен после согласования с клиентом.",
    author: null,
    project: null,
    rating: null,
    status: "placeholder",
  },
  {
    id: "review-placeholder-03",
    text: "Отзыв будет добавлен после согласования с клиентом.",
    author: null,
    project: null,
    rating: null,
    status: "placeholder",
  },
];
