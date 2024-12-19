## TimeZonedSchedule Module

### Overview

The `TimeZonedSchedule` module allows for scheduling recurring events with timezone awareness, supporting daily, weekly, and monthly patterns.

### Installation

```bash
npm install boosters
```

### Usage

```typescript
import { TimeZonedSchedule } from 'boosters'
```

### Usage

```typescript:docs/TimeZonedSchedule.md
import { TimeZonedSchedule } from 'boosters'

const scheduler = new TimeZonedSchedule({
  timeZone: 'Asia/Tokyo',
  return: 'moment',
})

// Create daily schedule
const dailyEvents = scheduler.schedule('2024-03-20T00:00:00Z', '2024-03-25T00:00:00Z', {
  type: 'daily',
  addDynamicOffset: true,
})

// Create weekly schedule
const weeklyEvents = scheduler.schedule('2024-03-20T00:00:00Z', '2024-04-20T00:00:00Z', {
  type: 'weekly',
  days: [1, 3, 5], // Monday, Wednesday, Friday
  addDynamicOffset: true,
})
```

### API Reference

#### Methods

- `schedule(start, end, options)`: Create recurring events schedule
  - Supports daily, weekly, and monthly recurring patterns
  - Handles DST transitions automatically
  - Returns array of scheduled dates in specified format

#### Options

- `type`: Type of schedule ('daily', 'weekly', 'monthly')
- `days`: Array of days to include in weekly schedule
- `addDynamicOffset`: Whether to add a dynamic offset to the schedule
