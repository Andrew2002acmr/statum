import type { NormalizedLead } from "./lead-schema";

const MESSAGE_TIME_ZONE = "UTC";
const MAX_MESSAGE_LENGTH = 3500;

const sourceLabels: Record<NormalizedLead["source"], string> = {
  hero: "Первый экран",
  contact: "Финальный CTA",
};

function cleanValue(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: MESSAGE_TIME_ZONE,
  }).format(date);
}

function truncateMessage(message: string) {
  if (message.length <= MAX_MESSAGE_LENGTH) {
    return message;
  }

  return `${message.slice(0, MAX_MESSAGE_LENGTH - 24)}\n\n[сообщение сокращено]`;
}

export function formatLeadMessage(lead: NormalizedLead, date = new Date()) {
  const lines = [
    "Новая заявка с сайта «Статум»",
    "",
    `Имя: ${cleanValue(lead.name)}`,
    `Телефон: ${cleanValue(lead.phone)}`,
  ];

  if (lead.comment) {
    lines.push(`Комментарий: ${cleanValue(lead.comment)}`);
  }

  lines.push(
    "",
    `Источник: ${sourceLabels[lead.source]}`,
    `Дата: ${formatDate(date)} ${MESSAGE_TIME_ZONE}`,
    `Страница: ${lead.pageUrl}`,
  );

  if (lead.quizAnswers.length > 0) {
    lines.push("", "Параметры предварительной оценки:");

    for (const answer of lead.quizAnswers) {
      lines.push(`• ${answer.questionLabel}: ${answer.optionLabel}`);
    }
  }

  return truncateMessage(lines.join("\n"));
}
