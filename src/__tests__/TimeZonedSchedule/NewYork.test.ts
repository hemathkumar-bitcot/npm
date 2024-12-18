import { TimeZonedSchedule } from '../../modules'

describe('TimeZonedSchedule for New York', () => {
  let tzs: TimeZonedSchedule

  beforeEach(() => {
    tzs = new TimeZonedSchedule({
      timeZone: 'America/New_York',
    })
  })

  describe('Daily Schedule', () => {
    test('should generate daily events with DST adjustment', () => {
      //
      const startDate = '2024-03-09T05:00:00Z'
      const endDate = '2024-03-12T03:59:59Z'

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
      const expectedUTC = ['2024-03-09T05:00:00', '2024-03-10T05:00:00', '2024-03-11T04:00:00']
      expect(events).toHaveLength(3)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
      expect(events).toEqual(expect.arrayContaining(expectedUTC))
    })
  })

  describe('Weekly Schedule', () => {
    test('should generate weekly events for specified days with DST adjustment', () => {
      const startDate = '2024-03-03T05:00:00Z'
      const endDate = '2024-03-16T03:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'weekly',
        days: [1], // Monday
        addDynamicOffset: true,
        return: 'timestamp',
      })

      const expectedLocalTimes = ['2024-03-04T00:00:00', '2024-03-11T00:00:00']
      const expectedUTC = ['2024-03-04T05:00:00', '2024-03-11T04:00:00']
      const localEvents = events.map(event => tzs.utcToLocal(event, { return: 'timestamp' }))
      expect(events).toHaveLength(2)
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes))
      expect(events).toEqual(expect.arrayContaining(expectedUTC))
    })

    test('should generate weekly events with DST adjustment', () => {
      //
      const startDate = '2024-03-09T05:00:00Z'
      const endDate = '2024-03-12T03:59:59Z'

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
      const expectedUTC = ['2024-03-09T05:00:00', '2024-03-10T05:00:00', '2024-03-11T04:00:00']
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
  //   add more then 10 test case for monthly schedule
  describe('Monthly Schedule', () => {
    test('should generate monthly events for specified date with DST adjustment', () => {
      const startDate = '2024-03-03T05:00:00Z'
      const endDate = '2024-03-16T03:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-03-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(1)
    })

    test('should generate no events if the specified date is outside the range', () => {
      const startDate = '2024-03-03T05:00:00Z'
      const endDate = '2024-03-10T03:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-03-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(0)
    })

    test('should generate multiple monthly events across different months', () => {
      const startDate = '2024-01-01T05:00:00Z'
      const endDate = '2024-05-01T03:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-01-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(4)
    })

    test('should handle leap year correctly', () => {
      const startDate = '2024-02-01T05:00:00Z'
      const endDate = '2024-03-01T04:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-02-29',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(1)
    })

    test('should handle non-leap year correctly', () => {
      const startDate = '2023-02-01T05:00:00Z'
      const endDate = '2023-03-01T04:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2023-02-28',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(1)
    })

    test('should generate events for a specific day of the month', () => {
      const startDate = '2024-01-01T05:00:00Z'
      const endDate = '2024-12-31T04:59:59Z'

      const events = tzs.schedule(startDate, endDate, {
        type: 'monthly',
        date: '2024-01-15',
        addDynamicOffset: true,
        return: 'timestamp',
      })

      expect(events).toHaveLength(12)
    })
  })
})
