import { ParentComponent, Show } from "solid-js"
import { UserLogin } from "./user-login.component"
import { user } from "./user.service"

export const UserProvider: ParentComponent = (props) => {
  return (
    <Show when={user().authToken} fallback={<UserLogin />}>
      {props.children}
    </Show>
  )
}
