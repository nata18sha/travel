import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  changeStatus  = true;
  userEmail: string;
  userPassword: string;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  changeLogin():void {
    this.changeStatus  = !this.changeStatus;
  }
  loginUser(): void {
    this.authService.login(this.userEmail, this.userPassword);

  }

}
