import { HttpError } from "@/libs/http"
import { Alert } from "@/libs/ui"
import { Component, Show } from "solid-js"

export const ErrorAlert: Component<{
  error: Error | undefined
}> = (props) => {
  return (
    <Show when={props.error}>
      <Alert>
        <div>Damn, something went wrong.</div>
        <div>
          <i>
            <Show
              when={props.error instanceof HttpError}
              fallback={(props.error as Error).name}
            >
              {(props.error as HttpError).status}
            </Show>{" "}
            — {(props.error as Error).message}
          </i>
        </div>
      </Alert>
    </Show>
  )
}
