import { Component } from "solid-js"
import { InputProps } from "./input-props.model"

export type InputComponent<T, P = {}> = Component<InputProps<T, P>>
