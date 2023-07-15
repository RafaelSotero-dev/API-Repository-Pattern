import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import { GetAllUsersMongoRepository } from './repositories/get-all-users-repository/get-all-users-mongo-repository';
import { GetAllUsersController } from './controllers/get-all-users/get-all-users';
import { mongoDb } from './database/mongo';
import { ErrorHandler } from './utils/ErrorHandler';
import { IUserInput } from './models/User';
import { CreateNewUserMongoRepository } from './repositories/create-new-user-repository/create-new-user-mongo-repository';
import { CreateNewUserController } from './controllers/create-new-user/create-new-user';

config();

class App {

	private router: Application;

	constructor() {
		this.router = express();
		this.route();
		this.start();
	}

	public static main(): void {
		try {
			mongoDb.connect();
			new App();
		} catch (error) {
			console.log(error);
		}

	}

	private route(): void {
		this.router.use(express.json());

		this.router.get('/users', async (_req: Request, res: Response) => {
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

		this.router.post('/users', async (req: Request<unknown, unknown, IUserInput>, res: Response) => {

			try {
				const createNewUserRepository = new CreateNewUserMongoRepository();
				const createNewUserController = new CreateNewUserController(createNewUserRepository);

				await createNewUserController.handle({params: req.params, body: req.body, headers: req.headers});

			} catch (error) {
				const e = error as ErrorHandler;
				return res.status(e.status).json({ msg: e.message});
			}
		});

	}

	private start(): void {
		const PORT = process.env.PORT ?? '3000';

		this.router.listen(PORT, () => console.log(`Server up on Port ${PORT}`));
	}

}

App.main();