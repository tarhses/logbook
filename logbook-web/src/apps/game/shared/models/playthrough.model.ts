import { DatePrecision } from "./date-precision.model"
import { Game } from "./game.model"
import { Platform } from "./platform.model"

export interface Playthrough {
  id: number
  game: Game
  platform: Platform
  startDate: number
  startDatePrecision: DatePrecision
  finished: boolean
  comment: string
}
