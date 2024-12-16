import { TimeZonedSchedule } from "../../modules/TimeZonedSchedule";


describe("TimeZonedSchedule for New York", () => {
    let tzs: TimeZonedSchedule;
  
    beforeEach(() => {
      tzs = new TimeZonedSchedule({
        timeZone: "America/New_York",
      });
    });
  
    describe("Daily Schedule", () => {
      test("should generate daily events with DST adjustment", () => {
        //
        const startDate = "2024-03-09T05:00:00Z";
        const endDate = "2024-03-12T03:59:59Z";
  
        const events = tzs.schedule(startDate, endDate, {
          type: "daily",
          addDynamicOffset: true,
          return: "timestamp",
        });
  
        // Convert to local times for verification
        const localEvents = events.map((event) =>
          tzs.utcToLocal(event, { return: "timestamp" })
        );
  
        const expectedLocalTimes = [
          "2024-03-09T00:00:00",
          "2024-03-10T00:00:00",
          "2024-03-11T00:00:00",
        ];
        const expectedUTC = [
          "2024-03-09T05:00:00",
          "2024-03-10T05:00:00",
          "2024-03-11T04:00:00",
        ];
        expect(events).toHaveLength(3);
        expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes));
        expect(events).toEqual(expect.arrayContaining(expectedUTC));
      });
    });
  
    describe("Weekly Schedule", () => {
      test("should generate weekly events for specified days with DST adjustment", () => {
        const startDate = "2024-03-03T05:00:00Z";
        const endDate = "2024-03-16T03:59:59Z";
  
        const events = tzs.schedule(startDate, endDate, {
          type: "weekly",
          days: [1], // Monday
          addDynamicOffset: true,
          return: "timestamp",
        });
  
        const expectedLocalTimes = ["2024-03-04T00:00:00", "2024-03-11T00:00:00"];
        const expectedUTC = ["2024-03-04T05:00:00", "2024-03-11T04:00:00"];
        const localEvents = events.map((event) =>
          tzs.utcToLocal(event, { return: "timestamp" })
        );
        expect(events).toHaveLength(2);
        expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes));
        expect(events).toEqual(expect.arrayContaining(expectedUTC));
      });
  
      test("should generate weekly events with DST adjustment", () => {
        //
        const startDate = "2024-03-09T05:00:00Z";
        const endDate = "2024-03-12T03:59:59Z";
  
        const events = tzs.schedule(startDate, endDate, {
          type: "weekly",
          days: [0, 1, 2, 3, 4, 5, 6],
          addDynamicOffset: true,
          return: "timestamp",
        });
  
        // Convert to local times for verification
        const localEvents = events.map((event) =>
          tzs.utcToLocal(event, { return: "timestamp" })
        );
  
        const expectedLocalTimes = [
          "2024-03-09T00:00:00",
          "2024-03-10T00:00:00",
          "2024-03-11T00:00:00",
        ];
        const expectedUTC = [
          "2024-03-09T05:00:00",
          "2024-03-10T05:00:00",
          "2024-03-11T04:00:00",
        ];
        expect(events).toHaveLength(3);
        expect(localEvents).toEqual(expect.arrayContaining(expectedLocalTimes));
        expect(events).toEqual(expect.arrayContaining(expectedUTC));
      });
  
      test("should handle empty days array", () => {
        const startDate = "2024-01-01T00:00:00Z";
        const endDate = "2024-01-07T00:00:00Z";
  
        const events = tzs.schedule(startDate, endDate, {
          type: "weekly",
          days: [],
          addDynamicOffset: true,
        });
  
        expect(events).toHaveLength(0);
      });
    });
  
    describe("Error Handling", () => {
      test("should handle invalid date range", () => {
        const startDate = "2024-01-02T00:00:00Z";
        const endDate = "2024-01-01T00:00:00Z";
  
        const events = tzs.schedule(startDate, endDate);
        expect(events).toHaveLength(0);
      });
  
      test("should handle invalid timezone", () => {
        expect(() => {
          new TimeZonedSchedule({ timeZone: "Invalid/Timezone" });
        }).toThrow();
      });
    });
  });
  