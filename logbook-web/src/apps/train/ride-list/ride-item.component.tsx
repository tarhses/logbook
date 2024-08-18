import { Button, Dialog, FormatDuration, FormatTime } from "@/libs/ui"
import { Component, createSignal, Show } from "solid-js"
import { Ride } from "../shared/models/ride.model"
import { RideEditForm } from "./ride-edit-form.component"
import styles from "./ride-item.component.module.css"

export const RideItem: Component<{
  ride: Ride
  onDelete: () => void
}> = (props) => {
  const arrivalTime = () => props.ride.connection.arrivalTime + props.ride.delay

  const [editing, setEditing] = createSignal(false)

  const handleDelete = () => {
    setEditing(false)
    props.onDelete()
  }

  return (
    <>
      <div class={styles.item}>
        <div class={styles.control}>
          <Button onClick={() => setEditing(true)} inlined label="Edit" />
        </div>
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
      <Dialog open={editing()}>
        <RideEditForm
          ride={props.ride}
          onDelete={handleDelete}
          onCancel={() => setEditing(false)}
        />
      </Dialog>
    </>
  )
}
