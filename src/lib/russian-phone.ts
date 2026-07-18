const COUNTRY_CODE = "7";
const MAX_NATIONAL_DIGITS = 10;

export type RussianPhoneError =
  "empty" | "incomplete" | "invalid-country" | "invalid-length";

export interface RussianPhoneResult {
  canonical: string;
  display: string;
  nationalDigits: string;
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeRussianPhone(
  value: string,
): RussianPhoneResult | { error: RussianPhoneError } {
  const digits = digitsOnly(value);

  if (digits.length === 0) {
    return { error: "empty" };
  }

  if (digits.length < 11) {
    return { error: "incomplete" };
  }

  if (digits.length > 11) {
    return { error: "invalid-length" };
  }

  const normalizedDigits =
    digits.startsWith("8") && digits.length === 11
      ? `${COUNTRY_CODE}${digits.slice(1)}`
      : digits;

  if (!normalizedDigits.startsWith(COUNTRY_CODE)) {
    return { error: "invalid-country" };
  }

  if (normalizedDigits.length !== 11) {
    return { error: "invalid-length" };
  }

  const nationalDigits = normalizedDigits.slice(1);

  return {
    canonical: `+${normalizedDigits}`,
    display: formatRussianPhoneFromNationalDigits(nationalDigits),
    nationalDigits,
  };
}

export function getRussianPhoneNationalDigits(value: string) {
  const digits = digitsOnly(value);

  if (digits.startsWith("8")) {
    return digits.slice(1, 11);
  }

  if (digits.startsWith(COUNTRY_CODE)) {
    return digits.slice(1, 11);
  }

  return digits.slice(0, MAX_NATIONAL_DIGITS);
}

export function formatRussianPhoneFromNationalDigits(value: string) {
  const digits = digitsOnly(value).slice(0, MAX_NATIONAL_DIGITS);
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const firstPair = digits.slice(6, 8);
  const secondPair = digits.slice(8, 10);

  let formatted = "+7";

  if (area) {
    formatted += ` (${area}`;
    if (area.length === 3) {
      formatted += ")";
    }
  }

  if (prefix) {
    formatted += ` ${prefix}`;
  }

  if (firstPair) {
    formatted += `-${firstPair}`;
  }

  if (secondPair) {
    formatted += `-${secondPair}`;
  }

  return formatted;
}

export function formatRussianPhone(value: string) {
  return formatRussianPhoneFromNationalDigits(
    getRussianPhoneNationalDigits(value),
  );
}

export function isCompleteRussianPhone(value: string) {
  return "canonical" in normalizeRussianPhone(value);
}
