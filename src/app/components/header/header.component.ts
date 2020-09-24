import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header_variable = false;

  name = 'Get Current Url Route Demo';
  currentRoute: string;
  isArticle = false;
  isLocation = false;
  adminStatus = false;
  userStatus = true;
  loginStatus = false;

  userImage: string = 'https://firebasestorage.googleapis.com/v0/b/travel-myproject.appspot.com/o/images%2F01d56c67bc26fa89ec01ab262e6ea756d77efc5b.png?alt=media&token=49a2c7a5-f19a-4a92-b586-c2d199f36b73';
  loggedUser: any;


  navbarOpen = false;
  desktopNavbar = true;

  innerWidth: any;

  constructor(private actRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        
        if (this.currentRoute.lastIndexOf('/') > 0) {
          this.currentRoute = this.currentRoute.slice(0, this.currentRoute.lastIndexOf('/'))
        }

        if (this.currentRoute === '/user' || this.currentRoute === '/admin' || this.currentRoute === '/blogs' || this.currentRoute === '/login') {
          this.header_variable = true;
        }
        else {
          this.header_variable = false;
        }
        if (this.currentRoute === '/article') {
          this.isArticle = true;
        }
        else {
          this.isArticle = false;
        }
        if (this.currentRoute === '/location-details') {
          this.isLocation = true;
        }
        else {
          this.isLocation = false;
        }
      }
    });

  }

  ngOnInit(): void {
    this.checkLogin();
    this.updateCheckLogin();
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 768){
      this.desktopNavbar = false;
    }
    else this.desktopNavbar = true;
  }


  //Check scroll position
  @HostListener("document:scroll")
  scrollfunction() {
    this.navbarOpen = false;
    if (this.currentRoute === '/user' ||
      this.currentRoute === '/admin' ||
      this.currentRoute === '/blogs' ||
      this.currentRoute === '/login') {
      this.header_variable = true;
    }
    else {
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        this.header_variable = true;
      }
      else {
        this.header_variable = false;
      }
    }
  }
  //-----------------------------

  private checkLogin(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin != null && admin.role === 'admin' && admin.access) {
      this.adminStatus = true;
      this.userStatus = false;
      this.loginStatus = true;

    }
    else if (user != null && user.role === 'user') {
      this.userStatus = true;
      this.adminStatus = false;
      this.loginStatus = true;
    }
    else {
      this.adminStatus = false;
      this.userStatus = false;
      this.loginStatus = false;
    }
  }
  private updateCheckLogin(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkLogin();
      }
    );
  }


  toggleNavbar():void {
    if (this.innerWidth <= 768) {
       this.navbarOpen = !this.navbarOpen;
    }
   
  }
  navbarHide():void {
    this.navbarOpen = false;
  }



  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.navbarOpen = false;
    if (this.innerWidth <= 768){
      this.desktopNavbar = false;
    }
    else this.desktopNavbar = true;
  }


}
