import { createStore } from "solid-js/store"
import { FormControl } from "./form-control.model"
import { FormInput } from "./form-input.model"
import { Form } from "./form.model"

export function createForm<
  T extends Record<string, FormControl<FormInput<any>>>,
>(controls: T): Form<T> {
  const entries = Object.entries(controls)

  const [values, setValues] = createStore(
    Object.fromEntries(entries.map(([name, control]) => [name, control.value])),
  )

  const inputs = Object.fromEntries<FormInput<unknown>>(
    entries.map(([name, control]) => [
      name,
      (props) => (
        <control.input
          {...props}
          value={values[name]}
          onInput={(value) => setValues(name, value)}
        />
      ),
    ]),
  )

  return { values, inputs } as Form<T>
}
