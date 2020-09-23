import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ILocation } from '../../shared/interfaces/location.interface';
import { Location } from '../../shared/models/location.model';
import { LocationService } from '../../shared/services/location.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-location.component.html',
  styleUrls: ['./admin-location.component.scss']
})
export class AdminLocationComponent implements OnInit {
  //Modal
  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  //Location array
  adminLocations: Array<ILocation> = [];


  //Location parameters
  locationID: string = '1';
  category: string;
  mainImage: string;
  images = [];
  location: string;
  rate: number;
  hours: string;
  title: string;
  description: string;
  amenities: string;
  thingsToDo: string;
  price: number;

  deleteById: string;


  searchName: string;
  order: string = 'info.name';
  reverse: boolean = false;
  sortedCollection: Array<ILocation>;

  //Booleans
  editStatus = false;
  imageStatus = false;
  moreImageStatus = false;
  uploadProgress: Observable<number>;
  uploadProgressMore: Observable<number>;

  constructor(private modalService: BsModalService,
    private locationService: LocationService,
    private afStorage: AngularFireStorage,
    private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.adminLocations, 'info.name');
    console.log(this.sortedCollection);
  }

  ngOnInit(): void {
    this.adminFireCloudLocations();
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
  openToAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
    this.resetFields();
  }

  private adminFireCloudLocations(): void {
    this.locationService.getFireCloudLocation().subscribe(
      collection => {
        this.adminLocations = collection.map(document => {
          const data = document.payload.doc.data() as ILocation;
          const id = document.payload.doc.id;

          return { id, ...data };
        });

      }
    );
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.mainImage = url;
        // console.log(this.mainImage)
        // this.imageStatus = true;
        this.imageStatus = true;
      });
    });
  }

  uploadImages(event): void {
    console.log('images:')
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgressMore = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        const image = url;
        this.images.push(image);
        console.log('images:', this.images)
        this.moreImageStatus = true;

        // this.imageStatus = true;
      });
    });
  }

  deleteMainImage(): void {
    this.afStorage.storage.refFromURL(this.mainImage).delete();
    this.imageStatus = false;
  }
  deleteImage(index): void {
    // console.log(index);
    // console.log(this.images);
    this.afStorage.storage.refFromURL(this.images[index]).delete();
    this.images.splice(index, 1);
    if (this.images.length < 0) {
      this.moreImageStatus = false;
    }

  }

  addLocation(locationForm: NgForm): void {

    const newLocation = new Location(
      this.locationID,
      this.category,
      this.mainImage,
      this.images,
      this.location,
      this.rate,
      this.hours,
      this.title,
      this.description,
      this.amenities,
      this.thingsToDo,
      this.price
    );
    delete newLocation.id;
    this.locationService.postFireCloudLocation({ ...newLocation })
      .then(message => console.log(message))
      .catch(err => console.log(err));

    this.modalRef.hide();
    locationForm.resetForm();

  }
  deleteLocation(location: ILocation, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteById = location.id;
  }
  
  confirmDelete(): void {
    this.locationService.deleteFireCloudLocation(this.deleteById)
        .then(message => console.log(message))
        .catch(err => console.log(err));
      const index = this.adminLocations.findIndex(elem => elem.id === this.deleteById);
      this.afStorage.storage.refFromURL(this.adminLocations[index].mainImage).delete();
      for (const image of this.adminLocations[index].images) {
        console.log(image);
        this.afStorage.storage.refFromURL(image).delete();
      }

    this.modalRef.hide();
    this.deleteById = null;
  }
  declineDelete(): void {
    this.modalRef.hide();
    this.deleteById = null;
  }





  editLocation(location: ILocation, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });

    this.editStatus = true;
    this.locationID = location.id;
    this.category = location.category;
    this.mainImage = location.mainImage;
    this.images = location.images;
    this.location = location.location;
    this.rate = location.rate;
    this.hours = location.hours;
    this.title = location.title;
    this.description = location.description;
    this.amenities = location.amenities;
    this.thingsToDo = location.thingsToDo;
    this.price = location.price;


    this.imageStatus = true;
    this.moreImageStatus = true;

  }
  updateLocation(locationForm: NgForm): void {
    const newLocation = new Location(
      this.locationID,
      this.category,
      this.mainImage,
      this.images,
      this.location,
      this.rate,
      this.hours,
      this.title,
      this.description,
      this.amenities,
      this.thingsToDo,
      this.price
    );

    this.locationService.updateFireCloudLocation({ ...newLocation })
      .then(message => console.log(message))
      .catch(err => console.log(err));

    this.modalRef.hide();

  }

  private resetFields(): void {
    this.editStatus = false;
    this.locationID = '1';
    this.category = '';
    this.mainImage = '';
    this.images = [];
    this.location = '';
    this.rate = null;
    this.hours = '';
    this.title = '';
    this.description = '';
    this.amenities = '';
    this.thingsToDo = '';
    this.price = null;


    this.imageStatus = false;
    this.moreImageStatus = false;
  }


}
