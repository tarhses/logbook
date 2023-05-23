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
    <article>
      <form onSubmit={handleSubmit}>
        <InputText
          type="password"
          value={token()}
          onInput={setToken}
          label="Token"
        />
        <Button type="submit" variant="primary" label="Login" />
      </form>
    </article>
  )
}
