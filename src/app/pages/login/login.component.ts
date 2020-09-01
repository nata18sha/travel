import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  changeStatus  = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeLogin():void {
    this.changeStatus  = !this.changeStatus;
  }

}
