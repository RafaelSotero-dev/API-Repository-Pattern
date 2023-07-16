import { IUserInput } from '../../models/User';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { validateEmail } from '../../utils/emailValidator';
import { passwordEncrypt } from '../../utils/passwordEncrypt';
import { httpRequest, httpResponse } from '../protocols';
import { IUpdateUserController, IUpdateUserRepository } from './protocols';

export interface contentOBJ {
  name?: string
  email?: string
  password?: string
}

export class UpdateUserController implements IUpdateUserController {

	constructor(private updateUserRepository: IUpdateUserRepository) {}

	async handle(params: httpRequest<IUserInput, string, unknown>): Promise<httpResponse<string>> {
		
		const body: contentOBJ = {};

		if (params.body?.email) {
			if (!validateEmail(params.body.email)) {
				throw new ErrorHandler('Invalid email format', 401);
			}
			body.email = params.body.email;
		}

		if (params.body?.name) {
			if (params.body.name.length < 1) {
				throw new ErrorHandler('Name must be at least 4 characters long', 401);
			}
			body.name = params.body.name;
		}

		if (params.body?.password) {
			if (params.body.password.length < 6){
				throw new ErrorHandler('Password must be at least 6 characters long', 401);
			}
			const hash = params.body?.password && await passwordEncrypt(params.body?.password);
			body.password = hash;
		}

		

		const result = await this.updateUserRepository.update({
			params: params.params,
			headers: params.headers,
			body
		});

		if (result === 'No users found') {
			throw new ErrorHandler(result, 404);
		}

		if (result === 'No updates have been performed') {
			throw new ErrorHandler(result, 400);
		}

		return {
			status: 200,
			body: result
		};
	}

}