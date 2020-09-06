export interface IReservation {
    id: string;
    locationID: string;
    locationTitle: string;
    userID: string;
    dateFrom:any;
    dateTo:any;
    days: number;
    persons: number;
    totalPrice: number;
    vat: number;
    contacts: object;
    status: string;

}