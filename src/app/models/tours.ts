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
    country?:IContriesResponseIteam;
    code?:string;
}
export interface IToursServerRes {
    tours: ITour[];
}
export interface IContriesResponseIteam {
    iso_code2: string;
    iso_code3: string;
    name_ru: string;
    flag_url:string;
}
export interface IFilterTypeLogic {
    key: 'all'| 'single'|'group',
    label?: string
}