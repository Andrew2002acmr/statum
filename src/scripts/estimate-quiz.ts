const quizBlocks = document.querySelectorAll<HTMLElement>(
  "[data-estimate-quiz]",
);

function getRequiredAnswer(step: HTMLElement): HTMLInputElement | null {
  return step.querySelector<HTMLInputElement>(
    'input[type="radio"][data-quiz-option]:checked',
  );
}

function collectAnswers(block: HTMLElement): Record<string, string> {
  const answers: Record<string, string> = {};
  const fields = block.querySelectorAll<HTMLInputElement>(
    'input[type="radio"][data-quiz-option]:checked',
  );

  fields.forEach((field) => {
    answers[field.name] = field.value;
  });

  return answers;
}

function collectReadableAnswers(block: HTMLElement) {
  return Array.from(
    block.querySelectorAll<HTMLElement>("[data-quiz-step]"),
  ).flatMap((step) => {
    const checked = step.querySelector<HTMLInputElement>(
      'input[type="radio"][data-quiz-option]:checked',
    );

    if (!checked) {
      return [];
    }

    return [
      {
        question: step.dataset.questionLabel ?? checked.name,
        answer: checked.dataset.quizOptionLabel ?? checked.value,
      },
    ];
  });
}

function renderSummary(block: HTMLElement, list: HTMLElement) {
  const answers = collectReadableAnswers(block);

  list.replaceChildren(
    ...answers.map(({ question, answer }) => {
      const wrapper = document.createElement("div");
      wrapper.className =
        "rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.04] p-3";

      const term = document.createElement("dt");
      term.className =
        "text-xs font-bold uppercase tracking-[0.1em] text-white/50";
      term.textContent = question;

      const description = document.createElement("dd");
      description.className = "mt-1 text-base font-semibold text-white";
      description.textContent = answer;

      wrapper.append(term, description);
      return wrapper;
    }),
  );
}

quizBlocks.forEach((block) => {
  const steps = Array.from(
    block.querySelectorAll<HTMLElement>("[data-quiz-step]"),
  );
  const section = block.closest<HTMLElement>("[data-estimate-section]");
  const controls = block.querySelector<HTMLElement>("[data-quiz-controls]");
  const progress = block.querySelector<HTMLProgressElement>(
    "[data-quiz-progress]",
  );
  const progressText = block.querySelector<HTMLElement>(
    "[data-quiz-progress-text]",
  );
  const previousButton =
    block.querySelector<HTMLButtonElement>("[data-quiz-prev]");
  const nextButton = block.querySelector<HTMLButtonElement>("[data-quiz-next]");
  const finalPanel = block.querySelector<HTMLElement>("[data-quiz-final]");
  const summaryInput = block.querySelector<HTMLInputElement>(
    "[data-quiz-summary]",
  );
  const summaryList = block.querySelector<HTMLElement>(
    "[data-quiz-summary-list]",
  );

  if (
    steps.length === 0 ||
    !controls ||
    !progress ||
    !progressText ||
    !previousButton ||
    !nextButton ||
    !finalPanel ||
    !summaryInput ||
    !summaryList
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
  const quizSummaryList = summaryList;

  let currentStep = 0;
  let isComplete = false;

  function updateSummary() {
    quizSummaryInput.value = JSON.stringify(collectAnswers(block));
    renderSummary(block, quizSummaryList);
  }

  function focusCurrentStepTitle() {
    const activeTitle = steps[currentStep]?.querySelector<HTMLElement>(
      "[data-quiz-step-title]",
    );

    activeTitle?.focus();
  }

  function resetQuiz() {
    block
      .querySelectorAll<HTMLInputElement>(
        'input[type="radio"][data-quiz-option]',
      )
      .forEach((field) => {
        field.checked = false;
      });

    currentStep = 0;
    isComplete = false;
    render();
  }

  function render() {
    quizControls.hidden = false;
    quizFinalPanel.hidden = !isComplete;
    block.dataset.complete = String(isComplete);

    if (section) {
      section.dataset.complete = String(isComplete);
    }

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

  block.addEventListener("change", (event) => {
    const target = event.target;

    if (
      target instanceof HTMLInputElement &&
      target.matches('[data-quiz-option][type="radio"]')
    ) {
      render();
    }
  });

  block.addEventListener("lead:success-confirmed", (event) => {
    const detail = (event as CustomEvent<{ source?: string }>).detail;

    if (detail?.source === "estimate") {
      resetQuiz();
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
  block.dataset.enhanced = "true";
  render();
});
