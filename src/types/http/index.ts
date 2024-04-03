// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface httpResponse<T = any> {
  count: number | null
  data: T[]
  error: HttpError | null
  status: number
  statusText: string
}

type HttpError = {
    code:    string;
    details: null;
    hint:    null;
    message: string;
  }