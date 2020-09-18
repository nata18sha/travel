import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  bannerImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fconstant-loubier-5cVnZ5fgipc-unsplash.jpg?alt=media&token=f55e133f-acba-4795-a908-256c43ad1935';

  innerWidth: any;

  sliderConfig = {width: '733px', height: '475px', space: 10 };



  constructor() {

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 480) {
      this.sliderConfig = {width: '320px', height: '200px', space: 5 };
    }
    else {
      this.sliderConfig = {width: '733px', height: '475px', space: 10 };
    }
  }

  @ViewChild('nav') slider: NgImageSliderComponent;
  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
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
