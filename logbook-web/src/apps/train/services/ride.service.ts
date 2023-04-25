import { getPaginatedRides } from "../clients/ride.client"
import { Ride } from "../models/ride.model"

const RIDES_PER_PAGE = 25

export type RidesPerDate = [date: number, rides: Ride[]]

export function getRidesByPage(page: number): Promise<Ride[]> {
  return getPaginatedRides(RIDES_PER_PAGE, page * RIDES_PER_PAGE)
}

export function getRidesGroupedByDate(page: number): Promise<RidesPerDate[]> {
  return getRidesByPage(page).then((rides) => {
    const map = new Map<number, Ride[]>()
    for (const ride of rides) {
      const group = map.get(ride.date)
      if (group) {
        group.push(ride)
      } else {
        map.set(ride.date, [ride])
      }
    }
    return Array.from(map.entries())
  })
}
