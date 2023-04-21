import { FormatDate, FormatDuration, FormatTime } from "@/libs/ui"
import { Component } from "solid-js"
import { Ride } from "./models/ride.model"
import styles from "./ride-list-item.component.module.css"

export const RideListItem: Component<{
  ride: Ride
}> = (props) => {
  return (
    <div class={styles.ride}>
      <div class={styles.date}>
        <FormatDate timestamp={props.ride.date} />
      </div>
      <div class={styles.connection}>
        {props.ride.connection.departure.name} –{" "}
        {props.ride.connection.arrival.name}
      </div>
      <div
        classList={{
          [styles.time]: true,
          [styles.delayed]: props.ride.delay > 0,
        }}
      >
        <FormatTime timestamp={props.ride.connection.departureTime} /> –{" "}
        <FormatTime
          timestamp={props.ride.connection.arrivalTime + props.ride.delay}
        />{" "}
        (
        <FormatDuration
          duration={
            props.ride.connection.arrivalTime -
            props.ride.connection.departureTime +
            props.ride.delay
          }
        />
        )
      </div>
      <div class={styles.ticket}>{props.ride.ticketControl ? "Yes" : "No"}</div>
    </div>
  )
}
