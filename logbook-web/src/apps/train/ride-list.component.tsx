import { ErrorHandler } from "@/libs/error"
import { Button } from "@/libs/ui"
import { useNavigate } from "@solidjs/router"
import { Component, For, createResource, createSignal } from "solid-js"
import { getPaginatedRides } from "./clients/ride.client"
import { RideListItem } from "./ride-list-item.component"

const RIDES_PER_PAGE = 10

export const RideList: Component = () => {
  const navigate = useNavigate()

  const [page, setPage] = createSignal(0)
  const [rides] = createResource(
    page,
    () => getPaginatedRides(RIDES_PER_PAGE, page() * RIDES_PER_PAGE),
    { initialValue: [] },
  )

  return (
    <ErrorHandler>
      <Button
        variant="success"
        label="New"
        onClick={() => navigate("/train/new")}
      />
      <Button
        label="Previous page"
        disabled={page() === 0}
        onClick={() => setPage((page) => page - 1)}
      />
      <Button
        label="Next page"
        disabled={rides().length !== RIDES_PER_PAGE}
        onClick={() => setPage((page) => page + 1)}
      />
      <For each={rides()}>{(ride) => <RideListItem ride={ride} />}</For>
    </ErrorHandler>
  )
}
