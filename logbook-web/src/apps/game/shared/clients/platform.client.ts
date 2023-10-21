import { body, get, post } from "@/libs/http"
import { authenticated } from "@/libs/user"
import { Platform } from "../models/platform.model"

export interface PlatformReq {
  name: string
}

export const getAll = () => get<Platform[]>("/api/platforms", authenticated())

export const create = (platform: PlatformReq) =>
  post<Platform>("/api/platforms", authenticated(), body(platform))
