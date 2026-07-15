const quizForms = document.querySelectorAll<HTMLFormElement>(
  "[data-estimate-quiz]",
);

function getRequiredAnswer(step: HTMLElement): HTMLInputElement | null {
  return step.querySelector<HTMLInputElement>(
    'input[type="radio"][data-quiz-option]:checked',
  );
}

function collectAnswers(form: HTMLFormElement): Record<string, string> {
  const answers: Record<string, string> = {};
  const fields = form.querySelectorAll<HTMLInputElement>(
    'input[type="radio"][data-quiz-option]:checked',
  );

  fields.forEach((field) => {
    answers[field.name] = field.value;
  });

  return answers;
}

quizForms.forEach((form) => {
  const steps = Array.from(
    form.querySelectorAll<HTMLElement>("[data-quiz-step]"),
  );
  const controls = form.querySelector<HTMLElement>("[data-quiz-controls]");
  const progress = form.querySelector<HTMLProgressElement>(
    "[data-quiz-progress]",
  );
  const progressText = form.querySelector<HTMLElement>(
    "[data-quiz-progress-text]",
  );
  const previousButton =
    form.querySelector<HTMLButtonElement>("[data-quiz-prev]");
  const nextButton = form.querySelector<HTMLButtonElement>("[data-quiz-next]");
  const finalPanel = form.querySelector<HTMLElement>("[data-quiz-final]");
  const summaryInput = form.querySelector<HTMLInputElement>(
    "[data-quiz-summary]",
  );

  if (
    steps.length === 0 ||
    !controls ||
    !progress ||
    !progressText ||
    !previousButton ||
    !nextButton ||
    !finalPanel ||
    !summaryInput
  ) {
    return;
  }

  const quizControls = controls;
  const quizProgress = progress;
  const quizProgressText = progressText;
  const quizPreviousButton = previousButton;
  const quizNextButton = nextButton;
  const quizFinalPanel = finalPanel;
  const quizSummaryInput = summaryInput;

  let currentStep = 0;
  let isComplete = false;

  function updateSummary() {
    quizSummaryInput.value = JSON.stringify(collectAnswers(form));
  }

  function focusCurrentStepTitle() {
    const activeTitle = steps[currentStep]?.querySelector<HTMLElement>(
      "[data-quiz-step-title]",
    );

    activeTitle?.focus();
  }

  function render() {
    quizControls.hidden = false;
    quizFinalPanel.hidden = !isComplete;

    steps.forEach((step, index) => {
      const isActive = !isComplete && index === currentStep;
      step.hidden = !isActive;
      step.setAttribute("aria-hidden", String(!isActive));
    });

    quizProgress.max = steps.length;
    quizProgress.value = isComplete ? steps.length : currentStep + 1;
    quizProgressText.textContent = isComplete
      ? "Параметры сохранены"
      : `Шаг ${currentStep + 1} из ${steps.length}`;

    quizPreviousButton.hidden = currentStep === 0 && !isComplete;
    quizPreviousButton.disabled = currentStep === 0 && !isComplete;
    quizPreviousButton.textContent = isComplete ? "Изменить ответы" : "Назад";

    quizNextButton.hidden = isComplete;
    quizNextButton.textContent =
      currentStep === steps.length - 1 ? "Завершить" : "Далее";
    quizNextButton.disabled = !getRequiredAnswer(steps[currentStep]);

    updateSummary();
  }

  form.addEventListener("change", (event) => {
    const target = event.target;

    if (
      target instanceof HTMLInputElement &&
      target.matches('[data-quiz-option][type="radio"]')
    ) {
      render();
    }
  });

  quizPreviousButton.addEventListener("click", () => {
    if (isComplete) {
      isComplete = false;
      currentStep = steps.length - 1;
      render();
      focusCurrentStepTitle();
      return;
    }

    if (currentStep > 0) {
      currentStep -= 1;
      render();
      focusCurrentStepTitle();
    }
  });

  quizNextButton.addEventListener("click", () => {
    if (!getRequiredAnswer(steps[currentStep])) {
      return;
    }

    if (currentStep < steps.length - 1) {
      currentStep += 1;
      render();
      focusCurrentStepTitle();
      return;
    }

    isComplete = true;
    render();
    quizFinalPanel.focus();
  });

  quizFinalPanel.tabIndex = -1;
  form.dataset.enhanced = "true";
  render();
});
