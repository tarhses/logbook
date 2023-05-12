import { HttpRequest } from "./http-request.model"

export type HttpMiddleware = (request: HttpRequest) => void
