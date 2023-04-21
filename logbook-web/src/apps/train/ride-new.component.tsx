import { Button } from "@/libs/ui"
import { useNavigate } from "@solidjs/router"
import { Component, Show, batch, createResource, createSignal } from "solid-js"
import { getConnectionsByEnds } from "./clients/connection.client"
import {
  getAllStations,
  getStationsByDeparture,
} from "./clients/station.client"
import { ConnectionSelector } from "./connection-selector.component"
import { Connection } from "./models/connection.model"
import { Station } from "./models/station.model"
import { StationSelector } from "./station-selector.component"

export const RideNew: Component = () => {
  const navigate = useNavigate()

  const [departureId, setDepartureId] = createSignal<number | undefined>(
    undefined,
  )
  const [arrivalId, setArrivalId] = createSignal<number | undefined>(undefined)
  const [connectionId, setConnectionId] = createSignal<number | undefined>(
    undefined,
  )
  const [showMoreArrivals, setShowMoreArrivals] = createSignal(false)

  const [departures, { mutate: setDepartures }] = createResource(
    getAllStations,
    { initialValue: [] },
  )
  const [arrivals, { mutate: setArrivals }] = createResource(
    departureId,
    getStationsByDeparture,
    { initialValue: [] },
  )
  const [connections, { mutate: setConnections }] = createResource(
    arrivalId,
    (id) => getConnectionsByEnds(departureId()!, id),
    { initialValue: [] },
  )

  const handleSelectDeparture = (id: number) => {
    if (id !== departureId()) {
      batch(() => {
        setDepartureId(id)
        setArrivalId(undefined)
        setConnectionId(undefined)
        setShowMoreArrivals(true)
        setArrivals([])
        setConnections([])
      })
    }
  }

  const handleSelectArrival = (id: number) => {
    if (id !== arrivalId()) {
      batch(() => {
        setArrivalId(id)
        setConnectionId(undefined)
        setConnections([])
      })
    }
  }

  const handleSelectConnection = (id: number) => {
    setConnectionId(id)
  }

  const handleCreateDeparture = (station: Station) => {
    setDepartures((departures) => [...departures, station])
  }

  const handleCreateArrival = (station: Station) => {
    setDepartures((departures) => [...departures, station])
    setArrivals((arrivals) => [...arrivals, station])
  }

  const handleCreateConnection = (connection: Connection) => {
    setConnections((connections) => [...connections, connection])
  }

  const handleShowMoreArrivals = () => {
    batch(() => {
      setShowMoreArrivals(false)
      setArrivals(
        departures().filter((station) => station.id !== departureId()),
      )
    })
  }

  return (
    <>
      <StationSelector
        stations={departures()}
        selection={departureId()}
        onSelect={handleSelectDeparture}
        onCreate={handleCreateDeparture}
      />
      <Show when={departureId() !== undefined}>
        <br />
        <StationSelector
          stations={arrivals()}
          selection={arrivalId()}
          showMore={showMoreArrivals()}
          onSelect={handleSelectArrival}
          onCreate={handleCreateArrival}
          onShowMore={handleShowMoreArrivals}
        />
      </Show>
      <Show when={arrivalId() !== undefined}>
        <br />
        <ConnectionSelector
          connections={connections()}
          selection={connectionId()}
          departureId={departureId()!}
          arrivalId={arrivalId()!}
          onSelect={handleSelectConnection}
          onCreate={handleCreateConnection}
        />
      </Show>
      <Show when={connectionId() !== undefined}>
        <br />
        <div>
          <Button label="Cancel" onClick={() => navigate("/train")} />
          <Button
            variant="success"
            label="Next"
            onClick={() => navigate(`${connectionId()}`)}
          />
        </div>
      </Show>
    </>
  )
}
