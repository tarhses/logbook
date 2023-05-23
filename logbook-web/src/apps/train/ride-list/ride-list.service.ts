import { getPaginated } from "../shared/clients/ride.client"
import { Ride } from "../shared/models/ride.model"

const RIDES_PER_PAGE = 20

export type DateGroup = [date: number, rides: Ride[]]

export function getByPage(page: number): Promise<Ride[]> {
  return getPaginated(RIDES_PER_PAGE, page * RIDES_PER_PAGE)
}

export function getDateGroupsByPage(page: number): Promise<DateGroup[]> {
  return getByPage(page).then((rides) => {
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
