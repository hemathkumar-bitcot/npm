import moment from "moment-timezone";

export const isValidTimezone = (timezone: string): boolean => {
  return moment.tz.zone(timezone) !== null;
};
