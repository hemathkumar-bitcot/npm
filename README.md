# Timezone-Handler: Smart Event Scheduler

This library is designed to handle timezone-based event scheduling. It allows you to schedule events in a specific timezone and adjust for daylight saving time (DST).

## Features

- Schedule events in a specific timezone.
- Adjust for daylight saving time (DST).
- Generate a list of events in the local timezone.

## Installation

```bash
npm install timezone-handler
```

## Usage

```ts
import { TimeZonedSchedule } from "timezone-handler";

const tzs = new TimeZonedSchedule({ timeZone: "America/Los_Angeles" });

const startDate = "2024-03-09T08:00:00Z";
const endDate = "2024-03-12T06:59:59Z";

const events = tzs.schedule(startDate, endDate, {
  type: "daily",
  addDynamicOffset: true,
});
```

## Known Issues

- The library is not yet fully tested and may have bugs.
- The library is not yet fully documented.
