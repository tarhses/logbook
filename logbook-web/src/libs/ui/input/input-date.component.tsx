import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputDate: Component<{
  value?: number
  onInput?: (value: number) => void
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
}> = (props) => {
  return (
    <InputBase
      type="date"
      numberValue={props.value}
      onNumberInput={props.onInput}
      required={props.required}
      disabled={props.disabled}
      label={props.label}
      placeholder={props.placeholder}
    />
  )
}
