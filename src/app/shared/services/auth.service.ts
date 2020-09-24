import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  userStatusChanges: Subject<string> = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
              private afFirestore: AngularFirestore,
              private router: Router,
              private toastr: ToastrService) { }


  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              const userID = userRef.id;

              if (this.currentUser.role === 'admin' && this.currentUser.access) {
                localStorage.setItem('admin', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/admin/admin-location');
                this.userStatusChanges.next('admin');
              }
              else if (this.currentUser.role === 'user') {
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                localStorage.setItem('userID', JSON.stringify(userID));
                this.router.navigateByUrl('/user');
                this.userStatusChanges.next('user');
              }
              this.toastr.success('Welcome!');
            });
          }
        );
      })
      .catch(err => 
        this.toastr.error('Incorrect email or password, please try again!', 'Oops!')
        );
  }

  signOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('admin');
      localStorage.removeItem('user');
      localStorage.removeItem('userID');
      this.router.navigateByUrl('home');
      this.userStatusChanges.next('logout');
    });
  }

  register(email: string, password: string, firstName: string, lastName: string): any {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          userEmail: userResponse.user.email,
          userFirstName: firstName,
          userLastName: lastName,
          role: 'user',
          image: 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2Fno-profile-image.png?alt=media&token=ad7f7478-aead-425c-b9e4-fe0a4609b8a9',
          phone: '380'
        };
        this.afFirestore.collection('users').add(user)
          .then(() => {
            this.toastr.success('Please sign in to proceed!', 'Registered!');
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }

  updateFireStoreUser(user, userID): Promise<void> {
    return this.afFirestore.collection('users').doc(userID).update({...user});
  }



}
