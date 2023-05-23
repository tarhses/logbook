import { FormControl } from "./form-control.model"
import { InputProps } from "./input-props.model"

export interface Form<
  T extends Record<string, FormControl<unknown, InputProps<unknown>>>,
> {
  values: { [K in keyof T]: T[K]["value"] }
  inputs: { [K in keyof T]: T[K]["input"] }
}
