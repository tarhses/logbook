import { UserProvider } from "@/libs/user"
import { Navigate, Route, Router } from "@solidjs/router"
import { render } from "solid-js/web"
import { App as Train } from "./apps/train/app.component"
import "./index.scss"

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(console.error)
}

render(
  () => (
    <UserProvider>
      <Router>
        <Train base="/train" />
        <Route path="*" component={() => <Navigate href="/train" />} />
      </Router>
    </UserProvider>
  ),
  document.getElementById("root")!,
)
