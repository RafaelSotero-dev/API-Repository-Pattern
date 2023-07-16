import { Request, Response, Router } from 'express';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { CreateNewUserMongoRepository } from '../../repositories/create-new-user-repository/create-new-user-mongo-repository';
import { CreateNewUserController } from '../../controllers/create-new-user/create-new-user';
import { IUserInput } from '../../models/User';

export const createNewUserRoute = Router();

createNewUserRoute.post('/', async (req: Request<unknown, unknown, IUserInput>, res: Response) => {

	try {
		const createNewUserRepository = new CreateNewUserMongoRepository();
		const createNewUserController = new CreateNewUserController(createNewUserRepository);

		const { body: token, status } = await createNewUserController.handle({params: req.params, body: req.body, headers: req.headers});

		return res.status(status).json({ token });

	} catch (error) {
		const e = error as ErrorHandler;
		return res.status(e.status).json({ msg: e.message});
	}
});