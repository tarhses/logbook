import { HttpError } from "./http-error.model"
import { HttpMiddleware } from "./http-middleware.model"
import { HttpRequest } from "./http-request.model"

export function get<T = void>(
  path: string,
  ...middlewares: HttpMiddleware[]
): Promise<T> {
  return perform<T>("GET", path, ...middlewares)
}

export function post<T = void>(
  path: string,
  ...middlewares: HttpMiddleware[]
): Promise<T> {
  return perform<T>("POST", path, ...middlewares)
}

export function put<T = void>(
  path: string,
  ...middlewares: HttpMiddleware[]
): Promise<T> {
  return perform<T>("PUT", path, ...middlewares)
}

export function delete_<T = void>(
  path: string,
  ...middlewares: HttpMiddleware[]
): Promise<T> {
  return perform<T>("DELETE", path, ...middlewares)
}

async function perform<T>(
  method: string,
  path: string,
  ...middlewares: HttpMiddleware[]
): Promise<T> {
  const request: HttpRequest = {
    method,
    path,
    params: new URLSearchParams(),
    headers: new Headers(),
    body: undefined,
  }

  for (const middleware of middlewares) {
    middleware(request)
  }

  const response = await fetch(buildPath(request), {
    method: request.method,
    headers: request.headers,
    body: request.body,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new HttpError(response.status, message || response.statusText)
  }

  const body = await response.json()
  return body as T
}

function buildPath(request: HttpRequest): string {
  const querystring = `${request.params}`
  return querystring ? `${request.path}?${querystring}` : request.path
}
