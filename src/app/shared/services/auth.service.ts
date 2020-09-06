import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  userStatusChanges: Subject<string> = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
              private afFirestore: AngularFirestore,
              private router: Router) { }


  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user)
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              if (this.currentUser.role === 'admin' && this.currentUser.access) {
                localStorage.setItem('admin', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/admin/admin-location');
                this.userStatusChanges.next('admin');
              }
              else if (this.currentUser.role === 'user') {
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/user');
                this.userStatusChanges.next('user');
              }
            });
          }
        );
      })
      .catch(err => console.log(err));
  }

  signOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('admin');
      localStorage.removeItem('user');
      this.router.navigateByUrl('home');
      this.userStatusChanges.next('logout');
    });
  }



}
