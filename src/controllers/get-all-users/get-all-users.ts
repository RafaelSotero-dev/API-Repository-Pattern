import { IUserOutput } from '../../models/User';
import { httpResponse } from '../protocols';
import { IGetAllUsersController, IGetAllUsersRepository } from './protocols';

export class GetAllUsersController implements IGetAllUsersController {
	
	constructor(private getAllUserRepository: IGetAllUsersRepository) {}

	public async handle(): Promise<httpResponse<IUserOutput[]>> {
		const result = await this.getAllUserRepository.getAllUser();

		return {
			status: 200,
			body: result
		};
	}
}