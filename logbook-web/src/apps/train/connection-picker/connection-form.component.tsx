import { ErrorAlert } from "@/libs/error"
import { createForm, time } from "@/libs/form"
import { Button } from "@/libs/ui"
import { Component, createSignal } from "solid-js"
import * as ConnectionClient from "../shared/clients/connection.client"
import { Connection } from "../shared/models/connection.model"

export const ConnectionForm: Component<{
  departureId: number
  arrivalId: number
  onSubmit: (connection: Connection) => void
  onCancel: () => void
}> = (props) => {
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | undefined>(undefined)
  const { values, inputs } = createForm({
    departureTime: time(NaN),
    arrivalTime: time(NaN),
  })

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    setLoading(true)
    ConnectionClient.create({
      ...values,
      departureId: props.departureId,
      arrivalId: props.arrivalId,
    })
      .then(props.onSubmit)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert error={error()} />
      <inputs.departureTime label="Departure" />
      <inputs.arrivalTime label="Arrival" />
      <Button type="submit" busy={loading()} variant="primary" label="Create" />
      <Button
        onClick={props.onCancel}
        busy={loading()}
        outlined={true}
        label="Cancel"
      />
    </form>
  )
}
