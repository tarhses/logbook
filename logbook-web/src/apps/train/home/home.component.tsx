import { A } from "@solidjs/router"
import { Component } from "solid-js"

export const Home: Component = () => {
  return (
    <>
      <p>Welcome, what do you want to do?</p>
      <ul>
        <li>
          <A href="/train/rides/new">Record a new trip.</A>
        </li>
        <li>
          <A href="/train/rides">See previous trips.</A>
        </li>
      </ul>
    </>
  )
}
