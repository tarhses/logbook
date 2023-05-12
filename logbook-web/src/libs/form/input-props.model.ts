export type InputProps<T, P = {}> = P & {
  value?: T
  onInput?: (value: T) => void
}
