import { createStore } from "solid-js/store"
import { FormControl } from "./form-control.model"
import { Form } from "./form.model"
import { InputComponent } from "./input-component.model"
import { InputProps } from "./input-props.model"

export function createForm<
  T extends Record<string, FormControl<InputComponent<unknown, any>>>,
>(controls: T): Form<T> {
  const entries = Object.entries(controls)

  const [values, setValues] = createStore(
    Object.fromEntries(entries.map(([name, control]) => [name, control.value])),
  )

  const inputs = Object.fromEntries(
    entries.map(([name, control]) => [
      name,
      (props: InputProps<unknown>) => (
        <control.input
          {...props}
          value={values[name]}
          onInput={(value: unknown) => setValues(name, value)}
        />
      ),
    ]),
  )

  return { values, inputs } as Form<T>
}
