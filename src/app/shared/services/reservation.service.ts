import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IReservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firecloud: AngularFirestore) { }

  getFireCloudReservation(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('reservations').snapshotChanges();
  }
  postFireCloudReservation(reservations: IReservation): Promise<DocumentReference>{
    return this.firecloud.collection('reservations').add(reservations);
  }
  deleteFireCloudReservation(id: string): Promise<void> {
    return this.firecloud.collection('reservations').doc(id).delete();
  }
  getOneFireCloudLocation(id: string): any {
    return this.firecloud.collection('locations').doc(id).get();
  }
}
