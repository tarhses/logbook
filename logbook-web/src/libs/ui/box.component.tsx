import { ParentComponent } from "solid-js"

export const Box: ParentComponent = (props) => {
  return <article>{props.children}</article>
}
