import { ParentComponent, Show } from "solid-js"
import { Portal } from "solid-js/web"
import styles from "./dialog.component.module.css"

export const Dialog: ParentComponent<{
  open?: boolean
}> = (props) => {
  return (
    <Show when={props.open}>
      <Portal>
        <dialog open>
          <article class={styles.modal}>{props.children}</article>
        </dialog>
      </Portal>
    </Show>
  )
}
