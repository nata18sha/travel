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

  defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fnoimage.jpg?alt=media&token=9a954c2c-65f0-49c8-8b9c-687a4d70dfe5';


  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.adminFireCloudReservation();
    this.getUserData();
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
            this.myReserv.push(res);
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
