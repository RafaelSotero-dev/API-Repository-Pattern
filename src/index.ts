import express from 'express';
import { config } from 'dotenv';
import { mongoDb } from './database/mongo';
import { getAllUsersRoute } from './routes/get-all-users-route/get-all-user-route';
import { createNewUserRoute } from './routes/create-new-user-route/create-new-user-route';
import { updateUserRoute } from './routes/update-user-route/update-user-route';
import { deleteUserRoute } from './routes/delete-user-route/delete-user-route';

config();

export class App {

	public static router = express();

	constructor() {
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
		App.router.use(express.json());

		App.router.use('/users', getAllUsersRoute);
		App.router.use('/users', createNewUserRoute);
		App.router.use('/users', updateUserRoute);
		App.router.use('/users', deleteUserRoute);
	}

	private start(): void {
		const PORT = process.env.PORT ?? '3000';

		App.router.listen(PORT, () => console.log(`Server up on Port ${PORT}`));
	}

}

App.main();