// ... previous test code ...

import { TimeZoned } from "../../modules/TimeZoned";
import moment from "moment-timezone";

describe("setDateTime Tests", () => {
  let tz: TimeZoned;
  const testDate = "2024-01-01T14:30:45";

  beforeEach(() => {
    tz = new TimeZoned({ timeZone: "UTC" });
  });

  describe("Time Setting Tests", () => {
    test("should set HH:mm:ss format", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, "14:30:45", "HH:mm:ss", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-01-01T14:30:45");
    });

    test("should set HH:mm format", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, "14:30", "HH:mm", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-01-01T14:30:00");
    });

    test("should set hour (HH)", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, 14, "HH", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-01-01T14:00:00");
    });
  });

  describe("Unit Setting Tests", () => {
    test("should set minute", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, 30, "minute", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-01-01T00:30:00");
    });

    test("should set hour", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, 14, "hour", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-01-01T14:00:00");
    });

    test("should set day", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, 15, "day", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-01-15T00:00:00");
    });

    test("should set month", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, 6, "month", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2024-07-01T00:00:00");
    });

    test("should set year", () => {
      const date = "2024-01-01T00:00:00";
      const result = tz.setDateTime(date, 2025, "year", "local", {
        return: "timestamp",
      });
      expect(result).toBe("2025-01-01T00:00:00");
    });
  });

  describe("Ways Parameter Tests", () => {
    test("should handle startOf day", () => {
      const result = tz.setDateTime(testDate, 14, "hour", "local", {
        return: "timestamp",
      });
      console.log(result);
      expect(result).toBe("2024-01-01T14:00:00");
    });

    test("should handle local type", () => {
      const result = tz.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "timestamp" }
      );
      expect(result).toBe("2024-01-01T09:00:00");
    });

    test("should handle UTC type", () => {
      const result = tz.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "utc",
        { return: "timestamp" }
      );
      expect(result).toBe("2024-01-01T09:00:00");
    });
  });

  describe("Input Format Tests", () => {
    test("should handle Date object input", () => {
      const dateObj = new Date("2024-01-01T14:30:45");
      const result = tz.setDateTime(
        dateObj,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "timestamp" }
      );
      expect(result).toBe("2024-01-01T09:00:00");
    });

    test("should handle moment object input", () => {
      const momentObj = moment("2024-01-01T14:30:45");
      const result = tz.setDateTime(
        momentObj,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "timestamp" }
      );
      expect(result).toBe("2024-01-01T09:00:00");
    });
  });

  describe("Return Format Tests", () => {
    test("should handle different return formats", () => {
      // Test date return
      const dateResult = tz.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "date" }
      );
      expect(dateResult).toBe("2024-01-01");

      // Test time return
      const timeResult = tz.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "time" }
      );
      expect(timeResult).toBe("09:00:00");

      // Test custom format return
      const customResult = tz.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "string", returnFormat: "MM/DD/YYYY HH:mm:ss" }
      );
      expect(customResult).toBe("01/01/2024 09:00:00");
    });
  });

  describe("Timezone Tests", () => {
    test("should handle different timezones", () => {
      const tzNY = new TimeZoned({ timeZone: "America/New_York" });
      const tzTokyo = new TimeZoned({ timeZone: "Asia/Tokyo" });

      // Test New York timezone
      const nyResult = tzNY.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "timestamp" }
      );
      expect(nyResult).toBe("2024-01-01T09:00:00");

      // Test Tokyo timezone
      const tokyoResult = tzTokyo.setDateTime(
        testDate,
        "09:00:00",
        "HH:mm:ss",
        "local",
        { return: "timestamp" }
      );
      expect(tokyoResult).toBe("2024-01-01T09:00:00");
    });
  });
});
