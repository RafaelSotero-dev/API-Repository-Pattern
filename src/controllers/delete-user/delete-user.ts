import { ErrorHandler } from '../../utils/ErrorHandler';
import { httpRequest, httpResponse } from '../protocols';
import { IDeleteUserController, IDeleteUserRepository } from './protocols';

export class DeleteUserController implements IDeleteUserController {
  
	constructor(private deleteUserRepository: IDeleteUserRepository) {}

	async handle(params: httpRequest<unknown, string, unknown>): Promise<httpResponse<string>> {
		const id = params as string;

		const result = await this.deleteUserRepository.delete(id);

		if (result === 'No user found') {
			throw new ErrorHandler('No user found', 404);
		}

		return {
			status: 200,
			body: result
		};
	}
}