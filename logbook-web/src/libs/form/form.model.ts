import { FormControl } from "./form-control.model"
import { FormInput } from "./form-input.model"

export interface Form<
  T extends Record<string, FormControl<FormInput<unknown>>>,
> {
  values: { [K in keyof T]: T[K]["value"] }
  inputs: { [K in keyof T]: T[K]["input"] }
}
