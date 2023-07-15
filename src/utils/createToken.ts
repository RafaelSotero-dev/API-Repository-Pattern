import { sign } from 'jsonwebtoken';

export const createToken = async (email: string) => {
	const secret = process.env.SECRET ?? 'any';

	return await sign({ data: email }, secret, { algorithm: 'HS256' });
};