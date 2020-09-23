import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.signOut();
    this.toastr.info('You\'ve been logged out!');
  }

}
