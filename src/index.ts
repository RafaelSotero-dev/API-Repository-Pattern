import express, { Application } from 'express';
import { config } from 'dotenv';

config();

class App {

	private router: Application;

	constructor() {
		this.router = express();
		this.start();
	}

	public static main(): void {
		new App();
	}

	private start(): void {
		const PORT = process.env.PORT ?? '3000';

		this.router.listen(PORT, () => console.log(`Server up on Port ${PORT}`));
	}

}

App.main();