import { moment, isValidTimezone, getTimezoneOffset } from '../utils'
import { TimezoneValidation, TimeUnit, SetOptions, AddOptions, Options } from '../types'

/**
 * Class for handling timezone conversions and date/time manipulations
 * @class TimeZoned
 */
export class TimeZoned<T = moment.Moment> {
  protected options: Options
  protected timezone: TimezoneValidation = 'UTC'

  /**
   * Creates an instance of TimeZoned
   * @param {Options} [options] - Configuration options
   * @param {string} [options.timeZone] - Target timezone
   * @param {string} [options.return] - Return type format
   * @throws {Error} If provided timezone is invalid
   */
  constructor(options?: Options) {
    this.options = options || { return: 'moment' }
    if (options?.timeZone) {
      if (!isValidTimezone(options.timeZone)) {
        throw new Error(`Invalid timezone: ${options.timeZone}`)
      }
      this.timezone = options.timeZone as TimezoneValidation
    }
  }

  /**
   * Converts UTC time to local timezone
   * @param {Date | string | moment.Moment} utcDate - Date in UTC
   * @param {Options} [options] - Conversion options
   * @param {string} [options.timeZone] - Target timezone
   * @param {string} [options.inputFormat] - Input date format
   * @param {string} [options.returnFormat] - Return format
   * @returns {T} Converted local time
   * @throws {Error} If timezone is invalid
   */
  utcToLocal<R = T>(utcDate: DateType, options: Options = this.options): R {
    const timezone = options?.timeZone || this.timezone
    if (!isValidTimezone(timezone)) {
      throw new Error(`Invalid timezone: ${timezone}`)
    }
    const inputFormat = options?.inputFormat || 'YYYY-MM-DDTHH:mm:ss'
    return this.handleReturn(moment.utc(utcDate, inputFormat).tz(timezone), options) as R
  }

  /**
   * Converts local time to UTC time
   * @param {Date | string} date - Date in local timezone
   * @param {Options} [options] - Conversion options
   * @param {string} [options.timeZone] - Source timezone
   * @param {string} [options.inputFormat] - Input date format
   * @param {string} [options.returnFormat] - Return format
   * @returns {T} Converted UTC time
   * @throws {Error} If timezone is invalid
   */
  localToUtc<R = T>(date: Date | string, options: Options = this.options): R {
    const timezone = options.timeZone || this.timezone
    if (!isValidTimezone(timezone)) {
      throw new Error(`Invalid timezone: ${timezone}`)
    }

    const momentObj =
      typeof date === 'string' && options?.inputFormat
        ? moment.tz(date, options.inputFormat || 'YYYY-MM-DDTHH:mm:ss', timezone).utc()
        : moment.tz(date, timezone).utc()

    return this.handleReturn(momentObj, options) as R
  }

  /**
   * Sets date/time components of a given date
   * @param {Date | string | moment.Moment} date - Input date
   * @param {string | number} amount - Amount to set
   * @param {string} unit - Unit to set (HH:mm:ss, HH:mm, etc)
   * @param {"local" | "utc"} type - Time type
   * @param {SetOptions} [options] - Additional options
   * @returns {T} Modified date
   */
  setDateTime<R = T>(
    date: DateType,
    amount: string | number,
    unit: TimeUnit,
    type: 'local' | 'utc',
    options: SetOptions = this.options as SetOptions
  ): R {
    const momentObj = type === 'local' ? moment.tz(date, this.timezone) : moment.utc(date)

    const setObj: Record<string, number> = {}

    if (typeof amount === 'string' && unit.includes(':')) {
      const [hours, minutes, seconds] = amount.split(':').map(Number)
      Object.assign(setObj, { hours, minutes, ...(seconds && { seconds }) })
    } else {
      const value = Number(amount)
      setObj[unit] = value
    }

    return this.handleReturn(momentObj.startOf('day').set(setObj), options) as R
  }

  /**
   * Adds time duration to a date
   * @param {Date | string | moment.Moment} date - Input date
   * @param {string | number} amount - Amount to add
   * @param {string} unit - Time unit
   * @param {"local" | "utc"} type - Time type
   * @param {string} from - Starting point
   * @param {AddOptions} [options] - Additional options
   * @returns {T} Modified date
   */
  addDateTime<R = T>(
    date: DateType,
    amount: string | number,
    unit: TimeUnit,
    type: 'local' | 'utc',
    from: 'startOfDay' | 'endOfDay' | 'startOfMonth' | 'endOfMonth' | 'startOfYear' | 'endOfYear',
    options: AddOptions = this.options as AddOptions
  ): R {
    let momentObj = type === 'local' ? moment.tz(date, this.timezone) : moment.utc(date)

    momentObj = momentObj.startOf(
      from.replace(/^(start|end)Of/, '').toLowerCase() as moment.unitOfTime.StartOf
    )
    if (from.startsWith('end')) {
      momentObj = momentObj.endOf(
        from.replace('endOf', '').toLowerCase() as moment.unitOfTime.StartOf
      )
    }

    if (typeof amount === 'string' && amount.includes(':')) {
      const [hours, minutes, seconds = 0] = amount.split(':').map(Number)
      momentObj = momentObj.add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds')
    } else if (typeof amount === 'number') {
      momentObj = momentObj.add(amount, unit as moment.unitOfTime.DurationConstructor)
    }

    return this.handleReturn(momentObj, options) as R
  }

  /**
   * Formats moment object according to options
   * @param {moment.Moment} momentObj - Moment object to format
   * @param {Options} [options] - Format options
   * @returns {T} Formatted date/time
   */
  protected handleReturn<R = T>(momentObj: moment.Moment, options: Options = this.options): R {
    const format = {
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss',
      timestamp: 'YYYY-MM-DDTHH:mm:ss',
      '12': 'YYYY-MM-DDThh:mm:ss A',
      '24': 'YYYY-MM-DDTHH:mm:ss',
    }

    if (options?.return === 'Date') return momentObj.toDate() as R
    if (options?.return === 'string' && options.returnFormat) {
      return momentObj.format(
        options.returnFormat in format
          ? format[options.returnFormat as keyof typeof format]
          : options.returnFormat
      ) as R
    }
    if (options?.return && options.return in format) {
      return momentObj.format(format[options.return as keyof typeof format]) as R
    }
    return momentObj as R
  }

  /**
   * Gets the timezone offset in hours
   * @param {string} timezone - Timezone to check
   * @returns {number} Offset in hours (e.g., +5.5 for India)
   */
  getTimezoneOffset = getTimezoneOffset

  /**
   * Checks if a timezone name is valid
   * @param {string} timezone - Timezone to validate
   * @returns {boolean} Whether timezone is valid
   */
  isValidTimezone = isValidTimezone
}
