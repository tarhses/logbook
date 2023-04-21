export interface HttpRequest {
  method: string
  path: string
  params: URLSearchParams
  headers: Headers
  body: string | undefined
}

export type HttpMiddleware = (request: HttpRequest) => void
