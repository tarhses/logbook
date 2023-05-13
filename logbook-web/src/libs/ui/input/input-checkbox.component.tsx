import { Component } from "solid-js"
import { generateInputId } from "../id.service"

export const InputCheckbox: Component<{
  value?: boolean
  onInput?: (value: boolean) => void
  required?: boolean
  disabled?: boolean
  label?: string
}> = (props) => {
  const id = generateInputId()
  return (
    <fieldset>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={props.value}
        onInput={(event) => props.onInput?.(event.currentTarget.checked)}
        required={props.required}
        disabled={props.disabled}
      />
      <label for={id}>{props.label}</label>
    </fieldset>
  )
}
