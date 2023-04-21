import { ErrorBoundary, ParentComponent } from "solid-js"
import { ErrorBox } from "./error-box.component"

export const ErrorHandler: ParentComponent = (props) => {
  return (
    <ErrorBoundary fallback={(error: Error) => <ErrorBox error={error} />}>
      {props.children}
    </ErrorBoundary>
  )
}
