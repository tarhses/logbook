import { Component, ParentComponent, Show, onCleanup } from "solid-js"
import styles from "./dialog.component.module.css"
import { Portal } from "solid-js/web"

// TODO: animations

export const Dialog: ParentComponent<{
  title: string
  open?: boolean
  onClose?: () => void
}> = (props) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.open && event.key === "Escape") {
      event.stopPropagation()
      props.onClose?.()
    }
  }

  document.addEventListener("keydown", handleKeyDown)
  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <Show when={props.open}>
      <Portal>
        <div class={styles.dialog}>
          <div class={styles.overlay} onClick={props.onClose} tabindex={-1} />
          <div class={styles.panel} tabindex={0}>
            <header class={styles.header}>
              <h2 class={styles.title}>{props.title}</h2>
              <div class={styles.actions}>
                <span class={styles.button} onClick={props.onClose}>
                  <DialogCloseIcon />
                </span>
              </div>
            </header>
            <div class={styles.body}>{props.children}</div>
          </div>
        </div>
      </Portal>
    </Show>
  )
}

const DialogCloseIcon: Component = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
    </svg>
  )
}
