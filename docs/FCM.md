# Firebase Cloud Messaging (FCM) Module

## Overview

The FCM module provides a straightforward interface for sending push notifications using Firebase Cloud Messaging.

## Installation

To use the FCM module, ensure you have the necessary packages installed:

```bash
npm install boosters firebase-admin
```

## Usage

```typescript
import { FirebaseService } from 'boosters/firebase'

// Initialize with Firebase configuration
const firebaseService = new FirebaseService({
  projectId: 'your-project-id',
  privateKeyId: 'your-private-key-id',
  privateKey: 'your-private-key',
  clientEmail: 'your-client-email',
  clientId: 'your-client-id',
})

// Send a push notification
await firebaseService.sendPushNotification(
  'device-token',
  'Notification Title',
  'Notification Body',
  {
    // Optional additional data
    type: 'message',
    userId: '123',
  }
)
```

## API Reference

### FirebaseConfig Interface

```typescript
interface FirebaseConfig {
  projectId: string // Firebase project ID
  privateKeyId: string // Private key identifier
  privateKey: string // Private key for authentication
  clientEmail: string // Service account client email
  clientId: string // Service account client ID
}
```

### Methods

- **sendPushNotification(token, title, body, additionalData?)**: Sends a push notification to a specified device token.

## Features

- 🔔 **Simple push notification sending**: Easily send notifications to devices.
- 🔒 **Secure authentication with Google Auth**: Ensures secure communication with Firebase.
- 📦 **Minimal configuration required**: Quick setup with essential configurations.
- 🌐 **Supports additional notification data**: Send extra data with notifications.

## Error Handling

- **Validates Firebase configuration**: Ensures all necessary credentials are provided.
- **Provides detailed error logging**: Logs errors for easier debugging.
- **Handles authentication and network errors**: Manages common issues gracefully.

## Best Practices

- **Store credentials securely in environment variables**: Protect sensitive information.
- **Use service account with minimal required permissions**: Follow the principle of least privilege.
- **Implement proper error catching and logging**: Ensure robust error management.

## Limitations

- **Requires valid Firebase project configuration**: Ensure your Firebase setup is correct.
- **Depends on Firebase Cloud Messaging service**: Relies on Firebase's infrastructure.
- **Network connectivity required for sending notifications**: Ensure network access for communication.
