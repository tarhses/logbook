import { createServer } from "node:http"
import connections from "./connections.js"
import rides from "./rides.js"
import stations from "./stations.js"

const PORT = 3001
const BASE_URL = "http://127.0.0.1"
const DELAY_MIN = 200
const DELAY_MAX = 500

const ROUTES = [...stations, ...connections, ...rides]

createServer((req, res) => {
  sleepAndThen(() => {
    const request = buildRequest(req)
    const handler = findHandler(request)
    if (handler) {
      const response = handler(request)
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(response))
    } else {
      res.statusCode = 404
      res.setHeader("Content-Type", "text/plain")
      res.end(`Endpoint not found: "${request.endpoint}".`)
    }
    console.log(`${res.statusCode} ${request.endpoint}`)
  })
}).listen(PORT, () => {
  console.info(`Listening on port ${PORT}.`)
})

const sleepAndThen = (callback) => {
  const delay = DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN)
  setTimeout(() => {
    callback()
  }, delay)
}

const buildRequest = (req) => {
  const url = new URL(req.url, BASE_URL)
  return {
    method: req.method,
    path: url.pathname,
    params: url.searchParams,
    endpoint: `${req.method} ${url.pathname}`,
  }
}

const findHandler = (request) => {
  for (const route of ROUTES) {
    if (route.when(request)) {
      return route.then
    }
  }
}
