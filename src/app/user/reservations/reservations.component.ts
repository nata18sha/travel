import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { IReservation } from 'src/app/shared/interfaces/reservation.interface';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: any = [];
  loggedUser: any;
  myReserv: Array<IReservation> = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.adminFireCloudReservation();
    this.getUserData();
    console.log(this.myReserv);
  }

  private adminFireCloudReservation(): void {
    this.reservationService.getFireCloudReservation().subscribe(
      collection => {
        this.reservations = collection.map(document => {
          const data = document.payload.doc.data() as IReservation;
          const id = document.payload.doc.id;
          return { id, ...data };

        });

        this.reservations.map(res => {
          if (res.user.id === this.loggedUser.id) {
            console.log(res)
            this.myReserv.push(res)
            return res;
          }
        })



      }
    );
  }

  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.loggedUser = user;
  }

}
