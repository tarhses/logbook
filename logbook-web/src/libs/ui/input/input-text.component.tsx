import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputText: Component<{
  type?: "text" | "password"
  value?: string
  onInput?: (value: string) => void
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
}> = (props) => {
  return (
    <InputBase
      type={props.type}
      value={props.value}
      onInput={props.onInput}
      required={props.required}
      disabled={props.disabled}
      label={props.label}
      placeholder={props.placeholder}
    />
  )
}
