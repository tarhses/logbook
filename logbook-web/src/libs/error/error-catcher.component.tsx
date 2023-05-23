import { ErrorBoundary, ParentComponent } from "solid-js"
import { ErrorAlert } from "./error-alert.component"

export const ErrorCatcher: ParentComponent = (props) => {
  return (
    <ErrorBoundary fallback={(error: Error) => <ErrorAlert error={error} />}>
      {props.children}
    </ErrorBoundary>
  )
}
