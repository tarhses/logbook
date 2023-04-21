import { ParentComponent } from "solid-js"
import styles from "./button.component.module.css"

export const Button: ParentComponent<{
  variant?: "default" | "primary" | "success"
  type?: "submit" | "reset"
  label?: string
  disabled?: boolean
  onClick?: () => void
}> = (props) => {
  return (
    <button
      class={`${styles.button} ${styles[props.variant ?? "default"]}`}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children ?? props.label}
    </button>
  )
}
