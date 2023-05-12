import { HttpMiddleware } from "./http-middleware.model"

export function header(name: string, value: string): HttpMiddleware {
  return ({ headers }) => {
    headers.append(name, value)
  }
}
