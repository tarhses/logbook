import { ErrorBox } from "@/libs/error"
import { createForm } from "@/libs/form"
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
  const [error, setError] = createSignal<Error | undefined>(undefined)

  const { values, inputs } = createForm({
    name: { value: "", input: InputText },
  })

  const sortedStations = () =>
    props.stations.sort((a, b) => a.name.localeCompare(b.name))

  const handleCreate = (event: SubmitEvent) => {
    event.preventDefault()
    createStation({ ...values })
      .then((station) => {
        setCreatingStation(false)
        props.onCreate(station)
        props.onSelect(station.id)
      })
      .catch(setError)
  }

  return (
    <div>
      <For each={sortedStations()}>
        {(station) => (
          <Button
            variant={station.id === props.selection ? "primary" : "default"}
            inlined={true}
            label={station.name}
            onClick={() => props.onSelect(station.id)}
          />
        )}
      </For>
      <Show when={props.showMore}>
        <Button inlined={true} label="…" onClick={props.onShowMore} />
      </Show>
      <Button
        variant="primary"
        inlined={true}
        label="New"
        onClick={() => setCreatingStation(true)}
      />
      <Dialog open={creatingStation()}>
        <h2>New station</h2>
        <ErrorBox error={error()} />
        <form onSubmit={handleCreate}>
          <inputs.name label="Name" />
          <Button variant="primary" type="submit" label="Create" />
          <Button label="Cancel" onClick={() => setCreatingStation(false)} />
        </form>
      </Dialog>
    </div>
  )
}
