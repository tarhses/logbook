import { UserProvider } from "@/libs/user"
import { Navigate, Route, Router, Routes } from "@solidjs/router"
import { render } from "solid-js/web"
import { App as Game } from "./apps/game/app.component"
import { App as Train } from "./apps/train/app.component"
import "./index.scss"

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(console.error)
}

render(
  () => (
    <UserProvider>
      <Router>
        <Routes>
          <Game base="/game" />
          <Train base="/train" />
          <Route path="*" element={<Navigate href="/train" />} />
        </Routes>
      </Router>
    </UserProvider>
  ),
  document.getElementById("root")!,
)
