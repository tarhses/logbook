import { InputComponent } from "./input-component.model"

export interface FormControl<T extends InputComponent<unknown, unknown>> {
  value: Parameters<T>[0]["value"]
  input: T
}
