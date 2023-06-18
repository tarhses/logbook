import { A } from "@solidjs/router"
import { Component } from "solid-js"
import styles from "./home.component.module.css"

export const Home: Component = () => {
  return (
    <>
      <p>Welcome, what do you want to do?</p>
      <section class={styles.list}>
        <A class={styles.button} role="button" href="/train/rides/new">
          Record a new trip
        </A>
        <A class={styles.button} role="button" href="/train/rides">
          See previous trips
        </A>
      </section>
    </>
  )
}
