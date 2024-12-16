import { DateType, Options, ScheduleOptions } from "../types";
import moment from "moment-timezone";
import { TimeZoned } from "./TimeZoned";

export class TimeZonedSchedule extends TimeZoned {
  constructor(options: Partial<Options>) {
    super(options);
  }

  /**
   * Schedules events between two dates
   * @param start - Start date utc date
   * @param end - End date utc date
   * @param options - Options for scheduling
   * @param options.addDynamicOffset - If true, the offset will be added to the date based on the timezone
   *  eg: if the start date is in DST and the end date is in non-DST, the date will be adjusted to the next day
   *  if the start date is in non-DST and the end date is in DST, the date will be adjusted to the previous day
   *  -  2025-03-05T18:30:00.000Z
   *  -  2025-03-05T17:30:00.000Z(after adding offset adjustment of day light saving)
   */
  public schedule(
    start: DateType,
    end: DateType,
    options: ScheduleOptions = {
      type: "daily",
      addDynamicOffset: true,
    }
  ): (Date | string | moment.Moment)[] {
    const startDate = moment.utc(start);
    const endDate = moment.utc(end);

    let events: Date[] = [];
    if (options.type === "weekly") {
      events = this.weeklyEvents(
        startDate,
        endDate,
        options.days.map((day) => day as number),
        this.timezone,
        options
      );
    } else if (options.type === "monthly") {
      events = this.monthlyEvents(
        options.date,
        startDate,
        endDate,
        this.timezone
      );
    } else {
      events = this.dailyEvents(startDate, endDate, this.timezone, options);
    }

    return events.map((event) => this.handleReturn(moment.utc(event), options));
  }

  private dailyEvents(
    startDate: moment.Moment,
    endDate: moment.Moment,
    timezone: string,
    options: Partial<ScheduleOptions>
  ): Date[] {
    const dates: Date[] = [];
    const currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      if (options.addDynamicOffset) {
        dates.push(
          this.addDynamicOffset(startDate, currentDate, timezone).toDate()
        );
      } else {
        dates.push(currentDate.toDate());
      }
      currentDate.add(1, "day");
    }
    return dates;
  }

  public weeklyEvents(
    startDate: moment.Moment,
    endDate: moment.Moment,
    days: number[],
    timezone: string,
    options: Partial<ScheduleOptions>
  ): Date[] {
    const dates: Date[] = [];

    const ranges = this.dailyEvents(startDate, endDate, timezone, options);
    for (const date of ranges) {
      const day = moment.utc(date).tz(timezone).startOf("day").day();
      if (days.includes(day)) {
        dates.push(date);
      }
    }
    return dates;
  }

  private monthlyEvents(
    date: DateType,
    startDate: DateType,
    endDate: DateType,
    timezone: string
  ): Date[] {
    const dates: Date[] = [];
    const targetDay = moment(date).date();
    const currentDate = moment(startDate).date(targetDay);

    if (currentDate.isBefore(moment(startDate), "day")) {
      currentDate.add(1, "month");
    }

    while (currentDate.isSameOrBefore(moment(endDate))) {
      if (currentDate.date() === targetDay) {
        dates.push(
          this.addDynamicOffset(startDate, currentDate, timezone).toDate()
        );
      }
      currentDate.add(1, "month").date(targetDay);
    }

    return dates;
  }

  private addDynamicOffset(
    startDate: moment.MomentInput,
    currentDate: moment.MomentInput,
    timezone: string
  ): moment.Moment {
    const start = moment.utc(startDate).tz(timezone);
    const isDstStart = start.clone().isDST();
    //   returns the UTC offset in minutes
    const startOffset = start.clone().utcOffset();

    const current = moment.utc(currentDate).tz(timezone);
    const isDstCurrent = current.clone().isDST();
    // returns the UTC offset in minutes
    const currentOffset = current.clone().utcOffset();

    let date = current.clone();
    if (isDstStart || isDstCurrent) {
      const diff = Math.abs(startOffset - currentOffset);
      if (isDstStart && !isDstCurrent) {
        date.add(diff, "minute");
      } else if (!isDstStart && isDstCurrent) {
        const diff = currentOffset - startOffset;
        date.subtract(diff, "minute");
      }
    }
    return date;
  }
}
