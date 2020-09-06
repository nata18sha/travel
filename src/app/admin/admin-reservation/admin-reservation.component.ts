import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../shared/services/reservation.service';
import { IReservation } from '../../shared/interfaces/reservation.interface';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss']
})
export class AdminReservationComponent implements OnInit {

  reservations: Array<IReservation> = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.adminFireCloudReservation()
  }

  private adminFireCloudReservation(): void {
    this.reservationService.getFireCloudReservation().subscribe(
      collection => {
        this.reservations = collection.map(document => {
          const data = document.payload.doc.data() as IReservation;
          const id = document.payload.doc.id;
          console.log({ id, ...data });
          return { id, ...data };
        });
  
      }
    );
  }


}
