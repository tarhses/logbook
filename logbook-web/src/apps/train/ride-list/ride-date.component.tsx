import { FormatDate } from "@/libs/ui"
import { Component, For } from "solid-js"
import { Ride } from "../shared/models/ride.model"
import { RideItem } from "./ride-item.component"

export const RideDate: Component<{
  date: number
  rides: Ride[]
}> = (props) => {
  return (
    <>
      <strong>
        <FormatDate timestamp={props.date} dateStyle="full" />
      </strong>
      <hr />
      <For each={props.rides}>{(ride) => <RideItem ride={ride} />}</For>
    </>
  )
}
