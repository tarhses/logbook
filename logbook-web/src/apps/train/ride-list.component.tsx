import { ErrorHandler } from "@/libs/error"
import { Button, FormatDate, FormatDuration, FormatTime } from "@/libs/ui"
import { useNavigate } from "@solidjs/router"
import {
  Component,
  For,
  Suspense,
  createResource,
  createSignal,
} from "solid-js"
import { Ride } from "./models/ride.model"
import { getRidesGroupedByDate } from "./services/ride.service"

export const RideList: Component = () => {
  const navigate = useNavigate()

  const [page, setPage] = createSignal(0)

  const [ridesPerDates] = createResource(page, getRidesGroupedByDate, {
    initialValue: [],
  })

  return (
    <ErrorHandler>
      <Button
        inlined={true}
        label="Previous page"
        disabled={page() === 0}
        onClick={() => setPage((page) => page - 1)}
      />
      <Button
        inlined={true}
        label="Next page"
        disabled={ridesPerDates().length === 0}
        onClick={() => setPage((page) => page + 1)}
      />
      <Button
        variant="primary"
        inlined={true}
        label="New"
        onClick={() => navigate("/train/new")}
      />
      <Suspense fallback={<div aria-busy={true} />}>
        <For each={ridesPerDates()}>
          {([date, rides]) => <RideListDate date={date} rides={rides} />}
        </For>
      </Suspense>
    </ErrorHandler>
  )
}

const RideListDate: Component<{
  date: number
  rides: Ride[]
}> = (props) => {
  return (
    <div>
      <div>
        <FormatDate timestamp={props.date} />
      </div>
      <For each={props.rides}>{(ride) => <RideListItem ride={ride} />}</For>
    </div>
  )
}

const RideListItem: Component<{
  ride: Ride
}> = (props) => {
  const connection = () => props.ride.connection

  return (
    <div>
      <div>
        {connection().departure.name} – {connection().arrival.name}
      </div>
      <div>
        <FormatTime timestamp={connection().departureTime} /> –{" "}
        <FormatTime timestamp={connection().arrivalTime + props.ride.delay} /> (
        <FormatDuration
          duration={
            connection().arrivalTime -
            connection().departureTime +
            props.ride.delay
          }
        />
        )
      </div>
      <div>{props.ride.ticketControl ? "Yes" : "No"}</div>
    </div>
  )
}
