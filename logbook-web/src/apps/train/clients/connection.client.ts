import { body, get, param, post } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Connection } from "../models/connection.model"

export interface CreateConnection {
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

export const createConnection = (connection: CreateConnection) =>
  post<Connection>("/api/connections", authenticated(), body(connection))
