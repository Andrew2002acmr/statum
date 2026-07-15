export type SubmissionDialogMode = "success" | "error";

const dialogCopy: Record<
  SubmissionDialogMode,
  { title: string; message: string; retry: boolean }
> = {
  success: {
    title: "Заявка отправлена",
    message:
      "Параметры ремонта и контактные данные переданы специалисту. С вами свяжутся после обработки заявки.",
    retry: false,
  },
  error: {
    title: "Не удалось отправить заявку",
    message: "Данные не были отправлены. Попробуйте ещё раз немного позже.",
    retry: true,
  },
};

export interface SubmissionDialogController {
  show: (mode: SubmissionDialogMode) => void;
  close: () => void;
}

export function createSubmissionDialogController(
  dialog: HTMLDialogElement,
  form: HTMLFormElement,
  onSuccessConfirmed: () => void,
): SubmissionDialogController {
  const title = dialog.querySelector<HTMLElement>(
    "[data-submission-dialog-title]",
  );
  const message = dialog.querySelector<HTMLElement>(
    "[data-submission-dialog-message]",
  );
  const closeButton = dialog.querySelector<HTMLButtonElement>(
    "[data-submission-dialog-close]",
  );
  const retryButton = dialog.querySelector<HTMLButtonElement>(
    "[data-submission-dialog-retry]",
  );

  let mode: SubmissionDialogMode = "success";
  let returnFocusTo: HTMLElement | null = null;

  closeButton?.addEventListener("click", () => dialog.close("close"));

  retryButton?.addEventListener("click", () => {
    dialog.close("retry");
    form.requestSubmit();
  });

  dialog.addEventListener("close", () => {
    if (mode === "success") {
      onSuccessConfirmed();
    }

    returnFocusTo?.focus();
    returnFocusTo = null;
  });

  return {
    show(nextMode) {
      mode = nextMode;
      returnFocusTo = document.activeElement as HTMLElement | null;

      const copy = dialogCopy[nextMode];
      if (title) {
        title.textContent = copy.title;
      }

      if (message) {
        message.textContent = copy.message;
      }

      if (retryButton) {
        retryButton.hidden = !copy.retry;
      }

      if (!dialog.open) {
        dialog.showModal();
      }

      (copy.retry ? retryButton : closeButton)?.focus();
    },
    close() {
      dialog.close("close");
    },
  };
}
