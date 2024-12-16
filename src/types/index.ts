export type TimeZoneOptions = {
  format?: string;
  strictParsing?: boolean;
  locale?: string;
};

export type DateType = Date | string | moment.Moment;

export type Options = {
  return?: ReturnType | "string" | "Date";
  returnFormat?: string;
  timeZone?: string;
  inputFormat?: string;
};

export type ScheduleOptions = Options & {
  addDynamicOffset?: boolean;
} & (
    | {
        type: "weekly";
        days: (
          | 0 // Sunday
          | 1 // Monday
          | 2 // Tuesday
          | 3 // Wednesday
          | 4 // Thursday
          | 5 // Friday
          | 6
        )[]; // Saturday
      }
    | { type: "monthly"; date: DateType }
    | { type: "daily" }
  );

export type ReturnType = "date" | "moment" | "timestamp" | "time" | "Date";

export type FunctionReturnType = string | moment.Moment | Date;
