import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

import { ILocation } from '../../shared/interfaces/location.interface';
import { Location } from '../../shared/models/location.model';
import { LocationService } from '../../shared/services/location.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  imageObject: Array<object> = [{
    image: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F01d56c67bc26fa89ec01ab262e6ea756d77efc5b.png?alt=media&token=49a2c7a5-f19a-4a92-b586-c2d199f36b73',
    thumbImage: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F01d56c67bc26fa89ec01ab262e6ea756d77efc5b.png?alt=media&token=49a2c7a5-f19a-4a92-b586-c2d199f36b73',
    alt: 'alt of image',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fde9c12c9ccaa32de2b3a913e61b242743d185e72.png?alt=media&token=7d1524aa-633b-4407-aa8b-8fd14e481d21',
    thumbImage: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fde9c12c9ccaa32de2b3a913e61b242743d185e72.png?alt=media&token=7d1524aa-633b-4407-aa8b-8fd14e481d21',
    alt: 'Image alt'
  }, {
    image: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F8279ff985b687157fe2d384a5ea2aff95dccdcee.png?alt=media&token=0faef482-e8f5-49cc-a07e-4fd2f57c10c7',
    thumbImage: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F8279ff985b687157fe2d384a5ea2aff95dccdcee.png?alt=media&token=0faef482-e8f5-49cc-a07e-4fd2f57c10c7',
    alt: 'Image alt'
  }
  ];

  allLocations: Array<ILocation> = [];

  sliceNumber = 13;
  showLoadButton = true;
  locationChecked = true;
  categoryChecked = true;
  filteredPrice = 50;

  constructor(private locationService: LocationService,
    private firecloud: AngularFirestore) { }

  ngOnInit(): void {
    this.adminFireCloudLocations()
  }
  //Photo slider
  @ViewChild('nav') slider: NgImageSliderComponent;
  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }
  //------------------

  private adminFireCloudLocations(): void {
    this.locationService.getFireCloudLocation().subscribe(
      collection => {
        this.allLocations = collection.map(document => {
          const data = document.payload.doc.data() as ILocation;
          const id = document.payload.doc.id;

          return { id, ...data };
        });

      }
    );
  }

  loadMore(): void {
    this.sliceNumber += 3;
    if (this.sliceNumber < this.allLocations.length) {
      this.showLoadButton = true;
    }
    else this.showLoadButton = false;
  }


  filterLocations(location: any): void {
    this.categoryChecked = true;
    this.filteredPrice = 50;
    if (location == 'all') {
      this.adminFireCloudLocations();
      this.showLoadButton = true;
    }
    else {
      this.locationChecked = false;
      console.log(location)
      this.allLocations = [];
      this.firecloud.collection('locations').ref.where("location", "==", location).onSnapshot(
        snap => {
          snap.forEach(locRef => {
            const data = locRef.data() as ILocation;
            const id = locRef.id;
            console.log(id, data)

            this.allLocations.push({ id, ...data });
            if (this.allLocations.length < 13) {
              this.showLoadButton = false;
            }
            console.log(this.allLocations)
          })
        })
    }
  }

  filterCategories(category: any): void {
    this.locationChecked = true;
    this.filteredPrice = 50;
    if (category == 'all') {
      this.adminFireCloudLocations();
      this.showLoadButton = true;
    }
    else {
      this.categoryChecked = false;
      console.log(location)
      this.allLocations = [];
      this.firecloud.collection('locations').ref.where("category", "==", category).onSnapshot(
        snap => {
          snap.forEach(locRef => {
            const data = locRef.data() as ILocation;
            const id = locRef.id;
            console.log(id, data)

            this.allLocations.push({ id, ...data });
            if (this.allLocations.length < 13) {
              this.showLoadButton = false;
            }
            console.log(this.allLocations)
          })
        })
    }
  }

  changeRange(event):void {
    console.log(event.path[0].value)
    this.filteredPrice = event.path[0].value
    // console.log(this.firecloud.collection('locations').ref.where("price", "<=", filteredPrice))
    this.filterPrice();
   

  }
  filterPrice():void {
    this.allLocations = [];
    this.firecloud.collection('locations').ref.where("price", "<=", +this.filteredPrice).onSnapshot(
      snap => {
        snap.forEach(locRef => {
          const data = locRef.data() as ILocation;
          const id = locRef.id;
          console.log(id, data)
          this.allLocations.push({ id, ...data });
          this.categoryChecked = true;
          this.locationChecked = true;
          if (this.allLocations.length < 13 ) {
            this.showLoadButton = false;
          }
          console.log(this.allLocations)
        })
      })
  }




}
