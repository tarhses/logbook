import { Component, JSX, createEffect } from "solid-js"
import { generateInputId } from "./id.service"
import styles from "./input-base.component.module.css"

export const InputBase: Component<{
  label: string
  type?: string
  value?: string
  numberValue?: number
  onInput?: (value: string) => void
  onNumberInput?: (value: number) => void
  onFocus?: () => void
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
      <label for={id} class={styles.label}>
        {props.label}
      </label>
      <input
        ref={inputElement}
        id={id}
        class={styles.control}
        type={props.type}
        value={props.value}
        onInput={handleInput}
      />
    </>
  )
}
