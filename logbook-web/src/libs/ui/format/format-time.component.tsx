import { Component } from "solid-js"
import { formatTime } from "../time.service"

export const FormatTime: Component<{
  timestamp?: number
}> = (props) => {
  const time = () => props.timestamp ?? Date.now()
  const iso8601 = () => formatTime(time())
  return (
    <time datetime={iso8601()}>
      {Intl.DateTimeFormat(undefined, {
        timeStyle: "short",
        timeZone: "UTC",
      }).format(time())}
    </time>
  )
}
