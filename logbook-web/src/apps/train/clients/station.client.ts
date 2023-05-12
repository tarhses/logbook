import { body, get, param, post, put } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Station } from "../models/station.model"

export interface StationReq {
  name: string
}

export const getAllStations = () =>
  get<Station[]>("/api/stations", authenticated())

export const getStationsByDeparture = (departureId: number) =>
  get<Station[]>("/api/stations", authenticated(), param("from", departureId))

export const createStation = (station: StationReq) =>
  post<Station>("/api/stations", authenticated(), body(station))

export const updateStationById = (id: number, station: StationReq) =>
  put<Station>(`/api/stations/${id}`, authenticated(), body(station))
