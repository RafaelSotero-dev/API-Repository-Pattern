import { Db, MongoClient } from 'mongodb';

export const mongoDb = {
	db: undefined as unknown as Db,

	connect: function() {
		const URL = process.env.MONGO_URL as string;

		try {
			const client = new MongoClient(URL);

			this.db = client.db('test_database');
		} catch (error) {
			const e = error as Error;
			throw e.message;
		}
	}
};