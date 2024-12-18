import { moment } from './index'
import { isValidTimezone } from './validators'

export const getTimezoneOffset = (timezone: string): number => {
  if (!isValidTimezone(timezone)) {
    throw new Error(`Invalid timezone: ${timezone}`)
  }
  return moment.tz(timezone).utcOffset() / 60
}
