import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm} from '@angular/forms';

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

  agree = false;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
  }

  changeLogin():void {
    this.changeStatus  = !this.changeStatus;
    this.resetFields();
  }
  loginUser(loginForm:NgForm): void {
    this.authService.login(this.userEmail, this.userPassword);
    loginForm.resetForm();
  }

  registerUser(registerForm:NgForm): void {
    this.authService.register(this.userEmail, this.userPassword, this.firstName, this.lastName);
    this.changeStatus = !this.changeStatus;
    registerForm.resetForm();
  }

  acceptTerms(): void {
    this.agree = !this.agree;
  }
  private resetFields():void {
    this.userEmail = '';
    this.userPassword = '';
    this.firstName = '';
    this.lastName = '';
  }


}
