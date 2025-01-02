import { useCallback } from "react";

const dateFormat: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
};

const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("en", dateFormat);

const shortDateFormat: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
};

const shortDateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("en", shortDateFormat);

const shortDateYearFormat: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
};

const shortDateYearFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  "en",
  shortDateYearFormat
);

const relativeTimeFormat: Intl.RelativeTimeFormatOptions = {
  localeMatcher: "best fit",
  numeric: "auto",
  style: "long",
};

const relativeTimeFormatter: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(
  "en",
  relativeTimeFormat
);

export function useDateFormatter() {
  const intl: Intl.DateTimeFormat = dateFormatter;

  return useCallback(
    (date: string | Date) => {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return intl.format(dateObj);
    },
    [intl]
  );
}

interface FormatParamsDate {
  format: Intl.DateTimeFormat;
  value: Date;
}

interface FormatParamsRelative {
  format: Intl.RelativeTimeFormat;
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
}

function format(params: FormatParamsDate): string;
function format(params: FormatParamsRelative): string;
function format(p: FormatParamsDate | FormatParamsRelative): string {
  const isDate = !("unit" in p);
  const { locale } = p.format.resolvedOptions();

  if (locale.startsWith("zh")) {
    const dateParts = isDate
      ? p.format.formatToParts(p.value)
      : p.format.formatToParts(p.value, p.unit);
    // Add spaces between date parts
    return dateParts.map(({ value }) => value).join(" ");
  }

  return isDate ? p.format.format(p.value) : p.format.format(p.value, p.unit);
}

export function useRelativeTimeFormatter() {
  const sdyf: Intl.DateTimeFormat = shortDateYearFormatter;
  const sdf: Intl.DateTimeFormat = shortDateFormatter;
  const rtf: Intl.RelativeTimeFormat = relativeTimeFormatter;

  return useCallback(
    (date: string | Date) => {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      const now = new Date();
      const diff = now.getTime() - dateObj.getTime();
      const diffInSeconds = Math.floor(diff / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInYears = now.getUTCFullYear() - dateObj.getUTCFullYear();

      if (diffInYears > 0) return format({ format: sdyf, value: dateObj });
      if (diffInDays >= 30) return format({ format: sdf, value: dateObj });
      if (diffInDays > 0) return format({ format: rtf, value: -diffInDays, unit: "day" });
      if (diffInHours > 0) return format({ format: rtf, value: -diffInHours, unit: "hour" });
      if (diffInMinutes > 0) return format({ format: rtf, value: -diffInMinutes, unit: "minute" });
      return format({ format: rtf, value: -diffInSeconds, unit: "second" });
    },
    [sdyf, sdf, rtf]
  );
}
