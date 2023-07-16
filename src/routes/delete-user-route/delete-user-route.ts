import { Request, Response, Router } from 'express';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { DeleteUserMongoRepository } from '../../repositories/delete-user-repository/delete-user-mongo-repository';
import { DeleteUserController } from '../../controllers/delete-user/delete-user';

export const deleteUserRoute = Router();

deleteUserRoute.delete('/:id', async (req: Request, res: Response) => {
	try {
		const deleteUserRepository = new DeleteUserMongoRepository();
		const deleteUserController = new DeleteUserController(deleteUserRepository);

		if (!req.params.id) {
			return res.status(404).json({ msg: 'Missing params' });
		}

		const {body, status} = await deleteUserController.handle(req.params);

		return res.status(status).json({ msg: body });
	} catch (error) {
		const e = error as ErrorHandler;
		return res.status(e.status).json({ msg: e.message });
	}
});