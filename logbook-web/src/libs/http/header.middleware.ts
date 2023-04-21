import { HttpMiddleware } from "./http-request.model"

export function header(name: string, value: string): HttpMiddleware {
  return ({ headers }) => {
    headers.append(name, value)
  }
}
