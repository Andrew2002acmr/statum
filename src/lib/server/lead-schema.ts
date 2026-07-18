import { z } from "zod";
import { estimateQuizQuestions } from "../../data/estimate-quiz";
import {
  formatRussianPhoneFromNationalDigits,
  normalizeRussianPhone,
} from "../russian-phone";

export const leadSources = ["hero", "estimate"] as const;

export type LeadSource = (typeof leadSources)[number];

export interface QuizAnswer {
  questionId: string;
  questionLabel: string;
  optionValue: string;
  optionLabel: string;
}

export interface NormalizedLead {
  name: string;
  phone: string;
  phoneDisplay: string;
  comment?: string;
  source: LeadSource;
  pageUrl: string;
  quizAnswers: QuizAnswer[];
}

function normalizeTextWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function getPhoneErrorMessage(value: string) {
  const result = normalizeRussianPhone(value);

  if ("canonical" in result) {
    return null;
  }

  if (result.error === "empty") {
    return "Укажите номер телефона";
  }

  if (result.error === "incomplete") {
    return "Введите номер полностью: +7 и 10 цифр";
  }

  return "Проверьте номер телефона";
}

const nameSchema = z
  .string()
  .transform(normalizeTextWhitespace)
  .superRefine((value, context) => {
    if (!value) {
      context.addIssue({ code: "custom", message: "Укажите ваше имя" });
      return;
    }

    if (value.length < 2) {
      context.addIssue({
        code: "custom",
        message: "Имя должно содержать не менее 2 символов",
      });
      return;
    }

    if (value.length > 60) {
      context.addIssue({
        code: "custom",
        message: "Имя слишком длинное. Максимум — 60 символов",
      });
      return;
    }

    if (!/^[\p{L}\s'’-]+$/u.test(value) || !/\p{L}/u.test(value)) {
      context.addIssue({
        code: "custom",
        message: "Используйте буквы, пробел, дефис или апостроф",
      });
    }
  });

const phoneSchema = z
  .string()
  .trim()
  .superRefine((value, context) => {
    const message = getPhoneErrorMessage(value);

    if (message) {
      context.addIssue({ code: "custom", message });
    }
  })
  .transform((value) => {
    const normalized = normalizeRussianPhone(value);
    return "canonical" in normalized ? normalized.canonical : value;
  });

const commentSchema = z
  .string()
  .max(1000, "Комментарий слишком длинный. Максимум — 1000 символов")
  .transform((value) => {
    const normalized = normalizeTextWhitespace(value);
    return normalized ? normalized : undefined;
  })
  .optional();

const optionalFormString = z.preprocess(
  (value) => (value === null || value === undefined ? "" : value),
  z.string().trim(),
);

export const leadInputSchema = z
  .object({
    name: nameSchema,
    phone: phoneSchema,
    comment: commentSchema,
    consent: z.literal("on", {
      error: "Подтвердите согласие на обработку персональных данных",
    }),
    source: z.enum(leadSources),
    quizAnswers: optionalFormString.pipe(z.string().max(2000)).optional(),
    company: optionalFormString.pipe(z.string().max(0)).optional(),
    turnstileToken: optionalFormString,
  })
  .strict();

export type LeadInput = z.infer<typeof leadInputSchema>;

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
  const phone = normalizeRussianPhone(input.phone);

  if (!("canonical" in phone)) {
    throw new Error("INVALID_PHONE");
  }

  return {
    name: input.name,
    phone: phone.canonical,
    phoneDisplay: formatRussianPhoneFromNationalDigits(phone.nationalDigits),
    comment: input.comment,
    source: input.source,
    pageUrl,
    quizAnswers: parseQuizAnswersPayload(input.quizAnswers),
  };
}
