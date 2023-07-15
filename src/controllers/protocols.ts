export interface httpResponse<T> {
  status: number,
  body: T | string 
}

export interface httpRequest<T> {
  params?: string | unknown,
  body?: T,
  headers?: string | unknown
}