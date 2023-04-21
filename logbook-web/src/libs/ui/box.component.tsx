import { ParentComponent } from "solid-js"
import styles from "./box.component.module.css"

export const Box: ParentComponent<{
  variant?: "error"
  title: string
}> = (props) => {
  return (
    <div class={`${styles.box} ${styles[props.variant ?? "error"]}`}>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  )
}
