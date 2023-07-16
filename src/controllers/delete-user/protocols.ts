import { httpRequest, httpResponse } from '../protocols';

export interface IDeleteUserController {
  handle(params: httpRequest<unknown, string, unknown>): Promise<httpResponse<string>>
}

export interface IDeleteUserRepository {
  delete(id: string): Promise<string>;
}