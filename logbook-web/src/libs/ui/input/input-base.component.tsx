import { Component, JSX, createEffect } from "solid-js"
import { generateInputId } from "../id.service"

export const InputBase: Component<{
  label: string
  type?: string
  required?: boolean
  disabled?: boolean
  value?: string
  numberValue?: number
  onInput?: (value: string) => void
  onNumberInput?: (value: number) => void
}> = (props) => {
  const id = generateInputId()
  let inputElement!: HTMLInputElement

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
      inputElement.valueAsNumber = props.numberValue
    }
  })

  return (
    <>
      <label for={id}>{props.label}</label>
      <input
        ref={inputElement}
        id={id}
        type={props.type}
        required={props.required}
        disabled={props.disabled}
        value={props.value}
        onInput={handleInput}
      />
    </>
  )
}
