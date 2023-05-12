export interface HttpRequest {
  method: string
  path: string
  params: URLSearchParams
  headers: Headers
  body: string | undefined
}
