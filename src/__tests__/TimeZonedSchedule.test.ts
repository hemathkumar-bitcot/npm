import { TimeZonedSchedule } from "../modules/TimeZonedSchedule";
import moment from "moment-timezone";

describe("TimeZonedSchedule", () => {
  let tzs: TimeZonedSchedule;

  beforeEach(() => {
    tzs = new TimeZonedSchedule({
      timeZone: "America/New_York",
    });
  });

  describe("Daily Schedule", () => {
    test("should generate daily events with DST adjustment", () => {
      // March 10, 2024 is when DST begins in America/New_York
      const startDate = "2024-03-09T08:00:00Z";
      const endDate = "2024-03-12T06:59:59Z";

      const events = tzs.schedule(startDate, endDate, {
        type: "daily",
        addDynamicOffset: true,
      });

      // First, verify we have the correct number of events
      expect(events).toHaveLength(3);

      // Convert to local times for verification
      const localEvents = events.map((event) =>
        tzs.utcToLocal(event, { return: "timestamp" })
      );

      // Expected local times (3:00 AM EST on March 9, then 3:00 AM EDT on March 10-11)
      const expectedLocalTimes = [
        "2024-03-09T03:00:00", // March 9 - EST
        "2024-03-10T03:00:00", // March 10 - EDT (after spring forward)
        "2024-03-11T03:00:00", // March 11 - EDT
      ];
      expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes));
    });
  });

  // test("should generate daily events without DST adjustment", () => {
  //   const startDate = "2024-03-09T00:00:00Z";
  //   const endDate = "2024-03-11T00:00:00Z";

  //   const events = scheduler.schedule(startDate, endDate, {
  //     type: "daily",
  //     addDynamicOffset: false,
  //   });

  //   expect(events).toHaveLength(3);
  //   // Times should be exactly 24 hours apart without DST adjustment
  //   const intervals = events.map((date) => moment(date).valueOf());
  //   expect(intervals[1] - intervals[0]).toBe(24 * 60 * 60 * 1000);
  //   expect(intervals[2] - intervals[1]).toBe(24 * 60 * 60 * 1000);
  // });
});

//   describe("Weekly Schedule", () => {
//     test("should generate weekly events for specified days", () => {
//       const startDate = "2024-01-01T00:00:00Z"; // Monday
//       const endDate = "2024-01-07T00:00:00Z"; // Sunday

//       const events = scheduler.schedule(startDate, endDate, {
//         type: "weekly",
//         days: [1, 3, 5], // Monday, Wednesday, Friday
//         addDynamicOffset: true,
//       });

//       expect(events).toHaveLength(3);
//       events.forEach((date) => {
//         const day = moment(date).tz("America/New_York").day();
//         expect([1, 3, 5]).toContain(day);
//       });
//     });

//     test("should handle empty days array", () => {
//       const startDate = "2024-01-01T00:00:00Z";
//       const endDate = "2024-01-07T00:00:00Z";

//       const events = scheduler.schedule(startDate, endDate, {
//         type: "weekly",
//         days: [],
//         addDynamicOffset: true,
//       });

//       expect(events).toHaveLength(0);
//     });
//   });

//   describe("Monthly Schedule", () => {
//     test("should generate monthly events on specified date", () => {
//       const startDate = "2024-01-01T00:00:00Z";
//       const endDate = "2024-03-31T00:00:00Z";

//       const events = scheduler.schedule(startDate, endDate, {
//         type: "monthly",
//         date: "2024-01-15", // Schedule for 15th of each month
//         addDynamicOffset: true,
//       });

//       expect(events).toHaveLength(3); // Jan 15, Feb 15, Mar 15
//       events.forEach((date) => {
//         expect(moment(date).tz("America/New_York").date()).toBe(15);
//       });
//     });

//     test("should handle month transitions correctly", () => {
//       const startDate = "2024-01-31T00:00:00Z";
//       const endDate = "2024-04-30T00:00:00Z";

//       const events = scheduler.schedule(startDate, endDate, {
//         type: "monthly",
//         date: "2024-01-31",
//         addDynamicOffset: true,
//       });

//       expect(events).toHaveLength(4); // Jan 31, Feb 29 (leap year), Mar 31, Apr 30
//       expect(
//         moment(events[0]).tz("America/New_York").format("YYYY-MM-DD")
//       ).toBe("2024-01-31");
//       expect(
//         moment(events[1]).tz("America/New_York").format("YYYY-MM-DD")
//       ).toBe("2024-02-29");
//       expect(
//         moment(events[2]).tz("America/New_York").format("YYYY-MM-DD")
//       ).toBe("2024-03-31");
//       expect(
//         moment(events[3]).tz("America/New_York").format("YYYY-MM-DD")
//       ).toBe("2024-04-30");
//     });
//   });

//   describe("DST Handling", () => {
//     test("should handle spring forward DST transition", () => {
//       // March 10, 2024 2:00 AM EST -> 3:00 AM EDT
//       const scheduler = new TimeZonedSchedule({ timezone: "America/New_York" });
//       const startDate = "2024-03-09T00:00:00Z";
//       const endDate = "2024-03-11T00:00:00Z";

//       const events = scheduler.schedule(startDate, endDate);

//       const formattedDates = events.map((date) =>
//         moment(date).tz("America/New_York").format("YYYY-MM-DD HH:mm")
//       );

//       expect(formattedDates[0]).toBe("2024-03-09 00:00");
//       expect(formattedDates[1]).toBe("2024-03-10 00:00");
//       expect(formattedDates[2]).toBe("2024-03-11 00:00");
//     });

//     test("should handle fall back DST transition", () => {
//       // November 3, 2024 2:00 AM EDT -> 1:00 AM EST
//       const scheduler = new TimeZonedSchedule({ timezone: "America/New_York" });
//       const startDate = "2024-11-02T00:00:00Z";
//       const endDate = "2024-11-04T00:00:00Z";

//       const events = scheduler.schedule(startDate, endDate);

//       const formattedDates = events.map((date) =>
//         moment(date).tz("America/New_York").format("YYYY-MM-DD HH:mm")
//       );

//       expect(formattedDates[0]).toBe("2024-11-02 00:00");
//       expect(formattedDates[1]).toBe("2024-11-03 00:00");
//       expect(formattedDates[2]).toBe("2024-11-04 00:00");
//     });
//   });

//   describe("Error Handling", () => {
//     test("should handle invalid date range", () => {
//       const startDate = "2024-01-02T00:00:00Z";
//       const endDate = "2024-01-01T00:00:00Z";

//       const events = scheduler.schedule(startDate, endDate);
//       expect(events).toHaveLength(0);
//     });

//     test("should handle invalid timezone", () => {
//       expect(() => {
//         new TimeZonedSchedule({ timezone: "Invalid/Timezone" });
//       }).toThrow();
//     });
//   });
