import { Component } from "solid-js"
import { formatDuration } from "../time.service"

// TODO: cleaner handling of ISO 8601

export const FormatDuration: Component<{
  duration: number
}> = (props) => {
  const duration = () => formatDuration(props.duration)
  const iso8601 = () => `PT${duration().replaceAll(" ", "").toUpperCase()}`
  return <time datetime={iso8601()}>{duration()}</time>
}
