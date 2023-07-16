import { IUserInput } from '../../models/User';
import { httpRequest, httpResponse } from '../protocols';

export interface ICreateNewUserController {
  handle(params: httpRequest<IUserInput, unknown, unknown>): Promise<httpResponse<string>>
}

export interface ICreateNewUserRepository {
  create(body: IUserInput): Promise<string>
}