import { IUserInput } from '../../models/User';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { createToken } from '../../utils/createToken';
import { validateEmail } from '../../utils/emailValidator';
import { passwordEncrypt } from '../../utils/passwordEncrypt';
import { httpRequest, httpResponse } from '../protocols';
import { ICreateNewUserController, ICreateNewUserRepository } from './protocols';

export class CreateNewUserController implements ICreateNewUserController {
	
	constructor(private createNewUserRepository: ICreateNewUserRepository) {}

	async handle(params: httpRequest<IUserInput, unknown, unknown>): Promise<httpResponse<string>> {
		const fildsRequired: Array<keyof IUserInput> = ['name', 'email', 'password'];
    
		if (!params.body) {
			throw new ErrorHandler('Missing params', 400);
		}

		for (const fild of fildsRequired) {
			if (!params.body[fild]) {
				throw new ErrorHandler('Missing params', 400);
			}
		}

		if (!validateEmail(params.body.email)){
			throw new ErrorHandler('Invalid email format', 401);
		}

		if (params.body.password.length < 6){
			throw new ErrorHandler('Password must be at least 6 characters long', 401);
		}

		if (params.body.name.length < 1) {
			throw new ErrorHandler('Name must be at least 4 characters long', 401);
		}

		const hash = await passwordEncrypt(params.body.password);

		const result = await this.createNewUserRepository.create({
			name: params.body.name,
			email: params.body.email,
			password: hash
		});

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