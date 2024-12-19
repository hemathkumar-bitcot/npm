# Extensions: A Comprehensive Utility Library

A versatile JavaScript/TypeScript library offering a suite of utilities including timezone management, Firebase Cloud Messaging (FCM), and more.

[![npm version](https://badge.fury.io/js/extensions.svg)](https://badge.fury.io/js/extensions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Core Features

### Timezone Management
- 🌍 Convert between UTC and local timezones with precision
- 📅 Schedule recurring events (daily, weekly, monthly) with timezone awareness
- 🕒 Smart handling of daylight saving time (DST) transitions
- 🔄 Multiple date/time format options (12/24hr, custom formats)
- ✅ Comprehensive timezone validation and offset calculations

### Firebase Cloud Messaging
- 🔔 Integrated push notification system
- 🔒 Secure Firebase authentication
- 📦 Configurable notification payload
- 🌐 Cross-platform message delivery

### Additional Utilities
- 📊 Data manipulation tools
- 🔧 Configuration management
- 🛠 Helper functions for common tasks

## Quick Start

### Timezone Scheduling

```typescript
import { TimeZoned } from "timezoned";

// Initialize with options
const tz = new TimeZoned({
  timeZone: "America/New_York",
  return: "string",
});

// Convert UTC to local time
const localTime = tz.utcToLocal("2024-03-20T14:30:00Z");

// Convert local to UTC time
const utcTime = tz.localToUtc("2024-03-20T10:30:00");
```

## Scheduling Example

```typescript
import { TimeZonedSchedule } from "timezoned";

const scheduler = new TimeZonedSchedule({
  timeZone: "Asia/Tokyo",
  return: "moment",
});

// Create daily schedule
const dailyEvents = scheduler.schedule(
  "2024-03-20T00:00:00Z",
  "2024-03-25T00:00:00Z",
  {
    type: "daily",
    addDynamicOffset: true,
  }
);

// Create weekly schedule
const weeklyEvents = scheduler.schedule(
  "2024-03-20T00:00:00Z",
  "2024-04-20T00:00:00Z",
  {
    type: "weekly",
    days: [1, 3, 5], // Monday, Wednesday, Friday
    addDynamicOffset: true,
  }
);
```

## API Reference

### TimeZoned Class

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

### TimeZonedSchedule Class

#### Methods

- `schedule(start, end, options)`: Create recurring events schedule
  - Supports daily, weekly, and monthly recurring patterns
  - Handles DST transitions automatically
  - Returns array of scheduled dates in specified format

## Supported Time Formats

- ISO 8601 strings
- JavaScript Date objects
- Moment.js objects
- Custom format strings
- 12/24 hour time formats

## Error Handling

The library includes comprehensive error handling for:

- Invalid timezone names
- Invalid date formats
- Out-of-range values
- DST transition edge cases

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Firebase Cloud Messaging (FCM) Integration

### Installation
```bash
npm install extensions
```

### FCM Notification Service

```typescript
import { FirebaseService } from 'extensions/firebase'

const firebase = new FirebaseService({
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_CLIENT_ID
})

await firebase.sendPushNotification(
  'device-token',
  'Event Scheduled',
  'Your next event is scheduled for tomorrow',
  { eventId: '123' }
)
```

### FCM Configuration Options

#### FirebaseConfig Interface
```typescript
interface FirebaseConfig {
  projectId: string        // Firebase project ID
  privateKeyId: string     // Private key identifier
  privateKey: string       // Private key for authentication
  clientEmail: string      // Service account client email
  clientId: string         // Service account client ID
}
```

### Features
- 🔔 Simple push notification sending
- 🔒 Secure authentication with Google Auth
- 📦 Minimal configuration required
- 🌐 Supports additional notification data

### Error Handling
- Validates Firebase configuration
- Provides detailed error logging
- Handles authentication and network errors

### Best Practices
- Store credentials securely in environment variables
- Use service account with minimal required permissions
- Implement proper error catching and logging

### Limitations
- Requires valid Firebase project configuration
- Depends on Firebase Cloud Messaging service
- Network connectivity required for sending notifications
