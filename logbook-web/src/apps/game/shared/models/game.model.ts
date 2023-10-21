export interface Game {
  id: number
  name: string
  releaseDate: number | null
  finishable: boolean
  igdbId: number | null
  igdbCover: string | null
}
