import { ErrorAlert } from "@/libs/error"
import { createForm, text } from "@/libs/form"
import { Button } from "@/libs/ui"
import { Component, createSignal } from "solid-js"
import * as StationClient from "../shared/clients/station.client"
import { Station } from "../shared/models/station.model"

export const StationForm: Component<{
  onSubmit: (station: Station) => void
  onCancel: () => void
}> = (props) => {
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | undefined>(undefined)
  const { values, inputs } = createForm({
    name: text(""),
  })

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    setLoading(true)
    StationClient.create(values)
      .then(props.onSubmit)
      .catch((error: Error) => {
        setLoading(false)
        setError(error)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert error={error()} />
      <inputs.name label="Name" />
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
