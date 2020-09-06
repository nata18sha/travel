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
  firstName: string;
  lastName: string;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  changeLogin():void {
    this.changeStatus  = !this.changeStatus;
  }
  loginUser(): void {
    this.authService.login(this.userEmail, this.userPassword);
    this.resetFields();

  }
  registerUser(): void {
    this.authService.register(this.userEmail, this.userPassword, this.firstName, this.lastName);
    this.changeStatus = !this.changeStatus;
    this.resetFields();

  }
  private resetFields(): void {
    this.userEmail = '';
    this.userPassword = '';
    this.firstName = '';
    this.lastName = '';
  }

}
