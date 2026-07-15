import { z } from "zod";
import { estimateQuizQuestions } from "../../data/estimate-quiz";

export const leadSources = ["hero", "contact"] as const;

export type LeadSource = (typeof leadSources)[number];

export interface QuizAnswer {
  questionId: string;
  questionLabel: string;
  optionValue: string;
  optionLabel: string;
}

export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .min(5, "Укажите телефон")
    .max(40, "Телефон слишком длинный")
    .refine((value) => /^[+\d][\d\s\-().]{4,39}$/.test(value), {
      message: "Укажите корректный телефон",
    }),
  comment: z.string().trim().max(700, "Комментарий слишком длинный").optional(),
  consent: z.literal("on", {
    error: "Необходимо согласие на обработку персональных данных",
  }),
  source: z.enum(leadSources),
  quizAnswers: z.string().trim().max(2000).optional(),
  company: z.string().trim().max(0).optional(),
  turnstileToken: z.string().trim().min(1, "Проверка Turnstile обязательна"),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export interface NormalizedLead {
  name: string;
  phone: string;
  comment?: string;
  source: LeadSource;
  pageUrl: string;
  quizAnswers: QuizAnswer[];
}

const questionMap = new Map(
  estimateQuizQuestions.map((question) => [
    question.id,
    {
      label: question.title,
      options: new Map(
        question.options.map((option) => [option.value, option.label]),
      ),
    },
  ]),
);

export function parseQuizAnswersPayload(payload?: string): QuizAnswer[] {
  if (!payload) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(payload);
  } catch {
    throw new Error("INVALID_QUIZ_PAYLOAD");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("INVALID_QUIZ_PAYLOAD");
  }

  const answers: QuizAnswer[] = [];

  for (const [questionId, optionValue] of Object.entries(parsed)) {
    if (typeof optionValue !== "string") {
      throw new Error("INVALID_QUIZ_PAYLOAD");
    }

    const question = questionMap.get(questionId);
    const optionLabel = question?.options.get(optionValue);

    if (!question || !optionLabel) {
      throw new Error("INVALID_QUIZ_OPTION");
    }

    answers.push({
      questionId,
      questionLabel: question.label,
      optionValue,
      optionLabel,
    });
  }

  return answers;
}

export function normalizeLeadInput(
  input: LeadInput,
  pageUrl: string,
): NormalizedLead {
  const comment = input.comment?.replace(/\s+/g, " ").trim();

  return {
    name: input.name.replace(/\s+/g, " ").trim(),
    phone: input.phone.replace(/\s+/g, " ").trim(),
    comment: comment ? comment : undefined,
    source: input.source,
    pageUrl,
    quizAnswers: parseQuizAnswersPayload(input.quizAnswers),
  };
}
