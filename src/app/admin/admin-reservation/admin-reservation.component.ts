import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReservationService } from '../../shared/services/reservation.service';
import { IReservation } from '../../shared/interfaces/reservation.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.scss']
})
export class AdminReservationComponent implements OnInit {

  reservations: Array<IReservation> = [];
  currentReserv: Array<IReservation> = [];
  searchName: string;
  order: string = 'info.name';
  reverse: boolean = false;
  sortedCollection: Array<IReservation>;

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private reservationService: ReservationService,
              private modalService: BsModalService,
              private orderPipe: OrderPipe) {
                this.sortedCollection = orderPipe.transform(this.reservations, 'info.name');
                console.log(this.sortedCollection);
               }

  ngOnInit(): void {
    this.adminFireCloudReservation()
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
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
  openResDetails(template: TemplateRef<any>, reservation):void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
    this.currentReserv = reservation;
}

}
