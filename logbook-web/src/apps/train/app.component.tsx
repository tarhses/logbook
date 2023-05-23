import { Route } from "@solidjs/router"
import { Component } from "solid-js"
import { ConnectionPicker } from "./connection-picker/connection-picker.component"
import { Home } from "./home/home.component"
import { RideForm } from "./ride-form/ride-form.component"
import { RideList } from "./ride-list/ride-list.component"

export const App: Component<{
  base: string
}> = (props) => {
  return (
    <Route path={props.base}>
      <Route path="/" component={Home} />
      <Route path="/rides" component={RideList} />
      <Route path="/rides/new" component={ConnectionPicker} />
      <Route path="/rides/new/:connectionId" component={RideForm} />
    </Route>
  )
}
