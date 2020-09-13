import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ILocation } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private firecloud: AngularFirestore) { }

  getFireCloudLocation(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('locations').snapshotChanges();
  }
  postFireCloudLocation(location: ILocation): Promise<DocumentReference>{
    return this.firecloud.collection('locations').add(location);
  }
  deleteFireCloudLocation(id: string): Promise<void> {
    return this.firecloud.collection('locations').doc(id).delete();
  }
  updateFireCloudLocation(location: ILocation): Promise<void> {
    return this.firecloud.collection('locations').doc(location.id).update(location);
  }
  getOneFireCloudLocation(id: string): any {
    return this.firecloud.collection('locations').doc(id).get();
  }
}
