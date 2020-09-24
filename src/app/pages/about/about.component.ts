import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
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
  member_one = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F86813cc485b5fa7c283a46fb3f145de96fb1f42c.png?alt=media&token=95b82294-17ef-449a-9283-6c3ca7311239';
  member_two = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F1c9266d969f04ce7ba5db9b5c9362bf97827eef9.png?alt=media&token=f8f66439-9920-4cc9-bfb3-624120025193';
  member_three = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F79f66fd6d0df59d352bf9615fb30b75ff1f56347.png?alt=media&token=2070d628-516b-401d-8d6d-8a4853cf31de';
  member_four = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F472c0399e713781959674901c26456d3dea050d7.png?alt=media&token=af534471-2a6c-44c5-b256-ababa70801dc';
  member_five = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Ff0dcd16b3793315fe60f0972bebaf821e215f0cf.png?alt=media&token=3686c531-49ee-4e77-a37d-acafefaceee8';
  member_six = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fchristopher-campbell-rDEOVtE7vOs-unsplash.jpg?alt=media&token=76efbfa1-8807-470d-9851-a9c5917fb713';

  bannerImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F98447a2944a2784fca36d17674c1eca512df0477.png?alt=media&token=8ba4f531-39c2-4d4d-b4a8-efc600548ab2';

  innerWidth: any;

  sliderConfig = { width: '733px', height: '475px', space: 10 };

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 480) {
      this.sliderConfig = { width: '320px', height: '200px', space: 5 };
    }
    else if (this.innerWidth <= 768) {
      this.sliderConfig = { width: '450px', height: '290px', space: 5 };
    }
    else {
      this.sliderConfig = { width: '733px', height: '475px', space: 10 };
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
      this.sliderConfig = { width: '320px', height: '208px', space: 5 };
    }
    else if (this.innerWidth <= 768) {
      this.sliderConfig = { width: '450px', height: '290px', space: 5 };
    }
    else {
      this.sliderConfig = { width: '733px', height: '475px', space: 10 };
    }
  }

}
