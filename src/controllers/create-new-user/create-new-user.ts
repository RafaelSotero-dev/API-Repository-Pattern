import { IUserInput } from '../../models/User';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { createToken } from '../../utils/createToken';
import { httpRequest, httpResponse } from '../protocols';
import { ICreateNewUserController, ICreateNewUserRepository } from './protocols';

export class CreateNewUserController implements ICreateNewUserController {
	
	constructor(private createNewUserRepository: ICreateNewUserRepository) {}

	async handle(params: httpRequest<IUserInput>): Promise<httpResponse<string>> {
		const fildsRequired: Array<keyof IUserInput> = ['name', 'email', 'password'];
    
		if (!params.body) {
			throw new ErrorHandler('Missing params', 400);
		}

		for (const fild of fildsRequired) {
			if (!params.body[fild]) {
				throw new ErrorHandler('Missing params', 400);
			}
		}

		const result = await this.createNewUserRepository.create(params.body);

		if (result === 'user already exist') {
			throw new ErrorHandler('user already exist', 400);
		}

		const token = await createToken(result); 

		return {
			status: 201,
			body: token,
		};
	}
}