import { body, get, param, post } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Station } from "../models/station.model"

export interface CreateStation {
  name: string
}

export const getAllStations = () =>
  get<Station[]>("/api/stations", authenticated())

export const getStationsByDeparture = (departureId: number) =>
  get<Station[]>("/api/stations", authenticated(), param("from", departureId))

export const createStation = (station: CreateStation) =>
  post<Station>("/api/stations", authenticated(), body(station))
