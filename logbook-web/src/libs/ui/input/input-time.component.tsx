import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputTime: Component<{
  label: string
  required?: boolean
  disabled?: boolean
  value?: number
  onInput?: (value: number) => void
}> = (props) => {
  return (
    <InputBase
      label={props.label}
      type="time"
      required={props.required}
      disabled={props.disabled}
      numberValue={props.value}
      onNumberInput={props.onInput}
    />
  )
}
