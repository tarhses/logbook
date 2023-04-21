import { Button, InputText } from "@/libs/ui"
import { Component, createSignal } from "solid-js"
import { patchUser } from "./user.service"

export const UserLogin: Component = () => {
  const [token, setToken] = createSignal("")

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    patchUser({ authToken: token() })
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputText
        type="password"
        label="Token"
        value={token()}
        onInput={setToken}
      />
      <Button type="submit" label="Login" />
    </form>
  )
}
