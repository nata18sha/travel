import { Pipe, PipeTransform } from '@angular/core';
import { IReservation } from '../interfaces/reservation.interface';
import { ILocation } from '../interfaces/location.interface';

@Pipe({
  name: 'searchReservation'
})
export class SearchReservationPipe implements PipeTransform {

  transform(value: Array<any>, searchParam: string): Array<IReservation> {
    if (!searchParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    return value.filter(reservation => reservation.location.title.toLowerCase().includes(searchParam.toLowerCase()) ||
    reservation.contacts.fName.toLowerCase().includes(searchParam.toLowerCase()) ||
    reservation.contacts.lName.toLowerCase().includes(searchParam.toLowerCase()) 
  

    );
  }

}
