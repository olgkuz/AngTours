export interface IUser {
    login: string
    password?:string

 }
export interface IUserRegister {
    login: string;
    password?: string;
    email: string;
}
export const UserStorageKey = 'current_user';