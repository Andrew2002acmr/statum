import { ActionError, defineAction } from "astro:actions";
import { formatLeadMessage } from "../lib/server/lead-message";
import { leadInputSchema, normalizeLeadInput } from "../lib/server/lead-schema";
import { assertLeadRateLimit, RateLimitError } from "../lib/server/rate-limit";
import {
  isMockLeadDeliveryEnabled,
  sendTelegramLead,
  TelegramTransportError,
} from "../lib/server/telegram";
import {
  TurnstileVerificationError,
  verifyTurnstileToken,
} from "../lib/server/turnstile";

function toSafeActionError(error: unknown): ActionError {
  if (error instanceof RateLimitError) {
    return new ActionError({
      code: "TOO_MANY_REQUESTS",
      message: "Слишком много попыток. Попробуйте позже.",
    });
  }

  if (error instanceof TurnstileVerificationError) {
    return new ActionError({
      code: "BAD_REQUEST",
      message: "Не удалось пройти антиспам-проверку.",
    });
  }

  if (error instanceof TelegramTransportError) {
    return new ActionError({
      code: "SERVICE_UNAVAILABLE",
      message: "Не удалось отправить заявку. Попробуйте позже.",
    });
  }

  return new ActionError({
    code: "BAD_REQUEST",
    message: "Не удалось обработать заявку.",
  });
}

export const server = {
  submitLead: defineAction({
    accept: "form",
    input: leadInputSchema,
    handler: async (input, context) => {
      try {
        if (input.company) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Не удалось обработать заявку.",
          });
        }

        assertLeadRateLimit(
          `${context.clientAddress ?? "unknown"}:${input.source}`,
        );

        await verifyTurnstileToken({
          token: input.turnstileToken,
          hostname: context.url.hostname,
          allowTestBypass: await isMockLeadDeliveryEnabled(),
        });

        const pageUrl =
          context.request.headers.get("referer") ?? context.url.origin;
        const lead = normalizeLeadInput(input, pageUrl);
        const message = formatLeadMessage(lead);

        await sendTelegramLead(message);

        return {
          ok: true,
        };
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }

        const reason = error instanceof Error ? error.name : "unknown";
        context.logger.warn(
          `lead_submit_failed reason=${reason} source=${input.source}`,
        );

        throw toSafeActionError(error);
      }
    },
  }),
};
