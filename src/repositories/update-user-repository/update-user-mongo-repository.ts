import { ObjectId } from 'mongodb';
import { httpRequest } from '../../controllers/protocols';
import { IUpdateUserRepository } from '../../controllers/update-user/protocols';
import { contentOBJ } from '../../controllers/update-user/update-user-controller';
import { mongoDb } from '../../database/mongo';
import { IUser } from '../../models/User';

export class UpdateUserMongoRepository implements IUpdateUserRepository {
	async update(params: httpRequest<contentOBJ, string, unknown>): Promise<string> {
		const id = new ObjectId(params.params);

		const user = await mongoDb.db.collection<Omit<IUser, 'id'>>('users').findOne({ _id: id });

		if (!user) {
			return 'No users found';
		}

		const { modifiedCount } = await mongoDb.db.collection<Omit<IUser, 'id'>>('users').updateOne({ _id: id }, { $set: { ...params.body } });

		if (!modifiedCount) {
			return 'No updates have been performed';
		}

		return 'Update done successfully';
	}

}