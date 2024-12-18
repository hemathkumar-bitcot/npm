import moment from 'moment-timezone'

// Base types
export type DateType = Date | string | moment.Moment

export type TimeZoneOptions = {
  format?: string
  strictParsing?: boolean
  locale?: string
}

// Return type literals
export type ReturnType = 'date' | 'moment' | 'timestamp' | 'time' | 'Date'
export type ReturnFormat = string | '12' | '24'

// Function return types
export type FunctionReturnType = string | moment.Moment | Date

// Schedule types
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

type BaseScheduleType = {
  addDynamicOffset?: boolean
}

type DailySchedule = BaseScheduleType & {
  type: 'daily'
}

type WeeklySchedule = BaseScheduleType & {
  type: 'weekly'
  days: DayOfWeek[]
}

type MonthlySchedule = BaseScheduleType & {
  type: 'monthly'
  date: DateType
}

export type ScheduleOptions = Options & (DailySchedule | WeeklySchedule | MonthlySchedule)

// Options types
type BaseOptionsType = {
  timeZone?: string
  inputFormat?: string
}

export type StringReturnOptions = BaseOptionsType & {
  return: 'string'
  returnFormat: ReturnFormat
}

type OtherReturnOptions = BaseOptionsType & {
  return: ReturnType
}

export type SetOptions = StringReturnOptions | OtherReturnOptions
export type AddOptions = SetOptions

type BaseOptions = BaseOptionsType & {
  return?: ReturnType
}

type StringFormatOptions = BaseOptionsType & {
  return: 'string'
  returnFormat: ReturnFormat
  inputFormat?: string | 'HH:mm:ss'
}

export type Options = BaseOptions | StringFormatOptions

// Utility types
export type TimezoneValidation<T extends string = string> = T extends keyof typeof moment.tz
  ? T
  : string

export type TimeUnit =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'
  | 'HH:mm:ss'
  | 'HH:mm'
