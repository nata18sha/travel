import { ILocation } from './location.interface';

export interface IReservation {
    id: string;
    location: Array <ILocation>;
    user: object;
    dateFrom:any;
    dateTo:any;
    days: number;
    persons: number;
    totalPrice: number;
    vat: number;
    contacts: object;
    status: string;

}