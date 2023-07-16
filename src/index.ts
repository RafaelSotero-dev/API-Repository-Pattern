import express, { Application } from 'express';
import { config } from 'dotenv';
import { mongoDb } from './database/mongo';
import { getAllUsersRoute } from './routes/get-all-users-route/get-all-user-route';
import { createNewUserRoute } from './routes/create-new-user-route/create-new-user-route';
import { updateUserRoute } from './routes/update-user-route/update-user-route';
import { deleteUserRoute } from './routes/delete-user-route/delete-user-route';

config();

export class App {

	public router: Application;

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

		this.router.use('/users', getAllUsersRoute);
		this.router.use('/users', createNewUserRoute);
		this.router.use('/users', updateUserRoute);
		this.router.use('/users', deleteUserRoute);
	}

	private start(): void {
		const PORT = process.env.PORT ?? '3000';

		this.router.listen(PORT, () => console.log(`Server up on Port ${PORT}`));
	}

}

App.main();