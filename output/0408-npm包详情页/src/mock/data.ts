export interface PackageData {
  name: string
  version: string
  description: string
  license: string
  repository: string
  homepage: string
  weeklyDownloads: number
  unpackedSize: string
  totalFiles: number
  published: string
  lastPublish: string
  typesIncluded: boolean
}

export const packageData: PackageData = {
  name: 'embedded-postgres',
  version: '18.3.0-beta.16',
  description: 'A Node package that spawns PostgreSQL clusters programatically.',
  license: 'MIT',
  repository: 'github.com/leinelissen/embedded-postgres',
  homepage: 'github.com/leinelissen/embedded-postgres#readme',
  weeklyDownloads: 114_924,
  unpackedSize: '27.3 MB',
  totalFiles: 123,
  published: 'a month ago',
  lastPublish: '2026-03-08',
  typesIncluded: true,
}

export const weeklyDownloadData = [
  82_000, 79_000, 85_000, 91_000, 88_000, 95_000, 102_000, 98_000,
  105_000, 99_000, 108_000, 112_000, 106_000, 110_000, 114_000,
  108_000, 115_000, 118_000, 112_000, 109_000, 116_000, 120_000,
  114_000, 111_000, 118_000, 122_000, 116_000, 113_000, 119_000,
  114_924, 117_000, 120_000, 115_000, 118_000, 122_000, 114_924,
  119_000, 116_000, 121_000, 114_000, 118_000, 115_000, 120_000,
  117_000, 122_000, 114_000, 119_000, 116_000, 121_000, 118_000,
]

export const dependencies = [
  'apache-arrow',
  '@electron/rebuild',
  '@types/better-sqlite3',
  'decompress',
  'rimraf',
  'tar',
  'temp',
  'typescript',
  'winston',
  'yesql',
]

export const versions = Array.from({ length: 10 }, (_, i) => ({
  version: `18.3.0-beta.${16 - i}`,
  date: i === 0 ? 'a month ago' : `${i + 1} months ago`,
}))

export const collaborators = [
  { name: 'leinelissen', avatar: 'L' },
]

export const pgVersions = [
  { platform: 'Darwin / x64', v12: true, v13: true, v14: true, v15: true, v16: true, v17: true },
  { platform: 'Darwin / arm64', v12: false, v13: false, v14: false, v15: true, v16: true, v17: true },
  { platform: 'Windows / x64', v12: true, v13: true, v14: true, v15: true, v16: true, v17: true },
  { platform: 'Linux / x64', v12: true, v13: true, v14: true, v15: true, v16: true, v17: true },
  { platform: 'Linux / arm', v12: true, v13: true, v14: true, v15: true, v16: true, v17: true },
  { platform: 'Linux / arm64', v12: true, v13: true, v14: true, v15: true, v16: true, v17: true },
]

export const apiOptions = [
  { property: 'databaseDir', type: 'string', description: "The location where the data should be persisted to. Defaults to './data/db'" },
  { property: 'port', type: 'number', description: 'The port where the Postgres database should be listening. Defaults to: 5432' },
  { property: 'user', type: 'string', description: 'The username for logging into the Postgres database. Defaults to postgres' },
  { property: 'password', type: 'string', description: 'The password for logging into the Postgres database. Defaults to password' },
  { property: 'persistent', type: 'boolean', description: 'Whether all data should be left in place when the database is shut down. Defaults to true.' },
  { property: 'createPostgresUser', type: 'boolean', description: 'In case you\'re running in root-only environments, you may need to create an extra user. Defaults to false.' },
]
