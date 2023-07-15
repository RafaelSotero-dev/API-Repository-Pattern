import { Request, Response, Router } from 'express';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { GetAllUsersController } from '../../controllers/get-all-users/get-all-users';
import { GetAllUsersMongoRepository } from '../../repositories/get-all-users-repository/get-all-users-mongo-repository';

export const getAllUsersRoute = Router();

getAllUsersRoute.get('/', async (_req: Request, res: Response) => {
	try {
		const getAllUserMongoRepository = new GetAllUsersMongoRepository();
		const getAllUsersController = new GetAllUsersController(getAllUserMongoRepository);

		const {body, status} = await getAllUsersController.handle();

		return res.status(status).json(body);

	} catch (error) {
		const e = error as ErrorHandler;
		return res.status(e.status).json({ msg: e.message});
	}
});