import { StringReturnOptions } from ".";
import { SetOptions } from "..";
import moment from "moment-timezone";

// Type guards
export function isStringReturnOptions(
  options: SetOptions
): options is StringReturnOptions {
  return options.return === "string";
}

export function isDateType(value: unknown): value is DateType {
  return (
    value instanceof Date || typeof value === "string" || moment.isMoment(value)
  );
}
