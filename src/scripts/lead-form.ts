import { actions, isInputError } from "astro:actions";
import {
  formatRussianPhone,
  getRussianPhoneNationalDigits,
  normalizeRussianPhone,
} from "../lib/russian-phone";
import { createSubmissionDialogController } from "./submission-dialog";

declare global {
  interface Window {
    turnstile?: {
      reset: (element?: Element | string) => void;
    };
  }
}

type LeadField = "name" | "phone" | "comment" | "consent";
type FormState =
  "idle" | "validating" | "submitting" | "success" | "server-error";

interface ActionInputErrorLike {
  fields?: Partial<Record<LeadField, string[] | string>>;
}

const fieldNames: LeadField[] = ["name", "phone", "comment", "consent"];
const defaultSubmitText = "Получить расчёт";

function getFieldElement(form: HTMLFormElement, field: LeadField) {
  return form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    `[data-lead-field="${field}"]`,
  );
}

function getFieldValue(form: HTMLFormElement, field: LeadField) {
  const element = getFieldElement(form, field);

  if (!element) {
    return "";
  }

  if (element instanceof HTMLInputElement && element.type === "checkbox") {
    return element.checked ? "on" : "";
  }

  return element.value;
}

function normalizeName(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function validateName(value: string) {
  const normalized = normalizeName(value);

  if (!normalized) {
    return "Укажите ваше имя";
  }

  if (normalized.length < 2) {
    return "Имя должно содержать не менее 2 символов";
  }

  if (!/^[\p{L}\s'’-]+$/u.test(normalized) || !/\p{L}/u.test(normalized)) {
    return "Используйте буквы, пробел, дефис или апостроф";
  }

  return "";
}

function validatePhone(value: string) {
  const normalized = normalizeRussianPhone(value);

  if ("canonical" in normalized) {
    return "";
  }

  if (normalized.error === "empty") {
    return "Укажите номер телефона";
  }

  if (normalized.error === "incomplete") {
    return "Введите номер полностью: +7 и 10 цифр";
  }

  return "Проверьте номер телефона";
}

function validateComment(value: string) {
  return value.length > 1000
    ? "Комментарий слишком длинный. Максимум — 1000 символов"
    : "";
}

function validateConsent(value: string) {
  return value === "on"
    ? ""
    : "Подтвердите согласие на обработку персональных данных";
}

function validateField(form: HTMLFormElement, field: LeadField) {
  const value = getFieldValue(form, field);

  if (field === "name") {
    return validateName(value);
  }

  if (field === "phone") {
    return validatePhone(value);
  }

  if (field === "comment") {
    return validateComment(value);
  }

  return validateConsent(value);
}

function setFieldError(
  form: HTMLFormElement,
  field: LeadField,
  message: string,
) {
  const element = getFieldElement(form, field);
  const error = form.querySelector<HTMLElement>(
    `[data-field-error="${field}"]`,
  );

  if (element) {
    element.setAttribute("aria-invalid", String(Boolean(message)));
  }

  if (error) {
    error.textContent = message;
  }
}

function clearFieldErrors(form: HTMLFormElement) {
  fieldNames.forEach((field) => setFieldError(form, field, ""));
}

function updateCommentCounter(form: HTMLFormElement) {
  const comment = form.querySelector<HTMLTextAreaElement>(
    '[data-lead-field="comment"]',
  );
  const counter = form.querySelector<HTMLElement>("[data-comment-counter]");

  if (comment && counter) {
    counter.textContent = `${comment.value.length} / 1000`;
  }
}

function setStatus(
  form: HTMLFormElement,
  message: string,
  tone: "error" | "success" | "muted",
) {
  const status = form.querySelector<HTMLElement>("[data-lead-status]");

  if (!status) {
    return;
  }

  status.textContent = message;
  status.classList.toggle("text-red-200", tone === "error");
  status.classList.toggle("text-emerald-200", tone === "success");
  status.classList.toggle("text-white/64", tone === "muted");
}

function setFormState(form: HTMLFormElement, state: FormState) {
  const submit = form.querySelector<HTMLButtonElement>("[data-lead-submit]");
  const label = form.querySelector<HTMLElement>("[data-lead-submit-label]");

  form.dataset.leadState = state;

  if (submit) {
    submit.disabled = state === "submitting";
  }

  if (label) {
    label.textContent =
      state === "validating"
        ? "Проверяем..."
        : state === "submitting"
          ? "Отправляем..."
          : defaultSubmitText;
  }
}

function countNationalDigitsBefore(value: string, caretPosition: number) {
  return getRussianPhoneNationalDigits(value.slice(0, caretPosition)).length;
}

function getCaretPosition(formatted: string, digitCount: number) {
  if (digitCount <= 0) {
    return formatted.length;
  }

  let seenDigits = 0;

  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index] ?? "")) {
      seenDigits += 1;

      if (seenDigits === digitCount + 1) {
        return index + 1;
      }
    }
  }

  return formatted.length;
}

function formatPhoneInput(input: HTMLInputElement) {
  const rawValue = input.value;
  const digits = rawValue.replace(/\D/g, "");

  if (!digits) {
    input.value = "";
    return;
  }

  const caret = input.selectionStart ?? rawValue.length;
  const nationalDigitsBeforeCaret = countNationalDigitsBefore(rawValue, caret);
  const formatted = formatRussianPhone(rawValue);

  input.value = formatted;

  const nextCaret = getCaretPosition(formatted, nationalDigitsBeforeCaret);
  input.setSelectionRange(nextCaret, nextCaret);
}

function syncQuizAnswers(form: HTMLFormElement) {
  const target = form.querySelector<HTMLInputElement>("[data-lead-quiz-input]");

  if (!target || form.dataset.source !== "estimate") {
    return;
  }

  const source = document.querySelector<HTMLInputElement>(
    "[data-quiz-summary]",
  );
  target.value = source?.value ?? "";
}

function createLeadFormData(form: HTMLFormElement) {
  const sourceData = new FormData(form);
  const targetData = new FormData();
  const allowedFields = [
    "name",
    "phone",
    "comment",
    "consent",
    "source",
    "quizAnswers",
    "company",
    "turnstileToken",
  ];

  allowedFields.forEach((field) => {
    const value = sourceData.get(field);

    if (value !== null) {
      targetData.set(field, value);
    }
  });

  return targetData;
}

function resetTurnstile(form: HTMLFormElement) {
  const widget = form.querySelector(".cf-turnstile");
  const token = form.querySelector<HTMLInputElement>(
    'input[name="turnstileToken"]',
  );

  if (token) {
    token.value = "";
  }

  if (widget && window.turnstile) {
    window.turnstile.reset(widget);
  }
}

function validateForm(form: HTMLFormElement, shouldFocus = false) {
  let firstInvalid: HTMLElement | null = null;

  for (const field of fieldNames) {
    const message = validateField(form, field);
    setFieldError(form, field, message);

    if (message && !firstInvalid) {
      firstInvalid = getFieldElement(form, field);
    }
  }

  if (firstInvalid && shouldFocus) {
    firstInvalid.focus();
  }

  return !firstInvalid;
}

function applyServerFieldErrors(
  form: HTMLFormElement,
  error: ActionInputErrorLike,
) {
  let firstInvalid: HTMLElement | null = null;

  for (const field of fieldNames) {
    const rawMessage = error.fields?.[field];
    const message = Array.isArray(rawMessage)
      ? (rawMessage[0] ?? "")
      : (rawMessage ?? "");

    setFieldError(form, field, message);

    if (message && !firstInvalid) {
      firstInvalid = getFieldElement(form, field);
    }
  }

  if (firstInvalid) {
    firstInvalid.focus();
  }
}

function resetFormAfterSuccess(form: HTMLFormElement) {
  form.reset();
  clearFieldErrors(form);
  updateCommentCounter(form);
  resetTurnstile(form);
  setStatus(form, "", "muted");
  setFormState(form, "idle");

  form.dispatchEvent(
    new CustomEvent("lead:success-confirmed", {
      bubbles: true,
      detail: { source: form.dataset.source },
    }),
  );
}

document
  .querySelectorAll<HTMLFormElement>("[data-lead-form]")
  .forEach((form) => {
    if (form.dataset.leadEnhanced === "true") {
      return;
    }

    form.dataset.leadEnhanced = "true";

    const touchedFields = new Set<LeadField>();
    const dialog = document.getElementById(
      `${form.id}-dialog`,
    ) as HTMLDialogElement | null;
    const dialogController = dialog
      ? createSubmissionDialogController(dialog, form, () =>
          resetFormAfterSuccess(form),
        )
      : null;

    fieldNames.forEach((field) => {
      const element = getFieldElement(form, field);

      element?.addEventListener("blur", () => {
        touchedFields.add(field);
        setFieldError(form, field, validateField(form, field));
      });

      element?.addEventListener("input", () => {
        if (field === "phone" && element instanceof HTMLInputElement) {
          formatPhoneInput(element);
        }

        if (field === "comment") {
          updateCommentCounter(form);
        }

        if (touchedFields.has(field)) {
          setFieldError(form, field, validateField(form, field));
        }
      });

      element?.addEventListener("change", () => {
        if (touchedFields.has(field)) {
          setFieldError(form, field, validateField(form, field));
        }
      });
    });

    updateCommentCounter(form);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (form.dataset.leadState === "submitting") {
        return;
      }

      fieldNames.forEach((field) => touchedFields.add(field));
      setFormState(form, "validating");

      if (!validateForm(form, true)) {
        setStatus(form, "Проверьте выделенные поля", "error");
        setFormState(form, "idle");
        return;
      }

      clearFieldErrors(form);
      syncQuizAnswers(form);
      setStatus(form, "Заявка отправляется", "muted");
      setFormState(form, "submitting");

      try {
        const result = await actions.submitLead(createLeadFormData(form));

        if (result.error) {
          resetTurnstile(form);

          if (isInputError(result.error)) {
            applyServerFieldErrors(
              form,
              result.error as unknown as ActionInputErrorLike,
            );
            setStatus(form, "Проверьте выделенные поля", "error");
            setFormState(form, "idle");
            return;
          }

          setStatus(form, "Не удалось отправить заявку", "error");
          setFormState(form, "server-error");
          dialogController?.show("error");
          return;
        }

        setStatus(form, "Заявка успешно отправлена", "success");
        setFormState(form, "success");
        dialogController?.show("success");
      } catch {
        resetTurnstile(form);
        setStatus(form, "Не удалось отправить заявку", "error");
        setFormState(form, "server-error");
        dialogController?.show("error");
      }
    });
  });
