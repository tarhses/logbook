import { Route } from "@solidjs/router"
import { Component } from "solid-js"
import { Home } from "./home/home.component"

export const App: Component<{
  base: string
}> = (props) => {
  return (
    <Route path={props.base}>
      <Route path="/" component={Home} />
    </Route>
  )
}
