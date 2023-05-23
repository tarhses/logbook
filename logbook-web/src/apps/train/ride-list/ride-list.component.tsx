import { ErrorCatcher } from "@/libs/error"
import { Button } from "@/libs/ui"
import { A } from "@solidjs/router"
import {
  Component,
  For,
  Suspense,
  createResource,
  createSignal,
} from "solid-js"
import { RideDate } from "./ride-date.component"
import * as RideListService from "./ride-list.service"

export const RideList: Component = () => {
  const [page, setPage] = createSignal(0)
  const [groups] = createResource(page, RideListService.getDateGroupsByPage)

  return (
    <>
      <p>
        These are all the recorded trips. <A href="/train">Go back.</A>
      </p>
      <ErrorCatcher>
        <article>
          <header>
            <div class="grid">
              <Button
                onClick={() => setPage((page) => page - 1)}
                disabled={page() === 0}
                busy={groups.loading}
                label="Previous page"
              />
              <Button
                onClick={() => setPage((page) => page + 1)}
                disabled={groups()?.length === 0}
                busy={groups.loading}
                label="Next page"
              />
            </div>
          </header>
          <Suspense fallback={<div aria-busy={true}>Loading…</div>}>
            <For each={groups.latest}>
              {([date, rides]) => <RideDate date={date} rides={rides} />}
            </For>
          </Suspense>
        </article>
      </ErrorCatcher>
    </>
  )
}
