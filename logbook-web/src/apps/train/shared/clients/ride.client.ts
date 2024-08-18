import { body, delete_, get, param, post, put } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Ride } from "../models/ride.model"

export interface RideReq {
  connectionId: number
  date: number
  delay: number
  ticketControl: boolean
}

export const getPaginated = (limit: number, offset: number) =>
  get<Ride[]>(
    "/api/rides",
    authenticated(),
    param("limit", limit),
    param("offset", offset),
  )

export const create = (ride: RideReq) =>
  post<Ride>("/api/rides", authenticated(), body(ride))

export const updateById = (id: number, ride: RideReq) =>
  put<Ride>(`/api/rides/${id}`, authenticated(), body(ride))

export const deleteById = (id: number) =>
  delete_(`/api/rides/${id}`, authenticated())
