import { Button } from "@/libs/ui"
import { Component, For, JSX, Show } from "solid-js"
import styles from "./selector.component.module.css"

export interface Selection {
  id: number
  label?: string
  children?: JSX.Element
}

export const Selector: Component<{
  label: string
  selections: Selection[]
  selection: number
  onSelect: (id: number) => void
  onCreate: () => void
  onShowMore?: () => void
}> = (props) => {
  return (
    <section>
      <strong>{props.label}</strong>
      <hr />
      <div class={styles.selections}>
        <For each={props.selections}>
          {(selection) => (
            <Button
              onClick={() => props.onSelect(selection.id)}
              outlined={selection.id !== props.selection}
              inlined
              label={selection.label}
            >
              {selection.children}
            </Button>
          )}
        </For>
        <Show when={props.onShowMore}>
          <Button onClick={props.onShowMore} outlined inlined label="…" />
        </Show>
        <Button
          onClick={props.onCreate}
          variant="primary"
          inlined
          label="New"
        />
      </div>
    </section>
  )
}
