import { HttpMiddleware } from "./http-request.model"

export function body<T>(body: T): HttpMiddleware {
  return (request) => {
    request.headers.append("Content-Type", "application/json")
    request.body = JSON.stringify(body)
  }
}
