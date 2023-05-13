import { Component, JSX, createEffect } from "solid-js"
import { generateInputId } from "../id.service"

export const InputBase: Component<{
  type?: string
  value?: string
  numberValue?: number
  onInput?: (value: string) => void
  onNumberInput?: (value: number) => void
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
}> = (props) => {
  const id = generateInputId()

  let input!: HTMLInputElement

  const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (
    event,
  ) => {
    props.onInput?.(event.currentTarget.value)
    props.onNumberInput?.(event.currentTarget.valueAsNumber)
  }

  // Solid doesn't allow direct binding to valueAsNumber for inputs, so let's
  // use an effect.
  createEffect(() => {
    if (props.numberValue !== undefined && !isNaN(props.numberValue)) {
      input.valueAsNumber = props.numberValue
    }
  })

  return (
    <>
      <label for={id}>{props.label}</label>
      <input
        ref={input}
        id={id}
        type={props.type}
        value={props.value}
        onInput={handleInput}
        required={props.required}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
    </>
  )
}
