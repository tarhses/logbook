let counter = 0

export function generateInputId(): string {
  return `input-${counter++}`
}
