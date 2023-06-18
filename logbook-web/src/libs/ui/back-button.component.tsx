import { Component } from "solid-js"
import { useNavigate } from "@solidjs/router"

export const BackButton: Component = () => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      class="inlined outline secondary"
      role="navigation"
      aria-label="Go back"
    >
      ⇠
    </button>
  )
}
