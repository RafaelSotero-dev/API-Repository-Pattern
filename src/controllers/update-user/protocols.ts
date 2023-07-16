import { IUserInput } from '../../models/User';
import { httpRequest, httpResponse } from '../protocols';
import { contentOBJ } from './update-user';

export interface IUpdateUserController {
  handle(params: httpRequest<IUserInput, string, unknown>): Promise<httpResponse<string>>
}

export interface IUpdateUserRepository {
  update(params: httpRequest<contentOBJ, string, unknown>): Promise<string>
}