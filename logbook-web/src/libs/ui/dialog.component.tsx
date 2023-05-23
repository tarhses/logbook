import { ParentComponent, Show } from "solid-js"
import { Portal } from "solid-js/web"

export const Dialog: ParentComponent<{
  open?: boolean
}> = (props) => {
  return (
    <Show when={props.open}>
      <Portal>
        <dialog open>
          <article>{props.children}</article>
        </dialog>
      </Portal>
    </Show>
  )
}
