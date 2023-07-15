import { ICreateNewUserRepository } from '../../controllers/create-new-user/protocols';
import { mongoDb } from '../../database/mongo';
import { IUser, IUserInput } from '../../models/User';

export class CreateNewUserMongoRepository implements ICreateNewUserRepository {
	async create(body: IUserInput): Promise<string> {
		const user = await mongoDb.db.collection<Omit<IUser, 'id'>>('users').findOne({ email: body.email });

		if (user) {
			return 'user already exist';
		}

		await mongoDb.db.collection('users').insertOne(body);

		return body.email;
	}
  
}