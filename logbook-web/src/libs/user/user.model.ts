export interface User {
  /** Version number used for local storage versioning. */
  version: number
  /** Authentication token used for API calls. */
  authToken: string
}
