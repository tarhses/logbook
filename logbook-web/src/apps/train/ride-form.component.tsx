import { ErrorBox } from "@/libs/error"
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
  const [date, setDate] = createSignal(Date.now())
  const [delay, setDelay] = createSignal(0)
  const [ticketControl, setTicketControl] = createSignal(false)
  const [error, setError] = createSignal<Error | undefined>(undefined)

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    createRide({
      connectionId: connectionId(),
      date: date(),
      delay: delay(),
      ticketControl: ticketControl(),
    })
      .then(() => navigate("/train"))
      .catch(setError)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a connection</h2>
      <ErrorBox error={error() ?? connection.error} />
      <Suspense>
        <p>
          Going from {connection()?.departure.name} to{" "}
          {connection()?.arrival.name} from{" "}
          <FormatTime timestamp={connection()?.departureTime} /> to{" "}
          <FormatTime timestamp={(connection()?.arrivalTime ?? 0) + delay()} />.
        </p>
      </Suspense>
      <InputDate label="Date" timestamp={date()} onInput={setDate} />
      <InputDuration label="Delay" duration={delay()} onInput={setDelay} />
      <InputCheckbox
        label="Ticket control"
        checked={ticketControl()}
        onInput={setTicketControl}
      />
      <div>
        <Button label="Cancel" onClick={() => navigate("/train")} />
        <Button variant="success" type="submit" label="Create" />
      </div>
    </form>
  )
}
