import { hash } from 'bcrypt';

export const passwordEncrypt = async (password: string): Promise<string> => {
	const saltRound = 10;
	return await hash(password, saltRound);
};