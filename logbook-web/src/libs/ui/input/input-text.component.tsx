import { Component } from "solid-js"
import { InputBase } from "./input-base.component"

export const InputText: Component<{
  label: string
  type?: "text" | "password"
  value?: string
  onInput?: (value: string) => void
}> = (props) => {
  return (
    <InputBase
      label={props.label}
      type={props.type}
      value={props.value}
      onInput={props.onInput}
    />
  )
}
