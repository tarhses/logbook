import { ErrorBox } from "@/libs/error"
import { Button, Dialog, InputText } from "@/libs/ui"
import { Component, For, Show, createSignal } from "solid-js"
import { createStation } from "./clients/station.client"
import { Station } from "./models/station.model"

export const StationSelector: Component<{
  stations: Station[]
  selection: number | undefined
  showMore?: boolean
  onSelect: (id: number) => void
  onCreate: (station: Station) => void
  onShowMore?: () => void
}> = (props) => {
  const [creatingStation, setCreatingStation] = createSignal(false)
  const [name, setName] = createSignal("")
  const [error, setError] = createSignal<Error | undefined>(undefined)

  const handleCreate = (event: SubmitEvent) => {
    event.preventDefault()
    createStation({
      name: name(),
    })
      .then((station) => {
        setCreatingStation(false)
        setName("")
        props.onCreate(station)
        props.onSelect(station.id)
      })
      .catch(setError)
  }

  return (
    <div>
      <For each={props.stations}>
        {(station) => (
          <Button
            variant={station.id === props.selection ? "primary" : "default"}
            label={station.name}
            onClick={() => props.onSelect(station.id)}
          />
        )}
      </For>
      <Show when={props.showMore}>
        <Button label="…" onClick={props.onShowMore} />
      </Show>
      <Button
        variant="success"
        label="New"
        onClick={() => setCreatingStation(true)}
      />
      <Dialog
        title="New station"
        open={creatingStation()}
        onClose={() => setCreatingStation(false)}
      >
        <ErrorBox error={error()} />
        <form onSubmit={handleCreate}>
          <InputText label="Name" value={name()} onInput={setName} />
          <div>
            <Button label="Cancel" onClick={() => setCreatingStation(false)} />
            <Button variant="success" type="submit" label="Create" />
          </div>
        </form>
      </Dialog>
    </div>
  )
}
