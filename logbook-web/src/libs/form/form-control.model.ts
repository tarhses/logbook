import { InputComponent } from "./input-component.model"

export interface FormControl<T, I extends InputComponent<T>> {
  value: T
  input: I
}
