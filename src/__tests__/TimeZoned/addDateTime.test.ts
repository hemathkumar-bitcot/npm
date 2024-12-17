import { TimeZoned } from "../../modules/TimeZoned";
import moment from "moment-timezone";
import { AddOptions, Options } from "../../types";

describe("addDateTime Tests", () => {
  let tz: TimeZoned;
  const testDate = "2024-01-01T14:30:45";

  beforeEach(() => {
    tz = new TimeZoned({ timeZone: "UTC" });
  });

  const testCases = [
    {
      description: "should add time in HH:mm:ss format from startOfDay",
      date: "2024-01-01T00:00:00",
      amount: "02:30:15",
      unit: "HH:mm:ss" as const,
      type: "local",
      from: "startOfDay",
      options: { return: "timestamp" },
      expected: "2024-01-01T02:30:15",
    },
    {
      description: "should add time in HH:mm format from startOfDay",
      date: "2024-01-01T00:00:00",
      amount: "02:30",
      unit: "HH:mm" as const,
      type: "local",
      from: "startOfDay",
      options: { return: "timestamp" },
      expected: "2024-01-01T02:30:00",
    },
    {
      description: "should add minutes from startOfDay",
      date: "2024-01-01T00:00:00",
      amount: 30,
      unit: "minute" as const,
      type: "local",
      from: "startOfDay",
      options: { return: "timestamp" },
      expected: "2024-01-01T00:30:00",
    },
    {
      description: "should add hours from startOfDay",
      date: "2024-01-01T00:00:00",
      amount: 2,
      unit: "hour" as const,
      type: "local",
      from: "startOfDay",
      options: { return: "timestamp" },
      expected: "2024-01-01T02:00:00",
    },
    {
      description: "should add days from startOfMonth",
      date: "2024-01-01T00:00:00",
      amount: 5,
      unit: "day" as const,
      type: "local",
      from: "startOfMonth",
      options: { return: "timestamp" },
      expected: "2024-01-06T00:00:00",
    },
    {
      description: "should add months from startOfYear",
      date: "2024-01-01T00:00:00",
      amount: 2,
      unit: "month" as const,
      type: "local",
      from: "startOfYear",
      options: { return: "timestamp" },
      expected: "2024-03-01T00:00:00",
    },
    {
      description: "should handle endOfDay starting point",
      date: "2024-01-01T00:00:00",
      amount: "02:00:00",
      unit: "HH:mm:ss" as const,
      type: "local",
      from: "endOfDay",
      options: { return: "timestamp" },
      expected: "2024-01-02T01:59:59",
    },
    {
      description: "should handle endOfMonth starting point",
      date: "2024-01-15T00:00:00",
      amount: 2,
      unit: "day" as const,
      type: "local",
      from: "endOfMonth",
      options: { return: "timestamp" },
      expected: "2024-02-02T23:59:59",
    },
    {
      description: "should handle endOfYear starting point",
      date: "2024-06-15T00:00:00",
      amount: 1,
      unit: "month" as const,
      type: "local",
      from: "endOfYear",
      options: { return: "timestamp" },
      expected: "2025-01-31T23:59:59",
    },
    {
      description: "should handle UTC type",
      date: testDate,
      amount: "02:00:00",
      unit: "HH:mm:ss" as const,
      type: "utc",
      from: "startOfDay",
      options: { return: "timestamp" },
      expected: "2024-01-01T02:00:00",
    },
    {
      description: "should handle different return formats (date)",
      date: testDate,
      amount: "02:00:00",
      unit: "HH:mm:ss" as const,
      type: "local",
      from: "startOfDay",
      options: { return: "date" },
      expected: "2024-01-01",
    },
    {
      description: "should handle different return formats (time)",
      date: testDate,
      amount: "02:00:00",
      unit: "HH:mm:ss" as const,
      type: "local",
      from: "startOfDay",
      options: { return: "time" },
      expected: "02:00:00",
    },
  ];

  testCases.forEach(
    ({ description, date, amount, unit, type, from, options, expected }) => {
      test(description, () => {
        const result = tz.addDateTime(
          date,
          amount,
          unit,
          type as "local" | "utc",
          from as
            | "startOfDay"
            | "endOfDay"
            | "startOfMonth"
            | "endOfMonth"
            | "startOfYear"
            | "endOfYear",
          options as AddOptions
        );
        expect(result).toBe(expected);
      });
    }
  );
});
