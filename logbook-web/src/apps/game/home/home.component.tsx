import { Button, FormatDate, InputText } from "@/libs/ui"
import { createScheduled, debounce } from "@solid-primitives/scheduled"
import {
  Component,
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js"
import * as GameClient from "../shared/clients/game.client"
import * as PlatformClient from "../shared/clients/platform.client"
import { checkbox, createForm, date, text } from "@/libs/form"
import { ErrorAlert } from "@/libs/error"

export const Home: Component = () => {
  /* Platform form
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal<Error | undefined>(undefined)
  const { values, inputs } = createForm({
    name: text(""),
  })

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault()
    setLoading(true)
    PlatformClient.create(values)
      .catch(setError)
      .finally(() => setLoading(false))
  }

  return (
    <>
      <ErrorAlert error={error()} />
      <article>
        <form onSubmit={handleSubmit}>
          <inputs.name label="Name" />
          <Button
            type="submit"
            busy={loading()}
            variant="primary"
            label="Create"
          />
        </form>
      </article>
    </>
  )
  */

  /* Game form */
  // const [loading, setLoading] = createSignal(false)
  // const [error, setError] = createSignal<Error | undefined>(undefined)
  // const { values, inputs } = createForm({
  //   name: text(""),
  //   releaseDate: date(NaN),
  //   finishable: checkbox(true),
  // })

  // const handleSubmit = (event: SubmitEvent) => {
  //   event.preventDefault()
  //   setLoading(true)
  //   PlatformClient.create(values)
  //     .catch(setError)
  //     .finally(() => setLoading(false))
  // }

  // return (
  //   <>
  //     <ErrorAlert error={error()} />
  //     <article>
  //       <form onSubmit={handleSubmit}>
  //         <inputs.name label="Name" />
  //         <inputs.releaseDate label="Release date" />
  //         <inputs.finishable label="Finishable" />
  //         <Button
  //           type="submit"
  //           busy={loading()}
  //           variant="primary"
  //           label="Create"
  //         />
  //       </form>
  //     </article>
  //   </>
  // )

  /* Game prefill */
  const [name, setName] = createSignal("")
  const [debouncedName, setDebouncedName] = createSignal<string | undefined>(
    undefined,
  )
  const [results] = createResource(debouncedName, GameClient.autocompleteByName)
  const scheduled = createScheduled((fn) => debounce(fn, 500))

  createEffect(() => {
    const currentName = name()
    if (scheduled()) {
      setDebouncedName(currentName.trim() || undefined)
    }
  })

  return (
    <>
      <InputText
        value={name()}
        onInput={setName}
        label="Search"
        placeholder="Shadow of the Colossus"
      />
      <ul>
        <For each={results.latest}>
          {(result) => (
            <li>
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_thumb/${result.igdbCover}.jpg`}
                alt={`Cover of ${result.name}`}
                width={90}
                height={90}
              />{" "}
              {result.name} - {result.platforms.join(", ")}{" "}
              <Show when={result.releaseDate !== null}>
                (<FormatDate timestamp={result.releaseDate!} />)
              </Show>
            </li>
          )}
        </For>
      </ul>
    </>
  )

  /* Playthrough form
    const [platforms] = createResource(PlatformClient.getAll)

    const sortedPlatforms = () =>
      platforms()?.toSorted((a, b) => a.name.localeCompare(b.name)) ?? []

    <label for="platform">Platform</label>
    <select id="platform" required>
      <option value="">Select a platform…</option>
      <For each={sortedPlatforms()}>
        {(platform) => <option value={platform.id}>{platform.name}</option>}
      </For>
    </select>
   */
}
