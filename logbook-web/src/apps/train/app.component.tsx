import { Route } from "@solidjs/router"
import { Component } from "solid-js"
import { RideForm } from "./ride-form.component"
import { RideList } from "./ride-list.component"
import { RideNew } from "./ride-new.component"

export const App: Component<{
  base: string
}> = (props) => {
  return (
    <Route path={props.base}>
      <Route path="/" component={RideList} />
      <Route path="/new" component={RideNew} />
      <Route path="/new/:id" component={RideForm} />
    </Route>
  )
}
