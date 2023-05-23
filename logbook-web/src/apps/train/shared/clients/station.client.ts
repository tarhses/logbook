import { body, get, param, post, put } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Station } from "../models/station.model"

export interface StationReq {
  name: string
}

export const getAll = () => get<Station[]>("/api/stations", authenticated())

export const getByDeparture = (departureId: number) =>
  get<Station[]>("/api/stations", authenticated(), param("from", departureId))

export const create = (station: StationReq) =>
  post<Station>("/api/stations", authenticated(), body(station))

export const updateById = (id: number, station: StationReq) =>
  put<Station>(`/api/stations/${id}`, authenticated(), body(station))
