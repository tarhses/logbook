import { body, get, param, post, put } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Connection } from "../models/connection.model"

export interface ConnectionReq {
  departureId: number
  arrivalId: number
  departureTime: number
  arrivalTime: number
}

export const getConnectionById = (id: number) =>
  get<Connection>(`/api/connections/${id}`, authenticated())

export const getConnectionsByEnds = (departureId: number, arrivalId: number) =>
  get<Connection[]>(
    "/api/connections",
    authenticated(),
    param("from", departureId),
    param("to", arrivalId),
  )

export const createConnection = (connection: ConnectionReq) =>
  post<Connection>("/api/connections", authenticated(), body(connection))

export const updateConnectionById = (id: number, connection: ConnectionReq) =>
  put<Connection>(`/api/connections/${id}`, authenticated(), body(connection))
