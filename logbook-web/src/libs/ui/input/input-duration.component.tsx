import { Component } from "solid-js"
import { formatDuration, parseDuration } from "../time.service"
import { InputBase } from "./input-base.component"

export const InputDuration: Component<{
  label: string
  required?: boolean
  disabled?: boolean
  value?: number
  onInput?: (value: number) => void
}> = (props) => {
  return (
    <InputBase
      label={props.label}
      type="text"
      required={props.required}
      disabled={props.disabled}
      value={formatDuration(props.value ?? 0)}
      onInput={(value) => props.onInput?.(parseDuration(value))}
    />
  )
}
