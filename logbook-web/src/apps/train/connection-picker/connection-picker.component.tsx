import { ErrorCatcher } from "@/libs/error"
import { Button, Dialog, FormatTime } from "@/libs/ui"
import { A, useNavigate } from "@solidjs/router"
import {
  Component,
  Show,
  Suspense,
  batch,
  createResource,
  createSignal,
} from "solid-js"
import * as ConnectionClient from "../shared/clients/connection.client"
import * as StationClient from "../shared/clients/station.client"
import { Connection } from "../shared/models/connection.model"
import { Station } from "../shared/models/station.model"
import { ConnectionForm } from "./connection-form.component"
import { Selector } from "./selector.component"
import { StationForm } from "./station-form.component"

export const ConnectionPicker: Component = () => {
  const navigate = useNavigate()

  const [departureId, setDepartureId] = createSignal(0)
  const [arrivalId, setArrivalId] = createSignal(0)
  const [connectionId, setConnectionId] = createSignal(0)
  const [creatingDeparture, setCreatingDeparture] = createSignal(false)
  const [creatingArrival, setCreatingArrival] = createSignal(false)
  const [creatingConnection, setCreatingConnection] = createSignal(false)

  const [departures, { mutate: setDepartures }] = createResource(
    StationClient.getAll,
    { initialValue: [] },
  )

  const [arrivals, { mutate: setArrivals }] = createResource(
    departureId,
    StationClient.getByDeparture,
    { initialValue: [] },
  )

  const [connections, { mutate: setConnections }] = createResource(
    arrivalId,
    (id) => ConnectionClient.getByEnds(departureId(), id),
    { initialValue: [] },
  )

  const sortedDepartures = () =>
    departures().sort((a, b) => a.name.localeCompare(b.name))

  const sortedArrivals = () =>
    arrivals()
      .filter((departure) => departure.id !== departureId())
      .sort((a, b) => a.name.localeCompare(b.name))

  const sortedConnections = () =>
    connections().sort((a, b) => a.departureTime - b.departureTime)

  const handleSelectDeparture = (id: number) => {
    batch(() => {
      setDepartureId(id)
      setArrivalId(0)
      setConnectionId(0)
    })
  }

  const handleSelectArrival = (id: number) => {
    batch(() => {
      setArrivalId(id)
      setConnectionId(0)
    })
  }

  const handleShowMoreArrivals = () => {
    setArrivals(departures())
  }

  const handleSubmitDeparture = (station: Station) => {
    batch(() => {
      setDepartures((departures) => [...departures, station])
      setDepartureId(station.id)
      setCreatingDeparture(false)
    })
  }

  const handleSubmitArrival = (station: Station) => {
    batch(() => {
      setDepartures((departures) => [...departures, station])
      setArrivals((arrivals) => [...arrivals, station])
      setArrivalId(station.id)
      setCreatingArrival(false)
    })
  }

  const handleSubmitConnection = (connection: Connection) => {
    batch(() => {
      setConnections((connections) => [...connections, connection])
      setConnectionId(connection.id)
      setCreatingConnection(false)
    })
  }

  return (
    <>
      <p>
        What route did you take? <A href="/train">Go back.</A>
      </p>
      <ErrorCatcher>
        <Suspense fallback={<section aria-busy={true}>Loading…</section>}>
          <Selector
            label="From"
            selections={sortedDepartures().map((departure) => ({
              id: departure.id,
              label: departure.name,
            }))}
            selection={departureId()}
            onSelect={handleSelectDeparture}
            onCreate={() => setCreatingDeparture(true)}
          />
        </Suspense>
        <Show when={departureId()}>
          <Suspense fallback={<section aria-busy={true}>Loading…</section>}>
            <Selector
              label="To"
              selections={sortedArrivals().map((arrival) => ({
                id: arrival.id,
                label: arrival.name,
              }))}
              selection={arrivalId()}
              onSelect={handleSelectArrival}
              onShowMore={
                departures().length !== arrivals().length
                  ? handleShowMoreArrivals
                  : undefined
              }
              onCreate={() => setCreatingArrival(true)}
            />
          </Suspense>
        </Show>
        <Show when={arrivalId()}>
          <Suspense fallback={<section aria-busy={true}>Loading…</section>}>
            <Selector
              label="At"
              selections={sortedConnections().map((connection) => ({
                id: connection.id,
                children: <FormatTime timestamp={connection.departureTime} />,
              }))}
              selection={connectionId()}
              onSelect={setConnectionId}
              onCreate={() => setCreatingConnection(true)}
            />
          </Suspense>
        </Show>
        <Show when={connectionId()}>
          <section>
            <Button
              onClick={() => navigate(`/train/rides/new/${connectionId()}`)}
              variant="primary"
              label="Continue"
            />
          </section>
        </Show>
      </ErrorCatcher>
      <Dialog open={creatingDeparture()}>
        <StationForm
          onSubmit={handleSubmitDeparture}
          onCancel={() => setCreatingDeparture(false)}
        />
      </Dialog>
      <Dialog open={creatingArrival()}>
        <StationForm
          onSubmit={handleSubmitArrival}
          onCancel={() => setCreatingArrival(false)}
        />
      </Dialog>
      <Dialog open={creatingConnection()}>
        <ConnectionForm
          departureId={departureId()}
          arrivalId={arrivalId()}
          onSubmit={handleSubmitConnection}
          onCancel={() => setCreatingConnection(false)}
        />
      </Dialog>
    </>
  )
}