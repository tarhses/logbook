import { HttpError } from "@/libs/http"
import { Box } from "@/libs/ui"
import { Component, Show } from "solid-js"

export const ErrorBox: Component<{
  error: Error | undefined
}> = (props) => {
  return (
    <Show when={props.error}>
      <Box>
        <h3>Damn</h3>
        <p>Something went wrong.</p>
        <p>
          <code>
            <strong>
              <Show
                when={props.error instanceof HttpError}
                fallback={(props.error as Error).name}
              >
                HTTP {(props.error as HttpError).status}
              </Show>
            </strong>{" "}
            {(props.error as Error).message}
          </code>
        </p>
      </Box>
    </Show>
  )
}
