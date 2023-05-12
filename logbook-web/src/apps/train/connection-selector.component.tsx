import { ErrorBox } from "@/libs/error"
import { createForm } from "@/libs/form"
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
  const [error, setError] = createSignal<Error | undefined>(undefined)

  const { values, inputs } = createForm({
    departureTime: { value: NaN, input: InputTime },
    arrivalTime: { value: NaN, input: InputTime },
  })

  const sortedConnections = () =>
    props.connections.sort((a, b) => a.departureTime - b.departureTime)

  const handleCreate = (event: SubmitEvent) => {
    event.preventDefault()
    createConnection({
      ...values,
      departureId: props.departureId,
      arrivalId: props.arrivalId,
    })
      .then((connection) => {
        setCreatingConnection(false)
        props.onCreate(connection)
        props.onSelect(connection.id)
      })
      .catch(setError)
  }

  return (
    <div>
      <For each={sortedConnections()}>
        {(connection) => (
          <Button
            variant={connection.id === props.selection ? "primary" : "default"}
            inlined={true}
            onClick={() => props.onSelect(connection.id)}
          >
            <FormatTime timestamp={connection.departureTime} />
          </Button>
        )}
      </For>
      <Button
        variant="primary"
        inlined={true}
        label="New"
        onClick={() => setCreatingConnection(true)}
      />
      <Dialog open={creatingConnection()}>
        <h2>New connection</h2>
        <ErrorBox error={error()} />
        <form onSubmit={handleCreate}>
          <inputs.departureTime label="Departure" />
          <inputs.arrivalTime label="Arrival" />
          <Button variant="primary" type="submit" label="Create" />
          <Button label="Cancel" onClick={() => setCreatingConnection(false)} />
        </form>
      </Dialog>
    </div>
  )
}
