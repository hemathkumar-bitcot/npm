import { TimeZonedSchedule } from '../../modules'
import { moment } from '../../utils'

describe('TimeZonedSchedule for Los Angeles', () => {
  let tzs: TimeZonedSchedule

  beforeEach(() => {
    tzs = new TimeZonedSchedule({
      timeZone: 'America/Los_Angeles',
    })
  })

  describe('Daily Schedule', () => {
    test('should generate daily events with DST adjustment', () => {
      //
      const startDate = '2024-03-09T08:00:00Z'
      const endDate = '2024-03-12T06:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      // Convert to local times for verification
      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      const expectedLocalTimes = [
        '2024-03-09T00:00:00',
        '2024-03-10T00:00:00',
        '2024-03-11T00:00:00',
      ]
      const expectedUTC = ['2024-03-09T08:00:00', '2024-03-10T08:00:00', '2024-03-11T07:00:00']
      expect(events).toHaveLength(3)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
      expect(events).toEqual(expect.arrayContaining(expectedUTC))
    })

    test('should handle single day schedule', () => {
      const startDate = '2024-01-01T08:00:00Z'
      const endDate = '2024-01-01T23:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(1)
      expect(tzs.utcToLocal(events[0], { return: 'timestamp' })).toBe('2024-01-01T00:00:00')
    })

    test('should handle month boundary transition', () => {
      const startDate = '2024-01-30T08:00:00Z'
      const endDate = '2024-02-02T07:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      const expectedLocalTimes = [
        '2024-01-30T00:00:00',
        '2024-01-31T00:00:00',
        '2024-02-01T00:00:00',
      ]

      expect(events).toHaveLength(3)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
    })

    test('should handle year boundary transition', () => {
      const startDate = '2023-12-30T08:00:00Z'
      const endDate = '2024-01-02T07:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      const expectedLocalTimes = [
        '2023-12-30T00:00:00',
        '2023-12-31T00:00:00',
        '2024-01-01T00:00:00',
      ]

      expect(events).toHaveLength(3)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
    })

    test('should handle leap year date (February 29)', () => {
      const startDate = '2024-02-28T08:00:00Z'
      const endDate = '2024-03-01T07:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      const expectedLocalTimes = ['2024-02-28T00:00:00', '2024-02-29T00:00:00']

      expect(events).toHaveLength(2)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
    })

    test('should handle different return formats', () => {
      const startDate = '2024-01-01T08:00:00Z'
      const endDate = '2024-01-02T07:59:59Z'

      // Test with moment return type
      const momentEvents = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'moment',
      })

      expect(momentEvents).toHaveLength(1)
      expect(moment.isMoment(momentEvents[0])).toBeTruthy()

      // Test with Date return type
      const dateEvents = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: true,
        return: 'Date',
      })

      expect(dateEvents).toHaveLength(1)
      expect(dateEvents[0] instanceof Date).toBeTruthy()
    })

    test('should handle schedule without dynamic offset', () => {
      const startDate = '2024-03-09T08:00:00Z'
      const endDate = '2024-03-11T07:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'daily',
        addDynamicOffset: false,
        return: 'timestamp',
      })

      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      expect(events).toHaveLength(2)
      // Verify that events maintain consistent UTC offset
      expect(events.every(event => event.toString().endsWith('T08:00:00'))).toBe(true)
    })
  })

  describe('Weekly Schedule', () => {
    test('should generate weekly events for specified days with DST adjustment', () => {
      const startDate = '2024-03-03T08:00:00Z'
      const endDate = '2024-03-16T06:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'weekly',
        days: [1], // Monday
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const expectedLocalTimes = ['2024-03-04T00:00:00', '2024-03-11T00:00:00']
      const expectedUTC = ['2024-03-04T08:00:00', '2024-03-11T07:00:00']
      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))
      expect(events).toHaveLength(2)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
      expect(events).toEqual(expect.arrayContaining(expectedUTC))
    })

    test('should generate weekly events with DST adjustment', () => {
      //
      const startDate = '2024-03-09T08:00:00Z'
      const endDate = '2024-03-12T06:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'weekly',
        days: [0, 1, 2, 3, 4, 5, 6],
        addDynamicOffset: true,
        return: 'timestamp',
      })

      // Convert to local times for verification
      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      const expectedLocalTimes = [
        '2024-03-09T00:00:00',
        '2024-03-10T00:00:00',
        '2024-03-11T00:00:00',
      ]
      const expectedUTC = ['2024-03-09T08:00:00', '2024-03-10T08:00:00', '2024-03-11T07:00:00']
      expect(events).toHaveLength(3)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
      expect(events).toEqual(expect.arrayContaining(expectedUTC))
    })

    test('should handle empty days array', () => {
      const startDate = '2024-01-01T00:00:00Z'
      const endDate = '2024-01-07T00:00:00Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'weekly',
        days: [],
        addDynamicOffset: true,
      })

      expect(events).toHaveLength(0)
    })
  })

  describe('Error Handling', () => {
    test('should handle invalid date range', () => {
      const startDate = '2024-01-02T00:00:00Z'
      const endDate = '2024-01-01T00:00:00Z'

      const events = tzs.schedule(startDate, endDate)
      expect(events).toHaveLength(0)
    })

    test('should handle invalid timezone', () => {
      expect(() => {
        new TimeZonedSchedule({ timeZone: 'Invalid/Timezone' })
      }).toThrow()
    })
  })

  describe('Monthly Schedule', () => {
    test('should generate monthly events for specified date with DST adjustment', () => {
      const startDate = '2024-03-03T08:00:00Z'
      const endDate = '2024-03-16T06:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-03-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      expect(events).toHaveLength(1)
      expect(events).toEqual(expect.arrayContaining(['2024-03-15T07:00:00']))
      expect(localEvents).toEqual(expect.arrayContaining(['2024-03-15T00:00:00']))
    })

    test('should generate no events if the specified date is outside the range', () => {
      const startDate = '2024-03-03T08:00:00Z'
      const endDate = '2024-03-10T06:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-03-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(0)
    })

    test('should generate multiple monthly events across different months', () => {
      const startDate = '2024-01-01T08:00:00Z'
      const endDate = '2024-05-01T06:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-01-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))

      expect(events).toHaveLength(4)
      expect(events).toEqual(
        expect.arrayContaining([
          '2024-01-15T08:00:00',
          '2024-02-15T08:00:00',
          '2024-03-15T07:00:00',
          '2024-04-15T07:00:00',
        ])
      )
      expect(localEvents).toEqual(
        expect.arrayContaining([
          '2024-01-15T00:00:00',
          '2024-02-15T00:00:00',
          '2024-03-15T00:00:00',
          '2024-04-15T00:00:00',
        ])
      )
    })
  })
})
