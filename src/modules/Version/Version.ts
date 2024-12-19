/**
 * Type representing a semantic version number
 */
type SemanticVersion = string

/**
 * Interface representing the result of a version check
 * @interface IVersionCheckResult
 * @property {boolean} forceUpdate - Indicates if a mandatory update is required
 * @property {boolean} updateAvailable - Indicates if an optional update is available
 */
export interface IVersionCheckResult {
  forceUpdate: boolean
  updateAvailable: boolean
}

/**
 * Class for handling semantic version comparisons and checks
 * @class Version
 */
export class Version {
  private minVersion: SemanticVersion
  private latestVersion: SemanticVersion

  constructor(minVersion: SemanticVersion, latestVersion: SemanticVersion) {
    this.minVersion = minVersion
    this.latestVersion = latestVersion
  }

  /**
   * Compares two version strings and returns:
   * 1 if version1 is greater
   * -1 if version2 is greater
   * 0 if versions are equal
   * @param {SemanticVersion} version1 - First version to compare
   * @param {SemanticVersion} version2 - Second version to compare
   * @returns {number} Comparison result: 1, -1, or 0
   */
  public compare(version1: SemanticVersion, version2: SemanticVersion): number {
    const v1Parts: number[] = version1.split('.').map(Number)
    const v2Parts: number[] = version2.split('.').map(Number)

    for (const part of v1Parts) {
      if (isNaN(part)) {
        console.error(`Version.compare: Invalid version format: ${version1} or ${version2}`)
        throw new Error('Invalid version format')
      }
    }

    const maxLength: number = Math.max(v1Parts.length, v2Parts.length)

    for (let i: number = 0; i < maxLength; i++) {
      const v1Part: number = v1Parts[i] || 0
      const v2Part: number = v2Parts[i] || 0

      if (v1Part > v2Part) {
        return 1 // version1 is greater
      } else if (v1Part < v2Part) {
        return -1 // version2 is greater
      }
    }

    return 0 // versions are equal
  }

  /**
   * Checks if an update is required or available based on version comparisons
   * @param {SemanticVersion} currentVersion - The current version of the application
   * @param {SemanticVersion} minVersion - The minimum required version
   * @param {SemanticVersion} latestVersion - The latest available version
   * @returns {IVersionCheckResult} Object containing update status
   */
  public check(
    currentVersion: SemanticVersion,
    minVersion: SemanticVersion = this.minVersion,
    latestVersion: SemanticVersion = this.latestVersion
  ): IVersionCheckResult {
    let forceUpdate: boolean = false
    let updateAvailable: boolean = false

    if (this.compare(latestVersion, minVersion) < 0) {
      console.warn(
        `Version.check: Latest version should be greater than min version: ${latestVersion} < ${minVersion}`
      )
    }

    if (this.compare(currentVersion, minVersion) < 0) {
      forceUpdate = true
    }
    if (this.compare(currentVersion, latestVersion) < 0) {
      updateAvailable = true
    }

    return { forceUpdate, updateAvailable }
  }

  /**
   * Validates if a version string is in correct semantic version format (x.y.z)
   * @param {SemanticVersion} version - Version string to validate
   * @returns {boolean} True if version string is valid, false otherwise
   */
  public isValid(version: SemanticVersion): boolean {
    const versionRegex: RegExp = /^\d+(\.\d+)*$/
    console.log(version)
    return versionRegex.test(version)
  }
}
