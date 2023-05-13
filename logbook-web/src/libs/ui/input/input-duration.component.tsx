import { Component } from "solid-js"
import { formatDuration, parseDuration } from "../time.service"
import { InputBase } from "./input-base.component"

export const InputDuration: Component<{
  value?: number
  onInput?: (value: number) => void
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
}> = (props) => {
  return (
    <InputBase
      type="text"
      value={formatDuration(props.value ?? 0)}
      onInput={(value) => props.onInput?.(parseDuration(value))}
      required={props.required}
      disabled={props.disabled}
      label={props.label}
      placeholder={props.placeholder}
    />
  )
}
