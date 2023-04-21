import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputTime: Component<{
  label: string
  timestamp?: number
  onInput?: (timestamp: number) => void
}> = (props) => {
  return (
    <InputBase
      label={props.label}
      type="time"
      numberValue={props.timestamp}
      onNumberInput={props.onInput}
    />
  )
}
