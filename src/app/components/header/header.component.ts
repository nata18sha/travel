import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  header_variable = false;

  name = 'Get Current Url Route Demo';
  currentRoute: string;


  constructor(private actRoute: ActivatedRoute, private router: Router,) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // console.log(event.url);
        console.log(this.currentRoute);
        if (this.currentRoute.lastIndexOf('/') > 0) {
          this.currentRoute = this.currentRoute.slice(0, this.currentRoute.lastIndexOf('/'))
          console.log(this.currentRoute);
        }

        if (this.currentRoute === '/user' || this.currentRoute === '/admin' || this.currentRoute === '/blogs' || this.currentRoute === '/login') {
          this.header_variable = true;
        }
        else {
          this.header_variable = false;
        }
      }
    });

  }

  ngOnInit(): void {

  }

  @HostListener("document:scroll")
  scrollfunction() {
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


}
