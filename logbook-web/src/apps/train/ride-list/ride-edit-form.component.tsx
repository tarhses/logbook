import { ErrorAlert } from "@/libs/error"
import { Button } from "@/libs/ui"
import { Component, createSignal } from "solid-js"
import { Ride } from "../shared/models/ride.model"
import * as RideClient from "../shared/clients/ride.client"

export const RideEditForm: Component<{
  ride: Ride
  onDelete: () => void
  onCancel: () => void
}> = (props) => {
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | undefined>(undefined)

  const handleDelete = () => {
    setLoading(true)
    RideClient.deleteById(props.ride.id)
      .then(props.onDelete)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return (
    <form>
      <ErrorAlert error={error()} />
      <Button
        onClick={handleDelete}
        busy={loading()}
        variant="primary"
        label="Delete"
      />
      <Button
        onClick={props.onCancel}
        busy={loading()}
        outlined={true}
        label="Cancel"
      />
    </form>
  )
}
