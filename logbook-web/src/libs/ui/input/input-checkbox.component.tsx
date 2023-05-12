import { Component } from "solid-js"
import { generateInputId } from "../id.service"

export const InputCheckbox: Component<{
  label: string
  required?: boolean
  disabled?: boolean
  value?: boolean
  onInput?: (value: boolean) => void
}> = (props) => {
  const id = generateInputId()
  return (
    <>
      <input
        id={id}
        type="checkbox"
        required={props.required}
        disabled={props.disabled}
        checked={props.value}
        onInput={(event) => props.onInput?.(event.currentTarget.checked)}
      />
      <label for={id}>{props.label}</label>
    </>
  )
}
