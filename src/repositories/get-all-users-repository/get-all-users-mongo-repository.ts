import { IGetAllUsersRepository } from '../../controllers/get-all-users/protocols';
import { mongoDb } from '../../database/mongo';
import { IUser, IUserOutput } from '../../models/User';

export class GetAllUsersMongoRepository implements IGetAllUsersRepository {
	async getAllUser(): Promise<IUserOutput[]> {
		const result = await mongoDb.db.collection<Omit<IUser, 'id'>>('users').find({}).toArray();

		return result.map((item) => {
			return {
				id: item._id.toHexString(),
				name: item.name,
				email: item.email,
			};
		});
	}
  
}