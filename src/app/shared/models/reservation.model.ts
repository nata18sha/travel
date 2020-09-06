import { IReservation } from '../interfaces/reservation.interface';
export class Reservation implements IReservation{
    constructor(public id: string,
                public locationID: string,
                public locationTitle: string,
                public userID: string,
                public dateFrom:any,
                public dateTo:any,
                public days: number,
                public persons: number,
                public totalPrice: number,
                public vat: number,
                public contacts,
                public status = 'paid'
        ){}
}

