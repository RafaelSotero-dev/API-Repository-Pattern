import { Request, Response, Router } from 'express';
import { ErrorHandler } from '../../utils/ErrorHandler';
import { UpdateUserMongoRepository } from '../../repositories/update-user-repository/update-user-mongo-repository';
import { UpdateUserController, contentOBJ } from '../../controllers/update-user/update-user-controller';
import { IUserInput } from '../../models/User';

export const updateUserRoute = Router();

updateUserRoute.patch('/:id', async (req: Request<{ id: string }, unknown, contentOBJ>, res: Response) => {
	const { id } = req.params;

	try {
		const updateUserRepository = new UpdateUserMongoRepository();
		const updateUserController = new UpdateUserController(updateUserRepository);

		if (!id || !Object.keys(req.body).length) {
			return res.status(400).json({ msg: 'Missing parameters' });
		}

		const {body, status} = await updateUserController.handle({
			params: id,
			headers: req.headers,
			body: req.body as IUserInput
		});

		return res.status(status).json({ msg: body});
	} catch (error) {
		const e = error as ErrorHandler;
		return res.status(e.status).json({ msg: e.message});
	}
});