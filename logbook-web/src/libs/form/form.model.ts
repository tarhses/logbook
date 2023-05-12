import { FormControl } from "./form-control.model"
import { InputComponent } from "./input-component.model"

export interface Form<
  T extends Record<string, FormControl<InputComponent<unknown, unknown>>>,
> {
  values: { [K in keyof T]: T[K]["value"] }
  inputs: { [K in keyof T]: T[K]["input"] }
}
