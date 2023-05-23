import {
  InputCheckbox,
  InputDate,
  InputDuration,
  InputText,
  InputTime,
} from "@/libs/ui"
import { Component } from "solid-js"
import { createStore } from "solid-js/store"
import { FormControl } from "./form-control.model"
import { Form } from "./form.model"
import { InputProps } from "./input-props.model"

export const checkbox = (value: boolean) => createControl(InputCheckbox, value)

export const date = (value: number) => createControl(InputDate, value)

export const duration = (value: number) => createControl(InputDuration, value)

export const text = (value: string) => createControl(InputText, value)

export const time = (value: number) => createControl(InputTime, value)

export function createControl<T, P extends InputProps<T>>(
  input: Component<P>,
  value: T,
): FormControl<T, P> {
  return { value, input }
}

export function createForm<
  T extends {
    [K in keyof T]: FormControl<unknown, InputProps<T[K]["value"]>>
  },
>(controls: T): Form<T> {
  const entries =
    Object.entries<FormControl<unknown, InputProps<unknown>>>(controls)

  const [values, setValues] = createStore(
    Object.fromEntries(entries.map(([name, control]) => [name, control.value])),
  )

  const inputs = Object.fromEntries<Component<InputProps<unknown>>>(
    entries.map(([name, control]) => [
      name,
      (props) => (
        <control.input
          value={values[name]}
          onInput={(value) => setValues(name, value)}
          {...props}
        />
      ),
    ]),
  )

  return { values, inputs } as Form<T>
}
