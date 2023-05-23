import { UserProvider } from "@/libs/user"
import { Navigate, Route, Router, Routes } from "@solidjs/router"
import { render } from "solid-js/web"
import { App as Train } from "./apps/train/app.component"
import "./index.scss"

render(
  () => (
    <UserProvider>
      <Router>
        <Routes>
          <Train base="/train" />
          <Route path="*" element={<Navigate href="/train" />} />
        </Routes>
      </Router>
    </UserProvider>
  ),
  document.getElementById("root")!,
)
