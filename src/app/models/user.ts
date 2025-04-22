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
export interface IUserPersonalData {
    firstName: string;
    lastName: string;
    cardNumber: string;
    age: number;
    birthDate: Date | string; 
    citizenship: string;
  }
  export interface IOrderBody {
    userLogin: string;
    tourId: string;
    personalData: IUserPersonalData[];
  }
  