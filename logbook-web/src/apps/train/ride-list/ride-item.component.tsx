import { FormatDuration, FormatTime } from "@/libs/ui"
import { Component, Show } from "solid-js"
import { Ride } from "../shared/models/ride.model"
import styles from "./ride-item.component.module.css"

export const RideItem: Component<{
  ride: Ride
}> = (props) => {
  const arrivalTime = () => props.ride.connection.arrivalTime + props.ride.delay
  return (
    <div class={styles.item}>
      <div>
        From {props.ride.connection.departure.name} to{" "}
        {props.ride.connection.arrival.name}
      </div>
      <div>
        From <FormatTime timestamp={props.ride.connection.departureTime} /> to{" "}
        <FormatTime timestamp={arrivalTime()} />
        <Show when={props.ride.delay > 0}>
          {" "}
          (<FormatDuration duration={props.ride.delay} /> delay)
        </Show>
      </div>
      <div>
        {props.ride.ticketControl ? "Ticket controlled" : "No ticket control"}
      </div>
    </div>
  )
}
