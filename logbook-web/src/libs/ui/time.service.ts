const SECONDS = 1000
const MINUTES = 60 * SECONDS
const HOURS = 60 * MINUTES
const VALUES: Record<string, number> = { h: HOURS, m: MINUTES, s: SECONDS }
const DURATION_PATTERN = /(\d+)([hms])/gi

export function formatTime(timestamp: number): string {
  return [
    `${toHours(timestamp) % 24}`,
    `${toMinutes(timestamp) % 60}`,
    `${toSeconds(timestamp) % 60}`,
  ]
    .map((component) => component.padStart(2, "0"))
    .join(":")
}

export function formatDuration(duration: number): string {
  return [
    `${toHours(duration)}h`,
    `${toMinutes(duration) % 60}m`,
    `${toSeconds(duration) % 60}s`,
  ]
    .filter((component) => !component.startsWith("0"))
    .join(" ")
}

export function parseDuration(duration: string): number {
  return Array.from(duration.matchAll(DURATION_PATTERN))
    .map(([, amount, type]) => [parseInt(amount), VALUES[type.toLowerCase()]])
    .reduce((result, [amount, value]) => result + amount * value, 0)
}

function toHours(milliseconds: number): number {
  return Math.floor(milliseconds / HOURS)
}

function toMinutes(milliseconds: number): number {
  return Math.floor(milliseconds / MINUTES)
}

function toSeconds(milliseconds: number): number {
  return Math.floor(milliseconds / SECONDS)
}
