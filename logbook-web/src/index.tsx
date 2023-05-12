import { UserProvider } from "@/libs/user"
import "@picocss/pico"
import { Navigate, Route, Router, Routes } from "@solidjs/router"
import { render } from "solid-js/web"
import { App as Train } from "./apps/train/app.component"
import "./index.css"

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
