export interface ResponseEntity<T> {
  code: number
  status: boolean
  message: string
  data: T
}
