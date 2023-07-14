export interface httpResponse<T> {
  status: number,
  body: T | string 
}