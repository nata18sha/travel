import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  logout(): void {
    this.authService.signOut();
    this.toastr.info('You\'ve been logged out!');
    this.modalRef.hide();
  }

  confirmLogout(): void {
    this.logout();
  }
  declineLogout():void {
    this.modalRef.hide();
  }

}
