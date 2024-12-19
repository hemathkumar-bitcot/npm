import { Version } from '../../index'

describe('compareVersions', () => {
  const testCases = [
    { version1: '1.0.0', version2: '1.0.0', expected: 0, description: 'equal versions' },
    { version1: '2.1.3', version2: '2.1.3', expected: 0, description: 'equal versions' },
    { version1: '1.0.1', version2: '1.0.0', expected: 1, description: 'first version is greater' },
    { version1: '2.1.3', version2: '2.1.2', expected: 1, description: 'first version is greater' },
    { version1: '1.0.0', version2: '0.9.9', expected: 1, description: 'first version is greater' },
    {
      version1: '1.0.0',
      version2: '1.0.1',
      expected: -1,
      description: 'second version is greater',
    },
    {
      version1: '2.1.2',
      version2: '2.1.3',
      expected: -1,
      description: 'second version is greater',
    },
    {
      version1: '0.9.9',
      version2: '1.0.0',
      expected: -1,
      description: 'second version is greater',
    },
    {
      version1: '1.0',
      version2: '1.0.0',
      expected: 0,
      description: 'versions with different lengths',
    },
    {
      version1: '1.0.1',
      version2: '1.0',
      expected: 1,
      description: 'versions with different lengths',
    },
    {
      version1: '1.0',
      version2: '1.0.1',
      expected: -1,
      description: 'versions with different lengths',
    },
  ]

  testCases.forEach(({ version1, version2, expected, description }) => {
    const version = new Version(version1, version2)

    test(`should return ${expected} when comparing ${version1} and ${version2} (${description})`, () => {
      expect(version.compare(version1, version2)).toBe(expected)
    })
  })
})

describe('check', () => {
  const checkTestCases = [
    {
      currentVersion: '1.0.0',
      minVersion: '1.0.0',
      latestVersion: '1.0.0',
      expected: { forceUpdate: false, updateAvailable: false },
      description: 'all versions equal',
    },
    {
      currentVersion: '0.9.0',
      minVersion: '1.0.0',
      latestVersion: '2.0.0',
      expected: { forceUpdate: true, updateAvailable: true },
      description: 'current version below minimum',
    },
    {
      currentVersion: '1.5.0',
      minVersion: '1.0.0',
      latestVersion: '2.0.0',
      expected: { forceUpdate: false, updateAvailable: true },
      description: 'update available but not forced',
    },
    {
      currentVersion: '2.0.0',
      minVersion: '1.0.0',
      latestVersion: '2.0.0',
      expected: { forceUpdate: false, updateAvailable: false },
      description: 'current version equals latest',
    },
    {
      currentVersion: '2.1.0',
      minVersion: '1.0.0',
      latestVersion: '2.0.0',
      expected: { forceUpdate: false, updateAvailable: false },
      description: 'current version above latest',
    },
  ]

  checkTestCases.forEach(({ currentVersion, minVersion, latestVersion, expected, description }) => {
    test(`should return correct update status when ${description}`, () => {
      const version = new Version(minVersion, latestVersion)
      expect(version.check(currentVersion)).toEqual(expected)
    })
  })
})
