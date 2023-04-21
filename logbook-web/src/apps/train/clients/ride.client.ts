import { body, get, param, post } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Ride } from "../models/ride.model"

export interface CreateRide {
  connectionId: number
  date: number
  delay: number
  ticketControl: boolean
}

export const getPaginatedRides = (limit: number, offset: number) =>
  get<Ride[]>(
    "/api/rides",
    authenticated(),
    param("limit", limit),
    param("offset", offset),
  )

export const createRide = (ride: CreateRide) =>
  post<Ride>("/api/rides", authenticated(), body(ride))
