import { TimeZoned } from "./src/modules/TimeZoned";
import { TimeZonedSchedule } from "./src/modules/TimeZonedSchedule";

const tzs = new TimeZonedSchedule({ timeZone: "America/Los_Angeles" });

const startDate = "2024-03-03T05:00:00Z";
const endDate = "2024-03-16T05:59:59Z";

const datas = tzs.schedule(startDate, endDate, {
  type: "monthly",
  date: "2024-03-15",
  addDynamicOffset: true,
});

console.log(datas);
