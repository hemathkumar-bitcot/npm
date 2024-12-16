import { TimeZonedSchedule } from "../modules/TimeZonedSchedule";
import moment from "moment-timezone";

describe("TimeZonedSchedule General Tests", () => {
  describe("Constructor", () => {
    test("should create instance with valid timezone", () => {
      expect(() => {
        new TimeZonedSchedule({ timeZone: "America/Los_Angeles" });
      }).not.toThrow();
    });

    test("should throw error with invalid timezone", () => {
      expect(() => {
        new TimeZonedSchedule({ timeZone: "Invalid/Timezone" });
      }).toThrow();
    });
  });
});
