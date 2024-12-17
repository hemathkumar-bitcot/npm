import moment from "moment-timezone";
import { TimeZoned } from "../modules/TimeZoned";

describe("TimeZoned Conversion Tests", () => {
  describe("Los Angeles Timezone", () => {
    let tz: TimeZoned;

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: "America/Los_Angeles" });
    });

    describe("utcToLocal", () => {
      test("should convert UTC to LA time with default options", () => {
        const utcDate = "2024-01-01T08:00:00Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T00:00:00");
      });

      test("should handle different input formats", () => {
        const utcDate = "2024-01-01 08:00:00";
        const result = tz.utcToLocal(utcDate, {
          return: "timestamp",
          inputFormat: "YYYY-MM-DD HH:mm:ss",
        });
        expect(result).toBe("2024-01-01T00:00:00");
      });

      test("should handle DST transition", () => {
        // March 10, 2024 2:00 AM - DST begins
        const utcDate = "2024-03-10T10:00:00Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-03-10T03:00:00");
      });
    });

    describe("localToUtc", () => {
      test("should convert LA time to UTC with default options", () => {
        const localDate = "2024-01-01T00:00:00";
        const result = tz.localToUtc(localDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T08:00:00");
      });

      test("should handle different return formats", () => {
        const localDate = "2024-01-01T00:00:00";

        const dateResult = tz.localToUtc(localDate, { return: "date" });
        expect(dateResult).toBe("2024-01-01");

        const timeResult = tz.localToUtc(localDate, { return: "time" });
        expect(timeResult).toBe("08:00:00");

        const format12Result = tz.localToUtc(localDate, {
          return: "string",
          returnFormat: "12",
        });
        expect(format12Result).toBe("2024-01-01T08:00:00 AM");
      });
    });
  });

  describe("India Timezone", () => {
    let tz: TimeZoned;

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: "Asia/Kolkata" });
    });

    describe("utcToLocal", () => {
      test("should convert UTC to IST with default options", () => {
        const utcDate = "2024-01-01T00:00:00Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T05:30:00");
      });

      test("should handle Date object input", () => {
        const utcDate = new Date("2024-01-01T00:00:00Z");
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T05:30:00");
      });
    });

    describe("localToUtc", () => {
      test("should convert IST to UTC with default options", () => {
        const localDate = "2024-01-01T05:30:00";
        const result = tz.localToUtc(localDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T00:00:00");
      });
    });
  });

  describe("Error Handling", () => {
    test("should throw error for invalid timezone", () => {
      expect(() => {
        new TimeZoned({ timeZone: "Invalid/Timezone" });
      }).toThrow("Invalid timezone");
    });

    test("should handle empty options", () => {
      const tz = new TimeZoned();
      const utcDate = "2024-01-01T00:00:00Z";
      const result = tz.utcToLocal(utcDate);
      expect(result).toBeInstanceOf(moment);
    });
  });

  describe("Return Format Handling", () => {
    const tz = new TimeZoned({ timeZone: "UTC" });
    const testDate = "2024-01-01T00:00:00Z";

    test("should return Date object", () => {
      const result = tz.utcToLocal(testDate, { return: "Date" });
      expect(result).toBeInstanceOf(Date);
    });

    test("should return moment object by default", () => {
      const result = tz.utcToLocal(testDate);
      expect(moment.isMoment(result)).toBe(true);
    });

    test("should handle custom return format", () => {
      const result = tz.utcToLocal(testDate, {
        return: "string",
        returnFormat: "MM/DD/YYYY HH:mm",
      });
      expect(result).toBe("01/01/2024 00:00");
    });
  });

  describe("New York Timezone", () => {
    let tz: TimeZoned;

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: "America/New_York" });
    });

    describe("utcToLocal", () => {
      test("should convert UTC to NY time with default options", () => {
        const utcDate = "2024-01-01T05:00:00Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T00:00:00");
      });

      test("should handle DST transition in spring", () => {
        // March 10, 2024 2:00 AM - DST begins
        const utcDate = "2024-03-10T06:59:59Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-03-10T01:59:59");
      });

      test("should handle DST transition in fall", () => {
        // November 3, 2024 2:00 AM - DST ends
        const utcDate = "2024-11-03T05:59:59Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-11-03T01:59:59");
      });
    });

    describe("localToUtc", () => {
      test("should convert NY time to UTC with various return types", () => {
        const localDate = "2024-01-01T00:00:00";

        // Test timestamp return
        const timestampResult = tz.localToUtc(localDate, {
          return: "timestamp",
        });
        expect(timestampResult).toBe("2024-01-01T05:00:00");

        // Test date-only return
        const dateResult = tz.localToUtc(localDate, { return: "date" });
        expect(dateResult).toBe("2024-01-01");

        // Test time-only return
        const timeResult = tz.localToUtc(localDate, { return: "time" });
        expect(timeResult).toBe("05:00:00");

        // Test custom string format
        const customResult = tz.localToUtc(localDate, {
          return: "string",
          returnFormat: "MM/DD/YYYY HH:mm:ss",
        });
        expect(customResult).toBe("01/01/2024 05:00:00");
      });
    });
  });

  describe("Tokyo Timezone", () => {
    let tz: TimeZoned;

    beforeEach(() => {
      tz = new TimeZoned({ timeZone: "Asia/Tokyo" });
    });

    describe("utcToLocal", () => {
      test("should convert UTC to JST with default options", () => {
        const utcDate = "2024-01-01T00:00:00Z";
        const result = tz.utcToLocal(utcDate, { return: "timestamp" });
        expect(result).toBe("2024-01-01T09:00:00");
      });

      test("should handle different input formats", () => {
        const tests = [
          {
            input: "2024-01-01 00:00:00",
            format: "YYYY-MM-DD HH:mm:ss",
            expected: "2024-01-01T09:00:00",
          },
          {
            input: "01/01/2024 00:00",
            format: "MM/DD/YYYY HH:mm",
            expected: "2024-01-01T09:00:00",
          },
          {
            input: "2024-01-01",
            format: "YYYY-MM-DD",
            expected: "2024-01-01T09:00:00",
          },
        ];

        tests.forEach(({ input, format, expected }) => {
          const result = tz.utcToLocal(input, {
            return: "timestamp",
            inputFormat: format,
          });
          expect(result).toBe(expected);
        });
      });
    });

    describe("localToUtc", () => {
      test("should handle various return formats", () => {
        const localDate = "2024-01-01T09:00:00";

        // Test Date object return
        const dateObjResult = tz.localToUtc(localDate, {
          return: "Date",
        }) as Date;
        expect(dateObjResult).toBeInstanceOf(Date);
        expect(dateObjResult.toISOString()).toBe("2024-01-01T00:00:00.000Z");

        // Test moment object return
        const momentResult = tz.localToUtc(localDate) as moment.Moment;
        expect(moment.isMoment(momentResult)).toBe(true);
        expect(momentResult.utc().format()).toBe("2024-01-01T00:00:00Z");

        // Test 12-hour format
        const format12Result = tz.localToUtc(localDate, {
          return: "string",
          returnFormat: "12",
        });
        expect(format12Result).toBe("2024-01-01T12:00:00 AM");
      });
    });
  });

  describe("Advanced Return Type Testing", () => {
    const timezones = [
      { zone: "America/Los_Angeles", name: "LA" },
      { zone: "America/New_York", name: "NY" },
      { zone: "Asia/Tokyo", name: "Tokyo" },
      { zone: "Asia/Kolkata", name: "India" },
    ];

    timezones.forEach(({ zone, name }) => {
      describe(`${name} Return Type Tests`, () => {
        let tz: TimeZoned;

        beforeEach(() => {
          tz = new TimeZoned({ timeZone: zone });
        });

        test("should handle all return types consistently", () => {
          const testDate = "2024-01-01T00:00:00Z";

          // Test moment return
          const momentResult = tz.utcToLocal(testDate);
          expect(moment.isMoment(momentResult)).toBe(true);

          // Test Date object return
          const dateResult = tz.utcToLocal(testDate, { return: "Date" });
          expect(dateResult).toBeInstanceOf(Date);

          // Test timestamp return
          const timestampResult = tz.utcToLocal(testDate, {
            return: "timestamp",
          });
          expect(timestampResult).toMatch(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/
          );

          // Test custom format return
          const customResult = tz.utcToLocal(testDate, {
            return: "string",
            returnFormat: "YYYY-MM-DD",
          });
          expect(customResult).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
      });
    });
  });
});
