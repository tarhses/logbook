import { Component } from "solid-js"

export type FormInput<T> = Component<{
  value: T
  onInput: (value: T) => void
}>
