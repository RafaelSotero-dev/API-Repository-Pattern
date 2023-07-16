import { compare } from 'bcrypt';

export const passwordDecrypt = async (password: string, hash: string): Promise<boolean> => {
	return await compare(password, hash);
};