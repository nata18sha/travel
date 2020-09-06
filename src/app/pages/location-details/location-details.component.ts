import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ILocation } from '../../shared/interfaces/location.interface';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {

  imageObject: Array<object> =[]
  location: any;

  isDetails = true;
  isPersons = false;
  isPannelDetails = false;
  isPayment = false;
  locationDone = false;
  guestDone = false;
  paymentDone = false;

  constructor(private actRoute: ActivatedRoute,
    private firecloud: AngularFirestore) { }

  ngOnInit(): void {
    this.getViewLocation();
  }

  private getViewLocation(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.firecloud.collection('locations').doc(id).get().subscribe(
      document => {
        const data = document.data();
        const dataID = document.id;
        this.location = { dataID, ...data };
        // console.log(this.location)
        // this.imageObject = this.location.images;
        // console.log(this.imageObject)
        for (let i = 0; i < this.location.images.length; i++) {
          let img = {
            image: `${this.location.images[i]}`,
            thumbImage: `${this.location.images[i]}`,
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

  makeReservation(): void {
    this.isDetails = false;
    this.isPersons = true;
    this.isPannelDetails = true;
    this.locationDone = true;
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
  }



}
