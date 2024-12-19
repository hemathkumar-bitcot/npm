# Version Class

## Overview

The `Version` class provides utilities for handling semantic version comparisons and determining update requirements. It supports version strings in the format `major.minor.patch` and can be used to manage versioning across different applications.

## Installation

To use the `Version` class, ensure you have the necessary package installed:

```bash
npm install plugins
```

## Usage

### Initialize Version

Create an instance of the `Version` class with the minimum and latest versions.

```typescript
import { Version } from 'booster'

const versionManager = new Version('1.0.0', '1.2.0')
```

### Compare Versions

Use the `compare` method to compare two version strings.

```typescript
const result = versionManager.compare('1.0.0', '1.0.1')
console.log(result) // Output: -1 (second version is greater)
```

### Check Version

Use the `check` method to determine if a forced update or a regular update is needed.

```typescript
const versionStatus = versionManager.check('1.0.0')
console.log(versionStatus) // Output: { forceUpdate: true, updateAvailable: true }
```

### Validate Version

Use the `isValid` method to check if a version string is in the correct semantic version format.

```typescript
const isValid = versionManager.isValid('1.0.0')
console.log(isValid) // Output: true
```

## API Reference

### Constructor

```typescript
constructor(minVersion: SemanticVersion, latestVersion: SemanticVersion)
```

- **Parameters**:
  - `minVersion`: The minimum required version.
  - `latestVersion`: The latest available version.

### compare(version1: SemanticVersion, version2: SemanticVersion): number

- **Parameters**:
  - `version1`: The first version string to compare.
  - `version2`: The second version string to compare.
- **Returns**:
  - `1` if `version1` is greater.
  - `-1` if `version2` is greater.
  - `0` if both versions are equal.

### check(currentVersion: SemanticVersion, minVersion?: SemanticVersion, latestVersion?: SemanticVersion): IVersionCheckResult

- **Parameters**:
  - `currentVersion`: The current version of the application.
  - `minVersion`: The minimum required version (defaults to the instance's minVersion).
  - `latestVersion`: The latest available version (defaults to the instance's latestVersion).
- **Returns**: An object with:
  - `forceUpdate`: `true` if `currentVersion` is less than `minVersion`.
  - `updateAvailable`: `true` if `currentVersion` is less than `latestVersion`.

### isValid(version: SemanticVersion): boolean

- **Parameters**:
  - `version`: Version string to validate.
- **Returns**: `true` if the version string is valid, `false` otherwise.

## Features

- **Semantic Version Comparison**: Compares version strings accurately.
- **Update Management**: Determines if updates are required or available.
- **Version Validation**: Validates version strings against semantic versioning standards.

## Best Practices

- **Consistent Versioning**: Ensure version strings follow a consistent format (e.g., `major.minor.patch`).
- **Environment Variables**: Use environment variables to manage version requirements dynamically.
- **Comprehensive Testing**: Implement thorough test cases to cover edge cases in version comparisons.

## Limitations

- **Pre-release Versions**: The current implementation does not handle pre-release versions (e.g., `1.0.0-alpha`).
- **Complex Versioning Schemes**: May not support complex versioning schemes beyond `major.minor.patch`.

## Support

For issues and feature requests, please use our [GitHub issue tracker](https://github.com/yourusername/plugins/issues).

## License

MIT License
