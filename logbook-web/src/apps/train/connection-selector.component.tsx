import { ErrorBox } from "@/libs/error"
import { Button, Dialog, FormatTime, InputTime } from "@/libs/ui"
import { Component, For, createSignal } from "solid-js"
import { createConnection } from "./clients/connection.client"
import { Connection } from "./models/connection.model"

export const ConnectionSelector: Component<{
  connections: Connection[]
  selection: number | undefined
  departureId: number
  arrivalId: number
  onSelect: (id: number) => void
  onCreate: (connection: Connection) => void
}> = (props) => {
  const [creatingConnection, setCreatingConnection] = createSignal(false)
  const [departureTime, setDepartureTime] = createSignal(NaN)
  const [arrivalTime, setArrivalTime] = createSignal(NaN)
  const [error, setError] = createSignal<Error | undefined>(undefined)

  const handleCreate = (event: SubmitEvent) => {
    event.preventDefault()
    createConnection({
      departureId: props.departureId,
      arrivalId: props.arrivalId,
      departureTime: departureTime(),
      arrivalTime: arrivalTime(),
    })
      .then((connection) => {
        setCreatingConnection(false)
        setDepartureTime(NaN)
        setArrivalTime(NaN)
        props.onCreate(connection)
        props.onSelect(connection.id)
      })
      .catch(setError)
  }

  return (
    <div>
      <For each={props.connections}>
        {(connection) => (
          <Button
            variant={connection.id === props.selection ? "primary" : "default"}
            onClick={() => props.onSelect(connection.id)}
          >
            <FormatTime timestamp={connection.departureTime} />
          </Button>
        )}
      </For>
      <Button
        variant="success"
        label="New"
        onClick={() => setCreatingConnection(true)}
      />
      <Dialog
        title="New connection"
        open={creatingConnection()}
        onClose={() => setCreatingConnection(false)}
      >
        <ErrorBox error={error()} />
        <form onSubmit={handleCreate}>
          <InputTime
            label="Departure"
            timestamp={departureTime()}
            onInput={setDepartureTime}
          />
          <InputTime
            label="Arrival"
            timestamp={arrivalTime()}
            onInput={setArrivalTime}
          />
          <div>
            <Button
              label="Cancel"
              onClick={() => setCreatingConnection(false)}
            />
            <Button variant="success" type="submit" label="Create" />
          </div>
        </form>
      </Dialog>
    </div>
  )
}
