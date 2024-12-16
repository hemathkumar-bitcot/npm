import { TimeZoned } from "./src/modules/TimeZoned";
import { TimeZonedSchedule } from "./src/modules/TimeZonedSchedule";

const tzs = new TimeZonedSchedule({ timeZone: "America/Los_Angeles" });

const startDate = "2024-03-09T08:00:00Z";
const endDate = "2024-03-12T06:59:59Z";

const datas = tzs.schedule(startDate, endDate, {
  type: "daily",
  addDynamicOffset: true,
});

for (const data of datas) {
  console.log(data);
  console.log(tzs.utcToLocal(data, { return: "timestamp" }));
}
