import moment from "moment-timezone";
import { TimezoneValidation } from "../types";

export const isValidTimezone = (timezone: string): timezone is TimezoneValidation<string> => {
  return moment.tz.zone(timezone) !== null;
};
