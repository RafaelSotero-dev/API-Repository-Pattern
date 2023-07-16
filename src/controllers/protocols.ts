export interface httpResponse<T> {
  status: number,
  body: T | string 
}

export interface httpRequest<B, P, H> {
  params?: P
  body?: B
  headers?: H
}