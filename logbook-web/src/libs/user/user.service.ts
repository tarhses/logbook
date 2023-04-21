import { createSignal } from "solid-js"
import { User } from "./user.model"

const USER_STORAGE_KEY = "user"
const USER_STORAGE_VERSION = 0

const DEFAULT_USER: User = {
  version: USER_STORAGE_VERSION,
  authToken: "",
}

const [rawUser, setRawUser] = createSignal(loadUser())
export { rawUser as user }

function loadUser(): User {
  const json = localStorage.getItem(USER_STORAGE_KEY)
  const user = json ? (JSON.parse(json) as User) : DEFAULT_USER
  if (user.version !== 0) {
    console.error(`Unsupported user version: ${user.version}`)
    return DEFAULT_USER
  }
  return user
}

export function patchUser(data: Partial<User>): void {
  const user = setRawUser((user) => ({ ...user, ...data }))
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } catch (error: unknown) {
    console.error(`Failed to store user: ${error}`)
  }
}
