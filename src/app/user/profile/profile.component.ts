import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { User } from 'src/app/shared/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  defaultImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fnoimage.jpg?alt=media&token=9a954c2c-65f0-49c8-8b9c-687a4d70dfe5';
  bannerImage = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fdavid-marcu-78a265wpio4-unsplash.jpeg?alt=media&token=b38c52cc-fe60-4bf0-a04d-650041e787ad';

  loggedUser: any;
  userDOC: string;
  firstName: string;
  lastName: string;
  email: string;
  phone = ' ';
  profileImage: string;
  role = 'user';

  uploadProgress: Observable<number>;


  // user: any;

  constructor(private afStorage: AngularFireStorage,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firecloud: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserData();
  }


  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const userDoc = JSON.parse(localStorage.getItem('userID'));
    this.loggedUser = user;
    this.userDOC = userDoc;
    this.firstName = user.userFirstName;
    this.lastName = user.userLastName;
    this.email = user.userEmail;
    this.phone = user.phone;
    this.profileImage = user.image;
    // console.log(user)
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
        this.profileImage = url;
        // console.log(this.profileImage)
      });
    });
  }

  updateUser(): void {
 
    const user = new User(
      this.loggedUser.id,
      this.email,
      this.firstName,
      this.lastName,
      this.role,
      this.profileImage,
      this.phone,


    );

    this.authService.updateFireStoreUser(user, this.userDOC)
    .then(() =>
    this.toastr.success('Your profile information\'s been updated!', 'Yes!'))
    .catch(err => console.log(err));

  
    localStorage.setItem('user', JSON.stringify(user));
    this.getUserData();


  }



}
