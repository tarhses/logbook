import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputDate: Component<{
  label: string
  timestamp?: number
  onInput?: (timestamp: number) => void
}> = (props) => {
  return (
    <InputBase
      label={props.label}
      type="date"
      numberValue={props.timestamp}
      onNumberInput={props.onInput}
    />
  )
}
