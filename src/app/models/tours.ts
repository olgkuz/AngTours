export interface ITour {
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    type?: string;
    date?: string;
    locationId: string;
}
export interface IToursServerRes {
    tours: ITour []
}