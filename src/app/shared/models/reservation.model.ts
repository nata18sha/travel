import { IReservation } from '../interfaces/reservation.interface';
import { ILocation } from '../interfaces/location.interface';
export class Reservation implements IReservation{
    constructor(public id: string,
                public location: Array <ILocation>,
                public user: object,
                public dateFrom:any,
                public dateTo:any,
                public days: number,
                public persons: number,
                public totalPrice: number,
                public vat: number,
                public contacts: object,
                public status = 'paid'
        ){}
}

