import { moment } from '../../utils'
import { TimeZoned } from '../../modules'

describe('TimeZoned', () => {
  // Los Angeles Tests
  describe('Los Angeles', () => {
    let tz: TimeZoned

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: 'America/Los_Angeles' })
    })

    describe('UTC to Local', () => {
      it('converts UTC to LA time with default options', () => {
        const result = tz.utcToLocal('2024-01-01T08:00:00Z', { return: 'timestamp' })
        expect(result).toBe('2024-01-01T00:00:00')
      })

      it('handles different input formats', () => {
        const result = tz.utcToLocal('2024-01-01 08:00:00', {
          return: 'timestamp',
          inputFormat: 'YYYY-MM-DD HH:mm:ss',
        })
        expect(result).toBe('2024-01-01T00:00:00')
      })

      it('handles DST transition correctly', () => {
        const result = tz.utcToLocal('2024-03-10T10:00:00Z', { return: 'timestamp' })
        expect(result).toBe('2024-03-10T03:00:00') // DST begins March 10, 2024 2:00 AM
      })
    })

    describe('Local to UTC', () => {
      it('converts LA time to UTC with default options', () => {
        const result = tz.localToUtc('2024-01-01T00:00:00', { return: 'timestamp' })
        expect(result).toBe('2024-01-01T08:00:00')
      })

      it('handles different return formats', () => {
        const localTime = '2024-01-01T00:00:00'

        expect(tz.localToUtc(localTime, { return: 'date' })).toBe('2024-01-01')
        expect(tz.localToUtc(localTime, { return: 'time' })).toBe('08:00:00')
        expect(tz.localToUtc(localTime, { return: 'string', returnFormat: '12' })).toBe(
          '2024-01-01T08:00:00 AM'
        )
      })
    })
  })

  // India Tests
  describe('India', () => {
    let tz: TimeZoned

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: 'Asia/Kolkata' })
    })

    describe('UTC to Local', () => {
      it('converts UTC to IST with default options', () => {
        const result = tz.utcToLocal('2024-01-01T00:00:00Z', { return: 'timestamp' })
        expect(result).toBe('2024-01-01T05:30:00')
      })

      it('handles Date object input', () => {
        const result = tz.utcToLocal(new Date('2024-01-01T00:00:00Z'), { return: 'timestamp' })
        expect(result).toBe('2024-01-01T05:30:00')
      })
    })

    describe('Local to UTC', () => {
      it('converts IST to UTC with default options', () => {
        const result = tz.localToUtc('2024-01-01T05:30:00', { return: 'timestamp' })
        expect(result).toBe('2024-01-01T00:00:00')
      })
    })
  })

  // Error Handling Tests
  describe('Error Handling', () => {
    it('throws error for invalid timezone', () => {
      expect(() => new TimeZoned({ timeZone: 'Invalid/Timezone' })).toThrow('Invalid timezone')
    })

    it('handles empty options', () => {
      const tz = new TimeZoned()
      const result = tz.utcToLocal('2024-01-01T00:00:00Z')
      expect(result).toBeInstanceOf(moment)
    })
  })

  // Return Format Tests
  describe('Return Formats', () => {
    const tz = new TimeZoned({ timeZone: 'UTC' })
    const testDate = '2024-01-01T00:00:00Z'

    it('returns Date object when specified', () => {
      const result = tz.utcToLocal(testDate, { return: 'Date' })
      expect(result).toBeInstanceOf(Date)
    })

    it('returns moment object by default', () => {
      const result = tz.utcToLocal(testDate)
      expect(moment.isMoment(result)).toBe(true)
    })

    it('handles custom return format', () => {
      const result = tz.utcToLocal(testDate, {
        return: 'string',
        returnFormat: 'MM/DD/YYYY HH:mm',
      })
      expect(result).toBe('01/01/2024 00:00')
    })
  })

  // New York Tests
  describe('New York', () => {
    let tz: TimeZoned

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: 'America/New_York' })
    })

    describe('UTC to Local', () => {
      it('converts UTC to NY time with default options', () => {
        const result = tz.utcToLocal('2024-01-01T05:00:00Z', { return: 'timestamp' })
        expect(result).toBe('2024-01-01T00:00:00')
      })

      it('handles spring DST transition', () => {
        const result = tz.utcToLocal('2024-03-10T06:59:59Z', { return: 'timestamp' })
        expect(result).toBe('2024-03-10T01:59:59') // DST begins
      })

      it('handles fall DST transition', () => {
        const result = tz.utcToLocal('2024-11-03T05:59:59Z', { return: 'timestamp' })
        expect(result).toBe('2024-11-03T01:59:59') // DST ends
      })
    })

    describe('Local to UTC', () => {
      it('converts NY time to UTC with various formats', () => {
        const localTime = '2024-01-01T00:00:00'

        expect(tz.localToUtc(localTime, { return: 'timestamp' })).toBe('2024-01-01T05:00:00')
        expect(tz.localToUtc(localTime, { return: 'date' })).toBe('2024-01-01')
        expect(tz.localToUtc(localTime, { return: 'time' })).toBe('05:00:00')
        expect(
          tz.localToUtc(localTime, { return: 'string', returnFormat: 'MM/DD/YYYY HH:mm:ss' })
        ).toBe('01/01/2024 05:00:00')
      })
    })
  })

  // Tokyo Tests
  describe('Tokyo', () => {
    let tz: TimeZoned

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: 'Asia/Tokyo' })
    })

    describe('UTC to Local', () => {
      it('converts UTC to JST with default options', () => {
        const result = tz.utcToLocal('2024-01-01T00:00:00Z', { return: 'timestamp' })
        expect(result).toBe('2024-01-01T09:00:00')
      })

      it('handles different input formats', () => {
        const testCases = [
          { input: '2024-01-01 00:00:00', format: 'YYYY-MM-DD HH:mm:ss' },
          { input: '01/01/2024 00:00', format: 'MM/DD/YYYY HH:mm' },
          { input: '2024-01-01', format: 'YYYY-MM-DD' },
        ]

        testCases.forEach(({ input, format }) => {
          const result = tz.utcToLocal(input, {
            return: 'timestamp',
            inputFormat: format,
          })
          expect(result).toBe('2024-01-01T09:00:00')
        })
      })
    })

    describe('Local to UTC', () => {
      it('handles various return formats', () => {
        const localTime = '2024-01-01T09:00:00'

        const dateResult = tz.localToUtc(localTime, { return: 'Date' }) as Date
        expect(dateResult).toBeInstanceOf(Date)
        expect(dateResult.toISOString()).toBe('2024-01-01T00:00:00.000Z')

        const momentResult = tz.localToUtc(localTime) as moment.Moment
        expect(moment.isMoment(momentResult)).toBe(true)
        expect(momentResult.utc().format()).toBe('2024-01-01T00:00:00Z')

        expect(tz.localToUtc(localTime, { return: 'string', returnFormat: '12' })).toBe(
          '2024-01-01T12:00:00 AM'
        )
      })
    })
  })

  // Return Type Tests Across Timezones
  describe('Return Types', () => {
    const timezones = [
      { zone: 'America/Los_Angeles', name: 'LA' },
      { zone: 'America/New_York', name: 'NY' },
      { zone: 'Asia/Tokyo', name: 'Tokyo' },
      { zone: 'Asia/Kolkata', name: 'India' },
    ]

    timezones.forEach(({ zone, name }) => {
      describe(name, () => {
        let tz: TimeZoned

        beforeEach(() => {
          tz = new TimeZoned({ timeZone: zone })
        })

        it('handles all return types consistently', () => {
          const testDate = '2024-01-01T00:00:00Z'

          const momentResult = tz.utcToLocal(testDate)
          expect(moment.isMoment(momentResult)).toBe(true)

          const dateResult = tz.utcToLocal(testDate, { return: 'Date' })
          expect(dateResult).toBeInstanceOf(Date)

          const timestampResult = tz.utcToLocal(testDate, { return: 'timestamp' })
          expect(timestampResult).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)

          const customResult = tz.utcToLocal(testDate, {
            return: 'string',
            returnFormat: 'YYYY-MM-DD',
          })
          expect(customResult).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        })
      })
    })
  })
})
