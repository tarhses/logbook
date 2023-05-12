import { FormInput } from "./form-input.model"

export interface FormControl<T extends FormInput<unknown>> {
  value: Parameters<T>[0]["value"]
  input: T
}
