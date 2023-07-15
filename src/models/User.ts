export interface IUser {
  id: string,
  name: string,
  email: string,
  password: string,
}

export interface IUserOutput extends Omit<IUser, 'password'> {}

export interface IUserInput extends Omit<IUser, 'id'> {}
