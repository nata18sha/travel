import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

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
  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('nav') slider: NgImageSliderComponent;
  prevImageClick() {
     this.slider.prev();
 }
 
 nextImageClick() {
     this.slider.next();
 }

}
