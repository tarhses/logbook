import { body, get, param, post } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Playthrough } from "../models/playthrough.model"
import { DatePrecision } from "../models/date-precision.model"

export interface PlaythroughReq {
  gameId: number
  platformId: number
  startDate: number
  startDatePrecision: DatePrecision
  finished: boolean
  comment: string
}

export const getPaginated = (limit: number, offset: number) =>
  get<Playthrough[]>(
    "/api/playthroughs",
    authenticated(),
    param("limit", limit),
    param("offset", offset),
  )

export const create = (playthrough: PlaythroughReq) =>
  post<Playthrough>("/api/playthroughs", authenticated(), body(playthrough))
