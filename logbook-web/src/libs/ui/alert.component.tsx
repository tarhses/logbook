import { ParentComponent } from "solid-js"

export const Alert: ParentComponent = (props) => {
  return <div role="alert">{props.children}</div>
}
