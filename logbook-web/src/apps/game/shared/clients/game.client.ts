import { body, get, param, post } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Game } from "../models/game.model"

export interface GameReq {
  name: string
  releaseDate: number | null
  finishable: boolean
  igdbId: number | null
}

export interface GameSuggestion {
  name: string
  releaseDate: number | null
  platforms: string[]
  igdbId: number
  igdbCover: string
}

export const getPaginated = (limit: number, offset: number) =>
  get<Game[]>(
    "/api/games",
    authenticated(),
    param("limit", limit),
    param("offset", offset),
  )

export const create = (game: GameReq) =>
  post<Game>("/api/games", authenticated(), body(game))

export const autocompleteByName = (name: string) =>
  get<GameSuggestion[]>(
    "/api/games/autocomplete",
    authenticated(),
    param("name", name),
  )
