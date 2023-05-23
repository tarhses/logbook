import { Connection } from "./connection.model"

export interface Ride {
  id: number
  connection: Connection
  date: number
  delay: number
  ticketControl: boolean
}
