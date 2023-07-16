import { ObjectId } from 'mongodb';
import { IDeleteUserRepository } from '../../controllers/delete-user/protocols';
import { mongoDb } from '../../database/mongo';
import { IUser } from '../../models/User';

export class DeleteUserMongoRepository implements IDeleteUserRepository {
	async delete(id: string): Promise<string> {
		const userId = new ObjectId(id);

		const user = await mongoDb.db.collection<Omit<IUser, 'id'>>('users').findOne({ _id: userId });

		if (!user) {
			return 'No user found';
		}

		await mongoDb.db.collection('users').deleteOne({ _id: userId });

		return 'User removed';
	}

}