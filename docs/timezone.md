## TimeZoned Module

The TimeZoned module provides a way to handle time zones and date/time operations. It allows you to work with dates and times in different time zones, including local time, UTC, and time zones with daylight saving time.

### Installation

```bash
npm install boosters
```

### Usage

```typescript
import { TimeZoned } from 'boosters'

// Initialize with options
const tz = new TimeZoned({
  timeZone: 'America/New_York',
  return: 'string',
})

// Convert UTC to local time
const localTime = tz.utcToLocal('2024-03-20T14:30:00Z')

// Convert local to UTC time
const utcTime = tz.localToUtc('2024-03-20T10:30:00')
```

### API Reference

#### Constructor Options

```typescript
{
  timeZone?: string;    // Target timezone (e.g., 'America/New_York')
  return?: string;      // Return type ('moment', 'string', 'Date')
  returnFormat?: string; // Custom format for string returns
}
```

#### Methods

- `utcToLocal(date, options?)`: Convert UTC time to local timezone
- `localToUtc(date, options?)`: Convert local time to UTC
- `setDateTime(date, amount, unit, type, options?)`: Set specific date/time components
- `addDateTime(date, amount, unit, type, from, options?)`: Add time duration to a date
- `getTimezoneOffset(timezone)`: Get timezone offset in hours
- `isValidTimezone(timezone)`: Validate timezone name
