import { HttpMiddleware } from "./http-request.model"

export function param(name: string, value: unknown): HttpMiddleware {
  return ({ params }) => {
    params.append(name, `${value}`)
  }
}
