import { Component } from "solid-js"

export const FormatDate: Component<{
  timestamp?: number
  dateStyle?: "full" | "long" | "medium" | "short"
  timeStyle?: "full" | "long" | "medium" | "short"
}> = (props) => {
  const date = () => new Date(props.timestamp ?? Date.now())
  const iso8601 = () => date().toISOString()
  return (
    <time datetime={iso8601()}>
      {Intl.DateTimeFormat(undefined, {
        dateStyle: props.dateStyle,
        timeStyle: props.timeStyle,
      }).format(date())}
    </time>
  )
}
