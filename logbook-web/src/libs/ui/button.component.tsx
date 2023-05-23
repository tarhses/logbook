import { ParentComponent } from "solid-js"

export const Button: ParentComponent<{
  type?: "submit" | "reset"
  onClick?: () => void
  disabled?: boolean
  busy?: boolean
  variant?: "default" | "primary"
  outlined?: boolean
  inlined?: boolean
  label?: string
}> = (props) => {
  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-busy={props.busy}
      classList={{
        secondary: props.variant !== "primary",
        outline: props.outlined,
        inlined: props.inlined,
      }}
    >
      {props.children ?? props.label}
    </button>
  )
}
