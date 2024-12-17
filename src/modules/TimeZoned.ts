import moment from "moment-timezone";
import { isValidTimezone } from "../utils/validators";
import { getTimezoneOffset } from "../utils/converters";
import { Options, FunctionReturnType } from "../types";

export class TimeZoned {
  protected options: Options;
  protected timezone = "UTC";

  constructor(options?: Options) {
    this.options = options || { return: "moment" };
    if (options?.timeZone && !isValidTimezone(options.timeZone)) {
      throw new Error(`Invalid timezone: ${options.timeZone}`);
    }
    this.timezone = options?.timeZone || this.timezone;
  }

  /**
   * Converts UTC time to local timezone
   * @param utcDate - Date in UTC (can be Date object or ISO string)
   * @param options - Options for conversion, including target timezone
   * @returns Converted local time as moment object or formatted string
   */
  utcToLocal(
    utcDate: Date | string | moment.Moment,
    options: Options = this.options
  ): FunctionReturnType {
    const timezone = options?.timeZone || this.timezone;
    if (!isValidTimezone(timezone)) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }
    const inputFormat = options?.inputFormat || "YYYY-MM-DDTHH:mm:ss";
    const momentObj = moment.utc(utcDate, inputFormat).tz(timezone);
    return this.handleReturn(momentObj, options);
  }

  /**
   * Converts local time to UTC time
   * @param date - Date in local timezone (can be Date object or ISO string)
   * @param options - Options for conversion, including target timezone
   * @returns Converted UTC time as moment object or formatted string
   */
  localToUtc(
    date: Date | string,
    options: Options = this.options
  ): FunctionReturnType {
    const timezone = options.timeZone || this.timezone;
    if (!isValidTimezone(timezone)) {
      throw new Error(`Invalid timezone: ${timezone}`);
    }

    let momentObj: moment.Moment;
    if (typeof date === "string" && options?.inputFormat) {
      const inputFormat = options.inputFormat || "YYYY-MM-DDTHH:mm:ss";
      momentObj = moment.tz(date, inputFormat, timezone).utc();
    } else {
      momentObj = moment.tz(date, timezone).utc();
    }
    return this.handleReturn(momentObj, options);
  }

  protected handleReturn(
    momentObj: moment.Moment,
    options: Options = this.options
  ): FunctionReturnType {
    switch (options?.return) {
      case "date":
        return momentObj.format("YYYY-MM-DD");
      case "time":
        return momentObj.format("HH:mm:ss");
      case "timestamp":
        return momentObj.format("YYYY-MM-DDTHH:mm:ss");
      case "string":
        if (options?.returnFormat === "12") {
          return momentObj.format("YYYY-MM-DDThh:mm:ss A");
        } else if (options?.returnFormat === "24") {
          return momentObj.format("YYYY-MM-DDTHH:mm:ss");
        } else {
          return momentObj.format(options?.returnFormat);
        }
      case "Date":
        return momentObj.toDate();
      default:
        return momentObj;
    }
  }

  /**
   * Gets the timezone offset in hours
   * @param timezone - Timezone to check
   * @returns Offset in hours (e.g., +5.5 for India)
   */
  getTimezoneOffset = getTimezoneOffset;

  /**
   * Checks if a timezone name is valid
   * @param timezone - Timezone to validate
   * @returns boolean indicating if timezone is valid
   */
  isValidTimezone = isValidTimezone;
}
