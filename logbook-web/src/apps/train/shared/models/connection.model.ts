import { Station } from "./station.model"

export interface Connection {
  id: number
  departure: Station
  departureTime: number
  arrival: Station
  arrivalTime: number
}
