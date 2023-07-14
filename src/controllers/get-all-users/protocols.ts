import { IUserOutput } from '../../models/User';
import { httpResponse } from '../protocols';

export interface IGetAllUsersController {
  handle(): Promise<httpResponse<IUserOutput[]>>
}

export interface IGetAllUsersRepository {
  getAllUser(): Promise<IUserOutput[]>
}