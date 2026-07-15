import { actions, isInputError } from "astro:actions";

declare global {
  interface Window {
    turnstile?: {
      reset: (element?: Element | string) => void;
    };
  }
}

const forms = document.querySelectorAll<HTMLFormElement>("[data-lead-form]");

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
  status.classList.toggle("text-white/52", tone === "muted");
}

function setSubmitting(form: HTMLFormElement, isSubmitting: boolean) {
  const submit = form.querySelector<HTMLButtonElement>("[data-lead-submit]");
  const label = form.querySelector<HTMLElement>("[data-lead-submit-label]");

  if (submit) {
    submit.disabled = isSubmitting;
  }

  if (label) {
    label.textContent = isSubmitting ? "Отправляем..." : "Получить расчёт";
  }
}

function syncQuizAnswers(form: HTMLFormElement) {
  const target = form.querySelector<HTMLInputElement>("[data-lead-quiz-input]");
  const source = document.querySelector<HTMLInputElement>(
    "[data-quiz-summary]",
  );

  if (target && source) {
    target.value = source.value;
  }
}

function syncTurnstileToken(form: HTMLFormElement) {
  const target = form.querySelector<HTMLInputElement>(
    "[data-lead-turnstile-input]",
  );
  const widgetToken = form.querySelector<HTMLInputElement>(
    'input[name="cf-turnstile-response"]',
  );

  if (target && widgetToken?.value) {
    target.value = widgetToken.value;
  }
}

function resetTurnstile(form: HTMLFormElement) {
  const widget = form.querySelector(".cf-turnstile");
  const token = form.querySelector<HTMLInputElement>(
    "[data-lead-turnstile-input]",
  );

  if (token) {
    token.value = "";
  }

  if (widget && window.turnstile) {
    window.turnstile.reset(widget);
  }
}

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.dataset.submitting === "true") {
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus(form, "Проверьте обязательные поля формы.", "error");
      return;
    }

    form.dataset.submitting = "true";
    setSubmitting(form, true);
    setStatus(form, "", "muted");
    syncQuizAnswers(form);
    syncTurnstileToken(form);

    const result = await actions.submitLead(new FormData(form));

    if (result.error) {
      const message = isInputError(result.error)
        ? "Проверьте поля формы и попробуйте ещё раз."
        : "Не удалось отправить заявку. Попробуйте ещё раз немного позже.";

      setStatus(form, message, "error");
      resetTurnstile(form);
      form.dataset.submitting = "false";
      setSubmitting(form, false);
      return;
    }

    form.reset();
    resetTurnstile(form);
    setStatus(
      form,
      "Заявка отправлена. Мы получили параметры и контакты.",
      "success",
    );
    form.dataset.submitting = "false";
    setSubmitting(form, false);
  });
});
