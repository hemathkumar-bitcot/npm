// ... previous test code ...

import { TimeZoned } from '../../modules'
import { moment } from '../../utils'
import { SetOptions, TimeUnit } from '../../types'

describe('setDateTime Tests', () => {
  let tz: TimeZoned
  const testDate = '2024-01-01T14:30:45'

  beforeEach(() => {
    tz = new TimeZoned({ timeZone: 'UTC' })
  })

  const testCases = [
    {
      description: 'should set HH:mm:ss format',
      date: '2024-01-01T00:00:00',
      amount: '14:30:45',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T14:30:45',
    },
    {
      description: 'should set HH:mm format',
      date: '2024-01-01T00:00:00',
      amount: '14:30',
      unit: 'HH:mm' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T14:30:00',
    },
    {
      description: 'should set minute',
      date: '2024-01-01T00:00:00',
      amount: 30,
      unit: 'minute' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T00:30:00',
    },
    {
      description: 'should set hour',
      date: '2024-01-01T00:00:00',
      amount: 14,
      unit: 'hour' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T14:00:00',
    },
    {
      description: 'should set day',
      date: '2024-01-01T00:00:00',
      amount: 15,
      unit: 'day' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-15T00:00:00',
    },
    {
      description: 'should set month',
      date: '2024-01-01T00:00:00',
      amount: 6,
      unit: 'month' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-07-01T00:00:00',
    },
    {
      description: 'should set year',
      date: '2024-01-01T00:00:00',
      amount: 2025,
      unit: 'year' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2025-01-01T00:00:00',
    },
    {
      description: 'should handle startOf day',
      date: testDate,
      amount: 14,
      unit: 'hour' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T14:00:00',
    },
    {
      description: 'should handle local type',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T09:00:00',
    },
    {
      description: 'should handle UTC type',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'utc',
      options: { return: 'timestamp' },
      expected: '2024-01-01T09:00:00',
    },
    {
      description: 'should handle Date object input',
      date: new Date('2024-01-01T14:30:45'),
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T09:00:00',
    },
    {
      description: 'should handle moment object input',
      date: moment('2024-01-01T14:30:45'),
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'timestamp' },
      expected: '2024-01-01T09:00:00',
    },
    {
      description: 'should handle different return formats (date)',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'date' },
      expected: '2024-01-01',
    },
    {
      description: 'should handle different return formats (time)',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'time' },
      expected: '09:00:00',
    },
    {
      description: 'should handle different return formats (custom)',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'string', returnFormat: 'MM/DD/YYYY HH:mm:ss' },
      expected: '01/01/2024 09:00:00',
    },
    {
      description: 'should handle different timezones (New York)',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'timestamp' },
      timeZone: 'America/New_York',
      expected: '2024-01-01T09:00:00',
    },
    {
      description: 'should handle different timezones (Tokyo)',
      date: testDate,
      amount: '09:00:00',
      unit: 'HH:mm:ss' as const,
      type: 'local',
      options: { return: 'timestamp' },
      timeZone: 'Asia/Tokyo',
      expected: '2024-01-01T09:00:00',
    },
  ]

  testCases.forEach(({ description, date, amount, unit, type, options, timeZone, expected }) => {
    test(description, () => {
      if (timeZone) {
        tz = new TimeZoned({ timeZone })
      }
      const result = tz.setDateTime(
        date,
        amount,
        unit as TimeUnit,
        type as 'local' | 'utc',
        options as SetOptions
      )
      expect(result).toBe(expected)
    })
  })
})
