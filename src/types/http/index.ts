export interface httpResponse {
  count: number | null
  data: Array<T> | object
  error: string | null
  status: number
  statusText: string
}