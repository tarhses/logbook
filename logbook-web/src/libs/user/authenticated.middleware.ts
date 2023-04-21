import { HttpMiddleware } from "@/libs/http"
import { user } from "./user.service"

export function authenticated(): HttpMiddleware {
  return ({ headers }) => {
    if (import.meta.env.DEV && !user().authToken) {
      console.error(
        "Authentication middleware is used while the user is not logged in.",
      )
    }
    headers.append("Authorization", `Bearer ${user().authToken}`)
  }
}
