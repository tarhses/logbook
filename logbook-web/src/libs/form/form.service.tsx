import {
  InputCheckbox,
  InputDate,
  InputDuration,
  InputText,
  InputTime,
} from "@/libs/ui"
import { createStore } from "solid-js/store"
import { FormControl } from "./form-control.model"
import { Form } from "./form.model"
import { InputComponent } from "./input-component.model"

export const checkbox = (value: boolean) => createControl(InputCheckbox, value)

export const date = (value: number) => createControl(InputDate, value)

export const duration = (value: number) => createControl(InputDuration, value)

export const text = (value: string) => createControl(InputText, value)

export const time = (value: number) => createControl(InputTime, value)

export function createControl<T, I extends InputComponent<T>>(
  input: I,
  value: T,
): FormControl<T, I> {
  return { value, input }
}

export function createForm<
  T extends {
    [K in keyof T]: FormControl<unknown, InputComponent<T[K]["value"]>>
  },
>(controls: T): Form<T> {
  const entries =
    Object.entries<FormControl<unknown, InputComponent<unknown>>>(controls)

  const [values, setValues] = createStore(
    Object.fromEntries(entries.map(([name, control]) => [name, control.value])),
  )

  const inputs = Object.fromEntries<InputComponent<unknown>>(
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
