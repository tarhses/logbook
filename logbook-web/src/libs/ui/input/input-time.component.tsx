import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputTime: Component<{
  value?: number
  onInput?: (value: number) => void
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
}> = (props) => {
  return (
    <InputBase
      type="time"
      numberValue={props.value}
      onNumberInput={props.onInput}
      required={props.required}
      disabled={props.disabled}
      label={props.label}
      placeholder={props.placeholder}
    />
  )
}
