import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import { GetAllUsersMongoRepository } from './repositories/get-all-users-repository/get-all-users-mongo-repository';
import { GetAllUsersController } from './controllers/get-all-users/get-all-users';
import { mongoDb } from './database/mongo';

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
				const e = error as Error;
				return res.status(500).json(e.message);
			}
		});

	}

	private start(): void {
		const PORT = process.env.PORT ?? '3000';

		this.router.listen(PORT, () => console.log(`Server up on Port ${PORT}`));
	}

}

App.main();