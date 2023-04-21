import { expect, test } from "vitest"
import { formatDuration, formatTime, parseDuration } from "./time.service"

test.each([
  [51173000, "14:12:53"],
  [25560000, "07:06:00"],
  [116596000, "08:23:16"],
])("formatTime(%d) should return `%s`", (timestamp, expected) => {
  const actual = formatTime(timestamp)
  expect(actual).toBe(expected)
})

test.each([
  [0, ""],
  [1000, "1s"],
  [60000, "1m"],
  [3600000, "1h"],
  [8585000, "2h 23m 5s"],
  [108006000, "30h 6s"],
])("formatDuration(%d) should return `%s`", (duration, expected) => {
  const actual = formatDuration(duration)
  expect(actual).toBe(expected)
})

test.each([
  ["", 0],
  ["1s", 1000],
  ["1m", 60000],
  ["1h", 3600000],
  ["2h 23m 5s", 8585000],
  ["2H 23M 5S", 8585000],
  ["30h 6s", 108006000],
  [" 30h   6s ", 108006000],
  ["6s 30h", 108006000],
  ["30h6s", 108006000],
])("parseDuration(`%s`) should return %d", (duration, expected) => {
  const actual = parseDuration(duration)
  expect(actual).toBe(expected)
})
