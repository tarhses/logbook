import { UserProvider } from "@/libs/user"
import {
  Navigate,
  Route,
  Router,
  Routes,
  hashIntegration,
} from "@solidjs/router"
import "normalize.css"
import { render } from "solid-js/web"
import { App as Train } from "./apps/train/app.component"
import "./index.css"

render(
  () => (
    <UserProvider>
      <Router source={hashIntegration()}>
        <Routes>
          <Train base="/train" />
          <Route path="*" element={<Navigate href="/train" />} />
        </Routes>
      </Router>
    </UserProvider>
  ),
  document.getElementById("root")!,
)
