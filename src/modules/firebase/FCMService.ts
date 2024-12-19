import axios from 'axios'
import { GoogleAuth } from 'google-auth-library'

/**
 * Configuration interface for Firebase Cloud Messaging service account credentials
 * @interface FCMConfig
 * @property {string} projectId - The Firebase project ID
 * @property {string} privateKeyId - The private key ID from the service account JSON
 * @property {string} privateKey - The private key from the service account JSON
 * @property {string} clientEmail - The client email from the service account JSON
 * @property {string} clientId - The client ID from the service account JSON
 */
interface FCMConfig {
  projectId: string
  privateKeyId: string
  privateKey: string
  clientEmail: string
  clientId: string
}

/**
 * Firebase Cloud Messaging service for sending push notifications
 * @template TResponse - Type of the response data from FCM API
 * @example
 * ```typescript
 * // Initialize FCM service
 * const config: FCMConfig = {
 *   projectId: 'your-project-id',
 *   privateKeyId: 'private-key-id',
 *   privateKey: '-----BEGIN PRIVATE KEY-----\n...',
 *   clientEmail: 'service-account@project.iam.gserviceaccount.com',
 *   clientId: 'client-id'
 * };
 *
 * const fcmService = new FCMService(config);
 *
 * // Send notification
 * await fcmService.sendNotification(
 *   'device-token',
 *   'Welcome!',
 *   'Hello from our app',
 *   {
 *     customKey: 'value',
 *     userId: '123',
 *     isImportant: true
 *   }
 * );
 * ```
 */
export class FCMService<TResponse = unknown> {
  private readonly auth: GoogleAuth
  private readonly projectId: string

  /**
   * Creates an instance of FCMService
   * @param {FCMConfig} config - Firebase Cloud Messaging service account configuration
   * @throws {Error} If any required configuration field is missing
   */
  constructor(config: FCMConfig) {
    this.validateConfig(config)

    this.projectId = config.projectId
    this.auth = new GoogleAuth({
      credentials: this.loadServiceAccountConfig(config),
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    })
  }

  /**
   * Validates the FCM configuration object
   * @private
   * @param {FCMConfig} config - Configuration to validate
   * @throws {Error} If any required field is missing
   */
  private validateConfig(config: FCMConfig) {
    const requiredFields: (keyof FCMConfig)[] = [
      'projectId',
      'privateKeyId',
      'privateKey',
      'clientEmail',
      'clientId',
    ]

    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`Missing FCM configuration: ${field}`)
      }
    }
  }

  /**
   * Loads and formats the service account configuration
   * @private
   * @param {FCMConfig} config - Raw configuration object
   * @returns {Object} Formatted service account configuration
   */
  private loadServiceAccountConfig(config: FCMConfig) {
    return {
      type: 'service_account',
      project_id: config.projectId,
      private_key_id: config.privateKeyId,
      private_key: config.privateKey.replace(/\\n/g, '\n'),
      client_email: config.clientEmail,
      client_id: config.clientId,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${config.clientEmail}`,
      universe_domain: 'googleapis.com',
    }
  }

  /**
   * Sends a push notification to a specific device
   * @param {string} token - The FCM device token to send notification to
   * @param {string} title - The notification title
   * @param {string} body - The notification body text
   * @param {Record<string, string | number | boolean>} [additionalData] - Additional data to send with notification
   * @returns {Promise<TResponse>} Response from FCM API
   * @throws {Error} If sending notification fails
   * @example
   * ```typescript
   * // Basic notification
   * await fcmService.sendNotification(
   *   'device-token',
   *   'New Message',
   *   'You have a new message'
   * );
   *
   * // With additional data
   * await fcmService.sendNotification(
   *   'device-token',
   *   'Order Update',
   *   'Your order has shipped!',
   *   {
   *     orderId: '12345',
   *     trackingNumber: 'TR123456789',
   *     isUrgent: true
   *   }
   * );
   * ```
   */
  async sendNotification(
    token: string,
    title: string,
    msg: string,
    data?:
      | Record<string, string | number | boolean>
      | {
          notificationType: string
          timestamp: string
        }
  ): Promise<TResponse> {
    const accessToken = await this.auth.getAccessToken()

    const stringifiedData = Object.entries(data || {}).reduce(
      (acc, [key, value]) => {
        acc[key] = String(value)
        return acc
      },
      {} as Record<string, string>
    )

    const message = {
      message: {
        token,
        notification: {
          title,
          body: msg,
        },
        data: {
          ...stringifiedData,
          timestamp: Date.now().toString(),
          notificationType: stringifiedData?.notificationType || 'general',
        },
      },
    }

    try {
      const response = await axios.post<TResponse>(
        `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`,
        message,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return response.data
    } catch (error) {
      console.error(
        'FCM Notification Error:',
        error instanceof Error ? error.message : 'Unknown error'
      )
      throw error
    }
  }
}

// Export types for better type support
export type { FCMConfig }
