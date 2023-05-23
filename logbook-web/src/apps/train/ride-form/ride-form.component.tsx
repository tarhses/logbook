import { ErrorAlert } from "@/libs/error"
import { checkbox, createForm, date, duration } from "@/libs/form"
import { Button, FormatTime } from "@/libs/ui"
import { A, useNavigate, useParams } from "@solidjs/router"
import { Component, Suspense, createResource, createSignal } from "solid-js"
import * as ConnectionClient from "../shared/clients/connection.client"
import * as RideClient from "../shared/clients/ride.client"

export const RideForm: Component = () => {
  const navigate = useNavigate()

  const params = useParams()
  const connectionId = () => parseInt(params.connectionId)

  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | undefined>(undefined)
  const { values, inputs } = createForm({
    date: date(Date.now()),
    delay: duration(0),
    ticketControl: checkbox(false),
  })

  const [connection] = createResource(connectionId, ConnectionClient.getById)

  const arrivalTime = () => (connection()?.arrivalTime ?? 0) + values.delay

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    setLoading(true)
    RideClient.create({ ...values, connectionId: connectionId() })
      .then(() => navigate("/train"))
      .catch((error: Error) => {
        setLoading(false)
        setError(error)
      })
  }

  return (
    <>
      <p>
        How was your trip? <A href="/train/rides/new">Go back.</A>
      </p>
      <ErrorAlert error={error() ?? connection.error} />
      <article>
        <Suspense
          fallback={<p aria-busy={true}>Going from … to … from … to …</p>}
        >
          <p>
            Going from {connection()?.departure.name} to{" "}
            {connection()?.arrival.name} from{" "}
            <FormatTime timestamp={connection()?.departureTime} /> to{" "}
            <FormatTime timestamp={arrivalTime()} />.
          </p>
        </Suspense>
        <form onSubmit={handleSubmit}>
          <inputs.date label="Date" />
          <inputs.delay label="Delay" />
          <inputs.ticketControl label="Ticket control" />
          <Button
            type="submit"
            busy={loading()}
            variant="primary"
            label="Create"
          />
        </form>
      </article>
    </>
  )
}
