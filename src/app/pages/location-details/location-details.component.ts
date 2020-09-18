import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ILocation } from '../../shared/interfaces/location.interface';
import { LocationService } from 'src/app/shared/services/location.service';
import { IReservation } from '../../shared/interfaces/reservation.interface';
import { Reservation } from '../../shared/models/reservation.model';
import { ReservationService } from '../../shared/services/reservation.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fnoimage.jpg?alt=media&token=9a954c2c-65f0-49c8-8b9c-687a4d70dfe5';


  modalRef: BsModalRef;

  imageObject: Array<object> = []
  location: any;
  reservation: IReservation;

  isDetails = true;
  isPersons = false;
  isPannelDetails = false;
  isPayment = false;
  locationDone = false;
  guestDone = false;
  paymentDone = false;

  minDate = new Date();
  minDateTo: Date;
 

  reservID = '1';
  locationID: string;
  locationTitle: string;
  loggedUser: object;
  inDate: any;
  outDate: any;
  daysStay: number;
  persons: number;
  vat: number;
  total: number;
  status = 'paid';
  
  contacts: object;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  expCvv: string;
  expYear: string;
  expMonth: string;
  cardNumber: string;
  cardName:string;


  innerWidth: any;

  sliderConfig = {width: '544px', height: '444px', space: 0 };


  constructor(private actRoute: ActivatedRoute,
              private firecloud: AngularFirestore,
              private reservationService: ReservationService,
              private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.getViewLocation();
    this.calculateDays();
    this.getUserData();
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 480) {
      this.sliderConfig = {width: '320px', height: '200px', space: 5 };
    }
    else {
      this.sliderConfig = {width: '733px', height: '475px', space: 10 };
    }
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  private getViewLocation(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.locationID = id;
    this.firecloud.collection('locations').doc(id).get().subscribe(
      document => {
        const data = document.data();
        const dataID = document.id;
        this.location = { dataID, ...data };
        // console.log(this.location)
        // this.imageObject = this.location.images;
        // console.log(this.imageObject)
        for (const image of this.location.images) {
          let img = {
            image: `${image}`,
            thumbImage: `${image}`,
            alt: 'alt of image'
          }
          this.imageObject.push(img);
        }
      }
    );

  }

  // Image slider functions
  @ViewChild('nav') slider: NgImageSliderComponent;
  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
  //  -----------------------

  makeReservation(template: TemplateRef<any>): void {
    if (JSON.parse(localStorage.getItem('user'))) {
          this.isDetails = false;
    this.isPersons = true;
    this.isPannelDetails = true;
    this.locationDone = true;

    // console.log(this.inDate)
    // console.log(this.outDate)
    console.log(this.persons)
    this.calculateDays();
    }
    else {
      this.modalRef = this.modalService.show(template);
    }

  }
  editReservation(): void {
    this.isDetails = true;
    this.isPersons = false;
    this.isPannelDetails = false;
    this.isPayment = false;
    this.locationDone = false;
    this.guestDone = false;
  }
  confirmGuests(): void {
    this.isPersons = false;
    this.isPayment = true;
    this.guestDone = true;

  }
  confirmPayment(): void {
    this.paymentDone = true;
    this.addReservation();
    console.log(this.reservation)
  }

  logDate(): void {
    console.log(this.inDate)
  }

  calculateDays(): void {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.daysStay = Math.round(Math.abs((this.inDate - this.outDate) / oneDay));
    console.log(this.daysStay)
  }






  addReservation(): void {
    // this.setDetails();

    const newReserv = new Reservation(
      this.reservID,
      this.location,
      this.loggedUser,
      this.inDate,
      this.outDate,
      this.daysStay,
      this.persons,
      this.total = this.daysStay*this.location.price*this.persons,
      this.vat = +(this.total * 0.1).toFixed(2),
      this.contacts = {fName: this.firstName, lName: this.lastName, email: this.email, phone: this.phone},
      status = 'paid'
    );
    delete newReserv.id;
    this.reservationService.postFireCloudReservation({ ...newReserv })
      .then(message => console.log(message))
      .catch(err => console.log(err));



  }
  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.loggedUser = user;
    // console.log(user.id)
  }


  checkMinDate():void {
    this.minDateTo = this.inDate;
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 480) {
      this.sliderConfig = {width: '320px', height: '208px', space: 5 };
    }
    else {
      this.sliderConfig = {width: '733px', height: '475px', space: 10 };
    }
    console.log(this.innerWidth)
  }

}
