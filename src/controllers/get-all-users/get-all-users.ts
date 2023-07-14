import { IUserOutput } from '../../models/User';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { httpResponse } from '../protocols';
import { IGetAllUsersController, IGetAllUsersRepository } from './protocols';

export class GetAllUsersController implements IGetAllUsersController {
	
	constructor(private getAllUserRepository: IGetAllUsersRepository) {}

	public async handle(): Promise<httpResponse<IUserOutput[]>> {
		const result = await this.getAllUserRepository.getAllUser();

		if (!result.length) {
			throw new ErrorHandler('No user found', 404);
		}

		return {
			status: 200,
			body: result
		};
	}
}