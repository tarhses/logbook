import { Component, createSignal } from "solid-js"
import { InputBase } from "./input-base.component"
import { formatDuration, parseDuration } from "../time.service"

export const InputDuration: Component<{
  label: string
  duration?: number
  onInput?: (duration: number) => void
}> = (props) => {
  return (
    <InputBase
      label={props.label}
      type="text"
      value={formatDuration(props.duration ?? 0)}
      onInput={(value) => props.onInput?.(parseDuration(value))}
    />
  )
}
