import { ParentComponent } from "solid-js"
import styles from "./button.component.module.css"

export const Button: ParentComponent<{
  variant?: "default" | "primary"
  inlined?: boolean
  type?: "submit" | "reset"
  label?: string
  disabled?: boolean
  onClick?: () => void
}> = (props) => {
  return (
    <button
      classList={{
        secondary: props.variant !== "primary",
        [styles.inlined]: props.inlined,
      }}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children ?? props.label}
    </button>
  )
}
