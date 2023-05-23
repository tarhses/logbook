import { Component } from "solid-js"
import { InputProps } from "./input-props.model"

export interface FormControl<T, P extends InputProps<T>> {
  value: T
  input: Component<P>
}
