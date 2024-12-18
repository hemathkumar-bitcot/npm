declare global {
  // Base types
  export type DateType = Date | string | moment.Moment;

  export type TimeZoneOptions = {
    format?: string;
    strictParsing?: boolean;
    locale?: string;
  };

  // Return type literals
  export type ReturnType = "date" | "moment" | "timestamp" | "time" | "Date";
  export type ReturnFormat = string | "12" | "24";

  // Function return types
  export type FunctionReturnType = string | moment.Moment | Date;

  // Schedule types
  type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export {};
