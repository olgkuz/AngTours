export interface IOrder {
    id: string;
    userLogin: string;
    tourId: string;
    personalData: {
      firstName: string;
      lastName: string;
    }[];
  }
  