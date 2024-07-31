import {v4 as uuidv4} from 'uuid';

export interface ICustomer{
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    dateOfBirth: Date
}

export const testCustomerList: ICustomer[] = [
    {
        id: uuidv4(),
        name: "Pablo Rodriguez",
        email: "pablorodriguez@gmail.com",
        phone: "03-12310210",
        address: "95, Jalan Welfare, 23120 Sungai Buloh",
        dateOfBirth: new Date('2024-01-01') 
    }
];

export enum PageEnum{
  list,
  add,
  edit
}

