import { ErrorBox } from "@/libs/error"
import { createForm } from "@/libs/form"
import {
  Button,
  FormatTime,
  InputCheckbox,
  InputDate,
  InputDuration,
} from "@/libs/ui"
import { useNavigate, useParams } from "@solidjs/router"
import { Component, Suspense, createResource, createSignal } from "solid-js"
import { getConnectionById } from "./clients/connection.client"
import { createRide } from "./clients/ride.client"

export const RideForm: Component = () => {
  const navigate = useNavigate()

  const params = useParams()
  const connectionId = () => parseInt(params.id)

  const [connection] = createResource(connectionId, getConnectionById)

  const [error, setError] = createSignal<Error | undefined>(undefined)

  const { values, inputs } = createForm({
    date: { value: Date.now(), input: InputDate },
    delay: { value: 0, input: InputDuration },
    ticketControl: { value: false, input: InputCheckbox },
  })

  const arrivalTime = () => (connection()?.arrivalTime ?? 0) + values.delay

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    createRide({ ...values, connectionId: connectionId() })
      .then(() => navigate("/train"))
      .catch(setError)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a connection</h2>
      <ErrorBox error={error() ?? connection.error} />
      <Suspense fallback={<p aria-busy={true} />}>
        <p>
          Going from {connection()?.departure.name} to{" "}
          {connection()?.arrival.name} from{" "}
          <FormatTime timestamp={connection()?.departureTime} /> to{" "}
          <FormatTime timestamp={arrivalTime()} />.
        </p>
      </Suspense>
      <inputs.date label="Date" />
      <inputs.delay label="Delay" />
      <inputs.ticketControl label="Ticket control" />
      <Button variant="primary" type="submit" label="Create" />
      <Button label="Cancel" onClick={() => navigate("/train")} />
    </form>
  )
}
