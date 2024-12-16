import { TimeZoned } from "./src/modules/TimeZoned";
import { TimeZonedSchedule } from "./src/modules/TimeZonedSchedule";

const tzs = new TimeZonedSchedule({ timeZone: "America/Los_Angeles" });

const startDate = "2024-03-03T05:00:00Z";
const endDate = "2024-03-16T05:59:59Z";

const datas = tzs.schedule(startDate, endDate, {
  type: "weekly",
  days: [0, 1, 2, 3, 4, 5, 6],
  addDynamicOffset: true,
});

for (const data of datas) {
  console.log(data);
}
