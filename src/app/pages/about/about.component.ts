import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  imageObject: Array<object> = [{
    image: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F78a9a0dd9310e9c86da5086590cf71c8a379391b.png?alt=media&token=67241f91-1909-4bd9-8389-b3d131a5cb8a',
    thumbImage: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F78a9a0dd9310e9c86da5086590cf71c8a379391b.png?alt=media&token=67241f91-1909-4bd9-8389-b3d131a5cb8a',
    alt: 'alt of image',
}, 
{
    image: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F7f4fe606d43cb070d539eb3648fd66bafe322dfc.png?alt=media&token=6cf274fc-5f19-4698-9c09-e04792b507c0', 
    thumbImage: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F7f4fe606d43cb070d539eb3648fd66bafe322dfc.png?alt=media&token=6cf274fc-5f19-4698-9c09-e04792b507c0',
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
